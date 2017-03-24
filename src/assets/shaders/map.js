// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Map = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "float map( float value, float inMin, float inMax, float outMin, float outMax )",
    "{",
    "    return ( (value - inMin) / ( inMax - inMin ) * ( outMax - outMin ) ) + outMin;",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);
