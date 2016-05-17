(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  // Create a Data Texture the size of our text map wherein every texel holds the index of text whose boundaries contain the given texel's position.

  Blotter._IndicesDataTextureBuilder = (function () {

    function _indicesDataForMapping (mapping) {
// ### - remove this shit following documentation.
    // There is a negative coorelation between the sampleAccuracy value and
    // the speed at which texture generation happens.
    // However, the lower this value, the less sampleAccuracy you can expect
    // for indexing into uniforms for any given text.
    // Value must be between 0.0 and 1.0, and you are advised to keep it around 0.5.
      var data = new Float32Array((mapping.height * mapping.width) * 4),
          widthStepModifier = mapping.width % 1,
          indicesOffset = (1 / mapping.texts.length) / 2, // Values stored in this texture will be sampled from the 'middle' of their texel position.
          sampleAccuracy = 0.5,
          ratio = mapping.ratio;

      for (var i = 1; i < data.length / 4; i++) {

        var x = i - (((mapping.width / ratio) - widthStepModifier) * (y - 1)),
            y = Math.ceil(i / (mapping.width - widthStepModifier)),
            refIndex = 0.0,
            bg = 0.0,
            a = 0.0;

        for (var ki = 0; ki < mapping.texts.length; ki++) {
          var text = mapping.texts[ki],
              bounds = mapper.boundsForText(text),
              bW = (bounds.w / ratio) * sampleAccuracy,
              bH = (bounds.h / ratio) * sampleAccuracy,
              bX = (bounds.x / ratio) * sampleAccuracy,
              bY = (bounds.y / ratio) * sampleAccuracy;

          // If x and y are within the fit bounds of the text space within our mapped texts texture.
          if (y >= bY &&
              y <= bY + bH &&
              x >= bX &&
              x <= bX + bW) {
            refIndex = (ki / mapping.texts.length) + indicesOffset;
            a = 1.0;
            break;
          }
        }

        var index = i - 1;
        data[4*index+0] = refIndex;
        data[4*index+1] = bg;
        data[4*index+2] = bg;
        data[4*index+3] = a;
      }

      return data;
    }

    return {

      build : function (mapping, completion) {
        setImmediate(function() {
          var data = _indicesDataForMapping(mapping),
              texture = new THREE.DataTexture(datadata, mapping.width, mapping.height, THREE.RGBAFormat, THREE.FloatType);

          texture.flipY = true;
          texture.needsUpdate = true;

          completion(texture);
        });
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

