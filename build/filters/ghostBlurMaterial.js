(function(Blotter, _) {

  Blotter.GhostBlurMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.GhostBlurMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.GhostBlurMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,
        Blotter.Assets.Shaders.Random,
        Blotter.Assets.Shaders.Noise,

        "bool isinf(float val) {",
        "    return (val != 0.0 && val * 2.0 == val) ? true : false;",
        "}",

        "// Fix a floating point number to two decimal places",
        "float toFixedTwo(float f) {",
        "    return float(int(f * 100.0)) / 100.0;",
        "}",

        "// Returns the slope of a line given the degrees of the angle on which that line is rotated;",
        "float slopeForDegrees(float deg) {",
        "    // Ensure degrees stay withing 0.0 - 360.0",
        "    deg = mod(deg, 360.0);",

        "    float radians = deg * (PI / 180.0);",

        "    return tan(radians);",
        "}",

        "// Given x, a slope, and another point, find y for x.",
        "float yForXOnSlope(float x, float slope, vec2 p2) {",
        "    return -1.0 * ((slope * (p2.x - x)) - p2.y);",
        "}",

        "// Given y, a slope, and another point, find x for y.",
        "float xForYOnSlope(float y, float slope, vec2 p2) {",
        "    return ((y - p2.y) + (slope * p2.x)) / slope;",
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
        "// Returns a boolean designating whether or not an infinite line intersects with an infinite line, and sets an `out` variable for the intersection point if it is found.",
        "//   Note: This function does not adjust slope for screen ratio.",
        "bool lineLineIntersection (out vec2 intersect, in vec2 p1, in float m1, in vec2 p2, in float m2) {",
        "    // See: http://gamedev.stackexchange.com/questions/44720/line-intersection-from-parametric-equation",
        "    //      http://stackoverflow.com/questions/41687083/formula-to-determine-if-an-infinite-line-and-a-line-segment-intersect/41687904#41687904",

        "    bool isIntersecting = false;",

        "    float dx = 1.0;",
        "    float dy = m1;",

        "    float dxx = 1.0;",
        "    float dyy = m2;",

        "    float denominator = ((dxx * dy) - (dyy * dx));",
        "    if (denominator == 0.0) {",
        "        // Lines are parallel",
        "        return isIntersecting;",
        "    }",

        "    if (isinf(dy)) {",
        "        float y = yForXOnSlope(p1.x, m2, p2);",
        "        isIntersecting = true;",
        "        intersect = vec2(p1.x, y);",
        "        return isIntersecting;",
        "    }",

        "    if (isinf(dyy)) {",
        "        float y = yForXOnSlope(p2.x, m1, p1);",
        "        isIntersecting = true;",
        "        intersect = vec2(p2.x, y);",
        "        return isIntersecting;",
        "    }",

        "    float u = ((dx * (p2.y - p1.y)) + (dy * (p1.x - p2.x))) / denominator;",

        "    isIntersecting = true;",
        "    intersect = p2 + (u * vec2(dxx, dyy));",

        "    return isIntersecting;",
        "}",

        "// Returns a boolean designating whether or not an infinite line intersects with a line segment, and sets an `out` variable for the intersection point if it is found.",
        "//   Note: This function does not adjust slope for screen ratio.",
        "bool lineLineSegmentIntersection (out vec2 intersect, in vec2 point, in float m, in vec2 pA, in vec2 pB) {",
        "    // See: http://gamedev.stackexchange.com/questions/44720/line-intersection-from-parametric-equation",
        "    //      http://stackoverflow.com/questions/41687083/formula-to-determine-if-an-infinite-line-and-a-line-segment-intersect/41687904#41687904",

        "    bool isIntersecting = false;",

        "    float dx = 1.0;",
        "    float dy = m;",

        "    float dxx = pB.x - pA.x;",
        "    float dyy = pB.y - pA.y;",

        "    float denominator = ((dxx * dy) - (dyy * dx));",
        "    if (denominator == 0.0 || (isinf(dyy / dxx) && isinf(dy))) {",
        "        // Lines are parallel",
        "        return isIntersecting;",
        "    }",

        "    if (isinf(dy)) {",
        "        float m2 = dyy / dxx;",
        "        float y = yForXOnSlope(point.x, m2, pB);",
        "        isIntersecting = true;",
        "        intersect = vec2(point.x, y);",
        "        return isIntersecting;",
        "    }",

        "    float u = ((dx * (pA.y - point.y)) + (dy * (point.x - pA.x))) / denominator;",

        "    if (u >= 0.0 && u <= 1.0) {",
        "        // Intersection occured on line segment",
        "        isIntersecting = true;",
        "        intersect = pA + (u * vec2(dxx, dyy));",
        "    }",

        "    return isIntersecting;",
        "}",
        "// Dev Note: Terrible code. Needs refactor. Just trying to find ",
        "//   which two edges of the rect the intersections occur at.",
        "void intersectsOnRectForLine(out vec2 iA, out vec2 iB, in vec2 rMinXY, in vec2 rMaxXY, in vec2 point, in float slope) {",
        "    bool firstIntersectFound = false;",

        "    vec2 intersectA = vec2(0.0);",
        "    vec2 intersectB = vec2(0.0);",
        "    vec2 intersectC = vec2(0.0);",
        "    vec2 intersectD = vec2(0.0);",

        "    bool intersectsLeft = lineLineSegmentIntersection(intersectA, point, slope, rMinXY, vec2(rMinXY.x, rMaxXY.y));",
        "    bool intersectsTop = lineLineSegmentIntersection(intersectB, point, slope, vec2(rMinXY.x, rMaxXY.y), rMaxXY);",
        "    bool intersectsRight = lineLineSegmentIntersection(intersectC, point, slope, rMaxXY, vec2(rMaxXY.x, rMinXY.y));",
        "    bool intersectsBottom = lineLineSegmentIntersection(intersectD, point, slope, rMinXY, vec2(rMaxXY.x, rMinXY.y));",

        "    if (intersectsLeft) {",
        "        iA = intersectA;",
        "        firstIntersectFound = true;",
        "    }",

        "    if (intersectsTop) {",
        "        if (firstIntersectFound) {",
        "            iB = intersectB;",
        "        }",
        "        else {",
        "            iA = intersectB;",
        "            firstIntersectFound = true;",
        "        }",
        "    }",

        "    if (intersectsRight) {",
        "        if (firstIntersectFound) {",
        "            iB = intersectC;",
        "        }",
        "        else {",
        "            iA = intersectC;",
        "            firstIntersectFound = true;",
        "        }",
        "    }",

        "    if (intersectsBottom) {",
        "        if (firstIntersectFound) {",
        "            iB = intersectD;",
        "        }",
        "        else {",
        "            iA = intersectD;",
        "        }",
        "    }",
        "}",

        "float isWave(vec2 uv, vec2 centerUv, float deg, float width, float amplitude, float volatility, float smoothing) {",

        "    // Setup",
        "    // -------------------------------",

        "    // Dev Note: I've seen some strange artifacting when the input degrees have",
        "    //   a high number of decimal places. Fixing degrees to a max of two decimal places",
        "    //   fixes this bug. Not sure that it's the full solution but the problem is mitigated.",
        "    deg = toFixedTwo(deg);",

        "    float slope = normalizedSlope(slopeForDegrees(deg));",
        "    float perpendicularDeg = mod(deg + 90.0, 360.0); // Offset angle by 90.0, but keep it from exceeding 360.0",
        "    float perpendicularSlope = normalizedSlope(slopeForDegrees(perpendicularDeg));",

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

        "    float slopeA = normalizedSlope(slopeForDegrees(angleA));",
        "    float slopeB = normalizedSlope(slopeForDegrees(angleB));",

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
