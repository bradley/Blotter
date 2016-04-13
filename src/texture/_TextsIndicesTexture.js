// Create a Data Texture the size of our text map wherein every texel holds the index of text whose boundaries contain the given texel's position.

var blotter_TextsIndicesTexture = function (textsTexture, sampleAccuracy) {
  this.init(textsTexture, sampleAccuracy);
}

blotter_TextsIndicesTexture.prototype = (function () {

  function _textsIndices (completion) {
    var self = this,
        height = this.textsTexture.height * this.sampleAccuracy,
        width = this.textsTexture.width * this.sampleAccuracy,
        points = new Float32Array((height * width) * 4),
        widthStepModifier = width % 1,
        indicesOffset = (1 / this.textsTexture.texts.length) / 2; // Values stored in this texture will be sampled from the 'middle' of their texel position.

    setTimeout(function() {
      for (var i = 1; i < points.length / 4; i++) {

        var y = Math.ceil(i / (width - widthStepModifier)),
            x = i - ((width - widthStepModifier) * (y - 1)),
            lookupIndex = 0.0,
            bg = 0.0,
            a = 0.0;

        for (var ki = 0; ki < self.textsTexture.texts.length; ki++) {
          var text = self.textsTexture.texts[ki],
              bounds = self.textsTexture.boundsFor(text),
              fitY = bounds.fit.y * self.sampleAccuracy,
              fitX = bounds.fit.x * self.sampleAccuracy,
              vH = bounds.h * self.sampleAccuracy,
              vW = bounds.w * self.sampleAccuracy;

          // If x and y are within the fit bounds of the text space within our textsTexture.
          if (y >= fitY &&
              y <= fitY + vH &&
              x >= fitX &&
              x <= fitX + vW) {
            lookupIndex = (ki / self.textsTexture.texts.length) + indicesOffset;
            a = 1.0;
            break;
          }
        }

        var index = i - 1;
        points[4*index+0] = lookupIndex;
        points[4*index+1] = bg;
        points[4*index+2] = bg;
        points[4*index+3] = a;
      }

      completion(points);
    });
  }

  return {

    constructor : blotter_TextsIndicesTexture,

    init : function (textsTexture, sampleAccuracy) {
      this.textsTexture = textsTexture;
      this.sampleAccuracy = sampleAccuracy || 0.5;
    },

    build : function (callback) {
      var self = this;

      _textsIndices.call(this, function(dataPoints) {
        var texture = new THREE.DataTexture(dataPoints, self.textsTexture.width * self.sampleAccuracy, self.textsTexture.height * self.sampleAccuracy, THREE.RGBAFormat, THREE.FloatType);
        texture.flipY = true;
        texture.needsUpdate = true;
        callback(texture);
      });
    }
  }
})();
