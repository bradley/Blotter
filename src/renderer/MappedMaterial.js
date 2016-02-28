import "../core/";
import "../extras/";
import "../texture/";
import "_UniformUtils";


var fragmentSrc = [

  "precision highp float;",

  // Private uniforms.
  "uniform sampler2D _uSampler;",
  "uniform sampler2D _uSpriteIndicesTexture;",
  "uniform sampler2D _uSpriteBoundsTexture;",
  "uniform sampler2D uCenterPointTexture;",
  "uniform sampler2D uLenseWeightTexture;",
  "uniform vec2 _uCanvasResolution;",

  // Private texCoord and sprite information.
  "varying vec2 _vTexCoord;",
  "vec4 _spriteBounds;",

  // Public blotter defined uniforms.
  "vec2 uResolution;",

  // Public version of user defined uniforms.
  "vec2 uCenterPoint;",
  "float uLenseWeight;",

  "vec4 textTexture(vec2 coord);",


  // Public helper function used by user programs to retrieve texel color information within the bounds of
  // any given text sprite. This is to be used instead of `texture2D`.
  "vec4 textTexture(vec2 coord) {",
  "   vec2 adjustedFragCoord = _spriteBounds.xy + vec2((_spriteBounds.z * coord.x), (_spriteBounds.w * coord.y));",
  "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;",
  "   if (adjustedFragCoord.x < _spriteBounds.x ||",
  "       adjustedFragCoord.x > _spriteBounds.x + _spriteBounds.z ||",
  "       adjustedFragCoord.y < _spriteBounds.y ||",
  "       adjustedFragCoord.y > _spriteBounds.y + _spriteBounds.w) {",
  "     return vec4(0.0);",
  "   }",
  "   return texture2D(_uSampler, uv);",
  "}",


  "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

  "   // p = x, y percentage for texel position within total resolution.",
  "   vec2 p = fragCoord / uResolution;",
  "   // d = x, y percentage for texel position within total resolution relative to center point.",
  "   vec2 d = p - uCenterPoint;",

  "   // The dot function returns the dot product of the two",
  "   // input parameters, i.e. the sum of the component-wise",
  "   // products. If x and y are the same the square root of",
  "   // the dot product is equivalent to the length of the vector.",
  "   // Therefore, r = length of vector represented by d (the ",
  "   // distance of the texel from center position).",
  "   // ",
  "   // In order to apply weights here, we add our weight to this distance",
  "   // (pushing it closer to 1 - essentially giving no effect at all) and",
  "   // find the min between our weighted distance and 1.0",
  "   float inverseLenseWeight = 1.0 - uLenseWeight;",
  "   float r = min(sqrt(dot(d, d)) + inverseLenseWeight, 1.0);",

  "   vec2 offsetUV = uCenterPoint + (d * r);",

  "   // RGB shift",
  "   vec2 offset = vec2(0.0);",
  "   if (r < 1.0) {",
  "     float amount = 0.012;",
  "     float angle = 0.45;",
  "     offset = (amount * (1.0 - r)) * vec2(cos(angle), sin(angle));",
  "   }",
  "   vec4 cr = textTexture(offsetUV + offset);",
  "   vec4 cga = textTexture(offsetUV);",
  "   vec4 cb = textTexture(offsetUV - offset);",

  "   vec4 outColor = vec4(0.0);",

  "   if (cr.r > 0.0 || cga.g > 0.0 || cb.b > 0.0) {",
  "     // Adjust rgb values so that colors with transparency appear as if they were atop an opaque white background.",
  "     // (vec4(0.0, 0.0, 0.0, 0.5) _atop white_ is visibly the same as vec4(0.5, 0.5, 0.5, 0.0))",
  "     if (cr.a != 0.0) {",
  "       cr.r = cr.r + cr.a;",
  "     }",
  "     if (cga.a != 0.0) {",
  "       cga.g = cga.g + cga.a;",
  "     }",
  "     if (cb.b != 0.0) {",
  "       cb.b = cb.b + cb.a;",
  "     }",

  "     // Ensure offseted/shifted texels have alpha similar to the texel they are offsetting",
  "     // (this prevents texel from being invisible if cga.a = vec4(0.0, 0.0, 0.0, 0.0)",
  "     cga.a = max(cga.a, max(cr.a, cb.a));",

  "     // Set alpha adjustment value so that white texels keep their transparency.",
  "     float alpha = 1.0 - cga.a;",

  "     // Invert colors (this is cheating but optimal) so that we have CMYK rather than RGB",
  "     // shifted colors and the combination of offsets creates a blacker rather than whiter color.",
  "     outColor = vec4((1.0 - cr.r) - alpha, (1.0 - cga.g) - alpha, (1.0 - cb.b) - alpha, cga.a);",
  "   }",
  "   else {",
  "     outColor = vec4(cr.r, cga.g, cb.b, cga.a);",
  "   }",

  "   mainImage = outColor;",
  "}",



  "void main( void ) {",

  //  Retrieve sprite index and sprite alpha for sprite in which texel is contained.
  "   vec4 spriteIndexData = texture2D(_uSpriteIndicesTexture, _vTexCoord);",
  "   float spriteIndex = spriteIndexData.r;",
  "   float spriteAlpha = spriteIndexData.a;",

  //  Make bounds for the current sprite globally visible.
  "   _spriteBounds = texture2D(_uSpriteBoundsTexture, vec2(spriteIndex, 0.5));",

  //  Extract uniform data from user defined uniform textures.
  "   vec4 uCenterPointData = texture2D(uCenterPointTexture, vec2(spriteIndex, 0.5));",
  "   vec4 uLenseWeightData = texture2D(uLenseWeightTexture, vec2(spriteIndex, 0.5));",

  //  Set "uniform" values visible to user.
  "   uResolution = _spriteBounds.zw;",
  "   uCenterPoint = uCenterPointData.xy;",
  "   uLenseWeight = uLenseWeightData.x;",

  //  Set fragment coordinate in respect to position within sprite bounds.
  "   vec2 fragCoord = gl_FragCoord.xy - _spriteBounds.xy;",

  //  Call user defined fragment function, setting outColor on return.
  "   vec4 outColor;",
  "   mainImage(outColor, fragCoord);",

  //  Multiply alpha by original spriteIndexData's alpha value."
  //  this will be 0 for texels not within any 'sprite' area."
  "   outColor.a = outColor.a * spriteAlpha;",
  "   gl_FragColor = outColor;",
  "}"

].join("\n");

