// Create a Data Texture the size of our text map wherein every texel holds the index of text whose boundaries contain the given texel's position.

var blotter_TextsIndicesTexture = function (mapper, fidelityModifier) {
  this.init(mapper, fidelityModifier);
}

blotter_TextsIndicesTexture.prototype = (function () {

  function _textsIndices (completion) {
    var self = this,
        height = this.mapper.height * this.fidelityModifier,
        width = this.mapper.width * this.fidelityModifier,
        points = new Float32Array((height * width) * 4),
        widthStepModifier = width % 1,
        indicesOffset = (1 / this.mapper.texts.length) / 2;

    setTimeout(function() {
      for (var i = 1; i < points.length / 4; i++) {

        var y = Math.ceil(i / (width - widthStepModifier)),
            x = i - ((width - widthStepModifier) * (y - 1)),
            referenceIndex = 0.0,
            bg = 0.0,
            a = 0.0;

        for (var ki = 0; ki < self.mapper.texts.length; ki++) {
          var text = self.mapper.texts[ki],
              textSize = self.mapper.sizeForText(text),
              fitY = textSize.fit.y * self.fidelityModifier,
              fitX = textSize.fit.x * self.fidelityModifier,
              vH = textSize.h * self.fidelityModifier,
              vW = textSize.w * self.fidelityModifier;

          // If x and y are within the fit bounds of the text space within our mapper.
          if (y >= fitY &&
              y <= fitY + vH &&
              x >= fitX &&
              x <= fitX + vW) {
            referenceIndex = (ki / self.mapper.texts.length) + indicesOffset;
            a = 1.0;
            break;
          }
        }

        var index = i - 1;
        points[4*index+0] = referenceIndex;
        points[4*index+1] = bg;
        points[4*index+2] = bg;
        points[4*index+3] = a;
      }

      completion(points);
    }, 1);
  }

  return {

    constructor : blotter_TextsIndicesTexture,

    init : function (mapper, fidelityModifier) {
      this.mapper = mapper;
      this.fidelityModifier = fidelityModifier || 0.5;
    },

    build : function (callback) {
      var self = this;

      _textsIndices.call(this, function(dataPoints) {
        var texture = new THREE.DataTexture(dataPoints, self.mapper.width * self.fidelityModifier, self.mapper.height * self.fidelityModifier, THREE.RGBAFormat, THREE.FloatType);
        texture.flipY = true;
        texture.needsUpdate = true;
        callback(texture);
      });
    }
  }
})();
