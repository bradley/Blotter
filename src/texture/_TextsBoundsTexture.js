// Create a Data Texture holding the boundaries (x/y offset and w/h) that should be available to any given texel for any given text.

var blotter_TextsBoundsTexture = function (textsTexture, pixelRatio) {
  this.init(textsTexture, pixelRatio);
}

blotter_TextsBoundsTexture.prototype = (function () {

  function _spriteBounds (completion) {
    var self = this,
        data = new Float32Array(this.textsTexture.texts.length * 4);

    setTimeout(function() {
      for (var i = 0; i < self.textsTexture.texts.length; i++) {
        var text = self.textsTexture.texts[i],
            bounds = self.textsTexture.boundsFor(text);

        data[4*i]   = bounds.fit.x * self.pixelRatio;                                                  // x
        data[4*i+1] = (self.height * self.pixelRatio) - ((bounds.fit.y + bounds.h) * self.pixelRatio); // y
        data[4*i+2] = bounds.w * self.pixelRatio;                                                      // w
        data[4*i+3] = bounds.h * self.pixelRatio;                                                      // h
      };
      completion(data);
    }, 1);
  }

  return {

    constructor : blotter_TextsBoundsTexture,

    init : function (textsTexture, pixelRatio) {
      this.textsTexture = textsTexture;
      this.pixelRatio = pixelRatio || 1;
      this.width = this.textsTexture.width;
      this.height = this.textsTexture.height;
    },

    build : function (callback) {
      var self = this;

      _spriteBounds.call(this, function(spriteData) {
        var texture = new THREE.DataTexture(spriteData, self.textsTexture.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
        texture.needsUpdate = true;
        callback(texture);
      });
    }
  }
})();
