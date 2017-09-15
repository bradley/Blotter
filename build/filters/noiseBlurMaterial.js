(function(Blotter, _) {

  Blotter.NoiseBlurMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.NoiseBlurMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.NoiseBlurMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.Noise3D,

        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
        "{",
        "    // Setup ========================================================================",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",
        "    float z = uAnimate == 0.0 ? uSeed : uGlobalTime * uSpeed;",

        "    uv += snoise(vec3(uv, z)) * uVolatility;",

        "    mainImage = textTexture(uv);",

        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.NoiseBlurMaterial,

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
