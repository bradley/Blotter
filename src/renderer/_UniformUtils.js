var blotter_UniformUtils = {

	// Uniform type values we accept for user defined uniforms.

	UniformTypes : ["1f", "2f", "3f", "4f"],

	// Determine if value is valid for user defined uniform type.

	validValueForUniformType : function (type, value) {
	  var valid = false,
				isValid = function (element, index, array) {
				  return !isNaN(element);
				};

	  switch (type) {
	    case '1f':
	      valid = !isNaN(value) && [value].every(isValid);
	      break;

	    case '2f':
	      valid = Array.isArray(value) && value.length == 2 && value.every(isValid);
	      break;

	    case '3f':
	      valid = Array.isArray(value) && value.length == 3 && value.every(isValid);
	      break;

	    case '4f':
	      valid = Array.isArray(value) && value.length == 4 && value.every(isValid);
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
	}

}
