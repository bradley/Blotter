(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.RGBSplitMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.RGBSplitMaterial.prototype = Object.create(Blotter.Material.prototype);

  _.extend(Blotter.RGBSplitMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",
        "   vec2 p = fragCoord / uResolution;",

        "   float amount = 10.0;",
        "   float angle = 0.25;",
        "   vec2 offset = (amount / uResolution) * vec2(cos(angle), sin(angle));",

        "   vec4 cr = textTexture(p + offset);",
        "   vec4 cga = textTexture(p);",
        "   vec4 cb = textTexture(p - offset);",

        "   combineColors(cr, vec4(1.0, 1.0, 1.0, 1.0), cr);",
        "   combineColors(cga, vec4(1.0, 1.0, 1.0, 1.0), cga);",
        "   combineColors(cb, vec4(1.0, 1.0, 1.0, 1.0), cb);",

        "   rgbaFromRgb(mainImage, vec3(cr.r, cga.g, cb.b));",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.RGBSplitMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
      }
    };

  })());

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
