(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._UniformUtils = {

    // Uniform type values we accept for user defined uniforms

    UniformTypes : ["1f", "2f", "3f", "4f"],

    // Determine if value is valid for user defined uniform type

    validValueForUniformType : function (type, value) {
      var valid = false,
          isValid = function (element, _, _) {
            return !isNaN(element);
          };

      switch (type) {
        case '1f':
          valid = !isNaN(value) && [value].every(isValid);
          break;

        case '2f':
          valid = _.isArray(value) && value.length == 2 && value.every(isValid);
          break;

        case '3f':
          valid = _.isArray(value) && value.length == 3 && value.every(isValid);
          break;

        case '4f':
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
        case '1f':
          dataType = "float";
          break;

        case '2f':
          dataType = "vec2";
          break;

        case '3f':
          dataType = "vec3";
          break;

        case '4f':
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
        case '1f':
          swizzleString = "x";
          break;

        case '2f':
          swizzleString = "xy";
          break;

        case '3f':
          swizzleString = "xyz";
          break;

        case '4f':
          swizzleString = "xyzw";
          break;

        default:
          break;
      }

      return swizzleString;
    },

    // Given an object containing uniform descriptions, return an object containing only valid uniforms based on the uniform's type and value

    extractValidUniforms : function (uniforms, domain) {
      uniforms = uniforms || {};
      return _.reduce(uniforms, function (memo, uniformObject, uniformName) {
        if (Blotter._UniformUtils.UniformTypes.indexOf(uniformObject.type) == -1) {
  // ### - messaging
          Blotter._Messaging.logError(domain, "uniforms must be one of type: " +
            Blotter._UniformUtils.UniformTypes.join(", "));
          return memo;
        }

        if (!Blotter._UniformUtils.validValueForUniformType(uniformObject.type, uniformObject.value)) {
  // ### - messaging
          Blotter._Messaging.logError(domain, "uniform value for " + uniformName + " is incorrect for type: " + uniformObject.type);
          return memo;
        }

        memo[uniformName] = _.pick(uniformObject, "type", "value");
        return memo;
      }, {});
    }

  };

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);