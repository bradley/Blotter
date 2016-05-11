(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  // Create a Data Texture the size of our text map wherein every texel holds the index of text whose boundaries contain the given texel's position.

  Blotter._TextsIndicesTexture = function (textsTexture, sampleAccuracy) {
    this.mapper;
    this.texts;
    this.sampleAccuracy;

    this.width;
    this.height;

    // Stub texture - resets on build.
    this.texture = new THREE.DataTexture([], 0, 0, THREE.RGBAFormat, THREE.FloatType);

    this.init.apply(this, arguments);
  };

  Blotter._TextsIndicesTexture.prototype = (function () {

    function _textsIndices (completion) {
      var points = new Float32Array((this.height * this.width) * 4),
          widthStepModifier = this.width % 1,
          indicesOffset = (1 / this.texts.length) / 2; // Values stored in this texture will be sampled from the 'middle' of their texel position.

      setImmediate(_.bind(function() {
        for (var i = 1; i < points.length / 4; i++) {

          var y = Math.ceil(i / (this.width - widthStepModifier)),
              x = i - ((this.width - widthStepModifier) * (y - 1)),
              refIndex = 0.0,
              bg = 0.0,
              a = 0.0;

          for (var ki = 0; ki < this.texts.length; ki++) {
            var text = this.texts[ki],
                bounds = this.mapper.boundsFor(text),
                fitY = bounds.fit.y * this.sampleAccuracy,
                fitX = bounds.fit.x * this.sampleAccuracy,
                vH = bounds.h * this.sampleAccuracy,
                vW = bounds.w * this.sampleAccuracy;

            // If x and y are within the fit bounds of the text space within our mapped texts texture.
            if (y >= fitY &&
                y <= fitY + vH &&
                x >= fitX &&
                x <= fitX + vW) {
              refIndex = (ki / this.texts.length) + indicesOffset;
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

      init : function (mapper, sampleAccuracy) {
        this.mapper = mapper;
        this.texts = mapper.texts;
        this.sampleAccuracy = sampleAccuracy;

        _.extendOwn(this, EventEmitter.prototype);
      },

      build : function () {
        this.width = this.mapper.width * this.sampleAccuracy;
        this.height = this.mapper.height * this.sampleAccuracy;

        _textsIndices.call(this, _.bind(function (dataPoints) {
          this.texture = new THREE.DataTexture(dataPoints, this.width, this.height, THREE.RGBAFormat, THREE.FloatType);
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

