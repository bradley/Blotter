import "description";
import "size";
import "../messaging/";

var blotter_TextureMapper = function (textDescriber, texts) {
  this.init.apply(this, arguments);
};

blotter_TextureMapper.prototype = {
	init: function(textDescriber, texts) {
    if (!(textDescriber instanceof BLOTTER.TextDescription)) {
      blotter_error("blotter_textureMapper", "second argument must be of type Blotter.TextDescription");
    }
    this.textDescriber = textDescriber;

    this.texts = {};
    this.textsKeys = [];

    this.addTexts(texts);
  },

  addTexts: function(texts) {
  	this.updateTexts(texts, function(text) {
    	if (this.textsKeys.indexOf(text) == -1) {
      	this.texts[text] = this.textSizeForText(text);
      }
    });
  },

  removeTexts: function(texts) {
  	this.updateTexts(texts, function(text) {
    	if (this.textsKeys.indexOf(text) != -1) {
        delete this.texts[text];
      }
    });
  },

  updateTexts: function(texts, eachCallback) {
    var self = this;

  	if (typeof texts === 'string' || texts instanceof String) {
    	texts = [texts];
    }

    for (var i = 0; i < texts.length; i++) {
      eachCallback.apply(this, [texts[i]])
    }

    this.textsKeys = Object.keys(this.texts);
    this.determineTextsMapping();
  },

  textSizeForText: function(text) {
  	var size = blotter_getTextSize(
          text,
          this.textDescriber.fontFamily,
          this.textDescriber.fontSize
        );

    size.w += this.textDescriber.paddingLeft + this.textDescriber.paddingRight;
    size.h += this.textDescriber.paddingTop + this.textDescriber.paddingBottom;

    return size;
  },

  determineTextsMapping: function() {
    var self = this,
        packer = new GrowingPacker(),
        values = this.textsKeys.map(function(k) {
        	var value = self.texts[k];
          // Set key "key" for finding value in this.texts post-sorting.
          value.key = k;
          return value;
        }, self).sort(this.sortTexts);

    // Set `fit` attribute for all objects in `this.texts`.
    packer.fit(values);

    for (var k in this.texts) {
      var v = this.texts[k];
    	self.texts[v.key] = v;
      // Remove key "key" from object.
      delete v.key;
    }

    // Force width/height to be equal power of 2 values for optimal textures.
    var wh = this.nearestPowerOfTwo(Math.max(packer.root.w, packer.root.h));
    this.width = wh;
    this.height = wh;
  },

  sortTexts: function(textA, textB) {
    var areaA = textA.w * textA.h,
        areaB = textB.w * textB.h;
    if (areaA < areaB) {
      return 1;
    }
    if (areaA > areaB) {
      return -1;
    }

    return 0;
  },

  nearestPowerOfTwo : function(n) {
    // Note: As yet unsure what an actual appropriate maximum would be here and
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
  },

  getCanvas: function() {
    var canvas = blotter_hiDpiCanvas(this.width, this.height),
        ctx = canvas.getContext("2d");

    for (var k in this.texts) {
      var v = this.texts[k],
          lineHeightOffset = (((v.h * this.textDescriber.lineHeight) - v.h) / 2);
      ctx.font = this.textDescriber.fontSize + " " + this.textDescriber.fontFamily;
      ctx.fillStyle = this.textDescriber.fillStyle;
      ctx.fillText(
        k,
        v.fit.x + this.textDescriber.paddingLeft,
        v.fit.y + this.textDescriber.paddingTop + lineHeightOffset
      );
    }

    return canvas;
  },

  getImage: function() {
  	return this.getCanvas().toDataURL();
  }
}
