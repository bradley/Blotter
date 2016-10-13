$(document).ready(function () {

  var mainImage = [
    "#ifdef GL_ES",
    "precision mediump float;",
    "#endif",


    "float rand(vec2 co){",
    "    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
    "}",


    "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
    "{",


    "    // Setup ========================================================================",

    "    vec2 uv = fragCoord.xy / uResolution.xy;",
    "    float time = uTime / 4.0;",

    "    vec4 finalColour = vec4(0.0);",


    "    // Create Heat Points ===========================================================",

    "    float heatDistanceScale = 35.0; // Larger value equates to smaller spread",

    "    // Define 2 heat points",
    "    float heatPoint1X = 0.5 - (sin(time) / 2.0);",
    "    float heatPoint1Y = 0.5 - ((cos(time) * abs(cos(time))) / 1.5);",
    "    vec2 heatPoint1Uv = vec2(heatPoint1X, heatPoint1Y) * uResolution.xy;",

    "    float heatPoint2X = 0.5 - (sin(time - 1.0) / 2.0);",
    "    float heatPoint2Y = 0.5 - ((cos(time - 1.0) * abs(cos(time))) / 1.0);",
    "    vec2 heatPoint2Uv = vec2(heatPoint2X, heatPoint2Y) * uResolution.xy;",

    "    // Calculate distances from current UV and combine",
    "    float heatPoint1Dist = smoothstep(0.0, 1.4, distance(fragCoord, heatPoint1Uv) / uResolution.y);",
    "    float heatPoint2Dist = smoothstep(0.0, 1.25, distance(fragCoord, heatPoint2Uv) / uResolution.y);",
    "    float combinedDist = (heatPoint1Dist * heatPoint2Dist);",

    "    // Invert and scale",
    "    float amount = 1.0 - smoothstep(0.15, 25.0, combinedDist * heatDistanceScale);",
    "    amount = smoothstep(-1.0, 1.0, amount);",


    "    // Create Darkness ==============================================================",

    "    const int darknessRadius = 10;",

    "    vec2 stepCoord = vec2(0.0);",
    "    vec2 stepUV = vec2(0.0);",

    "    vec4 stepSample = vec4(1.0);",
    "    vec4 darkestSample = vec4(1.0);",

    "    float stepDistance = 1.0;",

    "    vec2 maxDistanceCoord = fragCoord.xy + vec2(float(darknessRadius), 0.0);",
    "    vec2 maxDistanceUV = maxDistanceCoord.xy / uResolution.xy;",
    "    float maxDistance = distance(fragCoord, maxDistanceCoord);",

    "    float randNoise = rand(uv * sin(time * 0.025)) * 0.15;",

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
    "            stepDistance = distance(fragCoord, stepCoord) / smoothstep(-1.0, 1.0, amount);",

    "            float stepDarkestSampleWeight = 1.0 - clamp((stepDistance / maxDistance), 0.0, 1.0) + randNoise;",
    "            stepDarkestSampleWeight *= smoothstep(0.0, 7.5, amount);",

    "            vec4 mixedStep = mix(darkestSample, sampleOnWhite, stepDarkestSampleWeight);",

    "            if (mixedStep == min(mixedStep, darkestSample) && stepDistance <= maxDistance) {",
    "                darkestSample = mixedStep;",
    "            }",
    "        }",
    "    }",

    "    mainImage = darkestSample;",
    "}"
  ].join("\n");

  var text = new Blotter.Text("Blotter", {
    family : "'SerapionPro', sans-serif",
    size : 52,
    weight : 100,
    leading : "52px",
    paddingTop : 14,//32,
    paddingLeft : 14,//5,
    paddingRight : 14,//10,
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
    elem.append(myScope.domElement);
  });

  myScope.on("render", function () {
    var time = (new Date().getTime() - startTime) / 1000;
    material.uniforms.uTime.value = time;
  });
});