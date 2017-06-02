(function(Blotter, _) {

  Blotter.Assets.Shaders.Inf = [
    "//",
    "// Author : Bradley Griffith",
    "// License : Distributed under the MIT License.",
    "//",
    "bool isinf(float val) {",
    "    return (val != 0.0 && val * 2.0 == val) ? true : false;",
    "}",
  ].join("\n");

})(
  this.Blotter, this._
);
