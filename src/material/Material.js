import "../core/";
import "../extras/";
import "../texture/";
import "../cache/";


Blotter.Material = function(texts, shaderSrc, options) {
  this.init(texts, shaderSrc, options);
}

Blotter.Material.prototype = (function() {

  function _createMapperFromTexts (texts) {
    if (!Array.isArray(texts)) {
      texts = [texts];
    }
    var mapper = new blotter_Mapper(texts, { pixelRatio: this.pixelRatio, flipY: true });
    this.width = mapper.width * this.pixelRatio;
    this.height = mapper.height * this.pixelRatio;
    return mapper;
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

    var privateUserDefinedUniformTextureDeclarations = [],
        publicUserDefinedUniformDeclarations = [],
        uniformDefinitionsForUserDefinedUniforms = [],
        fragmentSrc;


    for (var uniformName in this.userDefinedUniforms) {
      var self = this,
          uniformValue = this.userDefinedUniforms[uniformName];

      // Create strings of sampler2D declarations for each user defined uniform texture.
      privateUserDefinedUniformTextureDeclarations.push(
        "uniform sampler2D " + _uniformTextureNameForUniformName.call(this, uniformName) + ";"
      );

      // Create strings of uniform declarations for each publicly facing version of each user defined uniform.
      publicUserDefinedUniformDeclarations.push(
        blotter_UniformUtils.glslDataTypeForUniformType(uniformValue.type) + " " + uniformName + ";"
      );

      // Create strings of uniform definitions for each publicly facing version of each user defined uniform.
      uniformDefinitionsForUserDefinedUniforms.push((function () {
        var textureName = _uniformTextureNameForUniformName.call(self, uniformName),
            swizzle = blotter_UniformUtils.fullSwizzleStringForUniformType(uniformValue.type);
        return uniformName + " = " + "texture2D(" + textureName + " , vec2(spriteIndex, 0.5))." + swizzle + ";";
      })());
    }
    privateUserDefinedUniformTextureDeclarations = privateUserDefinedUniformTextureDeclarations.join("\n");
    publicUserDefinedUniformDeclarations = publicUserDefinedUniformDeclarations.join("\n");
    uniformDefinitionsForUserDefinedUniforms = uniformDefinitionsForUserDefinedUniforms.join("\n");

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
      privateUserDefinedUniformTextureDeclarations,

      // Public versions of user defined uniforms.
      publicUserDefinedUniformDeclarations,

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

      "void mainImage( out vec4 mainImage, in vec2 fragCoord );",

      this.shaderSrc,

      "void main( void ) {",

      //  Retrieve sprite index and sprite alpha for sprite in which texel is contained.
      "   vec4 spriteIndexData = texture2D(_uSpriteIndicesTexture, _vTexCoord);",
      "   float spriteIndex = spriteIndexData.r;",
      "   float spriteAlpha = spriteIndexData.a;",

      //  Make bounds for the current sprite globally visible.
      "   _spriteBounds = texture2D(_uSpriteBoundsTexture, vec2(spriteIndex, 0.5));",

      //  Set "uniform" values visible to user.
      "   uResolution = _spriteBounds.zw;",
          uniformDefinitionsForUserDefinedUniforms,

      //  Set fragment coordinate in respect to position within sprite bounds.
      "   vec2 fragCoord = gl_FragCoord.xy - _spriteBounds.xy;",
      //  Call user defined fragment function, setting outColor on return.
      "   vec4 outColor;",
      "   mainImage(outColor, fragCoord);",

      //  Multiply alpha by original spriteIndexData's fourth value."
      //  this will be 0 for texels not within any 'sprite' area."
      "   outColor.a = outColor.a * spriteAlpha;",
      "   gl_FragColor = outColor;//texture2D(_uSampler, _vTexCoord);//vec4(1.0, 0.6705882353, 0.2509803922, 0.7);//outColor;//vec4(1.0, 1.0, 0.5, 1.0);//",
      "}"

    ];
    return fragmentSrc.join("\n");
  }


  // Create object holding the name and values of every text specific uniform, each referencable through any given text.

  function _setTextsUniformsValues () {
    for (var uniformName in this.userDefinedUniforms) {
      if (this.userDefinedUniforms.hasOwnProperty(uniformName)) {
        for (var i = 0; i < this.mapper.texts.length; i++) {
          var text = this.mapper.texts[i],
              uniform = this.userDefinedUniforms[uniformName];

          if (blotter_UniformUtils.UniformTypes.indexOf(uniform.type) == -1) {
            blotter_Messaging.logError("Blotter.Material", "user defined uniforms must be one of type: " +
              blotter_UniformUtils.UniformTypes.join(", "));
            return;
          }

          if (!blotter_UniformUtils.validValueForUniformType(uniform.type, uniform.value)) {
            blotter_Messaging.logError("Blotter.Material", "user defined uniform value for " + uniformName + " is incorrect for type: " + uniform.type);
            return;
          }

          this.textsUniformsValues[text.id] = this.textsUniformsValues[text.id] || {};
          this.textsUniformsValues[text.id][uniformName] = JSON.parse(JSON.stringify(uniform));
        }
      }
    }
  }

  // Build object containing all uniforms we will pass to fragment shader.

  function _materialUniforms (callback) {
    var self = this,
        uniforms,
        loader = new THREE.TextureLoader(),
        userDefinedUniformTextures = _uniformsForUserDefinedUniformValues.call(this),
        indicesTexture = new blotter_TextsIndicesTexture(this.mapper, this.fidelity),
        boundsTexture = new blotter_TextsBoundsTexture(this.mapper, this.pixelRatio);

    loader.load(this.mapper.getImage(), function(textsTexture) {
      indicesTexture.build(function(spriteIndicesTexture) {
        boundsTexture.build(function(spriteBoundsTexture) {

          // Setup texture
          textsTexture.generateMipmaps = false;
          textsTexture.minFilter = THREE.LinearFilter;
          textsTexture.magFilter = THREE.LinearFilter;
          textsTexture.needsUpdate = true;

          uniforms = {
            _uSampler              : { type: "t" , value: textsTexture },
            _uCanvasResolution     : { type: "2f", value: [self.width, self.height] },
            _uSpriteIndicesTexture : { type: "t" , value: spriteIndicesTexture },
            _uSpriteBoundsTexture  : { type: "t" , value: spriteBoundsTexture }
          };
          for (var uniformName in userDefinedUniformTextures) {
            uniforms[uniformName] = userDefinedUniformTextures[uniformName];
          }

          callback(uniforms);
        });
      });
    });
  }

  function _uniformTextureNameForUniformName (uniformName) {
    return "_" + uniformName + "Texture";
  }

  function _uniformsForUserDefinedUniformValues () {
    var uniformsAsTextures = {};

    for (var uniformName in this.userDefinedUniforms) {
      uniformsAsTextures[_uniformTextureNameForUniformName.call(this, uniformName)] = {
        value : _uniformTextureForUniformName.call(this, uniformName),
        type : "t"
      }
    }
    return uniformsAsTextures;
  }

  // Create a Data Texture holding the values for a specified uniform name that should be available to any given texel for any given text.

  function _uniformTextureForUniformName (uniformName) {
    var uniformDescription = this.userDefinedUniforms[uniformName],
        data = this.float32ArrayCache.next();

    if (!uniformDescription)
      blotter_Messaging.logError("Blotter.Composer", "cannot find uniformName for _uniformTextureForUniformName");

    for (var i = 0; i < this.mapper.texts.length; i++) {
      var text = this.mapper.texts[i],
          textUniformsValues = this.textsUniformsValues[text.id];

      if (textUniformsValues) {
        var textUniform = textUniformsValues[uniformName];

        if (textUniform.type == "1f") {
          data[4*i]   = textUniform.value; // x (r)
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }
        else if (textUniform.type == "2f") {
          data[4*i]   = textUniform.value[0]; // x (r)
          data[4*i+1] = textUniform.value[1]; // y (g)
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }
        else if (textUniform.type == "3f") {
          data[4*i]   = textUniform.value[0]; // x (r)
          data[4*i+1] = textUniform.value[1]; // y (g)
          data[4*i+2] = textUniform.value[2]; // z (b)
          data[4*i+3] = 0.0;
        }
        else if (textUniform.type == "4f") {
          data[4*i]   = textUniform.value[0]; // x (r)
          data[4*i+1] = textUniform.value[1]; // y (g)
          data[4*i+2] = textUniform.value[2]; // z (b)
          data[4*i+3] = textUniform.value[3]; // w (a)
        }
        else {
          data[4*i]   = 0.0;
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }
      }
      else {
        data[4*i]   = 0.0;
        data[4*i+1] = 0.0;
        data[4*i+2] = 0.0;
        data[4*i+3] = 0.0;
      }
    }

    var texture = new THREE.DataTexture(data, this.mapper.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
    texture.needsUpdate = true;

    return texture;
  }


  return {

    constructor : Blotter.Material,

    init : function (texts, shaderSrc, options) {
      options = options || {};

      this.pixelRatio = options.pixelRatio || blotter_CanvasUtils.pixelRatio;

      this.mapper = _createMapperFromTexts.call(this, texts);
      this.float32ArrayCache = new blotter_Float32ArrayCache(this.mapper.texts.length * 4);
      this.shaderSrc = shaderSrc;
      this.userDefinedUniforms = options.uniforms || {};

      // There is a negative coorelation between this value and
      // the speed at which texture generation happens.
      // However, the lower this value, the less fidelity you can expect
      // for indexing into uniforms for any given text.
      // Value must be between 0.0 and 1.0, and you are advised to keep it around 0.5.
      this.fidelity = 0.5;

      // Setup text specific uniforms immediately.
      this.textsUniformsValues = {};
      _setTextsUniformsValues.call(this);
    },

    load : function (callback) {
      var self = this;

      _materialUniforms.call(this, function(uniforms) {

        self.threeMaterial = new THREE.ShaderMaterial({
          vertexShader: _vertexSrc.call(self),
          fragmentShader: _fragmentSrc.call(self),
          uniforms: uniforms
        });

        self.threeMaterial.depthTest = false;
        self.threeMaterial.depthWrite = false;

        callback();
      });
    },

    hasText : function (text) {
      if (!(text instanceof Blotter.Text)) {
        blotter_Messaging.logError("Blotter.Material", "argument must be instanceof Blotter.Text");
      }

      return !!this.textsUniformsValues[text.id];
    },

    updateUniformValueForText : function (text, uniformName, value) {
      var textsUniformsObject = this.textsUniformsValues[text.id];

      if (!textsUniformsObject) {
        blotter_Messaging.logError("Blotter.Material", "cannot find text for updateUniformsForText");
        return;
      }

      if (!textsUniformsObject[uniformName]) {
        blotter_Messaging.logError("Blotter.Material", "cannot find uniformName for updateUniformsForText");
        return;
      }

      if (!blotter_UniformUtils.validValueForUniformType(textsUniformsObject[uniformName].type, value)) {
        blotter_Messaging.logError("Blotter.Material", "user defined uniform value for " + uniformName + " is incorrect for type: " + this.userDefinedUniforms[uniformName].type);
        return;
      }

      textsUniformsObject[uniformName].value = value;

      this.threeMaterial.uniforms[_uniformTextureNameForUniformName.call(self, uniformName)] = {
        type : "t",
        value : _uniformTextureForUniformName.call(this, uniformName)
      };
      this.threeMaterial.needsUpdate = true;
    }
  }
})();

