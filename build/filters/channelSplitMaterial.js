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
        Blotter.Assets.Shaders.Random,




        "// Fix a floating point number to two decimal places",
        "float toFixedTwo(float f) {",
        "    return float(int(f * 100.0)) / 100.0;",
        "}",


        "vec2 motionBlurOffsets(vec2 fragCoord, float deg, float spread) {",

        "    // Setup",
        "    // -------------------------------",

        "    vec2 centerUv = vec2(0.5);",
        "    vec2 centerCoord = uResolution.xy * centerUv;",

        "    deg = toFixedTwo(deg);",
        "    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);",


        "    // Find offsets",
        "    // -------------------------------",

        "    vec2 k = offsetsForCoordAtDistanceOnSlope(spread, slope);",
        "    if (deg <= 90.0 || deg >= 270.0) {",
        "        k *= -1.0;",
        "    }",


        "    return k;",
        "}",

        "vec4 motionBlur(vec2 uv, vec2 blurOffset, float maxOffset) {",
        "    const int maxSteps = 400; // This kind of sucks but we cant use non constant values for our loops",

        "    float noiseModifier = 1.0;",
        "    if (uAnimateNoise > 0.0) {",
        "        noiseModifier = sin(uGlobalTime);",
        "    }",
        "    float randNoise = random(uv * noiseModifier) * 0.125;",

        "    float maxAxialResolution = max(uResolution.x, uResolution.y);",
        "    vec4 result = textTexture(uv);",

        "    float maxStepsReached = 0.0;",

        "    for (int i = 1; i <= maxSteps; i += 1) {",
        "        if (abs(float(i)) > maxOffset) { break; }",
        "        maxStepsReached += 1.0;",

        "        vec2 offset = blurOffset * (float(i) / maxOffset);",
        "        vec4 stepSample = textTexture(uv + (offset / maxAxialResolution));",,

        "        result += stepSample;",
        "    }",

        "    if (maxOffset >= 1.0) {",
        "        result /= maxStepsReached / 1.0; // Divide by 2.0 to account for loop step iterator @ 2x",
        "        result.a = pow(result.a - (randNoise * (1.0 - result.a)), 2.0); // Apply logarithmic smoothing to alpha",
        "    }",


        "    return result;",
        "}",


        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

        "    // Setup",
        "    // -------------------------------",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    // We want the blur to be the full uOffset amount in each direction",
        "    //   and to adjust with our logarithmic adjustment made later, so multiply by 4",
        "    float adjustedOffset = uOffset * 4.0;",

        "    float testRotation = uRotation;",

        "    vec2 blurOffset = motionBlurOffsets(fragCoord, testRotation, adjustedOffset);",


        "    // Set Starting Points",
        "    // -------------------------------",

        "    vec2 rUv = uv;",
        "    vec2 gUv = uv;",
        "    vec2 bUv = uv;",

        "    float slope = normalizedSlope(slopeForDegrees(uRotation), uResolution);",
        "    vec2 k = offsetsForCoordAtDistanceOnSlope(uOffset, slope) / uResolution;",

        "    if (uRotation <= 90.0 || uRotation >= 270.0) {",
        "        rUv += k;",
        "        bUv -= k;",
        "    }",
        "    else {",
        "        rUv -= k;",
        "        bUv += k;",
        "    }",


        "    // Blur and Split Channels",
        "    // -------------------------------",

        "    vec4 resultR = vec4(0.0);",
        "    vec4 resultG = vec4(0.0);",
        "    vec4 resultB = vec4(0.0);",

        "    if (uApplyBlur > 0.0) {",
        "        resultR = motionBlur(rUv, blurOffset, adjustedOffset);",
        "        resultG = motionBlur(gUv, blurOffset, adjustedOffset);",
        "        resultB = motionBlur(bUv, blurOffset, adjustedOffset);",
        "    } else {",
        "        resultR = textTexture(rUv);",
        "        resultG = textTexture(gUv);",
        "        resultB = textTexture(bUv);",
        "    }",

        "    float a = resultR.a + resultG.a + resultB.a;",

        "    resultR = normalBlend(resultR, uBlendColor);",
        "    resultG = normalBlend(resultG, uBlendColor);",
        "    resultB = normalBlend(resultB, uBlendColor);",



        "    mainImage = vec4(resultR.r, resultG.g, resultB.b, a);",
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
          uApplyBlur : { type : "1f", value : 1.0 },
          uAnimateNoise : { type : "1f", value : 1.0 }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
