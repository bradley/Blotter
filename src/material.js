(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Material = function(mainImage, options) {
    _.defaults(options, {
      uniforms : {}
    });

    this.mainImage = mainImage;
    this.uniforms = options.uniforms;

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter.Material.prototype = (function() {

    function _defaultMainImageSrc () {
      var mainImage = [

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

          "mainImage = textTexture(fragCoord / uResolution);",

        "}"

      ];

      return mainImage.join("\n");
    }

    return {

      constructor : Blotter.Material,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          this.trigger("update");
        }
      },

      get mainImage () {
        return this._mainImage;
      },

      set mainImage (mainImage) {
        this._mainImage = mainImage || _defaultMainImageSrc();
      },

      get uniforms () {
        return this._uniforms;
      },

      set uniforms (uniforms) {
        this._uniforms = Blotter.UniformUtils.extractValidUniforms(uniforms);
      }
    };
  })();

  //EventEmitter.prototype.apply(Blotter.Material.prototype);
  //_.extend(Blotter.Material.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
