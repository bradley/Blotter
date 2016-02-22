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

    // Force width/height to be equal power of 2 values for optimal textures.
    var wh = _nearestPowerOfTwo(Math.max(packer.root.w, packer.root.h));
    this.width = this.height = wh;
  }

  function _sortTexts (textA, textB) {
    var areaA = textA.w * textA.h,
        areaB = textB.w * textB.h;

    return areaB - areaA;
  }

  function _nearestPowerOfTwo (n) {
    // TODO: Pretty not great. As yet unsure what an actual appropriate maximum would be here and
    //   in any case we need to probably throw an error if it exceeds 32768...
    var powers = [8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768],
        nearest = powers[powers.length - 1];
    for (var i = 0; i < powers.length; i++) {
      var next = powers[i + 1];
      if (powers[i] < n && next >= n) {
        nearest = next;
      }
    }
    return nearest;
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
