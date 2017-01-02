(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.BubbleSplitMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.BubbleSplitMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.BubbleSplitMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

        "   // p = x, y percentage for texel position within total resolution.",
        "   vec2 p = fragCoord / uResolution;",
        "   // d = x, y percentage for texel position within total resolution relative to center point.",
        "   vec2 d = p - uCenterPoint;",

        "   // The dot function returns the dot product of the two",
        "   // input parameters, i.e. the sum of the component-wise",
        "   // products. If x and y are the same the square root of",
        "   // the dot product is equivalent to the length of the vector.",
        "   // Therefore, r = length of vector represented by d (the ",
        "   // distance of the texel from center position).",
        "   // ",
        "   // In order to apply weights here, we add our weight to this distance",
        "   // (pushing it closer to 1 - essentially giving no effect at all) and",
        "   // find the min between our weighted distance and 1.0",
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
        "   vec4 cga = textTexture(offsetUV);",
        "   vec4 cb = textTexture(offsetUV - offset);",

        "   combineColors(cr, vec4(1.0, 1.0, 1.0, 1.0), cr);",
        "   combineColors(cga, vec4(1.0, 1.0, 1.0, 1.0), cga);",
        "   combineColors(cb, vec4(1.0, 1.0, 1.0, 1.0), cb);",

        "   rgbaFromRgb(mainImage, vec3(cr.r, cga.g, cb.b));",
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
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
