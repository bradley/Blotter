// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Gamma = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "const vec3 cGammaCorrection = vec3( 0.4545454545 );",
    "",
    "vec3 gamma( in vec3 color )",
    "{",
    "  return pow( color, cGammaCorrection );",
    "}",
    "",
    "vec4 gamma( in vec4 color )",
    "{",
    "  return vec4( gamma( color.rgb ), color.a );",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);
