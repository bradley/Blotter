// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Random = [
    "//",
    "// Author : Patricio Gonzalez Vivo and Jen Lowe",
    "// License : Distributed under the MIT License.",
    "// Source : https://github.com/patriciogonzalezvivo/thebookofshaders",
    "//",
    "",
    "float random (in float _x) {",
  	"    return fract(sin(_x)*1e4);",
  	"}",
  	"",
  	"float random (in vec2 co) {",
  	"    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);",
	  "}"
  ].join("\n");

})(
  this.Blotter, this._
);
