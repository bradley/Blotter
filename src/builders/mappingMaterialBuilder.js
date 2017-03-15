(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

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

    function _fragmentSrc (uniforms, mainImageSrc) {
      var fragmentSrc,
          userUniforms = {
            // Strings of sampler2D declarations for each user defined and default uniform texture.
            privateUniformTextureDeclarations : "",
            // Strings of uniform declarations for each publicly facing version of each user defined and default uniform.
            publicUniformDeclarations         : "",
            // Strings of uniform definitions for each publicly facing version of each user defined and default uniform.
            uniformDefinitions                : ""
          };

      _.reduce(uniforms, function (userUniforms, uniformObject, uniformName) {
        var uniformTextureName = _userUniformDataTextureNameForUniformName(uniformName),
            glslSwizzle = Blotter.UniformUtils.fullSwizzleStringForUniformType(uniformObject.userUniform.type),
            glslDataType = Blotter.UniformUtils.glslDataTypeForUniformType(uniformObject.userUniform.type);

        userUniforms.privateUniformTextureDeclarations += "uniform sampler2D " + uniformTextureName + ";\n";
        userUniforms.publicUniformDeclarations += glslDataType + " " + uniformName + ";\n";
        userUniforms.uniformDefinitions += "   " + uniformName + " = " + "texture2D(" + uniformTextureName + " , vec2(textIndex, 0.5))." + glslSwizzle + ";\n";

        return userUniforms;
      }, userUniforms);

      fragmentSrc = [

        "precision highp float;",

        // Private blotter defined uniforms.
        "uniform sampler2D _uSampler;",
        "uniform vec2 _uCanvasResolution;",
        "uniform sampler2D _uTextIndicesTexture;",
        "uniform sampler2D _uTextBoundsTexture;",

        // Private texCoord and bounds information.
        "varying vec2 _vTexCoord;",
        "vec4 _textBounds;",

        // Private versions of user defined and default uniform declarations
        userUniforms.privateUniformTextureDeclarations,

        // Public versions of user defined and default uniform declarations
        userUniforms.publicUniformDeclarations,





// MOVE OUT LIBRARY CODE. INCLUDE HERE.
        "float round(float n) {",
        "  return sign(n) * floor(abs(n) + 0.5);",
        "}",

        // Public helper function used by user programs to retrieve texel color information within the bounds of
        // any given text text. This is to be used instead of `texture2D`.
        "vec4 textTexture(vec2 coord) {",
        "   vec2 adjustedFragCoord = _textBounds.xy + vec2((_textBounds.z * coord.x), (_textBounds.w * coord.y));",
        "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;",

        //  If adjustedFragCoord falls outside the bounds of the current texel's text, return `vec4(0.0)`.
        "   if (adjustedFragCoord.x < _textBounds.x ||",
        "       adjustedFragCoord.x > _textBounds.x + _textBounds.z ||",
        "       adjustedFragCoord.y < _textBounds.y ||",
        "       adjustedFragCoord.y > _textBounds.y + _textBounds.w) {",
        "     return vec4(0.0);",
        "   }",

        "   return texture2D(_uSampler, uv);",
        "}",

        "// Returns the resulting blend color by blending a top color over a base color",
        "highp vec4 normalBlend(highp vec4 topColor, highp vec4 baseColor) {",
        "  highp vec4 blend = vec4(0.0);",

        "  // HACK",
        "  // Cant divide by 0 (see the 'else' alpha) and after a lot of attempts",
        "  // this simply seems like the only solution Im going to be able to come up with to get alpha back.",
        "  if (baseColor.a == 1.0) {",
        "    baseColor.a = 0.9999999;",
        "  };",

        "  if (topColor.a >= 1.0) {",
        "    blend.a = topColor.a;",
        "    blend.r = topColor.r;",
        "    blend.g = topColor.g;",
        "    blend.b = topColor.b;",
        "  } else if (topColor.a == 0.0) {",
        "    blend.a = baseColor.a;",
        "    blend.r = baseColor.r;",
        "    blend.g = baseColor.g;",
        "    blend.b = baseColor.b;",
        "  } else {",
        "    blend.a = 1.0 - (1.0 - topColor.a) * (1.0 - baseColor.a); // alpha",
        "    blend.r = (topColor.r * topColor.a / blend.a) + (baseColor.r * baseColor.a * (1.0 - topColor.a) / blend.a);",
        "    blend.g = (topColor.g * topColor.a / blend.a) + (baseColor.g * baseColor.a * (1.0 - topColor.a) / blend.a);",
        "    blend.b = (topColor.b * topColor.a / blend.a) + (baseColor.b * baseColor.a * (1.0 - topColor.a) / blend.a);",
        "  }",

        "  return blend;",
        "}",

        "// Returns a vec4 representing the original top color that would have been needed to blend",
        "//  against a passed in base color in order to result in the passed in blend color.",
        "highp vec4 normalUnblend(highp vec4 blendColor, highp vec4 baseColor) {",
        "  highp vec4 unblend = vec4(0.0);",

        "  // HACKY",
        "  // Cant divide by 0 (see alpha) and after a lot of attempts",
        "  // this simply seems like the only solution Im going to be able to come up with to get alpha back.",
        "  if (baseColor.a == 1.0) {",
        "    baseColor.a = 0.9999999;",
        "  }",

        "  unblend.a = 1.0 - ((1.0 - blendColor.a) / (1.0 - baseColor.a));",
        "  unblend.a = round(100.0 * unblend.a) / 100.0;",

        "  if (unblend.a >= 1.0) {",
        "    unblend.r = blendColor.r;",
        "    unblend.g = blendColor.g;",
        "    unblend.b = blendColor.b;",
        "  } else if (unblend.a == 0.0) {",
        "    unblend.r = baseColor.r;",
        "    unblend.g = baseColor.g;",
        "    unblend.b = baseColor.b;",
        "  } else {",
        "    unblend.r = (blendColor.r - (baseColor.r * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);",
        "    unblend.g = (blendColor.g - (baseColor.g * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);",
        "    unblend.b = (blendColor.b - (baseColor.b * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);",
        "  }",

        "  return unblend;",
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
        userUniforms.uniformDefinitions,
        "   uResolution = _textBounds.zw;",
        "   uAspect = _textBounds.z /_textBounds.w;",

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

    function _userUniformDataTextureNameForUniformName (uniformName) {
      return "_" + uniformName + "Texture";
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

    function _buildUserUniformDataTextureObjects (userUniforms, dataLength, completion) {
      Blotter.UniformUtils.ensureHasRequiredDefaultUniforms(userUniforms,
        "Blotter.MappingMaterialBuilder",
        "_buildUserUniformDataTextureObjects");

      userUniforms = Blotter.UniformUtils.extractValidUniforms(userUniforms);

      var userUniformDataTextureObjects = _.reduce(userUniforms, function (memo, userUniform, uniformName) {
        var data = new Float32Array(dataLength * 4);
        memo[uniformName] = {
          userUniform : userUniform,
          data : data,
          texture : new THREE.DataTexture(data, dataLength, 1, THREE.RGBAFormat, THREE.FloatType)
        };
        return memo;
      }, {});

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
      return _.reduce(userUniformDataObjects, function (memo, uniformDataObject, uniformName) {
        memo[_userUniformDataTextureNameForUniformName(uniformName)] = {
          type : "t",
          value : uniformDataObject.texture
        };
        return memo;
      }, {});
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
              threeMaterial = _getThreeMaterial(_vertexSrc(), _fragmentSrc(userUniformDataTextureObjects, material.mainImage), uniforms);

          completion(new Blotter.MappingMaterial(mapping, material, threeMaterial, userUniformDataTextureObjects));
        })();
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
