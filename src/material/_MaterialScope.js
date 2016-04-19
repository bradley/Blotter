var blotter_MaterialScope = function (text, material) {
  this.init(text, material);
}

blotter_MaterialScope.prototype = (function () {

  function _buildUniformInterface () {
    var self = this;
    this.uniforms = {};
    for (var uniformName in this.material.uniforms) {
      var uniform = this.material.uniforms[uniformName];

      this.uniforms[uniformName] = {
        _name : uniformName,
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
          _updateDataForUniformTextureData.call(self, this._name);
        }
      }

      _updateDataForUniformTextureData.call(this, uniformName);
    }
  }

  function _updateDataForUniformTextureData (uniformName) {
    var materialUniform = this.material.uniforms[uniformName],
        scopedUniform = this.uniforms[uniformName],
        data = materialUniform._textureData,
        i = this.textIndex;

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

  return {

    constructor : blotter_MaterialScope,

    init : function (text, material) {
      this.text = text;
      this.material = material;

// ### - this should be passed in. not a concern of this object.
      this.textIndex = this.material.textsTexture.indexFor(this.text);

      _buildUniformInterface.call(this);
    }
  }
})();
