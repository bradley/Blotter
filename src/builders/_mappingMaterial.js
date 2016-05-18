(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._MappingMaterial = function(mapping, material, shaderMaterial, userUniformDataTextureObjects) {
    this.mapping = mapping;
    this.material = material;
    this.shaderMaterial = shaderMaterial;
    this.userUniformDataTextureObjects = userUniformDataTextureObjects;

    this.init.apply(this, arguments);
  };

  Blotter._MappingMaterial.prototype = (function() {

    function _getUniforms (userUniformDataTextureObjects) {
      return _.reduce(userUniformDataTextureObjects, function(memo, dataTextureObject, uniformName) {
        memo[uniformName] = dataTextureObject.userUniform;
        return memo;
      }, {});
    }

    return {

      constructor : Blotter._MappingMaterial,

      init : function (mapping, material, shaderMaterial, userUniformDataTextureObjects) {
        this.uniforms = _getUniforms(userUniformDataTextureObjects);
      },

      textureDataIndexForText : function (text) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");
        return _.indexOf(this.mapping.texts, text);
      },

      dataTextureForUniformName : function (uniformName) {
        var uniformDataObject = this.userUniformDataTextureObjects[uniformName],
            texture;

        if (uniformDataObject) {
          texture = uniformDataObject.texture;
        }

        return textureData;
      },

      dataTextureDataForUniformName : function (uniformName) {
        var uniformDataObject = this.userUniformDataTextureObjects[uniformName],
            textureData;

        if (uniformDataObject) {
          textureData = uniformDataObject.data;
        }

        return textureData;
      },
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
