// Create a Data Texture holding the boundaries (x/y offset and w/h) that should be available to any given texel for any given text.

var blotter_TextsBoundsTexture = function (mapper, pixelRatio) {
  this.init(mapper, pixelRatio);
}

blotter_TextsBoundsTexture.prototype = (function () {

  function _spriteBounds (completion) {
    var self = this,
        data = new Float32Array(this.mapper.texts.length * 4);

    setTimeout(function() {
      for (var i = 0; i < self.mapper.texts.length; i++) {
        var text = self.mapper.texts[i],
            textSize = self.mapper.sizeForText(text);

        data[4*i] = textSize.fit.x * self.pixelRatio;                                                    // x
        data[4*i+1] = self.height * self.pixelRatio - ((textSize.fit.y + textSize.h) * self.pixelRatio); // y
        data[4*i+2] = (textSize.w) * self.pixelRatio;                                                    // w
        data[4*i+3] = (textSize.h) * self.pixelRatio;                                                    // h
      };
      completion(data);
    }, 1);
  }

  return {

    constructor : blotter_TextsBoundsTexture,

    init : function (mapper, pixelRatio) {
      this.mapper = mapper;
      this.pixelRatio = pixelRatio || 1;
      this.width = this.mapper.width;
      this.height = this.mapper.height;
    },

    build : function (callback) {
      var self = this;

      _spriteBounds.call(this, function(spriteData) {
        var texture = new THREE.DataTexture(spriteData, self.mapper.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
        texture.needsUpdate = true;
        callback(texture);
      });
    }
  }
})();
