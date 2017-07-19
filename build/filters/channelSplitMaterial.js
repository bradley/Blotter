(function(Blotter, _) {

  Blotter.ChannelSplitMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.ChannelSplitMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.ChannelSplitMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,
        Blotter.Assets.Shaders.LineMath,

        "vec4 blackFromAlpha(vec4 inputColor) {",
        "    return vec4(1.0 - vec3(inputColor.a), inputColor.a);",
        "}",

        "float edgeBlurAdjustment(vec2 fragCoord, float blurRadius){",
        "    // Setup ========================================================================",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",
        "    vec2 p = vec2(1.0) / uResolution.xy; // 1 pixel.",
        "    vec4 baseSample = normalBlend(textTexture(uv), vec4(1.0));",


        "    // Create Darkness ==============================================================",

        "    vec2 normalizedBlurRadius = p * blurRadius;",
        "    vec2 maxRadiusCoord = fragCoord + (normalizedBlurRadius.xy * uResolution.xy);",
        "    float maxDistance = distance(fragCoord, maxRadiusCoord);",

        "    const int maxSteps = 30; // This kind of sucks but we cant use non constant values for our loops",

        "    float stepDistance = 1.0;",
        "    vec2 stepCoord = vec2(0.0);",
        "    vec2 stepUv = vec2(0.0);",
        "    vec4 stepSample = vec4(1.0);",
        "    vec4 stepSampleAdjusted = vec4(1.0);",
        "    vec4 lightestSample = blackFromAlpha(baseSample);",

        "    for (int i = -maxSteps; i <= maxSteps; i += 1) {",
        "        if (abs(float(i)) >= blurRadius) { continue; }",
        "        for (int j = -maxSteps; j <= maxSteps; j += 1) {",
        "            if (abs(float(j)) >= blurRadius) { continue; }",

        "            stepUv = uv + vec2(float(i) * p.x, float(j) * p.y);",
        "            stepCoord = stepUv * uResolution.xy;",
        "            stepSample = textTexture(stepUv);",

        "            // Disregard actual color. Sample black, weighting for alpha",
        "            stepSampleAdjusted = blackFromAlpha(stepSample);",

        "            vec4 sampleOnBackground = normalBlend(stepSampleAdjusted, vec4(1.0));",

        "            stepDistance = distance(stepCoord, fragCoord);",

        "            if (stepDistance <= maxDistance) {",
        "               float stepLightestSampleWeight = 1.0 - (stepDistance / maxDistance);",
        "               //stepLightestSampleWeight = smoothstep(0.0, 1.0, pow(stepLightestSampleWeight, 1.75));",
        "               //stepLightestSampleWeight = smoothstep(0.336, 1.000, pow(stepLightestSampleWeight, 0.216));",

        "               vec4 mixedStep = mix(baseSample, sampleOnBackground, stepLightestSampleWeight);",

        "               lightestSample = max(mixedStep, lightestSample);",
        "            }",
        "        }",
        "    }",

        "    return 1.0 - lightestSample.r; // R, G, B,... none matter particularly.",

        "}",


        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",
        "   vec2 p = fragCoord / uResolution;",
        "   vec2 rP = p;",
        "   vec2 bP = p;",



        "   float slope = normalizedSlope(slopeForDegrees(uRotation), uResolution);",
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

        "   vec2 edgeBlurAdjustmentUv = vec2(0.0);",
        "   if (cr.a >= cg.a && cr.a >= cb.a) {",
        "       edgeBlurAdjustmentUv = rP;",
        "   } else if (cg.a >= cr.a && cg.a >= cb.a) {",
        "       edgeBlurAdjustmentUv = p;",
        "   } else {",
        "       edgeBlurAdjustmentUv = bP;",
        "   }",
        "   vec2 adjustedFragCoord = edgeBlurAdjustmentUv * uResolution.xy;",

        "   float blurAdjustment = edgeBlurAdjustment(adjustedFragCoord, uBlurRadius);",

        "   cr = normalBlend(cr, uBlendColor);",
        "   cg = normalBlend(cg, uBlendColor);",
        "   cb = normalBlend(cb, uBlendColor);",

        "   float a = max(cr.a, max(cg.a, cb.a)) * blurAdjustment;",

        "   mainImage = vec4(cr.r, cg.g, cb.b, a);//normalUnblend(vec4(cr.r, cg.g, cb.b, a), uBlendColor);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.ChannelSplitMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uOffset : { type : "1f", value : 5.0 },
          uRotation : { type : "1f", value : 0.0 },
          uBlurRadius : { type : "1f", value : 0.0 }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
