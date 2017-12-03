(function(Blotter, _, THREE) {

  Blotter.MappingMaterialBuilder = (function() {

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

    function _fragmentSrc (userUniformDataTextureObjects, textsLength, mainImageSrc) {
      var fragmentSrc,
          userUniforms = {
            // Strings of uniform declarations for each publicly facing version of each user defined and default uniform.
            publicUniformDeclarations : "",
            // Strings of uniform definitions for each publicly facing version of each user defined and default uniform.
            publicUniformDefinitions : ""
          },
          halfPixel = ((1 / userUniformDataTextureObjects.data.length) / 2).toFixed(20),
          userUniformsTextureWidth = (userUniformDataTextureObjects.texture.image.width).toFixed(1);

      _.reduce(userUniformDataTextureObjects.userUniforms, function (userUniforms, uniformObject, uniformName) {
        var glslSwizzle = Blotter.UniformUtils.fullSwizzleStringForUniformType(uniformObject.userUniform.type),
            glslDataType = Blotter.UniformUtils.glslDataTypeForUniformType(uniformObject.userUniform.type);

        // This is super convoluted. Sorry. All user uniforms are passed in a single texture, where for each uniform
        //   there is a single rgba value per text. Within this texture data we need to be able to locate the position
        //   of any given text's value for the given uniform. The maths here use the `textIndex` value, a value
        //   sampled via the `indicesValueTexture`, to locate the text value for the given uniform, and then offsets that
        //   value by half a texel in the overall _userUniformsTexture
        var uniformSamplePosition = "((" + (uniformObject.position).toFixed(1) + " + ((textIndex - ((1.0 / " + textsLength.toFixed(1) + ") / 2.0)) * " + textsLength.toFixed(1) + ")) / " + userUniformsTextureWidth + ") + " + halfPixel;

        userUniforms.publicUniformDeclarations += glslDataType + " " + uniformName + ";\n";
        userUniforms.publicUniformDefinitions += "   " + uniformName + " = texture2D(_userUniformsTexture, vec2(" + uniformSamplePosition + ", 0.5))." + glslSwizzle + ";\n";

        return userUniforms;
      }, userUniforms);

      fragmentSrc = [

        Blotter.Assets.Shaders.Blending,

        Blotter.Assets.Shaders.TextTexture,

        // Private blotter defined uniforms.
        "uniform sampler2D _uSampler;",
        "uniform vec2 _uCanvasResolution;",
        "uniform sampler2D _uTextIndicesTexture;",
        "uniform sampler2D _uTextBoundsTexture;",

        // Private texCoord and bounds information.
        "varying vec2 _vTexCoord;",
        "vec4 _textBounds;",

        // Private versions of user defined and default uniform declarations
        "uniform sampler2D _userUniformsTexture;",

        // Public versions of user defined and default uniform declarations
        userUniforms.publicUniformDeclarations,

        "// Helper function used by user programs to retrieve texel color information within the bounds of",
        "// any given text. This is to be used instead of `texture2D` in the fragment sources for all Blotter materials.",
        "vec4 textTexture(vec2 coord) {",
        "   vec2 adjustedFragCoord = _textBounds.xy + vec2((_textBounds.z * coord.x), (_textBounds.w * coord.y));",
        "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;",

        "   //  If adjustedFragCoord falls outside the bounds of the current texel's text, return `vec4(0.0)`.",
        "   if (adjustedFragCoord.x < _textBounds.x ||",
        "       adjustedFragCoord.x > _textBounds.x + _textBounds.z ||",
        "       adjustedFragCoord.y < _textBounds.y ||",
        "       adjustedFragCoord.y > _textBounds.y + _textBounds.w) {",
        "     return vec4(0.0);",
        "   }",

        "   return texture2D(_uSampler, uv);",
        "}",

        "void mainImage(out vec4 mainImage, in vec2 fragCoord);",

        mainImageSrc,

        "void main(void) {",

        //  Retrieve text index and text alpha for text bounds in which texel is contained.
        "   vec4 textIndexData = texture2D(_uTextIndicesTexture, _vTexCoord);",
        "   float textIndex = textIndexData.r;",
        "   float textAlpha = textIndexData.a;",

        //  Make bounds for the current text globally visible.
        "   _textBounds = texture2D(_uTextBoundsTexture, vec2(textIndex, 0.5));",

        //  Set "uniform" values visible to user.
        userUniforms.publicUniformDefinitions,
        "   uResolution = _textBounds.zw;",

        //  Set fragment coordinate in respect to position within text bounds.
        "   vec2 fragCoord = gl_FragCoord.xy - _textBounds.xy;",
        //  Call user defined fragment function, setting outColor on return.
        "   vec4 outColor;",
        "   mainImage(outColor, fragCoord);",

        //  Multiply alpha by original textIndexData's fourth value."
        //  this will be 0 for texels not within any 'text' area."
        "   outColor.a = outColor.a * textAlpha;",
        "   gl_FragColor = outColor;",
        "}"

      ];

      return fragmentSrc.join("\n");
    }

    function _buildMappedTextsTexture (mapping, completion) {
      Blotter.TextTextureBuilder.build(mapping, function (texture) {
        completion(texture);
      });
    }

    function _buildMappingDataTextureObjects (mapping, completion) {
      var buildIndicesTexture,
          buildBoundsTexture,
          mappingDataTextureObjects = [],
          buildStages;

      buildIndicesTexture = function () {
        return function (next) {
          Blotter.IndicesDataTextureBuilder.build(mapping, function (texture) {
            mappingDataTextureObjects.push({
              uniformName : "_uTextIndicesTexture",
              texture : texture
            });
            next();
          });
        };
      };

      buildBoundsTexture = function () {
        return function (next) {
          Blotter.BoundsDataTextureBuilder.build(mapping, function (texture) {
            mappingDataTextureObjects.push({
              uniformName : "_uTextBoundsTexture",
              texture : texture
            });
            next();
          });
        };
      };

      buildStages = [
        buildIndicesTexture(),
        buildBoundsTexture()
      ];

      _(buildStages).reduceRight(_.wrap, function () {
        completion(mappingDataTextureObjects);
      })();
    }

    function _buildUserUniformDataTextureObjects (userUniforms, textsLength, completion) {
      Blotter.UniformUtils.ensureHasRequiredDefaultUniforms(userUniforms,
        "Blotter.MappingMaterialBuilder",
        "_buildUserUniformDataTextureObjects");

      userUniforms = Blotter.UniformUtils.extractValidUniforms(userUniforms);

      var uniformsDataLength = Object.keys(userUniforms).length * textsLength;
      var data = new Float32Array(uniformsDataLength * 4);
      var texture = new THREE.DataTexture(data, uniformsDataLength, 1, THREE.RGBAFormat, THREE.FloatType);

      var userUniformDataTextureObjects = {
        data : data,
        texture : texture,
        userUniforms : {}
      };

      _.reduce(userUniforms, function (memo, userUniform, uniformName) {
        var uniformPosition = Object.keys(userUniforms).indexOf(uniformName) * textsLength;

        memo.userUniforms[uniformName] = {
          userUniform : userUniform,
          position : uniformPosition
        };

        return memo;
      }, userUniformDataTextureObjects);

      completion(userUniformDataTextureObjects);
    }

    function _getUniformsForMappingDataTextureObjects (mappingDataTextureObjects) {
      return _.reduce(mappingDataTextureObjects, function (memo, mappingDataTextureObject) {
        memo[mappingDataTextureObject.uniformName] = {
          type : "t",
          value : mappingDataTextureObject.texture
        };
        return memo;
      }, {});
    }

    function _getUniformsForUserUniformDataObjects (userUniformDataObjects) {
      return {
        _userUniformsTexture: {
          type : "t",
          value : userUniformDataObjects.texture
        }
      };
    }

    function _getUniforms (width, height, mappedTextsTexture, mappingDataTextureObjects, userUniformDataTextureObjects) {
      var uniforms = {
        _uSampler : { type : "t", value : mappedTextsTexture },
        _uCanvasResolution : { type : "2f", value : [width, height] }
      };

      _.extend(uniforms, _getUniformsForMappingDataTextureObjects(mappingDataTextureObjects));
      _.extend(uniforms, _getUniformsForUserUniformDataObjects(userUniformDataTextureObjects));

      return uniforms;
    }

    function _getThreeMaterial (vertexSrc, fragmentSrc, uniforms) {
      var threeMaterial = new THREE.ShaderMaterial({
        vertexShader : vertexSrc,
        fragmentShader : fragmentSrc,
        uniforms : uniforms
      });

      threeMaterial.depthTest = false;
      threeMaterial.depthWrite = false;
      threeMaterial.premultipliedAlpha = false;

      return threeMaterial;
    }

    return {

      build : function (mapping, material, completion) {
        var buildMappedTextsTexture,
            buildMappingDataTextureObjects,
            buildUserUniformDataAndDataTextureObjects,
            mappedTextsTexture,
            mappingDataTextureObjects,
            userUniformDataAndDataTextureObjects,
            buildStages;

        buildMappedTextsTexture = function () {
          return function (next) {
            _buildMappedTextsTexture(mapping, function (texture) {
              mappedTextsTexture = texture;
              next();
            });
          };
        };

        buildMappingDataTextureObjects = function () {
          return function (next) {
            _buildMappingDataTextureObjects(mapping, function (objects) {
              mappingDataTextureObjects = objects;
              next();
            });
          };
        };

        buildUserUniformDataTextureObjects = function () {
          return function (next) {
            _buildUserUniformDataTextureObjects(material.uniforms, mapping.texts.length, function (objects) {
              userUniformDataTextureObjects = objects;
              next();
            });
          };
        };

        buildStages = [
          buildMappedTextsTexture(),
          buildMappingDataTextureObjects(),
          buildUserUniformDataTextureObjects()
        ];

        _(buildStages).reduceRight(_.wrap, function () {
          var uniforms = _getUniforms(
                mapping.width,
                mapping.height,
                mappedTextsTexture,
                mappingDataTextureObjects,
                userUniformDataTextureObjects
              ),
              userUniforms = _.omit(uniforms, "_uCanvasResolution", "_uSampler", "_uTextBoundsTexture", "_uTextIndicesTexture"),
              threeMaterial = _getThreeMaterial(_vertexSrc(), _fragmentSrc(userUniformDataTextureObjects, mapping.texts.length, material.mainImage), uniforms);

          completion(new Blotter.MappingMaterial(mapping, material, threeMaterial, userUniformDataTextureObjects));
        })();
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE
);
