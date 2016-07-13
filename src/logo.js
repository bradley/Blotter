var text = new Blotter.Text("BLOTTER", {
  family : "sans-serif",
  size : 56,
  leading: 1,
  fill : "#171717"
});

var mainImage = [
"float normpdf(in float x, in float sigma) {",
"  return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;",
"}",
"",
"void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",
"",
"    vec2 uv = fragCoord.xy / uResolution.xy;",
"    vec4 baseSample = textTexture(uv);",
"",
"    //declare stuff",
"    const int radius = 5;",
"    const int kSize = (radius-1)/2;",
"    float kernel[radius];",
"    ",
"    vec4 finalColour = vec4(0.0);",
"    vec4 darkestSample = vec4(1.0);",
"    vec4 stepSample = vec4(0.0);",
"    float darkestSampleWeight = 0.0;",
"",
"    ",
"    //create the 1-D kernel",
"    float sigma = 7.0;",
"    float Z = 0.0;",
"    for (int i = 0; i <= kSize; i++) {",
"        kernel[kSize + i] = kernel[kSize - i] = normpdf(float(i), sigma);",
"    }",
"",
"    //get the normalization factor (as the gaussian has been clamped)",
"    for (int i = 0; i < radius; i++) {",
"        Z += kernel[i];",
"    }",
"",
"    //read out the texels",
"    for (int i = -kSize; i <= kSize; i++) {",
"        for (int j = -kSize; j <= kSize; j++) {",
"            //stepSample = texture2D(iChannel0, (uv + vec2(float(i), float(j)) / uResolution.xy), 1.);",
"            stepSample = textTexture((uv + vec2(float(i), float(j)) / uResolution.xy));",
"            ",
"            darkestSample = min(darkestSample, stepSample);",
"            ",
"            if (darkestSample == stepSample) {",
"              darkestSampleWeight = smoothstep(-0.75, 1.15, 10.0 * (kernel[kSize + j] * kernel[kSize + i]));",
"            }",
"            ",
"            finalColour += kernel[kSize + j] * kernel[kSize + i] * stepSample;",
"        }",
"    }",
"  ",
"    finalColour = vec4(finalColour/(Z*Z));",
"    ",
"    float time = uTime / 1.0;",
"    float heatDistanceScale = 8.0; // Larger equates to smaller spread",
"    ",
"    ",
"    // Create heat points",
"    // --------------------------------",
"    ",
"    // Define 3 heat points",
"    float heatPoint1X = (0.5 + sin(time * 1.05) / 4.0);",
"    float heatPoint1Y = (0.5 - cos(time * 2.5) / 4.0);",
"    vec2 heatPoint1Uv = vec2(heatPoint1X, heatPoint1Y);",
"    ",
"    float heatPoint2X = (0.5 + sin(time * 1.0) / 4.0);",
"    float heatPoint2Y = (0.5 - cos(time * 2.0) / 4.0);",
"    vec2 heatPoint2Uv = vec2(heatPoint2X, heatPoint2Y);",
"    ",
"    float heatPoint3X = (0.5 + sin(time * 3.0) / 4.0);",
"    float heatPoint3Y = (0.5 - cos(time * 0.5) / 4.0);",
"    vec2 heatPoint3Uv = vec2(heatPoint3X, heatPoint3Y);",
"    ",
"    // Calculate distances from current UV and combine",
"    float heatPoint1Dist = distance(uv, heatPoint1Uv);",
"    float heatPoint2Dist = distance(uv, heatPoint2Uv);",
"    float heatPoint3Dist = distance(uv, heatPoint3Uv);",
"    float combinedDist = (heatPoint1Dist * heatPoint2Dist * heatPoint3Dist);",
"  ",
"    // Invert and scale",
"    float amount = 1.0 - smoothstep(0.125, 0.625, combinedDist * heatDistanceScale);",
"    ",
"    finalColour = mix(finalColour, darkestSample, darkestSampleWeight * amount);",
"    //finalColour = finalColour;//mix(finalColour, darkestSample, darkestSampleWeight);",
"    mainImage = finalColour;",
"}"
  
].join("\n");

var material = new Blotter.ShaderMaterial(mainImage, {
  uniforms : {
    uTime : { type : "1f", value : 0.0 }
  }
});

var blotter = new Blotter(material, {
  texts : text
});

var elem = $("#introduction");

blotter.on("ready", function () {
  blotter.forText(text).appendTo(elem[0]);
});

var startTime = new Date().getTime();

blotter.forText(text).on("render", function () {
  var time = (new Date().getTime() - startTime) / 1000;
  material.uniforms.uTime.value = time;
});