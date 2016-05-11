(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  // Create a Data Texture the size of our text map wherein every texel holds the index of text whose boundaries contain the given texel's position.

  Blotter._TextsIndicesTexture = function (mapper, sampleAccuracy) {
    this._mapper = mapper;
    this._texts = mapper.texts;
    this._sampleAccuracy = sampleAccuracy;

    this._width = this._mapper.width * this._sampleAccuracy;
    this._height = this._mapper.height * this._sampleAccuracy;

    // Stub texture - resets on build.
    this.texture = new THREE.DataTexture([], 0, 0, THREE.RGBAFormat, THREE.FloatType);

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter._TextsIndicesTexture.prototype = (function () {

    function _textsIndices (completion) {
      var points = new Float32Array((this._height * this._width) * 4),
          widthStepModifier = this._width % 1,
          indicesOffset = (1 / this._texts.length) / 2; // Values stored in this texture will be sampled from the 'middle' of their texel position.

      setImmediate(_.bind(function() {
        for (var i = 1; i < points.length / 4; i++) {

          var y = Math.ceil(i / (this._width - widthStepModifier)),
              x = i - ((this._width - widthStepModifier) * (y - 1)),
              refIndex = 0.0,
              bg = 0.0,
              a = 0.0;

          for (var ki = 0; ki < this._texts.length; ki++) {
            var text = this._texts[ki],
                bounds = this._mapper.boundsFor(text),
                fitY = bounds.fit.y * this._sampleAccuracy,
                fitX = bounds.fit.x * this._sampleAccuracy,
                vH = bounds.h * this._sampleAccuracy,
                vW = bounds.w * this._sampleAccuracy;

            // If x and y are within the fit bounds of the text space within our mapped texts texture.
            if (y >= fitY &&
                y <= fitY + vH &&
                x >= fitX &&
                x <= fitX + vW) {
              refIndex = (ki / this._texts.length) + indicesOffset;
              a = 1.0;
              break;
            }
          }

          var index = i - 1;
          points[4*index+0] = refIndex;
          points[4*index+1] = bg;
          points[4*index+2] = bg;
          points[4*index+3] = a;
        }

        completion(points);
      }, this));
    }

    return {

      constructor : Blotter._TextsIndicesTexture,

      build : function () {
        _textsIndices.call(this, _.bind(function (dataPoints) {
          this.texture = new THREE.DataTexture(dataPoints, this._width, this._height, THREE.RGBAFormat, THREE.FloatType);
          this.texture.flipY = true;
          this.texture.needsUpdate = true;

          this.trigger("build");
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

