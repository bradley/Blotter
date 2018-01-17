import { extend, reduce, each } from "underscore";
import EventEmitter from "wolfy87-eventemitter";
import { Messaging } from "../extras/core/messaging";
import { Text } from "../texts/text";
import { UniformUtils } from "../extras/uniformUtils";


var MappingMaterial = function(mapping, material, shaderMaterial, userUniformDataTextureObjects) {
  this.mapping = mapping;
  this.material = material;
  this.shaderMaterial = shaderMaterial;

  this._userUniformDataTextureObjects = userUniformDataTextureObjects;

  this.init.apply(this, arguments);
};

MappingMaterial.prototype = (function() {

  function _setValueAtIndexInDataTextureObject (value, i, data, userUniform) {
    var type = userUniform.type;

    if (type == "1f") {
      data[4*i]   = value;    // x (r)
      data[4*i+1] = 0.0;
      data[4*i+2] = 0.0;
      data[4*i+3] = 0.0;
    } else if (type == "2f") {
      data[4*i]   = value[0]; // x (r)
      data[4*i+1] = value[1]; // y (g)
      data[4*i+2] = 0.0;
      data[4*i+3] = 0.0;
    } else if (type == "3f") {
      data[4*i]   = value[0]; // x (r)
      data[4*i+1] = value[1]; // y (g)
      data[4*i+2] = value[2]; // z (b)
      data[4*i+3] = 0.0;
    } else if (type == "4f") {
      data[4*i]   = value[0]; // x (r)
      data[4*i+1] = value[1]; // y (g)
      data[4*i+2] = value[2]; // z (b)
      data[4*i+3] = value[3]; // w (a)
    } else {
      data[4*i]   = 0.0;
      data[4*i+1] = 0.0;
      data[4*i+2] = 0.0;
      data[4*i+3] = 0.0;
    }
  }

  function _getUniformInterfaceForDataTextureObject (dataTextureObject) {
    var uniformInterface = {
      _type : dataTextureObject.userUniform.type,
      _value : dataTextureObject.userUniform.value,

      get value () {
        return this._value;
      },

      set value (v) {
        if (!UniformUtils.validValueForUniformType(this._type, v)) {
          Messaging.logError("Blotter.MappingMaterial", false, "uniform value not valid for uniform type: " + this._type);
          return;
        }
        this._value = v;

        this.trigger("update");
      }
    };

    extend(uniformInterface, EventEmitter.prototype);

    return uniformInterface;
  }

  function _getTextUniformInterface (mapping, userUniformDataTextureObjects) {
    return reduce(mapping.texts, function (memo, text, textIndex) {
      memo[text.id] = reduce(userUniformDataTextureObjects.userUniforms, function (memo, dataTextureObject, uniformName) {
        var uniformIndex = dataTextureObject.position + textIndex;

        memo[uniformName] = _getUniformInterfaceForDataTextureObject(dataTextureObject);

        memo[uniformName].on("update", function () {
          _setValueAtIndexInDataTextureObject(
            memo[uniformName].value,
            uniformIndex,
            userUniformDataTextureObjects.data,
            dataTextureObject.userUniform
          );

          userUniformDataTextureObjects.texture.needsUpdate = true;
        });

        memo[uniformName].value = dataTextureObject.userUniform.value;

        return memo;
      }, {});

      return memo;
    }, {});
  }

  function _getUniformInterface (mapping, userUniformDataTextureObjects, textUniformInterface) {
    return reduce(userUniformDataTextureObjects.userUniforms, function (memo, dataTextureObject, uniformName) {
      memo[uniformName] = _getUniformInterfaceForDataTextureObject(dataTextureObject);

      memo[uniformName].on("update", function () {
        each(mapping.texts, function (text) {
          textUniformInterface[text.id][uniformName].value = memo[uniformName].value;
        });

        userUniformDataTextureObjects.texture.needsUpdate = true;
      });

      return memo;
    }, {});
  }

  return {

    constructor : MappingMaterial,

    get uniforms () {
      return this.material.uniforms;
    },

    get mainImage () {
      return this.material.mainImage;
    },

    get width () {
      return this.mapping.width;
    },

    get height () {
      return this.mapping.height;
    },

    get ratio () {
      return this.mapping.ratio;
    },

    init : function (mapping, material, shaderMaterial, userUniformDataTextureObjects) {
      this.textUniformInterface = _getTextUniformInterface(this.mapping, this._userUniformDataTextureObjects);
      this.uniformInterface = _getUniformInterface(this.mapping, this._userUniformDataTextureObjects, this.textUniformInterface);
    },

    boundsForText : function (text) {
      Messaging.ensureInstanceOf(text, Text, "Blotter.Text", "Blotter.MappingMaterial", "boundsForText");
      return this.mapping.boundsForText(text);
    }
  };
})();


export { MappingMaterial };
