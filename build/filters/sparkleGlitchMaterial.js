(function(Blotter, _) {

  Blotter.SparkleGlitchMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.SparkleGlitchMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.SparkleGlitchMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.Random,

        "vec2 random2(vec2 p) {",
        "    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);",
        "}",


        "float isParticle(vec2 fragCoord, float pointRadius, float pointCellWidth) {    ",
        "    if (pointCellWidth == 0.0) { return 0.0; };",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    float pointRadiusOfCell = pointRadius / pointCellWidth;",

        "    vec2 totalCellCount = uResolution.xy / pointCellWidth;",
        "    vec2 cellUv = uv * totalCellCount;",

        "    // Tile the space",
        "    vec2 iUv = floor(cellUv);",
        "    vec2 fUv = fract(cellUv);",

        "    float minDist = 1.0;  // minimun distance",

        "    for (int y= -1; y <= 1; y++) {",
        "        for (int x= -1; x <= 1; x++) {",
        "            // Neighbor place in the grid",
        "            vec2 neighbor = vec2(float(x), float(y));",

        "            // Random position from current + neighbor place in the grid",
        "            vec2 point = random2(iUv + neighbor);",

        "            // Get cell weighting from edgeDistanceBlur",
        "            vec2 cellRowCol = floor(fragCoord / pointCellWidth) + neighbor;",
        "            vec2 cellFragCoord = ((cellRowCol * pointCellWidth) + (pointCellWidth / 2.0));",
        "            float cellWeight = textTexture(cellFragCoord / uResolution.xy).a;",

        "            // Apply weighting to noise",
        "            cellWeight = step(cellWeight, random(cellRowCol));",

        "            // Animate the point",
        "            point = 0.5 + 0.75 * sin(uGlobalTime + 6.2831 * point);",

        "            // Vector between the pixel and the point",
        "            vec2 diff = neighbor + point - fUv;",

        "            // Distance to the point",
        "            float dist = length(diff);",
        "            dist += cellWeight; // Effectively remove point",

        "            // Keep the closer distance",
        "            minDist = min(minDist, dist);",
        "        }",
        "    }",

        "    float test = pointRadius / pointCellWidth;",

        "    float pointEasing = pointRadiusOfCell - (1.0 / pointCellWidth);",

        "    float isParticle = 1.0 - smoothstep(pointEasing, pointRadiusOfCell, minDist);",


        "    return isParticle;",
        "}",

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",
        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    float pointCellWidth = max(uPointCellWidth, 1.0);",
        "    float pointRadius = min(uPointRadius, pointCellWidth * 0.7);",

        "    float sparkle = isParticle(fragCoord, pointRadius, pointCellWidth);",

        "    mainImage = vec4(vec3(1.0), sparkle);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.SparkleGlitchMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uAnimate : { type : "1f", value : 1.0 },
          uPointRadius : { type : "1f", value : 0.16 },
          uPointCellWidth : { type : "1f", value : 20.0 }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
