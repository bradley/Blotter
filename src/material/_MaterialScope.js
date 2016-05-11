(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._MaterialScope = function (text, material) {
    this._dataIndex = -1;

    this.text = text;
    this.material = material;
    this.uniforms = {};
  };

  Blotter._MaterialScope.prototype = (function () {

    function _buildUniformInterface () {
      var self = this;

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
            _updateDataForUniformTextureData.call(self, uniformName);
          }
        };

        _updateDataForUniformTextureData.call(self, uniformName);
      }

      for (var uniformName in this.material.uniforms) {
        buildUniformInterface(uniformName);
      }
    }

    function _updateDataForUniformTextureData (uniformName) {
      var materialUniform = this.material.uniforms[uniformName],
          scopedUniform = this.uniforms[uniformName],
          data = materialUniform._textureData,
          i = this._dataIndex;

      if (i >= 0) {
        if (materialUniform.type == "1f") {
          data[4*i]   = scopedUniform._value;    // x (r)
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }
        else if (materialUniform.type == "2f") {
          data[4*i]   = scopedUniform._value[0]; // x (r)
          data[4*i+1] = scopedUniform._value[1]; // y (g)
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }
        else if (materialUniform.type == "3f") {
          data[4*i]   = scopedUniform._value[0]; // x (r)
          data[4*i+1] = scopedUniform._value[1]; // y (g)
          data[4*i+2] = scopedUniform._value[2]; // z (b)
          data[4*i+3] = 0.0;
        }
        else if (materialUniform.type == "4f") {
          data[4*i]   = scopedUniform._value[0]; // x (r)
          data[4*i+1] = scopedUniform._value[1]; // y (g)
          data[4*i+2] = scopedUniform._value[2]; // z (b)
          data[4*i+3] = scopedUniform._value[3]; // w (a)
        }
        else {
          data[4*i]   = 0.0;
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }

        materialUniform._texture.needsUpdate = true;
      }
    }

    function _updateMaterial () {
      this._dataIndex = this.material.dataIndexFor(this.text);
      _buildUniformInterface.call(this);
    }

    return {

      constructor : Blotter._MaterialScope,

      set needsMaterialUpdate (value) {
        if (value === true) {
          _updateMaterial.call(this);
        }
      },

      get needsMaterialUpdate () { }, // jshint
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
