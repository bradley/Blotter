(function(Blotter, _) {

  Blotter.RollingDistortMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.RollingDistortMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.RollingDistortMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,
        Blotter.Assets.Shaders.LineMath,
        Blotter.Assets.Shaders.Random,
        Blotter.Assets.Shaders.Noise,

        "// Fix a floating point number to two decimal places",
        "float toFixedTwo(float f) {",
        "    return float(int(f * 100.0)) / 100.0;",
        "}",


        // http://www.iquilezles.org/www/articles/functions/functions.htm
        "float impulse(float k, float x) {",
        "    float h = k * x;",
        "    return h * exp(1.0 - h);",
        "}",


        "vec2 waveOffset(vec2 fragCoord, float animate, float primaryDistortSpread, float waveCount, float deg, float amplitude, float volatility, vec2 distortPosition) {",

        "    // Setup",
        "    // -------------------------------",

        "    deg = toFixedTwo(deg);",

        "    vec2 centerUv = vec2(0.5);",
        "    vec2 centerCoord = uResolution.xy * centerUv;",

        "    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);",
        "    float perpendicularDeg = mod(deg + 90.0, 360.0); // Offset angle by 90.0, but keep it from exceeding 360.0",
        "    float perpendicularSlope = normalizedSlope(slopeForDegrees(perpendicularDeg), uResolution.xy);",


        "    // Find intersects for line with edges of viewport",
        "    // -------------------------------",

        "    vec2 edgeIntersectA = vec2(0.0);",
        "    vec2 edgeIntersectB = vec2(0.0);",
        "    intersectsOnRectForLine(edgeIntersectA, edgeIntersectB, vec2(0.0), uResolution.xy, centerCoord, slope);",
        "    float crossSectionLength = distance(edgeIntersectA, edgeIntersectB);",


        "    // Find the threshold for degrees at which our intersectsOnRectForLine function would flip",
        "    //   intersects A and B because of the order in which it finds them. This is the angle at which",
        "    //   the y coordinate for the hypotenuse of a right triangle whose oposite adjacent edge runs from",
        "    //   vec2(0.0, centerCoord.y) to centerCoord and whose opposite edge runs from vec2(0.0, centerCoord.y) to",
        "    //   vec2(0.0, uResolution.y) exceeeds uResolution.y",
        "    float thresholdDegA = atan(centerCoord.y / centerCoord.x) * (180.0 / PI);",
        "    float thresholdDegB = mod(thresholdDegA + 180.0, 360.0);",

        "    vec2 edgeIntersect = vec2(0.0);",
        "    if (deg < thresholdDegA || deg > thresholdDegB) {",
        "       edgeIntersect = edgeIntersectA;",
        "    } else {",
        "       edgeIntersect = edgeIntersectB;",
        "    }",

        "    vec2 perpendicularIntersectA = vec2(0.0);",
        "    vec2 perpendicularIntersectB = vec2(0.0);",
        "    intersectsOnRectForLine(perpendicularIntersectA, perpendicularIntersectB, vec2(0.0), uResolution.xy, centerCoord, perpendicularSlope); ",
        "    float perpendicularLength = distance(perpendicularIntersectA, perpendicularIntersectA);",


        "    vec2 coordLineIntersect = vec2(0.0);",
        "    lineLineIntersection(coordLineIntersect, centerCoord, slope, fragCoord, perpendicularSlope);",


        "    // Define wave ",
        "    // -------------------------------",





        "    float crossSectionOffsetAdjustment = primaryDistortSpread * 2.0;",
        "    crossSectionLength += crossSectionOffsetAdjustment;",


        "    primaryDistortSpread /= crossSectionLength;",


        "    vec2 distortPositionIntersect = vec2(0.0);",
        "    lineLineIntersection(distortPositionIntersect, distortPosition * uResolution.xy, perpendicularSlope, edgeIntersect, slope);",
        "    float distortDistanceFromEdge = (distance(edgeIntersect, distortPositionIntersect) / crossSectionLength) + primaryDistortSpread;",


        "    float uvDistanceFromDistort = distance(edgeIntersect, coordLineIntersect) / crossSectionLength;",
        "    if (animate > 0.0) {",
        "       float f = uGlobalTime * 0.5;",
        "       uvDistanceFromDistort += f;",
        "    }",









        "    uvDistanceFromDistort = fract(uvDistanceFromDistort + primaryDistortSpread);",

        "    float distortImpulse = noise(250.0 * uvDistanceFromDistort) * volatility * 0.001;",

        "    uvDistanceFromDistort = smoothstep(distortDistanceFromEdge - primaryDistortSpread, distortDistanceFromEdge + primaryDistortSpread, uvDistanceFromDistort);",



        "    float variance = sin(uvDistanceFromDistort * PI * waveCount) * amplitude;",

        "    distortImpulse *= (variance > 0.0 ? 1.0 : -1.0);",
        "    distortImpulse = impulse(distortImpulse, distortImpulse);",

        "    vec2 kV = offsetsForCoordAtDistanceOnSlope(variance + distortImpulse, perpendicularSlope);",
        "    if (deg <= 0.0 || deg >= 180.0) {",
        "       kV *= -1.0;",
        "    }",

        "    return kV;",
        "}",













        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
        "{",
        "    // Setup ========================================================================",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    // Minor hacks to ensure our waves start horizontal and animating in a downward direction by default.",
        "    uRotation = mod(uRotation + 270.0, 360.0);",
        "    //uAxialDistortPosition = 1.0 - uAxialDistortPosition;",

        "    // Create Distortion ============================================================",

        "    vec2 offset = waveOffset(fragCoord, uAnimate, uPrimaryDistortSpread, uPrimaryDistortWaveCount, uRotation, uAmplitude, uVolatility, uDistortPosition);",

        "    mainImage = textTexture(uv + offset);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.RollingDistortMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
            uAnimate : { type : "1f", value : 0.0 },
            uPrimaryDistortWaveCount : { type : "1f", value : 2.0 },
            uPrimaryDistortSpread : { type : "1f", value : 16.0 },
            uRotation : { type : "1f", value : 180.0 },
            uAmplitude : { type : "1f", value : 0.04 },
            uVolatility : { type : "1f", value : 0.55 },
            //uAxialDistortPosition : { type : "1f", value : 0.5 },
            uDistortPosition : { type : "2f", value : [0.5, 0.5] }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
