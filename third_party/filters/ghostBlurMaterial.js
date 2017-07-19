(function(Blotter, _) {

  Blotter.GhostBlurMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.GhostBlurMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.GhostBlurMaterial.prototype, (function () {

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

        "float isWave(vec2 uv, vec2 centerUv, float deg, float width, float amplitude, float volatility, float smoothing) {",

        "    // Setup",
        "    // -------------------------------",

        "    // Note: I've seen some strange artifacting when the input degrees have",
        "    //   a high number of decimal places. Fixing degrees to a max of two decimal places",
        "    //   fixes this bug. Not sure that it's the full solution but the problem is mitigated.",
        "    deg = toFixedTwo(deg);",

        "    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);",
        "    float perpendicularDeg = mod(deg + 90.0, 360.0); // Offset angle by 90.0, but keep it from exceeding 360.0",
        "    float perpendicularSlope = normalizedSlope(slopeForDegrees(perpendicularDeg), uResolution.xy);",

        "    // Find point on line where the uv would intersect on a perpendicular slope.",
        "    vec2 relativeCoord = vec2(0.0);",
        "    lineLineIntersection(relativeCoord, centerUv * uResolution.xy, slope, uv * uResolution.xy, perpendicularSlope);",

        "    vec2 perpendicularIntersectA = vec2(0.0);",
        "    vec2 perpendicularIntersectB = vec2(0.0);",
        "    intersectsOnRectForLine(perpendicularIntersectA, perpendicularIntersectB, vec2(0.0) - 1.0, uResolution.xy + 1.0, relativeCoord, perpendicularSlope); ",

        "    float perpendicularIntersectionLength = distance(perpendicularIntersectA, perpendicularIntersectB);",

        "    width = perpendicularIntersectionLength * width;",
        "    float halfWidth = width / 2.0;",

        "    amplitude = width * amplitude;",
        "    smoothing = amplitude * smoothing;",

        "    // Get offset UVs for width of line, adjacent to center point",
        "    // -------------------------------",

        "    float angleA = perpendicularDeg;",
        "    float angleB = mod(perpendicularDeg + 180.0, 360.0); // Offset angle by 180.0, but keep it from exceeding 360.0",

        "    float slopeA = normalizedSlope(slopeForDegrees(angleA), uResolution.xy);",
        "    float slopeB = normalizedSlope(slopeForDegrees(angleB), uResolution.xy);",

        "    vec2 kA = offsetsForCoordAtDistanceOnSlope(halfWidth, slopeA);",
        "    vec2 kB = offsetsForCoordAtDistanceOnSlope(halfWidth, slopeB);",

        "    vec2 offsetCoordA = centerUv * uResolution.xy;",
        "    vec2 offsetCoordB = centerUv * uResolution.xy;",

        "    if (angleA <= 90.0 || angleA >= 270.0) {",
        "        offsetCoordA += kA;",
        "    }",
        "    else {",
        "        offsetCoordA -= kA;",
        "    }",

        "    if (angleB <= 90.0 || angleB >= 270.0) {",
        "        offsetCoordB += kB;",
        "    }",
        "    else {",
        "        offsetCoordB -= kB;",
        "    }",

        "    // Denormalize uvs and uv offsets and find closest point on line for our uv, then renormalize.",
        "    vec2 coordA = vec2(0.0);",
        "    lineLineIntersection(coordA, offsetCoordA, slope, uv * uResolution.xy, perpendicularSlope);",
        "    vec2 coordB = vec2(0.0);",
        "    lineLineIntersection(coordB, offsetCoordB, slope, uv * uResolution.xy, perpendicularSlope);",


        "    // Find intersects for line with edges of viewport",
        "    // -------------------------------",

        "    vec2 coordAIntersectA = vec2(0.0);",
        "    vec2 coordAIntersectB = vec2(0.0);",
        "    intersectsOnRectForLine(coordAIntersectA, coordAIntersectB, vec2(0.0) - amplitude - smoothing, uResolution.xy + amplitude + smoothing, offsetCoordA, slope);",

        "    vec2 coordBIntersectA = vec2(0.0);",
        "    vec2 coordBIntersectB = vec2(0.0);",
        "    intersectsOnRectForLine(coordBIntersectA, coordBIntersectB, vec2(0.0) - amplitude - smoothing, uResolution.xy + amplitude + smoothing, offsetCoordB, slope);",


        "    // Prepare wave",
        "    // -------------------------------",

        "    // Find length of each edge of line in relation to the viewport, and to the",
        "    //   perpendicular line cutting through each coord's closest point on the line.",
        "    float aLength = distance(coordAIntersectA, coordAIntersectB);",
        "    float bLength = distance(coordBIntersectA, coordBIntersectB);",

        "    // Find percent of edge length that the uv's closest point on the line constitutes",
        "    //   for each edge of the line. Note that we find the distance from a point on a circle larger",
        "    //   than our viewport to our line point uv so that the line does not distort as it is rotated.",

        "    // Relatively arbitrary. We just want a distance from center that is absolutely offscreen.",
        "    float outsideOffsetRadiusA = max(uResolution.x, uResolution.y) * 2.0;",
        "    vec2 outsideOffsetPointA = offsetCoordA;",
        "    vec2 outsideOffsetKA = offsetsForCoordAtDistanceOnSlope(outsideOffsetRadiusA / 2.0, slope);",
        "    if (deg <= 90.0 || deg >= 270.0) {",
        "        outsideOffsetPointA += outsideOffsetKA;",
        "    } else {",
        "        outsideOffsetPointA -= outsideOffsetKA;",
        "    }",
        "    float aDistance = (distance(outsideOffsetPointA, coordA) / aLength);",

        "    float outsideOffsetRadiusB = max(uResolution.x, uResolution.y) * 1.356;",
        "    vec2 outsideOffsetPointB = offsetCoordB;",
        "    vec2 outsideOffsetKB = offsetsForCoordAtDistanceOnSlope(outsideOffsetRadiusB / 2.0, slope);",
        "    if (deg <= 90.0 || deg >= 270.0) {",
        "        outsideOffsetPointB += outsideOffsetKB;",
        "    } else {",
        "        outsideOffsetPointB -= outsideOffsetKB;",
        "    }",
        "    float bDistance = (distance(outsideOffsetPointB, coordB) / bLength);",

        "    // Define wave ",

        "    amplitude *= 2.0; // Noise wave stuff is weird. Amplitude makes sense for the user but it's not really amplitude.",
        "    volatility *= 0.3; // `volatility` values are between 0.0 and 1.0, but we really need a value between 0.0 and 0.3 (0.3 is about as volatile as it gets).",

        "    float volatilityA = (1.0 * aLength) * volatility;",
        "    float volatilityB = (1.0 * bLength) * volatility;",

        "    float varianceA = (amplitude / 2.0) * -1.0;",
        "    varianceA += noise((aDistance * PI) * volatilityA) * amplitude;",
        "    float varianceB = (amplitude / 2.0) * -1.0;",
        "    varianceB += noise((bDistance * PI) * volatilityB) * amplitude;",

        "    // Use wave variance as offsets of each point along our line and adjust each uv's closest",
        "    //   point on the line accordingly.",
        "    vec2 kVA = offsetsForCoordAtDistanceOnSlope(varianceA, slopeA);",
        "    vec2 kVB = offsetsForCoordAtDistanceOnSlope(varianceB, slopeB);",

        "    if (angleA <= 90.0 || angleA >= 270.0) {",
        "        offsetCoordA += kVA;",
        "    }",
        "    else {",
        "        offsetCoordA -= kVA;",
        "    }",

        "    if (angleB <= 90.0 || angleB >= 270.0) {",
        "        offsetCoordB += kVB;",
        "    }",
        "    else {",
        "        offsetCoordB -= kVB;",
        "    }",

        "    lineLineIntersection(coordA, offsetCoordA, slope, uv * uResolution.xy, perpendicularSlope);",
        "    lineLineIntersection(coordB, offsetCoordB, slope, uv * uResolution.xy, perpendicularSlope);",


        "    // Define wave edges",
        "    // -------------------------------",

        "    vec2 combinedDistance = step(coordA, uv * uResolution.xy) + step(coordB, uv * uResolution.xy);",
        "    float inWave = (min(combinedDistance.x, combinedDistance.y) == 1.0) ? 1.0 : 0.0;",

        "    float distA = distance(coordA, uv * uResolution.xy);",
        "    float distB = distance(coordB, uv * uResolution.xy);",
        "    distA = smoothstep(0.0, smoothing, distA);",
        "    distB = smoothstep(0.0, smoothing, distB);",

        "    float wave = min(distA, distB) * inWave;",


        "    // Return Wave",
        "    // -------------------------------",

        "    return wave;",
        "}",

        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
        "{",
        "    // Setup ========================================================================",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",
        "    vec2 p = vec2(1.0) / uResolution.xy; // 1 pixel.",

        "    vec4 finalColour = vec4(0.0);",


        "    // Create Distortion ============================================================",

        "    lowp vec2 dPosition = vec2(0.5);", // [0.5, 0.5] is default
        "    float distoritionAmount = isWave(uv, dPosition, uRotation, uWidth, uAmplitude, uVolatility, uSmoothing);",


        "    // Create Darkness ==============================================================",

        "    vec2 maxRadiusUv = p * uBlurRadius;",
        "    vec2 maxRadiusCoord = maxRadiusUv.xy * uResolution.xy;",
        "    float maxDistance = distance(fragCoord, fragCoord + maxRadiusCoord);",

// Where the hell did this number come from tho? this is (potentially) 14,400 samples per texel
// Note: I believe this represents a max number of pixels to step up to. If so, it is related to the amount used to adjust maxRadiusUv
//   and will need to be documented.
        "    const int maxSteps = 60; // This kind of sucks but we cant use non constant values for our loops",

        "    float stepDistance = 1.0;",
        "    vec2 stepCoord = vec2(0.0);",
        "    vec2 stepUv = vec2(0.0);",
        "    vec4 stepSample = vec4(1.0);",
        "    vec4 stepSampleAdjusted = vec4(1.0);",
        "    vec4 darkestSample = vec4(1.0);",

        "    float randNoise = random(uv * sin(uv.x * 0.025)) * 0.15;",

        "    for (int i = -maxSteps; i <= maxSteps; i += 2) {",
        "        if (abs(float(i) * p.x) >= maxRadiusUv.x) { continue; }",
        "        for (int j = -maxSteps; j <= maxSteps; j += 2) {",
        "            if (abs(float(j) * p.y) >= maxRadiusUv.y) { continue; }",

        "            stepUv = uv + vec2(float(i) * p.x, float(j) * p.y);",
        "            stepCoord = stepUv * uResolution.xy;",
        "            stepSample = textTexture(stepUv);",

        "            // Disregard actual color. Sample black, weighting for alpha",
        "            stepSampleAdjusted = vec4(1.0 - vec3(stepSample.a), stepSample.a);",

        "            vec4 sampleOnBackground = normalBlend(stepSampleAdjusted, vec4(1.0));",

        "            stepDistance = distance(fragCoord, stepCoord) / smoothstep(-1.0, 1.0, distoritionAmount);",

        "            if (stepDistance <= maxDistance) {",
        "               float stepDarkestSampleWeight = 1.0 - clamp((stepDistance / maxDistance), 0.0, 1.0) + randNoise;",
        "               stepDarkestSampleWeight *= smoothstep(0.0, 7.5, distoritionAmount);",

        "               vec4 mixedStep = mix(darkestSample, sampleOnBackground, stepDarkestSampleWeight);",

        "               if (mixedStep == min(mixedStep, darkestSample)) {",
        "                   darkestSample = mixedStep;",
        "               }",
        "            }",
        "        }",
        "    }",


        "    // Create Glow ==================================================================",

        "    float dropoff = smoothstep(0.25, 1.15, 1.0 - distance(vec2(0.0, 0.5), vec2(0.0, uv.y)));",
        "    vec4 glow = vec4(uGlowColor.rgb, (uGlowColor.a - max(max(darkestSample.r, darkestSample.g), darkestSample.b)) * dropoff);",


        "    mainImage = glow;",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.GhostBlurMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
            uBlurRadius : { type : "1f", value : 15.0 },
            uRotation : { type : "1f", value : 0.0 },
            uWidth : { type : "1f", value : 0.96 },
            uAmplitude : { type : "1f", value : 0.185 },
            uVolatility : { type : "1f", value : 0.55 },
            uSmoothing : { type : "1f", value : 2.975 },
            uGlowColor : { type : "4f", value : [0.0, 0.0, 0.0, 1.0] }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
