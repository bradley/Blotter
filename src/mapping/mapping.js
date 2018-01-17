import { bind } from "underscore";
import { TextUtils } from "../extras/textUtils";
import { Messaging } from "../extras/core/messaging";
import { Text } from "../texts/text";
import { CanvasUtils } from "../extras/canvasUtils";


var Mapping = function (texts, textBounds, width, height) {
  this.texts = texts;

  this._textBounds = textBounds;

  this._width = width;
  this._height = height;

  this._ratio = 1;
};

Mapping.prototype = (function () {

  function _getLineHeightPixels (size, lineHeight) {
    lineHeight = lineHeight || TextUtils.ensurePropertyValues().leading;
    if (!isNaN(lineHeight)) {
      lineHeight = size * lineHeight;
    } else if (lineHeight.toString().indexOf("px") !== -1) {
      lineHeight = parseInt(lineHeight);
    } else if (lineHeight.toString().indexOf("%") !== -1) {
      lineHeight = (parseInt(lineHeight) / 100) * size;
    }

    return lineHeight;
  }

  return {

    constructor : Mapping,

    get ratio () {
      return this._ratio;
    },

    set ratio (ratio) {
      this._ratio = ratio || 1;
    },

    get width () {
      return this._width * this._ratio;
    },

    get height () {
      return this._height * this._ratio;
    },

    boundsForText : function (text) {
      Messaging.ensureInstanceOf(text, Text, "Blotter.Text", "Blotter.Mapping", "boundsForText");

      var bounds = this._textBounds[text.id];

      if (bounds) {
        bounds = {
          w : bounds.w * this._ratio,
          h : bounds.h * this._ratio,
          x : bounds.x * this._ratio,
          y : bounds.y * this._ratio
        };
      }

      return bounds;
    },

    toCanvas : function (completion) {
      var canvas = CanvasUtils.hiDpiCanvas(this._width, this._height, this._ratio),
          ctx = canvas.getContext("2d", { alpha: false }),
          img = new Image();

      ctx.textBaseline = "middle";

      for (var i = 0; i < this.texts.length; i++) {
        var text = this.texts[i],
            bounds = this._textBounds[text.id],
            halfLH = (_getLineHeightPixels.call(this, text.properties.size, text.properties.leading) / 2);

        ctx.font = text.properties.style +
             " " + text.properties.weight +
             " " + text.properties.size + "px" +
             " " + text.properties.family;

        ctx.save();

        ctx.translate(
          bounds.x + text.properties.paddingLeft,
          (this._height - (bounds.y + bounds.h)) + text.properties.paddingTop
        );
        ctx.fillStyle = text.properties.fill;
        ctx.fillText(
          text.value,
          0,
          Math.round(halfLH)
        );

        ctx.restore();
      }

      img.onload = bind(function () {
        // Flip Y for WebGL
        ctx.save();
        ctx.scale(1, -1);
        ctx.clearRect(0, this._height * -1, this._width, this._height);
        ctx.drawImage(img, 0, this._height * -1, this._width, this._height);
        ctx.restore();

        completion(canvas);
      }, this);

      img.src = canvas.toDataURL("image/png");
    }
  };
})();


export { Mapping };
