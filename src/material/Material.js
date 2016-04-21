import "../core/";
import "../utils/";
import "../texture/";
import "_MaterialScope"


Blotter.Material = function(texts, mainImageSrc, options) {
  this.init(texts, mainImageSrc, options);
}

Blotter.Material.prototype = (function() {

  function _defaultMainImageSrc () {
    var mainImage = [

      "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

        "mainImage = textTexture(fragCoord / uResolution);",

      "}"
    ];

    return mainImage.join("\n");
  }

  function _vertexSrc () {
    var vertexSrc = [

      "varying vec2 _vTexCoord;",

      "void main() {",

      "  _vTexCoord = uv;",
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

      "}"
    ];

    return vertexSrc.join("\n");
  }

  function _fragmentSrc () {
    var fragmentSrc,
        privateUniformTextureDeclarations = [],
        publicUniformDeclarations = [],
        uniformDefinitionsForUniforms = [];
// ### - this whole mess until 74
    for (var uniformName in this.uniforms) {
      if (this.uniforms.hasOwnProperty(uniformName)) {
        var self = this,
            uniformValue = this.uniforms[uniformName];

        // Create strings of sampler2D declarations for each user defined uniform texture.
        privateUniformTextureDeclarations.push(
          "uniform sampler2D " + _uniformTextureNameForUniformName.call(this, uniformName) + ";"
        );

        // Create strings of uniform declarations for each publicly facing version of each user defined uniform.
        publicUniformDeclarations.push(
          blotter_UniformUtils.glslDataTypeForUniformType(uniformValue.type) + " " + uniformName + ";"
        );

        // Create strings of uniform definitions for each publicly facing version of each user defined uniform.
        uniformDefinitionsForUniforms.push((function () {
          var textureName = _uniformTextureNameForUniformName.call(self, uniformName),
              swizzle = blotter_UniformUtils.fullSwizzleStringForUniformType(uniformValue.type);
          return uniformName + " = " + "texture2D(" + textureName + " , vec2(spriteIndex, 0.5))." + swizzle + ";";
        })());
      }
    }
    privateUniformTextureDeclarations = privateUniformTextureDeclarations.join("\n");
    publicUniformDeclarations = publicUniformDeclarations.join("\n");
    uniformDefinitionsForUniforms = uniformDefinitionsForUniforms.join("\n");
// ### - inspect this in chrome to see how the formatting is output.
    fragmentSrc = [

      "precision highp float;",

      // Private blotter defined uniforms.
      "uniform sampler2D _uSampler;",
      "uniform sampler2D _uSpriteIndicesTexture;",
      "uniform sampler2D _uSpriteBoundsTexture;",
      "uniform vec2 _uCanvasResolution;",

      // Private texCoord and sprite information.
      "varying vec2 _vTexCoord;",
      "vec4 _spriteBounds;",

      // Public blotter defined uniforms.
      "vec2 uResolution;",

      // Private versions of use user defined uniforms
      privateUniformTextureDeclarations,

      // Public versions of user defined uniforms.
      publicUniformDeclarations,

      // Public helper function used by user programs to retrieve texel color information within the bounds of
      // any given text sprite. This is to be used instead of `texture2D`.
      "vec4 textTexture( vec2 coord ) {",
      "   vec2 adjustedFragCoord = _spriteBounds.xy + vec2((_spriteBounds.z * coord.x), (_spriteBounds.w * coord.y));",
      "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;",
      //  If adjustedFragCoord falls outside the bounds of the current texel's sprite, return `vec4(0.0)`.
      "   if (adjustedFragCoord.x < _spriteBounds.x ||",
      "       adjustedFragCoord.x > _spriteBounds.x + _spriteBounds.z ||",
      "       adjustedFragCoord.y < _spriteBounds.y ||",
      "       adjustedFragCoord.y > _spriteBounds.y + _spriteBounds.w) {",
      "     return vec4(0.0);",
      "   }",
      "   return texture2D(_uSampler, uv);",
      "}",

// ### - what other methods ought we expose?

      "void mainImage( out vec4 mainImage, in vec2 fragCoord );",

      this.mainImage,

      "void main( void ) {",

      //  Retrieve sprite index and sprite alpha for sprite in which texel is contained.
      "   vec4 spriteIndexData = texture2D(_uSpriteIndicesTexture, _vTexCoord);",
      "   float spriteIndex = spriteIndexData.r;",
      "   float spriteAlpha = spriteIndexData.a;",

      //  Make bounds for the current sprite globally visible.
      "   _spriteBounds = texture2D(_uSpriteBoundsTexture, vec2(spriteIndex, 0.5));",

      //  Set "uniform" values visible to user.
      "   uResolution = _spriteBounds.zw;",
          uniformDefinitionsForUniforms,

      //  Set fragment coordinate in respect to position within sprite bounds.
      "   vec2 fragCoord = gl_FragCoord.xy - _spriteBounds.xy;",
      //  Call user defined fragment function, setting outColor on return.
      "   vec4 outColor;",
      "   mainImage(outColor, fragCoord);",

// ### - rethink this at least once. :)
      //  Multiply alpha by original spriteIndexData's fourth value."
      //  this will be 0 for texels not within any 'sprite' area."
      "   outColor.a = outColor.a * spriteAlpha;",
      "   gl_FragColor = outColor;",
      "}"
    ];

    return fragmentSrc.join("\n");
  }







































  // Build object containing all uniforms we will pass to fragment shader.

  function _materialUniforms (callback) {
    var self = this,
        textureUniforms = _uniformsAsTextureUniforms.call(this),
        indicesTexture = new blotter_TextsIndicesTexture(this.textsTexture, this.sampleAccuracy),
        boundsTexture = new blotter_TextsBoundsTexture(this.textsTexture, this.pixelRatio);

    this.textsTexture.load(function(texture) {
      indicesTexture.build(function(spriteIndicesTexture) {
        boundsTexture.build(function(spriteBoundsTexture) {

          var uniforms = {
            _uSampler              : { type: "t" , value: texture },
            _uCanvasResolution     : { type: "2f", value: [self.width, self.height] },
            _uSpriteIndicesTexture : { type: "t" , value: spriteIndicesTexture },
            _uSpriteBoundsTexture  : { type: "t" , value: spriteBoundsTexture }
          };

          for (var uniformName in textureUniforms) {
            if (textureUniforms.hasOwnProperty(uniformName)) {
              uniforms[uniformName] = textureUniforms[uniformName];
            }
          }

          callback(uniforms);
        });
      });
    });
  }

  function _uniformTextureNameForUniformName (uniformName) {
    return "_" + uniformName + "Texture";
  }


// ### - 1 time! unitl 260
  function _setTextureUniformsForUniforms () {
    this.uniformTextures = {};
    for (var uniformName in this.uniforms) {
      if (this.uniforms.hasOwnProperty(uniformName)) {
        var data = new Float32Array(this.textsTexture.texts.length * 4);
        this.uniforms[uniformName]._textureData = data;
        this.uniforms[uniformName]._texture = new THREE.DataTexture(data, this.textsTexture.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
      }
    }
  }

  function _uniformsAsTextureUniforms () {
    var textureUniforms = {};

    for (var uniformName in this.uniforms) {
      if (this.uniforms.hasOwnProperty(uniformName)) {
        textureUniforms[_uniformTextureNameForUniformName.call(this, uniformName)] = {
          value : this.uniforms[uniformName]._texture,
          type : "t"
        }
      }
    }
    return textureUniforms;
  }

  function _buildTextScopes (texts) {
    this.scopes = {};
    for (var i = 0; i < texts.length; i++) {
      var text = texts[i];

      blotter_Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");

      if (!this.scopes[text.id]) {
// ### - might want to get the data index (i) from the texture here....
        this.scopes[text.id] = new blotter_MaterialScope(text, i, this);
      }
    }
  }


  return {

    constructor : Blotter.Material,

    init : function (texts, options) {
      options = options || {};
// ### - remove this shit following documentation.
      // There is a negative coorelation between the sampleAccuracy value and
      // the speed at which texture generation happens.
      // However, the lower this value, the less sampleAccuracy you can expect
      // for indexing into uniforms for any given text.
      // Value must be between 0.0 and 1.0, and you are advised to keep it around 0.5.
      this.sampleAccuracy = options.sampleAccuracy || 0.5;
// ### - is this the main spot for users to adjust pixelRatio? Seems like it should be done against the renderer. How does this effect load?
      this.pixelRatio = options.pixelRatio || blotter_CanvasUtils.pixelRatio;

      this.uniforms = options.uniforms || {};



      this.mainImage = options.mainImage || _defaultMainImageSrc.call(this);
      this.texts = texts;
    },


    // add: function(o) {

    //   var objects = o;
    //   if (!(objects instanceof Array)) {
    //     objects = _.toArray(arguments);
    //   }

    //   this.scene.add(objects);
    //   return this;
    // },

    // remove: function(o) {

    //   var objects = o;
    //   if (!(objects instanceof Array)) {
    //     objects = _.toArray(arguments);
    //   }

    //   this.scene.remove(objects);

    //   return this;
    // },

// ### - User should at least have full customablity up until here. line 272 through 275 are effected.
    load : function (callback) {
      var self = this;

      this.textsTexture = new blotter_TextsTexture(this.texts);
      this.width = this.textsTexture.width;
      this.height = this.textsTexture.height;
      this.mainImage = this.mainImage || _defaultMainImageSrc.call(this);

      this.uniforms = blotter_UniformUtils.extractValidUniforms(this.uniforms);

      _setTextureUniformsForUniforms.call(this);

      _buildTextScopes.call(this, this.textsTexture.texts);

      _materialUniforms.call(this, function(uniforms) {
        self.threeMaterial = new THREE.ShaderMaterial({
          vertexShader: _vertexSrc.call(self),
          fragmentShader: _fragmentSrc.call(self),
          uniforms: uniforms
        });

        self.threeMaterial.depthTest = false;
        self.threeMaterial.depthWrite = false;
        self.threeMaterial.premultipliedAlpha = false;

        callback();
      });
    },

    forText : function (text) {
      blotter_Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");

      if (this.texts.indexOf(text) == -1) {
// ### - messaging
        blotter_Messaging.logError("Blotter.Material", "Blotter.Text object not found");
        return;
      }

      return this.scopes[text.id];
    }
  }
})();




/*

rules
 - a build must happen once all texts are added
 - when any text is added or removed after the initial build, a build must happen
 - a build must happen once all uniforms are added
 - when any uniform is added or removed after the initial build, a build must happen
 - a build must be asynchronous and will be at least somewhat costly.


{
  initialize : function (texts, options) {
    // configure and set defaults
  },

  addTexts : function (texts) {
    // coerce into array (copy underscore or just use underscore for this)
    // merge with current texts array attribute
  },

  removeTexts : function (texts) {
    // coerce into array (copy underscore or just use underscore for this)
    // remove each from current texts array attribute
  },

  build : function () {
    // build all textures
    //
    // build shader
  }
}


1. initialize
2. addTexts
3. build (callback) -> set ready
4. addTexts
5. removeTexts
6. addTexts
7. needsUpdate = true
  renderer checks material, sees it needsupdate, rebuilds
  when ready, update renderscopes

More rules?
- user never calls build. user can listen for ready.
- renderer, on start, checks the build status of material. if unbuilt, it builds it.

1. user creates some texts
2. user creates a material with texts and shader and uniforms and etc.
3. user adds some texts or maybe changes some uniform values
4. user sets up a renderer, passing it the material
5. on loop (obscured from user and has nothing to do with their dom elements), renderer
   checks if material needsUpdate (true initially) and initiates build, setting a callback.

TextureLoader.load(texts, function(texture) {
  texture
})





idea: Renderer = Blotter

1

new Blotter(config)
new Text(str, props)
new Material(text, options)
blotter.material = material
blotter.play()
blotter.forText(text).appendTo(el);


2

material.forText(text).uniforms.uTime = newTime
// ok - works -fine
material.uniforms.newUniform = { type: "1f", value: 0.0 }
material.needsUpdate = true;
// renderer checks material for needsUpdate and if so, calls build on material
// any time material builds, it does the entire process of building, so it builds
// a new mapper, all textures and compiles shaders.
// upon build completion, material updates all existing scopes (find each text
// in its text scopes and rebuilding them while keeping references) and creating
// new ones or deleting unused ones where needed. renderer listens for completion
// and does similar with its scopes - really shouldnt effect render scope els in
// any unanticipated way.

// the problem left is the callback. material has to build itself, and it's likely
// the user will need to know of both the asynchronous nature of this build, and
// of its end.
//
// note: Material uses getter and setter for its needsUpdate property and defaults
//   it to true. On set, it called #update on itself, dispatching an event notifying
//   listeners.
//
// so thinking about that:
//   - Blotter object has no textScopes and cannot render until material is complete
//   - when material re-builds, blotter object must update scopes
//
//  nnootteee: before i move on to test, this is what im thinking: if material could supply
//    the threematerial _immediately_, the renderer could just run(?). meaning we wouldnt _have_
//    to force the user to do anything with a callback. meaning they'd see a delay maybe but minimal
//    weird code. we could then have a 'ready' event that user code could listen to and conditionally do
//    whatever they want.
//
//    - wrenches here:
//      - render scopes are meaningless prior to a material build.
//        material building defines the width and height and where to find the text
//        inside the map.
//      - if we ask users to have a listener for `ready` on blotter, what kicks off the build?

// rules
// accurate text scopes for both materials and renderers are not available until
// after material has been built and subsequently renderer has updated its scopes
// e.g.; until the renderer says it's ready.
// so, everything (Blotter, Material, Texts) can be instantiated and set up and #start
// can be called on Botter. However if the user wants scopes (they do always), they need
// listen for the "ready" event on their blotter instance.





*/
