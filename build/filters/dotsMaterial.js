(function(Blotter, _) {

  Blotter.DotsMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.DotsMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.DotsMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.Random,

        "vec2 random2(vec2 p) {",
        "    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);",
        "}",

        "float isParticle(out vec3 particleColor, vec2 fragCoord, float pointRadius, float pointCellWidth, float dodge, vec2 dodgePosition, float dodgeSpread, float speed) {    ",
        "    if (pointCellWidth == 0.0) { return 0.0; };",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    float pointRadiusOfCell = pointRadius / pointCellWidth;",

        "    vec2 totalCellCount = uResolution.xy / pointCellWidth;",
        "    vec2 cellUv = uv * totalCellCount;",

        "    // Tile the space",
        "    vec2 iUv = floor(cellUv);",
        "    vec2 fUv = fract(cellUv);",

        "    float minDist = 1.0;  // minimun distance",

        "    vec4 baseSample = textTexture(cellUv);",
        "    float maxWeight = 0.0;",
        "    particleColor = baseSample.rgb;",

        "    for (int y= -1; y <= 1; y++) {",
        "        for (int x= -1; x <= 1; x++) {",
        "            // Neighbor place in the grid",
        "            vec2 neighbor = vec2(float(x), float(y));",

        "            // Random position from current + neighbor place in the grid",
        "            vec2 point = random2(iUv + neighbor);",

        "            // Get cell weighting from cell's center alpha",
        "            vec2 cellRowCol = floor(fragCoord / pointCellWidth) + neighbor;",
        "            vec2 cellFragCoord = ((cellRowCol * pointCellWidth) + (pointCellWidth / 2.0));",
        "            vec4 cellSample = textTexture(cellFragCoord / uResolution.xy);",
        "            float cellWeight = cellSample.a;",

        "            if (cellWeight < 1.0) {",
        "               // If the cell is not fully within our text, we should disregard it",
        "               continue;",
        "            }",

        "            maxWeight = max(maxWeight, cellWeight);",
        "            if (cellWeight == maxWeight) {",
        "                particleColor = cellSample.rgb;",
        "            }",

        "            float distanceFromDodge = distance(dodgePosition * uResolution.xy, cellFragCoord) / uResolution.y;",
        "            distanceFromDodge = 1.0 - smoothstep(0.0, dodgeSpread, distanceFromDodge);",

        "            // Apply weighting to noise and dodge if dodge is set to 1.0",
        "            cellWeight = step(cellWeight, random(cellRowCol)) + (distanceFromDodge * dodge);",

        "            // Animate the point",
        "            point = 0.5 + 0.75 * sin((uGlobalTime * speed) + 6.2831 * point);",

        "            // Vector between the pixel and the point",
        "            vec2 diff = neighbor + point - fUv;",

        "            // Distance to the point",
        "            float dist = length(diff);",
        "            dist += cellWeight; // Effectively remove point",

        "            // Keep the closer distance",
        "            minDist = min(minDist, dist);",
        "            if(minDist == dist) {",
        "               //particleColor = cellSample.rgb;",
        "            }",
        "        }",
        "    }",


        "    float pointEasing = pointRadiusOfCell - (1.0 / pointCellWidth);",

        "    float isParticle = 1.0 - smoothstep(pointEasing, pointRadiusOfCell, minDist);",

        "    return isParticle;",
        "}",

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",
        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    float pointCellWidth = max(uPointCellWidth / uPixelRatio, 1.0);",
        "    float pointRadius = min(uPointRadius * pointCellWidth, pointCellWidth * 0.7);",
        "    float dodge = ceil(uDodge);",

        "    vec3 outColor = vec3(0.0);",
        "    float sparkle = isParticle(outColor, fragCoord, pointRadius, pointCellWidth, dodge, uDodgePosition, uDodgeSpread, uSpeed);",

        "    mainImage = vec4(outColor, sparkle);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.DotsMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uPointCellWidth : { type : "1f", value : 20.0 },
          uPointRadius : { type : "1f", value : 0.5 },
          uDodge : { type : "1f", value : 0.0 },
          uDodgePosition : { type : "2f", value : [0.5, 0.5] },
          uDodgeSpread : { type : "1f", value : 0.10 },
          uSpeed : { type : "1f", value : 1.0 }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
