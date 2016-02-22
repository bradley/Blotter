import "../extras/";
import "Text";


Blotter.Mapper = function (texts) {
  this.init.apply(this, arguments);
};

Blotter.Mapper.prototype = (function () {

  function _updateTexts (texts, eachCallback) {
    if (!(texts instanceof Array)) {
      texts = [texts];
    }

    for (var i = 0; i < texts.length; i++) {
      var text = texts[i];

      if (texts instanceof Blotter.Text) {
        blotter_Messaging.throwError("Blotter.Mapper", "argument must be instance of Blotter.Text or array of objects that are instances of Blotter.Text");
      }

      eachCallback.call(this, text)
    }

    _determineTextsMapping.call(this);
  }

  function _determineTextsMapping () {
    var packer = new GrowingPacker(),
        tempTextsSizesArray = [];

    // Build array of objects holding a Text object's id, width, and height for sorting.
    for (var textId in this.textsSizes) {
      var tempSizesObject = this.textsSizes[textId];
      tempSizesObject.referenceId = textId;
      tempTextsSizesArray.push(tempSizesObject);
    }

    // Add fit object to all objects in tempTextsSizesArray.
    packer.fit(tempTextsSizesArray.sort(_sortTexts));


    // Add fit objects back into this.textsSizes for each Text id.
    for (var i = 0; i < tempTextsSizesArray.length; i++) {
      var packedSizesObject = tempTextsSizesArray[i];
      this.textsSizes[packedSizesObject.referenceId].fit = packedSizesObject.fit;
    }

    this.width = packer.root.w;
    this.height = packer.root.h;
  }

  function _sortTexts (textA, textB) {
    var areaA = textA.w * textA.h,
        areaB = textB.w * textB.h;

    return areaB - areaA;
  }

  return {

    constructor : Blotter.Mapper,

  	init: function (texts) {
      this.texts = [];
      this.textsSizes = {};
      this.width = 0;
      this.height = 0;

      this.addTexts(texts);
    },

    addTexts: function (texts) {
    	_updateTexts.call(this, texts, function(text) {
        var sizesObject = this.textsSizes[text.id];

      	if (this.texts.indexOf(text) == -1) {
          this.texts.push(text);
        }

        if (!sizesObject) {
          var size = blotter_TextUtils.sizeForText(text.value, text.properties);
          this.textsSizes[text.id] = size;
        }
      });
    },

    removeTexts: function (texts) {
      _updateTexts.call(this, texts, function(text) {
        var textsIndex = this.texts.indexOf(text);

        if (textsIndex != -1) {
          this.texts.splice(textsIndex, 1);
        }

        delete this.textsSizes[text.id];
      });
    },

    sizeForText : function (text) {
      return this.textsSizes[text.id];
    },

    toCanvas: function () {
      var canvas = blotter_CanvasUtils.hiDpiCanvas(this.width, this.height),
          ctx = canvas.getContext("2d");

      for (var i = 0; i < this.texts.length; i++) {
        var text = this.texts[i],
            size = this.textsSizes[text.id],
            lineHeightOffset = (((size.h * text.properties.leading) - size.h) / 2);

        ctx.font = text.properties.style + " " + text.properties.weight + " " + text.properties.size + "px " + text.properties.family;
        ctx.fillStyle = text.properties.fill;
        ctx.fillText(
          text.value,
          size.fit.x + text.properties.paddingLeft,
          size.fit.y + text.properties.paddingTop + lineHeightOffset
        );
      }

      return canvas;
    },

    getImage: function () {
    	return this.toCanvas().toDataURL();
    }
  }
})();
