(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.MappingMaterial = function(mapping, material, shaderMaterial, userUniformDataTextureObjects) {
    this.mapping = mapping;
    this.material = material;
    this.shaderMaterial = shaderMaterial;

    this._userUniformDataTextureObjects = userUniformDataTextureObjects;

    this.init.apply(this, arguments);
  };

  Blotter.MappingMaterial.prototype = (function() {

    function _setValueAtIndexInDataTextureObject (value, i, dataTextureObject) {
        var type = dataTextureObject.userUniform.type,
            data = dataTextureObject.data;

        if (!Blotter.UniformUtils.validValueForUniformType(type, value)) {
          // ### - messaging
          Blotter.Messaging.logError("Blotter.MappingMaterial", "uniform value not valid for uniform type: " + this._type);
          return;
        }

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

        dataTextureObject.texture.needsUpdate = true;
    }

    function _getUniformInterfaceForIndexAndDataTextureObject (index, dataTextureObject) {
      return {
        _type : dataTextureObject.userUniform.type,
        _value : dataTextureObject.userUniform.value,

        get type () {
          return this._type;
        },

        set type (v) {
          // ### - messaging
          Blotter.Messaging.logError("Blotter.MaterialScope", "uniform types may not be updated");
        },

        get value () {
          return this._value;
        },

        set value (v) {
          if (!Blotter.UniformUtils.validValueForUniformType(this._type, v)) {
            // ### - messaging
            Blotter.Messaging.logError("Blotter.MaterialScope", "uniform value not valid for uniform type: " + this._type);
            return;
          }
          this._value = v;

          _setValueAtIndexInDataTextureObject(v, index, dataTextureObject);
        }
      };
    }

    function _getUniformInterface (mapping, userUniformDataTextureObjects) {
      return _.reduce(mapping.texts, function (memo, text, i) {
        memo[text.id] = _.reduce(userUniformDataTextureObjects, function (memo, dataTextureObject, uniformName) {
          memo[uniformName] = _getUniformInterfaceForIndexAndDataTextureObject(i, dataTextureObject);
          memo[uniformName].value = dataTextureObject.userUniform.value;
          return memo;
        }, {});
        return memo;
      }, {});
    }

    return {

      constructor : Blotter.MappingMaterial,

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
        this._uniforms = _getUniformInterface(this.mapping, this._userUniformDataTextureObjects);
      },

      uniformsInterfaceForText : function (text) {
        return this._uniforms[text.id];
      },

      boundsForText : function (text) {
        // ### - messaging
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.MappingMaterial");
        return this.mapping.boundsForText(text);
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
