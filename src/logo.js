$(document).ready(function () {

  var mainImage = [
    "#ifdef GL_ES",
    "precision mediump float;",
    "#endif",


    "vec4 when_eq(vec4 x, vec4 y) {",
    "  return 1.0 - abs(sign(x - y));",
    "}",

    "vec4 when_neq(vec4 x, vec4 y) {",
    "  return abs(sign(x - y));",
    "}",

    "vec4 when_gt(vec4 x, vec4 y) {",
    "  return max(sign(x - y), 0.0);",
    "}",

    "vec4 when_lt(vec4 x, vec4 y) {",
    "  return max(sign(y - x), 0.0);",
    "}",

    "vec4 when_ge(vec4 x, vec4 y) {",
    "  return 1.0 - when_lt(x, y);",
    "}",

    "vec4 when_le(vec4 x, vec4 y) {",
    "  return 1.0 - when_gt(x, y);",
    "}",


    "float when_eq(float x, float y) {",
    "  return 1.0 - abs(sign(x - y));",
    "}",

    "float when_neq(float x, float y) {",
    "  return abs(sign(x - y));",
    "}",

    "float when_gt(float x, float y) {",
    "  return max(sign(x - y), 0.0);",
    "}",

    "float when_lt(float x, float y) {",
    "  return max(sign(y - x), 0.0);",
    "}",

    "float when_ge(float x, float y) {",
    "  return 1.0 - when_lt(x, y);",
    "}",

    "float when_le(float x, float y) {",
    "  return 1.0 - when_gt(x, y);",
    "}",


    "vec4 and(vec4 a, vec4 b) {",
    "  return a * b;",
    "}",

    "vec4 or(vec4 a, vec4 b) {",
    "  return min(a + b, 1.0);",
    "}",

    "vec4 not(vec4 a) {",
    "  return 1.0 - a;",
    "}",


    "float and(float a, float b) {",
    "  return a * b;",
    "}",

    "float or(float a, float b) {",
    "  return min(a + b, 1.0);",
    "}",

    "float not(float a) {",
    "  return 1.0 - a;",
    "}",


    "float normpdf( in float x, in float sigma )",
    "{",
    "  return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;",
    "}",


    "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
    "{",


    "    // Setup ========================================================================",

    "    vec2 uv = fragCoord.xy / uResolution.xy;",
    "    vec4 baseSample = textTexture(uv);",
    "    combineColors(baseSample, vec4(1.0), baseSample);",
    "    float time = uTime / 2.5;",

    "    vec4 finalColour = vec4(0.0);",


    "    // Create Heat Points ===========================================================",

    "    float heatDistanceScale = 1.0; // Larger equates to smaller spread",

    "    // Define 3 heat points",
    "    float heatPoint1X = 0.5 + (sin(time * 1.05) / 4.0);",
    "    float heatPoint1Y = 0.5 - (cos(time * 2.5) / 2.0);",
    "    vec2 heatPoint1Uv = uResolution.xy * vec2(heatPoint1X, heatPoint1Y);",

    "    float heatPoint2X = 0.5 + (sin(-time * 1.0) / 2.5);",
    "    float heatPoint2Y = 0.5 - (cos(time * 2.0) / 4.0);",
    "    vec2 heatPoint2Uv = uResolution.xy * vec2(heatPoint2X, heatPoint2Y);",

    "    float heatPoint3X = 0.5 + (sin(time * 2.0) / 4.0);",
    "    float heatPoint3Y = 0.5 - (cos(time * 0.5) / 2.0);",
    "    vec2 heatPoint3Uv = uResolution.xy * vec2(heatPoint3X, heatPoint3Y);",

    "    // Calculate distances from current UV and combine",
    "    float heatPoint1Dist = distance(fragCoord, heatPoint1Uv) / uResolution.y;",
    "    float heatPoint2Dist = distance(fragCoord, heatPoint2Uv) / uResolution.y;",
    "    float heatPoint3Dist = distance(fragCoord, heatPoint3Uv) / uResolution.y;",
    "    float combinedDist = (heatPoint1Dist);// * heatPoint2Dist * heatPoint3Dist);",

    "    // Invert and scale",
    "    float amount = 1.0 - smoothstep(0.4, 1.4, combinedDist * heatDistanceScale);",


    "    // Create Darkness ==============================================================",

    "    const int darknessRadius = 10;",

    "    vec2 stepCoord = vec2(0.0);",
    "    vec2 stepUV = vec2(0.0);",

    "    vec4 stepSample = vec4(1.0);",
    "    vec4 darkestSample = baseSample;",

    "    float stepDistance = 1.0;",

    "    vec2 maxDistanceCoord = fragCoord.xy + vec2(float(darknessRadius), 0.0);",
    "    vec2 maxDistanceUV = maxDistanceCoord.xy / uResolution.xy;",
    "    float maxDistance = distance(fragCoord, maxDistanceCoord);",

    "    // Find the darkest sample and some relevant meta data within a radius.",
    "    //   Note: You may notice some artifacts in our darkness. This is due to",
    "    //   us making steps on a `+=2` basis in the interest of performance. Play!",
    "    for (int i = -darknessRadius; i <= darknessRadius; i += 1) {",
    "        for (int j = -darknessRadius; j <= darknessRadius; j += 1) {",
    "            stepCoord = fragCoord + vec2(float(i), float(j));",
    "            stepUV = stepCoord / uResolution.xy;",
    "            stepSample = textTexture(stepUV);",
    "            vec4 sampleOnWhite = vec4(0.0);",
    "            combineColors(sampleOnWhite, vec4(1.0), stepSample);",
    "            stepDistance = distance(fragCoord, stepCoord) / amount;",

    "            float stepDarkestSampleWeight = 1.0 - smoothstep(0.0, 1.0, (stepDistance / maxDistance));",

    "            vec4 mixedStep = mix(darkestSample, sampleOnWhite, stepDarkestSampleWeight * 0.5);",

    "            if (mixedStep == min(mixedStep, darkestSample) && stepDistance <= maxDistance) {",
    "                darkestSample = mixedStep;",
    "            }",
    "        }",
    "    }",


    "    // Single Pass Blur =============================================================",

    "    const int diameter = 13;",
    "    const int kSize = (diameter - 1) / 2;",
    "    float kernel[diameter];",

    "    // Create the 1-D kernel",
    "    float sigma = 8.0;",
    "    float Z = 0.0;",
    "    for (int i = 0; i <= kSize; i++) {",
    "        kernel[kSize + i] = kernel[kSize - i] = normpdf(float(i), sigma);",
    "    }",

    "    // Get the normalization factor (as the gaussian has been clamped)",
    "    for (int i = 0; i < diameter; i++) {",
    "        Z += kernel[i];",
    "    }",

    "    for (int i = -kSize; i <= kSize; i++) {",
    "        for (int j = -kSize; j <= kSize; j++) {",
    "            stepCoord = fragCoord + vec2(float(i), float(j));",
    "            stepUV = stepCoord / uResolution.xy;",
    "            stepSample = textTexture(stepUV);",
    "            combineColors(stepSample, vec4(1.0), stepSample);",

    "            //stepDistance = distance(fragCoord, stepCoord);",

    "            //float stepDarkestSampleWeight = 1.0 - smoothstep(0.0, maxDistance, stepDistance);",
    "            //stepSample = mix(stepSample,",
    "            //                 darkestSample,",
    "            //                 ((stepDarkestSampleWeight) * amount) * when_le(stepDistance, maxDistance));",

    "            //stepSample = mix(stepSample,",
    "            //                 darkestSample,",
    "            //                 0.5 * when_le(stepDistance, maxDistance));",

    "            finalColour += kernel[kSize + j] * kernel[kSize + i] * stepSample;",
    "        }",
    "    }",

    "    finalColour = vec4(finalColour/(Z*Z));",


    "    // Mix Blur and Darkness  =======================================================",

    "    //finalColour = min(finalColour, min(finalColour, darkestSample / amount));//, 0.5);",
    "    //finalColour = mix(baseSample, darkestSample, darkestSampleWeight);",

    "    //rgbaFromRgb(mainImage, finalColour.rgb);",
    "    mainImage = darkestSample;",
    "}"
  ].join("\n");

  var text = new Blotter.Text("TATE", {
    family : "sans-serif",
    size : 32,
    paddingLeft: 10,
    paddingRight: 10,
    fill : "#171717"
  });

  var material = new Blotter.ShaderMaterial(mainImage, {
    uniforms : {
      uTime : { type : "1f", value : 0.0 }
    }
  });
  var blotter = new Blotter(material, {
    texts : text
  });

  var elem = $("#logo");
  var myScope = blotter.forText(text);
  var startTime = new Date().getTime();

  blotter.on("ready", function () {
    elem.html(myScope.domElement);
  });

  myScope.on("render", function () {
    var time = (new Date().getTime() - startTime) / 1000;
    myScope.material.uniforms.uTime.value = time;
  });


});