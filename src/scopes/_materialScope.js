(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._MaterialScope = function (text) {
    this.text = text;
    
    this.uniforms = {};

    this.needsUpdate = true;
  };

  Blotter._MaterialScope.prototype = (function () {

    function _buildUniformInterface () {
      var self = this;

      // Reset uniforms for this scope
      self.uniforms = {};

      function buildUniformInterface (uniformName) {
        var uniform = self.material.uniforms[uniformName];

        self.uniforms[uniformName] = {
          _type : uniform.type,
          _value : uniform.value,

          get type () {
            return this._type;
          },

          set type (v) {
  // ### - messaging
            Blotter._Messaging.logError("Blotter._MaterialScope", "uniform types may not be updated");
          },

          get value () {
            return this._value;
          },

          set value (v) {
            if (!Blotter._UniformUtils.validValueForUniformType(this._type, v)) {
  // ### - messaging
              Blotter._Messaging.logError("Blotter._MaterialScope", "uniform value not valid for uniform type: " + this._type);
              return;
            }
            this._value = v;
            _updateTextureDataForUniformName.call(self, uniformName);
          }
        };

        _updateTextureDataForUniformName.call(self, uniformName);
      }

      for (var uniformName in this.material.uniforms) {
        buildUniformInterface(uniformName);
      }
    }

    function _updateTextureDataForUniformName (uniformName) {
      var uniform = this.uniforms[uniformName],
          data = this.material.dataTextureDataForUniformName(uniformName),
          i = this.material.textureDataIndexForText(this.text);

      if (i >= 0) {
        if (uniform.type == "1f") {
          data[4*i]   = uniform.value;    // x (r)
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }
        else if (uniform.type == "2f") {
          data[4*i]   = uniform.value[0]; // x (r)
          data[4*i+1] = uniform.value[1]; // y (g)
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }
        else if (uniform.type == "3f") {
          data[4*i]   = uniform.value[0]; // x (r)
          data[4*i+1] = uniform.value[1]; // y (g)
          data[4*i+2] = uniform.value[2]; // z (b)
          data[4*i+3] = 0.0;
        }
        else if (uniform.type == "4f") {
          data[4*i]   = uniform.value[0]; // x (r)
          data[4*i+1] = uniform.value[1]; // y (g)
          data[4*i+2] = uniform.value[2]; // z (b)
          data[4*i+3] = uniform.value[3]; // w (a)
        }
        else {
          data[4*i]   = 0.0;
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }

        materialUniform.dataTextureForUniformName().needsUpdate = true;
      }
    }

    function _update () {
      _buildUniformInterface.call(this);
    }

    return {

      constructor : Blotter._MaterialScope,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
