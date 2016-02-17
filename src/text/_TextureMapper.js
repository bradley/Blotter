import "../extras/";

var blotter_TextMapper = function (texts, properties) {
  this.init.apply(this, arguments);
};

blotter_TextMapper.prototype = (function () {

  function _updateTexts (texts, eachCallback) {
    var self = this;

    if (typeof texts === 'string' || texts instanceof String) {
      texts = [texts];
    }

    for (var i = 0; i < texts.length; i++) {
      eachCallback.apply(this, [texts[i]])
    }

    this.textsKeys = Object.keys(this.texts);
    _determineTextsMapping.apply(this);
  }

  function _determineTextsMapping () {
    var self = this,
        packer = new GrowingPacker(),
        values = this.textsKeys.map(function(k) {
          var value = self.texts[k];
          // Set key "key" for finding value in this.texts post-sorting.
          value.key = k;
          return value;
        }, self).sort(_sortTexts);

    // Set `fit` attribute for all objects in `this.texts`.
    packer.fit(values);

    for (var k in this.texts) {
      var v = this.texts[k];
      self.texts[v.key] = v;
      // Remove key "key" from object.
      delete v.key;
    }

    // Force width/height to be equal power of 2 values for optimal textures.
    var wh = _nearestPowerOfTwo(Math.max(packer.root.w, packer.root.h));
    this.width = wh;
    this.height = wh;
  }

  function _sortTexts (textA, textB) {
    var areaA = textA.w * textA.h,
        areaB = textB.w * textB.h;
    if (areaA < areaB) {
      return 1;
    }
    if (areaA > areaB) {
      return -1;
    }

    return 0;
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

    constructor : blotter_TextMapper,

  	init: function(texts, properties) {
      this.properties = blotter_TextUtils.ensurePropertyValues(properties),

      this.texts = {};
      this.textsKeys = [];

      this.addTexts(texts);
    },

    addTexts: function(texts) {
    	_updateTexts.apply(this, [texts, function(text) {
      	if (this.textsKeys.indexOf(text) == -1) {
        	this.texts[text] = blotter_TextUtils.sizeForText(text, this.properties);
        }
      }]);
    },

    removeTexts: function(texts) {
      _updateTexts.apply(this, [texts, function(text) {
        if (this.textsKeys.indexOf(text) != -1) {
          delete this.texts[text];
        }
      }]);
    },

    toCanvas: function() {
      var canvas = blotter_CanvasUtils.hiDpiCanvas(this.width, this.height),
          ctx = canvas.getContext("2d");

      for (var k in this.texts) {
        var v = this.texts[k],
            lineHeightOffset = (((v.h * this.properties.leading) - v.h) / 2);
        ctx.font = this.properties.style + " " + this.properties.weight + " " + "12px" + " " + this.properties.family;
        ctx.fillStyle = this.properties.fill;
        ctx.fillText(
          k,
          v.fit.x + this.properties.paddingLeft,
          v.fit.y + this.properties.paddingTop + lineHeightOffset
        );
      }

      return canvas;
    },

    getImage: function() {
    	return this.toCanvas().toDataURL();
    }
  }
})();
