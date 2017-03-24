// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Noise = [
    "//",
    "// Author : Patricio Gonzalez Vivo and Jen Lowe",
    "// License : Distributed under the MIT License.",
    "// Source : https://github.com/patriciogonzalezvivo/thebookofshaders",
    "//",
    Blotter.Assets.Shaders.Random,
    "float noise (in float _x) {",
    "    float i = floor(_x);",
    "    float f = fract(_x);",
    "    float u = f * f * (3.0 - 2.0 * f);",
    "    return mix(random(i), random(i + 1.0), u);",
    "}",
    "",
    "float noise (in vec2 _st) {",
    "    vec2 i = floor(_st);",
    "    vec2 f = fract(_st);",
    "    // Four corners in 2D of a tile",
    "    float a = random(i);",
    "    float b = random(i + vec2(1.0, 0.0));",
    "    float c = random(i + vec2(0.0, 1.0));",
    "    float d = random(i + vec2(1.0, 1.0));",
    "    vec2 u = f * f * (3.0 - 2.0 * f);",
    "    return mix(a, b, u.x) + ",
    "            (c - a)* u.y * (1.0 - u.x) + ",
    "            (d - b) * u.x * u.y;",
    "}",
  ].join("\n");

})(
  this.Blotter, this._
);
