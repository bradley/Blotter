(function(Blotter, _) {

  Blotter.Assets.Shaders.Blending = [
    "//",
    "// Author : Bradley Griffith",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "// Returns the resulting blend color by blending a top color over a base color",
    "highp vec4 normalBlend(highp vec4 topColor, highp vec4 baseColor) {",
    "  highp vec4 blend = vec4(0.0);",

    "  // HACK",
    "  // Cant divide by 0 (see the 'else' alpha) and after a lot of attempts",
    "  // this simply seems like the only solution Im going to be able to come up with to get alpha back.",
    "  if (baseColor.a == 1.0) {",
    "    baseColor.a = 0.9999999;",
    "  };",

    "  if (topColor.a >= 1.0) {",
    "    blend.a = topColor.a;",
    "    blend.r = topColor.r;",
    "    blend.g = topColor.g;",
    "    blend.b = topColor.b;",
    "  } else if (topColor.a == 0.0) {",
    "    blend.a = baseColor.a;",
    "    blend.r = baseColor.r;",
    "    blend.g = baseColor.g;",
    "    blend.b = baseColor.b;",
    "  } else {",
    "    blend.a = 1.0 - (1.0 - topColor.a) * (1.0 - baseColor.a); // alpha",
    "    blend.r = (topColor.r * topColor.a / blend.a) + (baseColor.r * baseColor.a * (1.0 - topColor.a) / blend.a);",
    "    blend.g = (topColor.g * topColor.a / blend.a) + (baseColor.g * baseColor.a * (1.0 - topColor.a) / blend.a);",
    "    blend.b = (topColor.b * topColor.a / blend.a) + (baseColor.b * baseColor.a * (1.0 - topColor.a) / blend.a);",
    "  }",

    "  return blend;",
    "}",

    "// Returns a vec4 representing the original top color that would have been needed to blend",
    "//  against a passed in base color in order to result in the passed in blend color.",
    "highp vec4 normalUnblend(highp vec4 blendColor, highp vec4 baseColor) {",
    "  highp vec4 unblend = vec4(0.0);",

    "  // HACKY",
    "  // Cant divide by 0 (see alpha) and after a lot of attempts",
    "  // this simply seems like the only solution Im going to be able to come up with to get alpha back.",
    "  if (baseColor.a == 1.0) {",
    "    baseColor.a = 0.9999999;",
    "  }",

    "  unblend.a = 1.0 - ((1.0 - blendColor.a) / (1.0 - baseColor.a));",
    "  // Round to two decimal places",
    "  unblend.a = (sign(100.0 * unblend.a) * floor(abs(100.0 * unblend.a) + 0.5)) / 100.0;",

    "  if (unblend.a >= 1.0) {",
    "    unblend.r = blendColor.r;",
    "    unblend.g = blendColor.g;",
    "    unblend.b = blendColor.b;",
    "  } else if (unblend.a == 0.0) {",
    "    unblend.r = baseColor.r;",
    "    unblend.g = baseColor.g;",
    "    unblend.b = baseColor.b;",
    "  } else {",
    "    unblend.r = (blendColor.r - (baseColor.r * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);",
    "    unblend.g = (blendColor.g - (baseColor.g * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);",
    "    unblend.b = (blendColor.b - (baseColor.b * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);",
    "  }",

    "  return unblend;",
    "}",
  ].join("\n");

})(
  this.Blotter, this._
);