var vertexSrc = [

	"varying vec2 _vTexCoord;",

	"void main() {",

	"  _vTexCoord = uv;",
	"  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

	"}"

].join("\n");







Blotter.MappedMaterial = function(mapper, shaderSrc, options) {
  this.init(mapper, shaderSrc, options);
}

Blotter.MappedMaterial.prototype = (function() {

	// Create object holding the name and values of every text specific uniform, each referencable through any given text.

  function _setTextsUniformsValues () {
    for (var uniformName in this.userDefinedUniforms) {
      if (this.userDefinedUniforms.hasOwnProperty(uniformName)) {
        for (var i = 0; i < this.mapper.texts.length; i++) {
          var text = this.mapper.texts[i],
              uniform = this.userDefinedUniforms[uniformName];

          if (blotter_UniformUtils.UniformTypes.indexOf(uniform.type) == -1) {
            blotter_Messaging.logError("Blotter.MappedMaterial", "user defined uniforms must be one of type: " +
              blotter_UniformUtils.UniformTypes.join(", "));
            return;
          }

          if (!blotter_UniformUtils.validValueForUniformType(uniform.type, uniform.value)) {
            blotter_Messaging.logError("Blotter.MappedMaterial", "user defined uniform value for " + uniformName + " is incorrect for type: " + uniform.type);
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
        userDefinedUniformTextures = _uniformsForUserDefinedUniformValues.call(this),
        indicesTexture = new blotter_TextsIndicesTexture(this.mapper, this.fidelityModifier),
        boundsTexture = new blotter_TextsBoundsTexture(this.mapper);

    indicesTexture.build(function(spriteIndicesTexture) {
      boundsTexture.build(function(spriteBoundsTexture) {

        uniforms = {
          _uSampler              : { type: "t" , value: self.textsTexture },
          _uCanvasResolution     : { type: "2f", value: [self.ratioAdjustedWidth, self.ratioAdjustedHeight] },
          _uSpriteIndicesTexture : { type: "t" , value: spriteIndicesTexture },
          _uSpriteBoundsTexture  : { type: "t" , value: spriteBoundsTexture }
        };
        for (var uniformName in userDefinedUniformTextures) {
          uniforms[uniformName] = userDefinedUniformTextures[uniformName];
        }

        callback(uniforms);
      });
    });
  }

  function _uniformTextureNameForUniformName (uniformName) {
    return uniformName + "Texture";
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
        data = new Float32Array(this.mapper.texts.length * 4);

    if (!uniformDescription)
      blotter_Messaging.logError("Blotter.Composer", "cannot find uniformName for _uniformTextureForUniformName");

    for (var i = 0; i < this.mapper.texts.length; i++) {
      var text = this.mapper.texts[i],
          textUniformsValues = this.textsUniformsValues[text.id];

      if (textUniformsValues) {
        var textUniform = textUniformsValues[uniformName];

        switch (textUniform.type) {
          case '1f':
            data[4*i]   = textUniform.value; // x (r)
            data[4*i+1] = 0.0;
            data[4*i+2] = 0.0;
            data[4*i+3] = 0.0;
            break;

          case '2f':
            data[4*i]   = textUniform.value[0]; // x (r)
            data[4*i+1] = textUniform.value[1]; // y (g)
            data[4*i+2] = 0.0;
            data[4*i+3] = 0.0;
            break;

          case '3f':
            data[4*i]   = textUniform.value[0]; // x (r)
            data[4*i+1] = textUniform.value[1]; // y (g)
            data[4*i+2] = textUniform.value[2]; // z (b)
            data[4*i+3] = 0.0;
            break;

          case '4f':
            data[4*i]   = textUniform.value[0]; // x (r)
            data[4*i+1] = textUniform.value[1]; // y (g)
            data[4*i+2] = textUniform.value[2]; // z (b)
            data[4*i+3] = textUniform.value[3]; // w (a)
            break;

          default:
            data[4*i]   = 0.0;
            data[4*i+1] = 0.0;
            data[4*i+2] = 0.0;
            data[4*i+3] = 0.0;
            break;
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

    constructor : Blotter.MappedMaterial,

    init : function(mapper, shaderSrc, options) {
      options = options || {};

      this.mapper = mapper;
      this.userDefinedUniforms = options.uniforms || {};

      // There is a negative coorelation between this value and
      // the speed at which texture generation happens.
      // However, the lower this value, the less fidelity you can expect
      // for indexing into uniforms for any given text.
      // Value must be between 0.0 and 1.0, and you are advised to keep it around 0.5.
      this.fidelityModifier = 0.5;

      this.pixelRatio = blotter_CanvasUtils.pixelRatio();
      this.width = this.mapper.width;
      this.height = this.mapper.height;
      this.ratioAdjustedWidth = this.width * this.pixelRatio;
      this.ratioAdjustedHeight = this.height * this.pixelRatio;

      // Setup text specific uniforms immediately.
      this.textsUniformsValues = {};
      _setTextsUniformsValues.call(this);
    },

    load : function(callback) {
      var self = this,
          loader = new THREE.TextureLoader(),
          url = this.mapper.getImage();

      // load a resource
      loader.load(url, function(textsTexture) {

        // Setup texture
        self.textsTexture = textsTexture;
        self.textsTexture.generateMipmaps = false;
        self.textsTexture.minFilter = THREE.LinearFilter;
        self.textsTexture.magFilter = THREE.LinearFilter;
        self.textsTexture.needsUpdate = true;

        _materialUniforms.call(self, function(uniforms) {

          self.threeMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexSrc,
            fragmentShader: fragmentSrc,
            uniforms: uniforms
          });

          self.threeMaterial.depthTest = false;
          self.threeMaterial.depthWrite = false;

          callback();
        });
      });
    },

    updateUniformValueForText : function(text, uniformName, value) {
      var self = this,
          textsUniformsObject = this.textsUniformsValues[text.id];

      if (!textsUniformsObject) {
        blotter_Messaging.logError("Blotter.MappedMaterial", "cannot find text for updateUniformsForText");
        return;
      }

      if (!textsUniformsObject[uniformName]) {
        blotter_Messaging.logError("Blotter.MappedMaterial", "cannot find uniformName for updateUniformsForText");
        return;
      }

      if (!blotter_UniformUtils.validValueForUniformType(textsUniformsObject[uniformName].type, value)) {
        blotter_Messaging.logError("Blotter.MappedMaterial", "user defined uniform value for " + uniformName + " is incorrect for type: " + this.userDefinedUniforms[uniformName].type);
        return;
      }

      textsUniformsObject[uniformName].value = value;

      setTimeout(function() {
        // try using this.threeMaterial
        self.threeMaterial.uniforms[_uniformTextureNameForUniformName.call(self, uniformName)] = {
          type : "t",
          value : _uniformTextureForUniformName.call(self, uniformName)
        };
        self.threeMaterial.needsUpdate = true;
      }, 1);
    }
  }
})();

