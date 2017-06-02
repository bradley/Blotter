(function(Blotter, _) {

  Blotter.Assets.Shaders.LineMath = [
    Blotter.Assets.Shaders.Inf,
    "",
    "//",
    "// Author : Bradley Griffith",
    "// License : Distributed under the MIT License.",
    "//",
    "",
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
    "float normalizedSlope(float slope, vec2 resolution) {",
    "    vec2 p = vec2(1.0) / resolution;",
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

    "    vec2 intersectLeft = vec2(0.0);",
    "    vec2 intersectTop = vec2(0.0);",
    "    vec2 intersectRight = vec2(0.0);",
    "    vec2 intersectBottom = vec2(0.0);",

    "    bool intersectsLeft = lineLineSegmentIntersection(intersectLeft, point, slope, rMinXY, vec2(rMinXY.x, rMaxXY.y));",
    "    bool intersectsTop = lineLineSegmentIntersection(intersectTop, point, slope, vec2(rMinXY.x, rMaxXY.y), rMaxXY);",
    "    bool intersectsRight = lineLineSegmentIntersection(intersectRight, point, slope, rMaxXY, vec2(rMaxXY.x, rMinXY.y));",
    "    bool intersectsBottom = lineLineSegmentIntersection(intersectBottom, point, slope, rMinXY, vec2(rMaxXY.x, rMinXY.y));",


    "    if (intersectsLeft) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectLeft;",
    "        }",
    "        else {",
    "            iA = intersectLeft;",
    "            firstIntersectFound = true;",
    "        }",
    "    }",

    "    if (intersectsTop) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectTop;",
    "        }",
    "        else {",
    "            iA = intersectTop;",
    "            firstIntersectFound = true;",
    "        }",
    "    }",

    "    if (intersectsRight) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectRight;",
    "        }",
    "        else {",
    "            iA = intersectRight;",
    "            firstIntersectFound = true;",
    "        }",
    "    }",

    "    if (intersectsBottom) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectBottom;",
    "        }",
    "        else {",
    "            iA = intersectBottom;",
    "        }",
    "    }",
    "}"

  ].join("\n");

})(
  this.Blotter, this._
);
