(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Material = function(mainImage, options) {
    _.defaults(this, options, {
      uniforms : {}
    });

    this._mapper = new Blotter._Mapper();

    this._texts = [];

    this.mainImage = mainImage;

    _.extendOwn(this, EventEmitter.prototype);
  };

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
          userDefinedUniforms = {
            // Strings of sampler2D declarations for each user defined uniform texture.
            privateUniformTextureDeclarations : "",
            // Strings of uniform declarations for each publicly facing version of each user defined uniform.
            publicUniformDeclarations         : "",
            // Strings of uniform definitions for each publicly facing version of each user defined uniform.
            uniformDefinitions                : ""
          };

      _.reduce(this.uniforms, _.bind(function (userDefinedUniforms, uniformObject, uniformName) {
        var uniformTextureName = _uniformTextureNameForUniformName.call(this, uniformName),
            glslSwizzle = Blotter._UniformUtils.fullSwizzleStringForUniformType(uniformObject.type),
            glslDataType = Blotter._UniformUtils.glslDataTypeForUniformType(uniformObject.type);

        userDefinedUniforms.privateUniformTextureDeclarations += "uniform sampler2D " + uniformTextureName + ";\n";
        userDefinedUniforms.publicUniformDeclarations += glslDataType + " " + uniformName + ";\n";
        userDefinedUniforms.uniformDefinitions += uniformName + " = " + "texture2D(" + uniformTextureName + " , vec2(spriteIndex, 0.5))." + glslSwizzle + ";\n";

        return userDefinedUniforms;
      }, this), userDefinedUniforms);


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
        userDefinedUniforms.privateUniformTextureDeclarations,

        // Public versions of user defined uniforms.
        userDefinedUniforms.publicUniformDeclarations,

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
            userDefinedUniforms.uniformDefinitions,

        //  Set fragment coordinate in respect to position within sprite bounds.
        "   vec2 fragCoord = gl_FragCoord.xy - _spriteBounds.xy;",
        //  Call user defined fragment function, setting outColor on return.
        "   vec4 outColor;",
        "   mainImage(outColor, fragCoord);",

        //  Multiply alpha by original spriteIndexData's fourth value."
        //  this will be 0 for texels not within any 'sprite' area."
        "   outColor.a = outColor.a * spriteAlpha;",
        "   gl_FragColor = outColor;",
        "}"
      ];

      return fragmentSrc.join("\n");
    }

    function _uniformTextureNameForUniformName (uniformName) {
      return "_" + uniformName + "Texture";
    }

    function _build (texts, ratio, sampleAccuracy) {
      var buildMapper,
          buildTextsTexture,
          buildIndicesTexture,
          buildBoundsTexture,
          buildActions;

      this._texts = texts;

      buildMapper = _.bind(function (ratio) {
        return _.bind(function (next) {
          this._mapper.on("build", function () {
            next();
          });
          this._mapper.build(this._texts, ratio);
        }, this);
      }, this);

      buildTextsTexture = _.bind(function (ratio) {
        return _.bind(function (next) {
          this._textsTexture = new Blotter._TextsTextureProvider(this._mapper, ratio);
          this._textsTexture.on("build", function () {
            next();
          });
          this._textsTexture.build();
        }, this);
      }, this);

      buildIndicesTexture = _.bind(function (sampleAccuracy) {
        return _.bind(function (next) {
          this._indicesTexture = new Blotter._IndicesDataTextureProvider(this._mapper, sampleAccuracy);
          this._indicesTexture.on("build", function () {
            next();
          });
          this._indicesTexture.build();
        }, this);
      }, this);

      buildBoundsTexture = _.bind(function () {
        return _.bind(function (next) {
          this._boundsTexture = new Blotter._BoundsDataTextureProvider(this._mapper);
          this._boundsTexture.on("build", function () {
            next();
          });
          this._boundsTexture.build();
        }, this);
      }, this);

      buildActions = [
        buildMapper(ratio),
        buildTextsTexture(ratio),
        buildIndicesTexture(sampleAccuracy),
        buildBoundsTexture()
      ];

      _(buildActions).reduceRight(_.wrap, _.bind(function () {
        this.width = this._mapper.width * ratio;
        this.height = this._mapper.height * ratio;

        _setTextureUniformsForUniforms.call(this, this._texts.length);

        _buildMaterialUniforms.call(this);
        _buildThreeMaterial.call(this);

        this.trigger("build");
      }, this))();
    }

    function _setTextureUniformsForUniforms (textsLength) {
      _.each(this.uniforms, _.bind(function (uniformObject, uniformName) {
        var data = new Float32Array(textsLength * 4);
        uniformObject._textureData = data;
        uniformObject._texture = new THREE.DataTexture(data, textsLength, 1, THREE.RGBAFormat, THREE.FloatType);
      }, this));
    }

    function _buildMaterialUniforms () {
      this._materialUniforms = {
        _uSampler              : { type: "t" , value: this._textsTexture.texture },
        _uCanvasResolution     : { type: "2f", value: [this.width, this.height] },
        _uSpriteIndicesTexture : { type: "t" , value: this._indicesTexture.texture },
        _uSpriteBoundsTexture  : { type: "t" , value: this._boundsTexture.texture }
      };

      _.each(this.uniforms, _.bind(function (uniformObject, uniformName) {
        this._materialUniforms[_uniformTextureNameForUniformName.call(this, uniformName)] = {
          value : uniformObject._texture,
          type  : "t"
        };
      }, this));
    }

    function _buildThreeMaterial () {
      this.threeMaterial = new THREE.ShaderMaterial({
        vertexShader   : _vertexSrc.call(this),
        fragmentShader : _fragmentSrc.call(this),
        uniforms       : this._materialUniforms
      });

      this.threeMaterial.depthTest = false;
      this.threeMaterial.depthWrite = false;
      this.threeMaterial.premultipliedAlpha = false;
    }

    function _update () {
      this.trigger("update");
    }

    return {

      constructor : Blotter.Material,

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get needsUpdate () { }, // jshint

      build : function (texts, ratio, sampleAccuracy) {
        this.mainImage = this.mainImage || _defaultMainImageSrc.call(this);
        this.uniforms = Blotter._UniformUtils.extractValidUniforms(this.uniforms);

        _build.call(this, texts, ratio, sampleAccuracy);
      },

      boundsFor : function (text) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");
        return this._mapper.boundsFor(text, true);
      },

      dataIndexFor : function (text) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");
        return _.indexOf(this._texts, text);
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
