(function(Blotter, _) {

  Blotter.RGBSplitMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.RGBSplitMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.RGBSplitMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,

        "// Returns the slope of a line given the degrees of the angle on which that line is rotated;",
        "float slopeForDegrees(float deg) {",
        "    // Ensure degrees stay withing 0.0 - 360.0",
        "    deg = mod(deg, 360.0);",

        "    float radians = deg * (PI / 180.0);",

        "    return tan(radians);",
        "}",

        "// Returns slope adjusted for screen ratio.",
        "float normalizedSlope(float slope) {",
        "    vec2 p = vec2(1.0) / uResolution.xy;",
        "    return ((slope * 100.0) / p.x) / (100.0 / p.x);",
        "}",

        "// Returns offsets (+/-) for any coordinate at distance given slope.",
        "//   Note: This function does not normalize distance.",
        "//   Note: This function does not adjust slope for screen ratio.",
        "vec2 offsetsForCoordAtDistanceOnSlope(float d, float slope) {",
        "    return vec2(",
        "        (d * cos(atan(slope))),",
        "        (d * sin(atan(slope)))",
        "    );",
        "}",

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",
        "   vec2 p = fragCoord / uResolution;",
        "   vec2 rP = p;",
        "   vec2 bP = p;",

        "   float slope = normalizedSlope(slopeForDegrees(uRotation));",
        "   vec2 k = offsetsForCoordAtDistanceOnSlope(uOffset, slope) / uResolution;",

        "    if (uRotation <= 90.0 || uRotation >= 270.0) {",
        "        rP += k;",
        "        bP -= k;",
        "    }",
        "    else {",
        "        rP -= k;",
        "        bP += k;",
        "    }",

        "   highp vec4 cr = textTexture(rP);",
        "   highp vec4 cg = textTexture(p);",
        "   highp vec4 cb = textTexture(bP);",

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
        this.uniforms = {
          uOffset : { type : "1f", value : 5.0 },
          uRotation : { type : "1f", value : 0.0 }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
