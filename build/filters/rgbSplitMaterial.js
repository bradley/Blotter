(function(Blotter, _) {

  Blotter.RGBSplitMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.RGBSplitMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.RGBSplitMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",
        "   vec2 p = fragCoord / uResolution;",

        "   float amount = 10.0;",
        "   float angle = 0.25;",
        "   vec2 offset = (amount / uResolution) * vec2(cos(angle), sin(angle));",

        "   highp vec4 cr = textTexture(p + offset);",
        "   highp vec4 cg = textTexture(p);",
        "   highp vec4 cb = textTexture(p - offset);",

        "   cr = normalBlend(cr, uBlendColor);",
        "   cg = normalBlend(cg, uBlendColor);",
        "   cb = normalBlend(cb, uBlendColor);",

        "   float a = max(cr.a, max(cg.a, cb.a));",

        "   mainImage = normalUnblend(vec4(cr.r, cg.g, cb.b, a), uBlendColor);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.RGBSplitMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {};
      }
    };

  })());

})(
  this.Blotter, this._
);
