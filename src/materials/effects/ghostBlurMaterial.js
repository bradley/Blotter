(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.GhostBlurMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.GhostBlurMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.GhostBlurMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        "#ifdef GL_ES",
        "precision mediump float;",
        "#endif",

        "#define PI 3.14159265358",

        "//  `rand` and `noise` taken from ",
        "//  http://thebookofshaders.com/",
        "float rand (in float _x) {",
        "    return fract(sin(_x)*1e4);",
        "}",

        "float rand(vec2 co){",
        "    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
        "}",

        "float noise (in float _x) {",
        "    float i = floor(_x);",
        "    float f = fract(_x);",
        "    float u = f * f * (3.0 - 2.0 * f);",
        "    return mix(rand(i), rand(i + 1.0), u);",
        "}",

        "float noiseWave(vec2 uv, float y, float height, float volatility, float smoothing) {",
        "    // Define wave",
        "    float variance = (height / 2.0) * -1.0;",
        "    variance += noise((uv.x + (rand(y) * 1000.0)) * PI * volatility) * height;",

        "    // Adjust y",
        "    y += variance;",

        "    return smoothstep(y - smoothing, y + smoothing, uv.y);",
        "}",

        "float distortionShape(vec2 uv, float y, float height, float dHeight, float smoothing) {",
        "    // Define shape constraints",
        "    float h = height / 2.0;",
        "    float top = y + h;",
        "    float bottom = y - h;",

        "    // Define distortion",
        "    float volatility = 40.0;",

        "    float topWave = noiseWave(uv, top, dHeight, volatility, smoothing);",
        "    float bottomWave = noiseWave(uv, bottom, dHeight, volatility, smoothing);",

        "    return bottomWave - topWave;",
        "}",


        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
        "{",
        "    // Setup ========================================================================",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",
        "    vec2 p = vec2(1.0) / uResolution.xy; // 1 pixel.",
        
        "    vec4 finalColour = vec4(0.0);",


        "    // Create Distortion ============================================================",

        "    float dY = 0.5;",
        "    float dHeight = 0.606;",
        "    float dWaveHeight = 0.4545;",
        "    float distortion = distortionShape(uv, dY, dHeight, dWaveHeight, 0.429);",
        "    float amount = smoothstep(-1.0, 1.0, distortion);",


        "    // Create Darkness ==============================================================",

        "    vec2 maxRadiusUv = vec2(0.0337, 0.0625 + (0.125 * amount));",
        "    vec2 maxRadiusCoord = maxRadiusUv.xy * uResolution.xy;",
        "    float maxDistance = distance(fragCoord, fragCoord + maxRadiusCoord);",

        "    const int maxSteps = 120; // This kind of sucks but we cant use non constant values for our loops",

        "    float stepDistance = 1.0;",
        "    vec2 stepCoord = vec2(0.0);",
        "    vec2 stepUv = vec2(0.0);",
        "    vec4 stepSample = vec4(1.0);",
        "    vec4 darkestSample = vec4(1.0);",

        "    float randNoise = rand(uv * sin(uv.x * 0.025)) * 0.15;",

        "    for (int i = -maxSteps; i <= maxSteps; i += 2) {",
        "        if (abs(float(i) * p.x) >= maxRadiusUv.x) { continue; }",
        "        for (int j = -maxSteps; j <= maxSteps; j += 2) {",
        "            if (abs(float(j) * p.y) >= maxRadiusUv.y) { continue; }",

        "            stepUv = uv + vec2(float(i) * p.x, float(j) * p.y);",
        "            stepCoord = stepUv * uResolution.xy;",
        "            stepSample = textTexture(stepUv);",

        "            vec4 sampleOnBackground = vec4(0.0);",
        "            combineColors(sampleOnBackground, uBlendColor, stepSample);",

        "            stepDistance = distance(fragCoord, stepCoord) / smoothstep(-1.0, 1.0, amount);",

        "            float stepDarkestSampleWeight = 1.0 - clamp((stepDistance / maxDistance), 0.0, 1.0) + randNoise;",
        "            stepDarkestSampleWeight *= smoothstep(0.0, 7.5, amount);",

        "            vec4 mixedStep = mix(darkestSample, sampleOnBackground, stepDarkestSampleWeight);",

        "            if (mixedStep == min(mixedStep, darkestSample) && stepDistance <= maxDistance) {",
        "                darkestSample = mixedStep;",
        "            }",
        "        }",
        "    }",


        "    // Create Glow ==================================================================",

        "    float dropoff = smoothstep(0.25, 1.15, 1.0 - distance(vec2(0.0, 0.5), vec2(0.0, uv.y)));",
        "    vec4 glow = vec4(0.22745, 0.30980, 1.0, (1.0 - max(max(darkestSample.r, darkestSample.g), darkestSample.b)) * dropoff);",


        "    mainImage = glow;",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.GhostBlurMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {};
      }
    };

  })());

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
