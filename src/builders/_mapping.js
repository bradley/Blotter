(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._Mapping = function (texts, textBounds, width, height) {
    this.texts = texts;

    this._textBounds = textBounds;

    this._width = width;
    this._height = height;

    this._ratio = 1;
  };

  Blotter._Mapping.prototype = (function () {

    function _getYOffset (size, lineHeight) {
      lineHeight = lineHeight || Blotter._TextUtils.ensurePropertyValues().leading;
      if (!isNaN(lineHeight)) {
        lineHeight = size * lineHeight;
      } else if (lineHeight.toString().indexOf('px') !== -1) {
        lineHeight = parseInt(lineHeight);
      } else if (lineHeight.toString().indexOf('%') !== -1) {
        lineHeight = (parseInt(lineHeight) / 100) * size;
      }

      return lineHeight;
    }

    return {

      constructor : Blotter._Mapping,

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
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");

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

      toCanvas : function () {
        var canvas = Blotter._CanvasUtils.hiDpiCanvas(this._width, this._height, this._ratio),
            ctx = canvas.getContext("2d", { alpha: false });

        ctx.textBaseline = "middle";

        for (var i = 0; i < this.texts.length; i++) {
          var text = this.texts[i],
              bounds = this._textBounds[text.id],
              yOffset = _getYOffset.call(this, text.properties.size, text.properties.leading) / 2, // divide yOffset by 2 to accomodate `middle` textBaseline
              adjustedY = bounds.y + text.properties.paddingTop + yOffset;

          ctx.font = text.properties.style +
               " " + text.properties.weight +
               " " + text.properties.size + "px" +
               " " + text.properties.family;
          ctx.save();
          ctx.translate(bounds.x + text.properties.paddingLeft, adjustedY);
          // Flip Y. Ultimately, webgl context will be output flipped vertically onto 2d contexts.
          ctx.scale(1, -1);
          ctx.fillStyle = text.properties.fill;
          ctx.fillText(
            text.value,
            0,
            0
          );

          ctx.restore();
        }

        return canvas;
      },

      toDataURL : function () {
        return this.toCanvas().toDataURL();
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
