var blotter_MaterialScope = function (text, material) {
  this.init(text, material);
}

blotter_MaterialScope.prototype = (function () {

  function _buildUniformInterface () {
    var self = this;
    for (var uniformName in this.material.uniforms) {
      (function(self, uniformName) {
        var uniform = self.material.uniforms[uniformName];

        self.uniforms[uniformName] = {
          _type : uniform.type,
          _value : uniform.value,

          get type () {
            return this._type;
          },

          set type (v) {
  // ### - messaging
            blotter_Messaging.logError("blotter_MaterialScope", "uniform types may not be updated");
          },

          get value () {
            return this._value;
          },

          set value (v) {
            if (!blotter_UniformUtils.validValueForUniformType(this._type, v)) {
  // ### - messaging
              blotter_Messaging.logError("blotter_MaterialScope", "uniform value not valid for uniform type: " + this._type);
              return;
            }
            this._value = v;
            _updateDataForUniformTextureData.call(self, uniformName);
          }
        }

        _updateDataForUniformTextureData.call(self, uniformName);
      })(this, uniformName);
    }
  }

  function _updateDataForUniformTextureData (uniformName) {
    var materialUniform = this.material.uniforms[uniformName],
        scopedUniform = this.uniforms[uniformName],
        data = materialUniform._textureData,
        i = this.dataIndex;

    if (i >= 0) {
      if (materialUniform.type == "1f") {
        data[4*i]   = scopedUniform._value; // x (r)
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
    this.dataIndex = this.material.dataIndexFor(this.text);
    _buildUniformInterface.call(this);
  }

  return {

    constructor : blotter_MaterialScope,

    set needsMaterialUpdate (value) {
      if (value === true) {
        _updateMaterial.call(this);
      }
    },

    init : function (text, material) {
      this.text = text;
      this.material = material;

      this.uniforms = {};
    }
  }
})();
