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

        "// Via: http://www.iquilezles.org/www/articles/functions/functions.htm",
        "float impulse(float k, float x) {",
        "    float h = k * x;",
        "    return h * exp(1.0 - h);",
        "}",

        "vec2 waveOffset(vec2 fragCoord, float animate, float sineDistortSpread, float sineDistortCycleCount, float sineDistortAmplitude, float primaryDistortAmplitude, float secondaryDistortAmplitude, vec2 distortPosition, float deg) {",

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


        "    // Define placement for distortion ",
        "    // -------------------------------",

        "    float crossSectionOffsetAdjustment = sineDistortSpread * 2.0;",
        "    crossSectionLength += crossSectionOffsetAdjustment;",

        "    sineDistortSpread /= crossSectionLength;",

        "    vec2 distortPositionIntersect = vec2(0.0);",
        "    lineLineIntersection(distortPositionIntersect, distortPosition * uResolution.xy, perpendicularSlope, edgeIntersect, slope);",
        "    float distortDistanceFromEdge = (distance(edgeIntersect, distortPositionIntersect) / crossSectionLength) + sineDistortSpread;",

        "    float uvDistanceFromDistort = distance(edgeIntersect, coordLineIntersect) / crossSectionLength;",
        "    if (animate > 0.0) {",
        "       float f = uGlobalTime * 0.5;",
        "       uvDistanceFromDistort += f;",
        "    }",
        "    uvDistanceFromDistort = fract(uvDistanceFromDistort + sineDistortSpread);",

        "    float distortVarianceAdjuster = 0.0; // Used to determine variance for distortion along cross section of text.",
        "    if (animate == 0.0) {",
        "       distortVarianceAdjuster = uvDistanceFromDistort - distortDistanceFromEdge;",
        "    } else {",
        "       distortVarianceAdjuster = uvDistanceFromDistort;",
        "    }",


        "    // Define sine distortion ",
        "    // -------------------------------",

        "    uvDistanceFromDistort = smoothstep(distortDistanceFromEdge - sineDistortSpread, distortDistanceFromEdge + sineDistortSpread, uvDistanceFromDistort);",
        "    uvDistanceFromDistort = impulse(uvDistanceFromDistort, uvDistanceFromDistort); // Add smoother decay to sin distort.",

        "    float sineDistortion = sin(uvDistanceFromDistort * PI * sineDistortCycleCount) * sineDistortAmplitude;",


        "    // Define noise distortion ",
        "    // -------------------------------",

        "    float noiseDistortion = noise(7.0 * distortVarianceAdjuster) * primaryDistortAmplitude;",
        "    noiseDistortion -= primaryDistortAmplitude / 2.0; // Adjust primary distort so that it distorts in two directions.",
        "    noiseDistortion *= (sineDistortion > 0.0 ? 1.0 : -1.0); // Adjust primary distort to account for sin variance.",
        "    noiseDistortion += noise(250.0 * distortVarianceAdjuster) * secondaryDistortAmplitude;",
        "    noiseDistortion -= secondaryDistortAmplitude / 2.0; // Adjust secondary distort so that it distorts in two directions.",
        "    noiseDistortion *= (sineDistortion > 0.0 ? 1.0 : -1.0); // Adjust secondary distort to account for sin variance.",


        "    // Combine distortions to find UV offsets ",
        "    // -------------------------------",

        "    vec2 kV = offsetsForCoordAtDistanceOnSlope(sineDistortion + noiseDistortion, perpendicularSlope);",
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
        "    uDistortPosition.y = 1.0 - uDistortPosition.y;",

        "    // Create Distortion ============================================================",

        "    vec2 offset = waveOffset(fragCoord, uAnimate, uSineDistortSpread, uSineDistortCycleCount, uSineDistortAmplitude, uPrimaryDistortAmplitude, uSecondaryDistortAmplitude, uDistortPosition, uRotation);",

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
            uSineDistortCycleCount : { type : "1f", value : 2.0 },
            uSineDistortSpread : { type : "1f", value : 16.0 },
            uSineDistortAmplitude : { type : "1f", value : 0.04 },
            uPrimaryDistortAmplitude : { type : "1f", value : 0.004 },
            uSecondaryDistortAmplitude : { type : "1f", value : 0.004 },
            uDistortPosition : { type : "2f", value : [0.5, 0.5] },
            uRotation : { type : "1f", value : 180.0 }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
