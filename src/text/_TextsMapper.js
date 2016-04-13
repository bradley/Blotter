import "../utils/";
import "Text";


var blotter_TextsMapper = function (texts) {
  this.init.apply(this, arguments);
};

blotter_TextsMapper.prototype = (function () {

  function _updateTexts (texts, eachCallback) {
    if (!(texts instanceof Array)) {
      texts = [texts];
    }

    for (var i = 0; i < texts.length; i++) {
      var text = texts[i];

      blotter_Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text or an array of Blotter.Text objects", "Blotter.Material");

      eachCallback.call(this, text)
    }

    _determineTextsMapping.call(this);
  }

  function _determineTextsMapping () {
    var packer = new GrowingPacker(),
        tempTextsBounds = [];

    // Build array of objects holding a Text object's id, width, and height for sorting.
    for (var textId in this.textsBounds) {
      if (this.textsBounds.hasOwnProperty(textId)) {
        var tempSizesObject = this.textsBounds[textId];
        tempSizesObject.referenceId = textId;
        tempTextsBounds.push(tempSizesObject);
      }
    }

    // Add fit object to all objects in tempTextsBounds.
    packer.fit(tempTextsBounds.sort(_sortTexts));

    // Add fit objects back into this.textsBounds for each Text id.
    for (var i = 0; i < tempTextsBounds.length; i++) {
      var packedSizesObject = tempTextsBounds[i];
      if (this.flipY) {
        packedSizesObject.fit.y = packer.root.h - (packedSizesObject.fit.y + packedSizesObject.h);
      }
      this.textsBounds[packedSizesObject.referenceId].fit = packedSizesObject.fit;
    }

    this.width = packer.root.w;
    this.height = packer.root.h;
  }

  function _sortTexts (textA, textB) {
    var areaA = textA.w * textA.h,
        areaB = textB.w * textB.h;

    return areaB - areaA;
  }

  function _getYOffset (size, lineHeight) {
    var lineHeight = lineHeight || blotter_TextUtils.ensurePropertyValues().leading;
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

    constructor : blotter_TextsMapper,

  	init: function (texts, options) {
      var options = options || {};

      this.pixelRatio = options.pixelRatio || 1;
      this.flipY = options.flipY || false;

      this.texts = [];
      this.textsBounds = {};
      this.width = 0;
      this.height = 0;

      this.addTexts(texts);
    },

    addTexts: function (texts) {
    	_updateTexts.call(this, texts, function(text) {
        var sizesObject = this.textsBounds[text.id];

      	if (this.texts.indexOf(text) == -1) {
          this.texts.push(text);
        }

        if (!sizesObject) {
          var size = blotter_TextUtils.sizeForText(text.value, text.properties);
          this.textsBounds[text.id] = size;
        }
      });
    },

    removeTexts: function (texts) {
      _updateTexts.call(this, texts, function(text) {
        var textsIndex = this.texts.indexOf(text);

        if (textsIndex != -1) {
          this.texts.splice(textsIndex, 1);
        }

        delete this.textsBounds[text.id];
      });
    },

    boundsFor : function (text) {
      return this.textsBounds[text.id];
    },

    toCanvas: function () {
      var canvas = blotter_CanvasUtils.hiDpiCanvas(this.width, this.height, this.pixelRatio),
          ctx = canvas.getContext("2d", { alpha: false });

      ctx.textBaseline = "middle";

      for (var i = 0; i < this.texts.length; i++) {
        var text = this.texts[i],
            fit = this.textsBounds[text.id],
            yOffset = _getYOffset.call(this, text.properties.size, text.properties.leading) / 2, // divide yOffset by 2 to accomodate `middle` textBaseline
            adjustedY = fit.fit.y + text.properties.paddingTop + yOffset;

        ctx.font = text.properties.style +
             " " + text.properties.weight +
             " " + text.properties.size + "px" +
             " " + text.properties.family;
        ctx.save();
        ctx.translate(fit.fit.x + text.properties.paddingLeft, adjustedY);
        if (this.flipY) {
          ctx.scale(1, -1);
        }
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

    getImage: function () {
    	return this.toCanvas().toDataURL();
    }
  }
})();
