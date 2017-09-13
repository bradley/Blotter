(function(Blotter, _) {

  Blotter.SparkleGlitchMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.SparkleGlitchMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.SparkleGlitchMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,
        Blotter.Assets.Shaders.Noise2D,
        Blotter.Assets.Shaders.Noise3D,



        "float edgeDistanceBlur(vec2 fragCoord, float blurRadius) {",
        "    // Setup",
        "    // -------------------------------",

        "    const int maxSteps = 30; // This kind of sucks but we cant use non constant values for our loops",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",
        "    vec2 p = vec2(1.0) / uResolution.xy; // 1 pixel.",
        "    float baseSample = textTexture(uv).a;",


        "    // Find Alpha from Bluring",
        "    // -------------------------------",

        "    float lightestSample = baseSample;",

        "    for (int i = -maxSteps; i <= maxSteps; i += 1) {",
        "        if (abs(float(i)) <= -blurRadius || abs(float(i)) >= blurRadius) { continue; }",
        "        for (int j = -maxSteps; j <= maxSteps; j += 1) {",
        "            if (abs(float(j)) <= -blurRadius || abs(float(j)) >= blurRadius) { continue; }",

        "            vec2 stepUv = uv + vec2(float(i) * p.x, float(j) * p.y);",
        "            vec2 stepCoord = stepUv * uResolution.xy;",

        "            float sampleOnBackground = textTexture(stepUv).a;",

        "            float stepDistance = distance(stepCoord, fragCoord);",

        "            if (stepDistance <= blurRadius) {",
        "               float stepLightestSampleWeight = 1.0 - pow((stepDistance / blurRadius), 2.0);",

        "               stepLightestSampleWeight = smoothstep(0.0, 1.0, stepLightestSampleWeight);",

        "               float mixedStep = mix(baseSample, sampleOnBackground, stepLightestSampleWeight);",

        "               lightestSample = min(mixedStep, lightestSample);",
        "            }",
        "        }",
        "    }",


        "   return lightestSample;",

        "}",


        "float isStripe(float position, float distance, float stripeWidth, float stripeGap) {",
        "    float totalWidth = (stripeWidth + stripeGap);",
        "    float n = floor(position / totalWidth);",

        "    return 1.0 - step((totalWidth * n) + stripeWidth, position);",
        "}",


        "float isPixeled(vec2 fragCoord, float pixelWidth, float pixelGap) {",
        "    return min(isStripe(fragCoord.x, uResolution.x, pixelWidth, pixelGap),",
        "               isStripe(fragCoord.y, uResolution.y, pixelWidth, pixelGap));",
        "}",


        "float pixelNoise(vec2 fragCoord, float pixelWidth, float pixelGap, float noiseSpeed, float noiseStrength) {",
        "    float totalWidth = (pixelWidth + pixelGap) * 2.0;",
        "    vec2 pixelN = vec2(floor(fragCoord.x / totalWidth), floor(fragCoord.y / totalWidth));",

        "    return snoise(vec3(pixelN, uGlobalTime * noiseSpeed)) * noiseStrength;",
        "}",


        "vec3 stripeGradientColor(float t, float colorStripWidth) {",
        "  colorStripWidth /= uResolution.x;",

        "  float n = floor(t / colorStripWidth);",
        "  float nx = distance(n * colorStripWidth, t) / colorStripWidth;",

        "  vec3 hotRed = vec3(0.937254902, 0.1882352941, 0.3411764706);",
        "  vec3 electricGreen = vec3(0.168,0.905,0.070);",
        "  vec3 deepPurple = vec3(0.550,0.100,1.000);",

        "  vec3 pct1 = vec3(nx);",

        "  pct1.r = smoothstep(0.0,0.616, nx);",
        "  pct1.g = sin(nx * PI);",
        "  pct1.b = pow(nx,0.612);",

        "  vec3 pct2 = vec3(nx);",

        "  pct2.r = pow(smoothstep(0.0,1.104, nx), 1.36);",
        "  pct2.g = 1.0 - sin(nx * PI);",
        "  pct2.b = pow(nx,3.444);",

        "  vec3 color1 = mix(hotRed, electricGreen, pct1);",
        "  vec3 color2 = mix(deepPurple, hotRed, pct2);",

        "  return mix(color1, color2, nx);",
        "}",


        "float stripeGradientPosition(vec2 uv, float noiseDistance, float noiseAmplitude, float noiseVolatility) {",
        "  float colorT = uv.x;",
        "  float halfNoiseDistance = noiseDistance / 2.0;",
        "  float clampedChange = smoothstep(0.5 - halfNoiseDistance, 0.5 + halfNoiseDistance, uv.y); // Clamp change to be between 0.25 and 0.75 along Y.",
        "  float sinBasedChange = sin(clampedChange * PI) * noiseAmplitude;",
        "  float lineNoise = snoise(vec2(0.0, uv.y * noiseVolatility));",

        "  return colorT + (lineNoise * sinBasedChange);",
        "}",


        "vec3 desaturate(vec3 color, float Desaturation) {",
        "  vec3 grayXfer = vec3(0.3, 0.59, 0.11);",
        "  vec3 gray = vec3(dot(grayXfer, color));",
        "  return mix(color, gray, Desaturation);",
        "}",


        "void mainImage(out vec4 mainImage, in vec2 fragCoord) {",

        "    // Setup",
        "    // -------------------------------",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    float z = uGlobalTime * 0.025;",

        "    vec2 pixelLinesUv = uv;",
        "    vec2 pixelLinesFragCoord = fragCoord;",

        "    pixelLinesUv.x -= uGlobalTime * 0.1;",
        "    pixelLinesFragCoord.x += snoise(vec3(pixelLinesUv * vec2(0.5, 0.15), z)) * 15.0;",


        "    // Define Pixelation",
        "    // -------------------------------",

        "    float pixelWidth = 2.0;",
        "    float pixelGap = 2.0;",

        "    float pixel = isPixeled(pixelLinesFragCoord, pixelWidth, pixelGap);",


        "    // Define Colored Pixelation",
        "    // -------------------------------",

        "    float noiseSpeed = 100.0;",
        "    float noiseStrength = 0.15;",

        "    float noise = pixelNoise(pixelLinesFragCoord, pixelWidth, pixelGap, noiseSpeed, noiseStrength);",


        "    // Define Colored Line Position with Noise",
        "    // -------------------------------",

        "    float noiseDistance = 0.65;",
        "    float amplitudePixels = 20.0;",
        "    float noiseAmplitude = amplitudePixels / uResolution.x;",
        "    float noiseVolatility = 4.0;",

        "    float colorPosition = stripeGradientPosition(uv, noiseDistance, noiseAmplitude, noiseVolatility);",


        "    // Define Colored Line",
        "    // -------------------------------",

        "    float colorStripWidth = 50.0;",

        "    vec3 color = stripeGradientColor(colorPosition, colorStripWidth) + noise;",


        "    // Adjust Color with Time",
        "    // -------------------------------",

        "    //float timeBasedChange = (1.0 + sin(uGlobalTime * PI)) / 2.0;",

        "    //color = desaturate(color, timeBasedChange) + timeBasedChange / 2.0;",


        "    // Define Scan Lines",
        "    // -------------------------------",

        "    float stripeWidth = 4.0;",
        "    float stripeGap = 2.0;",

        "    float stripe = isStripe(pixelLinesFragCoord.x, uResolution.x, stripeWidth, stripeGap);",


        "    float amplifier = 1.5;",
        "    mainImage = vec4(vec3(color * stripe * pixel) * amplifier, 1.0) * textTexture(uv).a;",

        "}",
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.SparkleGlitchMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uAnimate : { type : "1f", value : 1.0 },
          uSpeed : { type : "1f", value : 1.0 },
          uVolatility : { type : "1f", value : 0.15 },
          uSeed : { type : "1f", value : 0.1 }
        };
      }
    };

  })());

})(
  this.Blotter, this._
);
