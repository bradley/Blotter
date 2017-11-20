(function(Blotter, _) {

  Blotter.UniformUtils = {

    // Uniform type values we accept for public uniforms

    UniformTypes : ["1f", "2f", "3f", "4f"],

    // Default uniforms (required) provided to all materials

    defaultUniforms : {
      uResolution : { type : "2f", value : [0.0, 0.0] }, // Resolution of individual text areas within mapping texture
      uGlobalTime : { type : "1f", value : 0.0 }, // The global time in seconds
      uTimeDelta : { type : "1f", value : 0.0 }, // The render time in seconds
      uBlendColor : { type : "4f", value : [1.0, 1.0, 1.0, 1.0] },
      uPixelRatio : { type : "1f", value : Blotter.CanvasUtils.pixelRatio } // The pixel ratio of the user's device
    },

    // Determine if value is valid for public uniform type

    validValueForUniformType : function (type, value) {
      var valid = false,
          isValid = function (element) {
            return !isNaN(element);
          };

      switch (type) {
        case "1f":
          valid = !isNaN(value) && [value].every(isValid);
          break;

        case "2f":
          valid = _.isArray(value) && value.length == 2 && value.every(isValid);
          break;

        case "3f":
          valid = _.isArray(value) && value.length == 3 && value.every(isValid);
          break;

        case "4f":
          valid = _.isArray(value) && value.length == 4 && value.every(isValid);
          break;

        default:
          break;
      }

      return valid;
    },

    glslDataTypeForUniformType : function (type) {
      var dataType;
      switch (type) {
        case "1f":
          dataType = "float";
          break;

        case "2f":
          dataType = "vec2";
          break;

        case "3f":
          dataType = "vec3";
          break;

        case "4f":
          dataType = "vec4";
          break;

        default:
          break;
      }

      return dataType;
    },

    fullSwizzleStringForUniformType : function (type) {
      var swizzleString;

      switch (type) {
        case "1f":
          swizzleString = "x";
          break;

        case "2f":
          swizzleString = "xy";
          break;

        case "3f":
          swizzleString = "xyz";
          break;

        case "4f":
          swizzleString = "xyzw";
          break;

        default:
          break;
      }

      return swizzleString;
    },

    // Given an object containing uniform descriptions, return an object containing only valid uniforms based on the uniform's type and value

    extractValidUniforms : function (uniforms) {
      uniforms = uniforms || {};
      return _.reduce(uniforms, function (memo, uniformDescription, uniformName) {
        if (Blotter.UniformUtils.UniformTypes.indexOf(uniformDescription.type) == -1) {
          Blotter.Messaging.logError("Blotter.UniformUtils", "extractValidUniforms", "uniforms must be one of type: " +
            Blotter.UniformUtils.UniformTypes.join(", "));
          return memo;
        }

        if (!Blotter.UniformUtils.validValueForUniformType(uniformDescription.type, uniformDescription.value)) {
          Blotter.Messaging.logError("Blotter.UniformUtils", "extractValidUniforms", "uniform value for " + uniformName + " is incorrect for type: " + uniformDescription.type);
          return memo;
        }

        memo[uniformName] = _.pick(uniformDescription, "type", "value");
        return memo;
      }, {});
    },

    ensureHasRequiredDefaultUniforms : function (uniforms, domain, method) {
      if (!(Blotter.UniformUtils.hasRequiredDefaultUniforms(uniforms))) {
        this.logError(domain, method, "uniforms object is missing required default uniforms defined in Blotter.UniformUtils.defaultUniforms");
        return;
      }
    },

    hasRequiredDefaultUniforms : function (uniforms) {
      var missingKeys = _.difference(_.allKeys(Blotter.UniformUtils.defaultUniforms), _.allKeys(uniforms));

      return !!!missingKeys.length;
    }

  };

})(
  this.Blotter, this._
);
