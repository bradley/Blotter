(function(Blotter, _) {

  Blotter.BubbleSplitMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.BubbleSplitMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.BubbleSplitMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

        "   vec2 p = fragCoord / uResolution;",
        "   vec2 d = p - uCenterPoint;",

        "   float inverseLenseWeight = 1.0 - uLenseWeight;",
        "   float r = min(sqrt(dot(d, d)) + inverseLenseWeight, 1.0);",

        "   vec2 offsetUV = uCenterPoint + (d * r);",

        "   // RGB split",
        "   vec2 offset = vec2(0.0);",
        "   if (r < 1.0) {",
        "     float amount = 0.012;",
        "     float angle = 0.45;",
        "     offset = (amount * (1.0 - r)) * vec2(cos(angle), sin(angle));",
        "   }",

        "   vec4 cr = textTexture(offsetUV + offset);",
        "   vec4 cg = textTexture(offsetUV);",
        "   vec4 cb = textTexture(offsetUV - offset);",

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

      constructor : Blotter.BubbleSplitMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uCenterPoint : { type : "2f", value : [0.5, 0.5] },
          uLenseWeight : { type : "1f", value : 0.9 }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
