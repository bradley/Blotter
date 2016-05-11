// The MIT License
//
// Copyright © 2015-2016 blotter bradley / http://bradley.computer
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
(function(previousBlotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  var root = this;

  var RendererTextItem = function (textObject, eventCallbacks) {

    return {
      textObject : textObject,

      eventCallbacks : eventCallbacks || {},

      unsetEventCallbacks : function () {
        _.each(this.eventCallbacks, _.bind(function (callback, eventKey) {
          this.textObject.off(eventKey, callback);
        }, this));
      }
    };
  };


  var Blotter = root.Blotter = previousBlotter = function (material, options) {
// ### - remove this shit following documentation.
    // There is a negative coorelation between the sampleAccuracy value and
    // the speed at which texture generation happens.
    // However, the lower this value, the less sampleAccuracy you can expect
    // for indexing into uniforms for any given text.
    // Value must be between 0.0 and 1.0, and you are advised to keep it around 0.5.
    _.defaults(this, options, {
      ratio          : Blotter._CanvasUtils.pixelRatio,
      autostart      : true,
      autobuild      : true,
      sampleAccuracy : 0.5
    });

    if (!Detector.webgl) {
  // ### - messaging
      Blotter._Messaging.throwError("Blotter", "device does not support webgl");
    }

    this.Version = "v0.1.0";

    this._texts = {};
    this._scopes = {};

    this._backBuffer = new Blotter._BackBufferRenderer();

    this._currentAnimationLoop = false;

    this.imageData = false;

    _.extendOwn(this, EventEmitter.prototype);
    this.init.apply(this, arguments);
  };

  Blotter.prototype = (function () {

    function _loop () {
      this._backBuffer.render();
      this.imageData = this._backBuffer.imageData;

      _.each(this._scopes, _.bind(function (scope) {
        if (scope.playing) {
          scope.update();
        }
      }, this));

      this._currentAnimationLoop = root.requestAnimationFrame(_.bind(function () {
        _loop.call(this);
      }, this));
    }

    function _setMaterial (material) {
      if (!material || !(material instanceof Blotter.Material)) {
  // ### - messaging
        Blotter._Messaging.throwError("Blotter.Renderer", "a material must be provided");
      }
      else {
        this.material = material;
        this.material.on("build", _.bind(function () {
          this._backBuffer.width = this.material.width;
          this._backBuffer.height = this.material.height;
          this._backBuffer.material = this.material.threeMaterial;

          _updateScopes.call(this);
          this.trigger("build");
        }, this));

        this.material.on("update", _.bind(function () {
          _update.call(this);
        }, this));
      }
    }

    function _updateScopes () {
      _.each(this._scopes, _.bind(function (scope, textId) {
        scope.needsMaterialUpdate = true;
      }, this));
    }

    function _filterTexts (texts) {
      if (texts instanceof Blotter.Text) {
        texts = [texts];
      }
      else {
        texts = _.toArray(texts);
      }

      return _.filter(texts, _.bind(function (text) {
        var isText = text instanceof Blotter.Text;

        if (!isText) {
  // ### - messaging
          Blotter._Messaging.logError("Blotter.Renderer", "object not instance of Blotter.Text");
        }

        return isText;
      }, this));
    }

    function _addTexts (texts) {
      _.each(texts, _.bind(function (text) {

  // ### - still dont really like these. wonder if we can bind directly to the text somehow and still be able to unbind. maybe texts need a reference to renderer?
        this._texts[text.id] = new RendererTextItem(text, {
          update : _.bind(function () {
            _update.call(this);
          }, this)
        });
        text.on("update", this._texts[text.id].eventCallbacks.update);

        this._scopes[text.id] = new Blotter._RendererScope(text, this);
      }, this));
    }

    function _removeTexts (texts) {
      _.each(texts, _.bind(function (text) {
        text.unsetEventCallbacks();

        delete this._texts[text.id];
        delete this._scopes[text.id];
      }, this));
    }

    function _update () {
      this.material.build(_.pluck(this._texts, "textObject"), this.ratio, this.sampleAccuracy);
    }

    return {

      constructor : Blotter,

      //set texts (v) {
  // ### - messaging
        //Blotter._Messaging.logError("Blotter", "Please use #addTexts or #removeTexts to manipulate Blotter.Text objects in your Blotter instance.");
      //},

      get texts () {
        return this._texts;
      },

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get needsUpdate () { }, // jshint

      init : function (material, options) {
        _setMaterial.call(this, material);

        this.addTexts(options.texts);

        if (this.autobuild) {
          this.needsUpdate = true;
        }

        if (this.autostart) {
          this.start();
        }
      },

      start : function () {
        if (!this._currentAnimationLoop) {
          _loop.call(this);
        }
      },

      stop : function () {
        if (this._currentAnimationLoop) {
          root.cancelAnimationFrame(this._currentAnimationLoop);
          this._currentAnimationLoop = undefined;
        }
      },

      teardown : function () {
        this.stop();
        if (this._backBuffer) this._backBuffer.teardown();
        this.renderer = null;
      },

      addText : function (text) {
        this.addTexts(text);
      },

      addTexts : function (texts) {
        var filteredTexts = _filterTexts.call(this, texts),
            currentPrivateTextIds = _.keys(this._texts),
            filteredTextIds = _.pluck(filteredTexts, "id"),
            newTextIds = _.difference(filteredTextIds, currentPrivateTextIds),
            newTexts = _.filter(filteredTexts, function(text) {
              return _.indexOf(newTextIds, text.id) > -1;
            });

        _addTexts.call(this, newTexts);
      },

      removeText : function (text) {
        this.removeTexts(text);
      },

      removeTexts : function (texts) {
        var filteredTexts = _filterTexts.call(this, texts),
            currentPrivateTextIds = _.keys(this._texts),
            filteredTextIds = _.pluck(filteredTexts, "id"),
            removedTextIds = _.difference(currentPrivateTextIds, filteredTextIds),
            removedTexts = _.filter(filteredTexts, function(text) {
              return _.indexOf(removedTextIds, text.id) > -1;
            });

        _removeTexts.call(this, removedTexts);
      },

      forText : function (text, options) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Renderer");

        if (!(this._scopes[text.id])) {
  // ### - messaging
          Blotter._Messaging.logError("Blotter.Renderer", "Blotter.Text object not found in blotter. Set needsUpdate to true.");
          return;
        }
  // ### - this is dumb. what if user calls this multiple times (autoplay config..)?
        options = _.defaults(options, {
          autoplay : true
        });

        if (options.autoplay) {
          this._scopes[text.id].playing = true;
        }

        return this._scopes[text.id];
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._Messaging = (function () {

    function _formattedMessage (domain, message) {
      return domain + ": " + message;
    }

    return {

  // ### - messaging. is this really necessary?
      ensureInstanceOf : function (object, constructor, constructorStr, domain) {
        if (!(object instanceof constructor)) {
          this.logError(domain, "argument must be instanceof " + constructorStr);
          return;
        }
      },

      logError : function (domain, message) {
        var formatted = _formattedMessage(domain, message);
        console.error(formatted);
      },

      throwError : function (domain, message) {
        var formatted = _formattedMessage(domain, message);
        throw formatted;
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._VendorPrefixes = ["ms", "moz", "webkit", "o"];

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._CanvasUtils = {

    // Creates and returns a high a canvas

    canvas : function (w, h) {
      var canvas = document.createElement("canvas");

      canvas.width = w;
      canvas.height = h;

      return canvas;
    },

  	// Creates and returns a high DPI canvas based on a device specific pixel ratio

  	hiDpiCanvas : function (w, h, ratio) {
  	  ratio = ratio || this.pixelRatio;
  	  var canvas = document.createElement("canvas");

  	  canvas.width = w * ratio;
  	  canvas.height = h * ratio;
  	  canvas.style.width = w + "px";
  	  canvas.style.height = h + "px";
  	  canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);

  	  return canvas;
  	},

  	// Returns the device's pixel ratio

  	pixelRatio : (function () {
      var ctx = document.createElement("canvas").getContext("2d"),
          dpr = window.devicePixelRatio || 1,
          bsr = ctx.backingStorePixelRatio;

      for(var x = 0; x < Blotter._VendorPrefixes.length && !bsr; ++x) {
        bsr = ctx[Blotter._VendorPrefixes[x]+"BackingStorePixelRatio"];
      }

      bsr = bsr || 1;

      return (dpr / bsr);
    })(),

    // Returns the mouse position within a canvas

    mousePosition : function (canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    },

    // Returns the mouse position within a canvas, normalized to a value between 0 and 1

    normalizedMousePosition : function (canvas, event) {
      var rect = canvas.getBoundingClientRect(),
          position = this.mousePosition(canvas, event);

      return {
        x: position.x / rect.width,
        y: position.y / rect.height
      };
    }
  };

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

	Blotter._PropertyDefaults = {
		family       : 'sans-serif',
		size         : 12,
		leading      : 1.5,
		fill         : '#000',
		style        : 'normal',
		weight       : 500,
		padding      : 0,
		paddingTop   : 0,
		paddingRight : 0,
		paddingBottom: 0,
		paddingLeft  : 0
	};

	Blotter._TextUtils = {

		Properties : _.keys(Blotter._PropertyDefaults),

		// Recieves property values (optional) and fills in any missing values with default values

		ensurePropertyValues : function(properties) {
			properties = _.defaults(properties || {}, Blotter._PropertyDefaults);
			return properties;
		},

		// Format padding values from style properties for passing to document

		stringifiedPadding : function(properties) {
			var _properties = properties || this.ensurePropertyValues(),
					pTop = properties.paddingTop || _properties.padding,
					pRight = _properties.paddingRight || _properties.padding,
					pBottom = _properties.paddingBottom || _properties.padding,
					pLeft = _properties.paddingLeft || _properties.padding;

			return pTop + "px " + pRight + "px " + pBottom + "px " + pLeft + "px";
		},

		// Determines size of text within the document given certain style properties

		sizeForText : function(textValue, properties) {
			var el = document.createElement('p'),
		  		size;

		  properties = this.ensurePropertyValues(properties);

		  el.innerHTML = textValue;
		  el.style.fontFamily = properties.family;
		  el.style.fontSize = properties.size + "px";
		  el.style.fontWeight = properties.weight;
		  el.style.fontStyle = properties.style;
		  el.style.padding = this.stringifiedPadding(properties);
		  el.style.lineHeight = properties.leading;
		  el.style.visibility = "hidden";
		  el.style.display = "inline-block";

		  document.body.appendChild(el);

		  size = {
		  	w: el.offsetWidth,
		    h: el.offsetHeight
		  };

		  document.body.removeChild(el);

		  return size;
		}
	};

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._UniformUtils = {

    // Uniform type values we accept for user defined uniforms

    UniformTypes : ["1f", "2f", "3f", "4f"],

    // Determine if value is valid for user defined uniform type

    validValueForUniformType : function (type, value) {
      var valid = false,
          isValid = function (element, index, array) {
            return !isNaN(element);
          };

      switch (type) {
        case '1f':
          valid = !isNaN(value) && [value].every(isValid);
          break;

        case '2f':
          valid = _.isArray(value) && value.length == 2 && value.every(isValid);
          break;

        case '3f':
          valid = _.isArray(value) && value.length == 3 && value.every(isValid);
          break;

        case '4f':
          valid = _.isArray(value) && value.length == 4 && value.every(isValid);
          break;

        default:
          break;
      }

      return valid;
    },

    glslDataTypeForUniformType : function (type) {
      var dataType;
      switch (type) {
        case '1f':
          dataType = "float";
          break;

        case '2f':
          dataType = "vec2";
          break;

        case '3f':
          dataType = "vec3";
          break;

        case '4f':
          dataType = "vec4";
          break;

        default:
          break;
      }

      return dataType;
    },

    fullSwizzleStringForUniformType : function (type) {
      var swizzleString;

      switch (type) {
        case '1f':
          swizzleString = "x";
          break;

        case '2f':
          swizzleString = "xy";
          break;

        case '3f':
          swizzleString = "xyz";
          break;

        case '4f':
          swizzleString = "xyzw";
          break;

        default:
          break;
      }

      return swizzleString;
    },

    // Given an object containing uniform descriptions, return an object containing only valid uniforms based on the uniform's type and value

    extractValidUniforms : function (uniforms, domain) {
      uniforms = uniforms || {};
      return _.reduce(uniforms, function (memo, uniformObject, uniformName) {
        if (Blotter._UniformUtils.UniformTypes.indexOf(uniformObject.type) == -1) {
  // ### - messaging
          Blotter._Messaging.logError(domain, "uniforms must be one of type: " +
            Blotter._UniformUtils.UniformTypes.join(", "));
          return memo;
        }

        if (!Blotter._UniformUtils.validValueForUniformType(uniformObject.type, uniformObject.value)) {
  // ### - messaging
          Blotter._Messaging.logError(domain, "uniform value for " + uniformName + " is incorrect for type: " + uniformObject.type);
          return memo;
        }
  // ### - should extract out keys from uniformObject that arent either type or value.
        memo[uniformName] = uniformObject;
        return memo;
      }, {});
    }

  };

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._TextsMapper = function () {
    this.width = 0;
    this.height = 0;

    this.texts = [];
    this.ratio = Blotter._CanvasUtils.pixelRatio;

    this._textsBounds = {};

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter._TextsMapper.prototype = (function () {

    function _determineTextsMapping () {
      var packer = new GrowingPacker(),
          tempTextsBounds = [];

      // Build array of objects holding a Text object's id, width, and height for sorting.
      for (var textId in this._textsBounds) {
        if (this._textsBounds.hasOwnProperty(textId)) {
          var tempSizesObject = this._textsBounds[textId];
          tempSizesObject.referenceId = textId;
          tempTextsBounds.push(tempSizesObject);
        }
      }

      // Add fit object to all objects in tempTextsBounds.
      packer.fit(tempTextsBounds.sort(_sortTexts));

      // Add fit objects back into this._textsBounds for each Text id.
      for (var i = 0; i < tempTextsBounds.length; i++) {
        var packedSizesObject = tempTextsBounds[i];
        packedSizesObject.fit.y = packer.root.h - (packedSizesObject.fit.y + packedSizesObject.h);
        this._textsBounds[packedSizesObject.referenceId].fit = packedSizesObject.fit;
      }

      this.width = packer.root.w;
      this.height = packer.root.h;
    }

    // Sort texts based on area of space required for any given text, descending

    function _sortTexts (textA, textB) {
      var areaA = textA.w * textA.h,
          areaB = textB.w * textB.h;

      return areaB - areaA;
    }

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

    function _setBaseTextsBounds () {
      _.reduce(this.texts, _.bind(function (textsBounds, text) {
        var size = Blotter._TextUtils.sizeForText(text.value, text.properties);
        textsBounds[text.id] = size;
        return textsBounds;
      }, this), this._textsBounds);
    }

    return {

      constructor : Blotter._TextsMapper,

      build : function (texts, ratio) {
        this.texts = texts;
        this.ratio = ratio;

        setImmediate(_.bind(function() {
          _setBaseTextsBounds.call(this);
          _determineTextsMapping.call(this);

          this.trigger("build");
        }, this));
      },

      boundsFor : function (text) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");
        return this._textsBounds[text.id];
      },

      toCanvas : function () {
        var canvas = Blotter._CanvasUtils.hiDpiCanvas(this.width, this.height, this.ratio),
            ctx = canvas.getContext("2d", { alpha: false });

        ctx.textBaseline = "middle";

        for (var i = 0; i < this.texts.length; i++) {
          var text = this.texts[i],
              fit = this._textsBounds[text.id],
              yOffset = _getYOffset.call(this, text.properties.size, text.properties.leading) / 2, // divide yOffset by 2 to accomodate `middle` textBaseline
              adjustedY = fit.fit.y + text.properties.paddingTop + yOffset;

          ctx.font = text.properties.style +
               " " + text.properties.weight +
               " " + text.properties.size + "px" +
               " " + text.properties.family;
          ctx.save();
          ctx.translate(fit.fit.x + text.properties.paddingLeft, adjustedY);
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

      getImage : function () {
      	return this.toCanvas().toDataURL();
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Text = function (value, properties) {
    this.id = THREE.Math.generateUUID();
    this.value = value;
    this.properties = Blotter._TextUtils.ensurePropertyValues(properties);

    this.init.apply(this, arguments);
  };

  Blotter.Text.prototype = (function () {
    function _setupEventEmission () {
      _.extendOwn(this, EventEmitter.prototype);
    }

    function _update () {
      this.trigger("update");
    }

    return {

      constructor : Blotter.Text,

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get needsUpdate () { }, // jshint

      init : function (value, properties) {
        _setupEventEmission.call(this);
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._TextsTexture = function(mapper) {
    this._mapper = mapper;

    // Stub texture - resets on build.
    this.texture = new THREE.Texture();

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter._TextsTexture.prototype = (function() {

    return {

      constructor : Blotter._TextsTexture,

      build : function () {
        var loader = new THREE.TextureLoader();
        loader.load(this._mapper.getImage(), _.bind(function(texture) {
          this.texture = texture;
          this.texture.generateMipmaps = false;
          this.texture.minFilter = THREE.LinearFilter;
          this.texture.magFilter = THREE.LinearFilter;
          this.texture.needsUpdate = true;

          this.trigger("build");
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  // Create a Data Texture the size of our text map wherein every texel holds the index of text whose boundaries contain the given texel's position.

  Blotter._TextsIndicesTexture = function (mapper, sampleAccuracy) {
    this._mapper = mapper;
    this._texts = mapper.texts;
    this._sampleAccuracy = sampleAccuracy;

    this._width = this._mapper.width * this._sampleAccuracy;
    this._height = this._mapper.height * this._sampleAccuracy;

    // Stub texture - resets on build.
    this.texture = new THREE.DataTexture([], 0, 0, THREE.RGBAFormat, THREE.FloatType);

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter._TextsIndicesTexture.prototype = (function () {

    function _textsIndices (completion) {
      var points = new Float32Array((this._height * this._width) * 4),
          widthStepModifier = this._width % 1,
          indicesOffset = (1 / this._texts.length) / 2; // Values stored in this texture will be sampled from the 'middle' of their texel position.

      setImmediate(_.bind(function() {
        for (var i = 1; i < points.length / 4; i++) {

          var y = Math.ceil(i / (this._width - widthStepModifier)),
              x = i - ((this._width - widthStepModifier) * (y - 1)),
              refIndex = 0.0,
              bg = 0.0,
              a = 0.0;

          for (var ki = 0; ki < this._texts.length; ki++) {
            var text = this._texts[ki],
                bounds = this._mapper.boundsFor(text),
                fitY = bounds.fit.y * this._sampleAccuracy,
                fitX = bounds.fit.x * this._sampleAccuracy,
                vH = bounds.h * this._sampleAccuracy,
                vW = bounds.w * this._sampleAccuracy;

            // If x and y are within the fit bounds of the text space within our mapped texts texture.
            if (y >= fitY &&
                y <= fitY + vH &&
                x >= fitX &&
                x <= fitX + vW) {
              refIndex = (ki / this._texts.length) + indicesOffset;
              a = 1.0;
              break;
            }
          }

          var index = i - 1;
          points[4*index+0] = refIndex;
          points[4*index+1] = bg;
          points[4*index+2] = bg;
          points[4*index+3] = a;
        }

        completion(points);
      }, this));
    }

    return {

      constructor : Blotter._TextsIndicesTexture,

      build : function () {
        _textsIndices.call(this, _.bind(function (dataPoints) {
          this.texture = new THREE.DataTexture(dataPoints, this._width, this._height, THREE.RGBAFormat, THREE.FloatType);
          this.texture.flipY = true;
          this.texture.needsUpdate = true;

          this.trigger("build");
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);


(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  // Create a Data Texture holding the boundaries (x/y offset and w/h) that should be available to any given texel for any given text.

  Blotter._TextsBoundsTexture = function (mapper) {
    this._mapper = mapper;
    this._texts = this._mapper.texts;
    this._width = this._mapper.width;
    this._height = this._mapper.height;
    this._ratio = this._mapper.ratio;

    // Stub texture - resets on build.
    this.texture = new THREE.DataTexture([], 0, 0, THREE.RGBAFormat, THREE.FloatType);

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter._TextsBoundsTexture.prototype = (function () {

    function _spriteBounds (completion) {
      var data = new Float32Array(this._texts.length * 4);

      setImmediate(_.bind(function() {
        for (var i = 0; i < this._texts.length; i++) {
          var text = this._texts[i],
              bounds = this._mapper.boundsFor(text);

          data[4*i]   = bounds.fit.x * this._ratio;                                             // x
          data[4*i+1] = (this._height * this._ratio) - ((bounds.fit.y + bounds.h) * this._ratio); // y
          data[4*i+2] = bounds.w * this._ratio;                                                 // w
          data[4*i+3] = bounds.h * this._ratio;                                                 // h
        }

        completion(data);
      }, this));
    }

    return {

      constructor : Blotter._TextsBoundsTexture,

      build : function () {
        _spriteBounds.call(this, _.bind(function(spriteData) {
          this.texture = new THREE.DataTexture(spriteData, this._texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
          this.texture.needsUpdate = true;

          this.trigger("build");
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._MaterialScope = function (text, material) {
    this._dataIndex = -1;

    this.text = text;
    this.material = material;
    this.uniforms = {};
  };

  Blotter._MaterialScope.prototype = (function () {

    function _buildUniformInterface () {
      var self = this;

      function buildUniformInterface (uniformName) {
        var uniform = self.material.uniforms[uniformName];

        self.uniforms[uniformName] = {
          _type : uniform.type,
          _value : uniform.value,

          get type () {
            return this._type;
          },

          set type (v) {
  // ### - messaging
            Blotter._Messaging.logError("Blotter._MaterialScope", "uniform types may not be updated");
          },

          get value () {
            return this._value;
          },

          set value (v) {
            if (!Blotter._UniformUtils.validValueForUniformType(this._type, v)) {
  // ### - messaging
              Blotter._Messaging.logError("Blotter._MaterialScope", "uniform value not valid for uniform type: " + this._type);
              return;
            }
            this._value = v;
            _updateDataForUniformTextureData.call(self, uniformName);
          }
        };

        _updateDataForUniformTextureData.call(self, uniformName);
      }

      for (var uniformName in this.material.uniforms) {
        buildUniformInterface(uniformName);
      }
    }

    function _updateDataForUniformTextureData (uniformName) {
      var materialUniform = this.material.uniforms[uniformName],
          scopedUniform = this.uniforms[uniformName],
          data = materialUniform._textureData,
          i = this._dataIndex;

      if (i >= 0) {
        if (materialUniform.type == "1f") {
          data[4*i]   = scopedUniform._value;    // x (r)
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }
        else if (materialUniform.type == "2f") {
          data[4*i]   = scopedUniform._value[0]; // x (r)
          data[4*i+1] = scopedUniform._value[1]; // y (g)
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }
        else if (materialUniform.type == "3f") {
          data[4*i]   = scopedUniform._value[0]; // x (r)
          data[4*i+1] = scopedUniform._value[1]; // y (g)
          data[4*i+2] = scopedUniform._value[2]; // z (b)
          data[4*i+3] = 0.0;
        }
        else if (materialUniform.type == "4f") {
          data[4*i]   = scopedUniform._value[0]; // x (r)
          data[4*i+1] = scopedUniform._value[1]; // y (g)
          data[4*i+2] = scopedUniform._value[2]; // z (b)
          data[4*i+3] = scopedUniform._value[3]; // w (a)
        }
        else {
          data[4*i]   = 0.0;
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }

        materialUniform._texture.needsUpdate = true;
      }
    }

    function _updateMaterial () {
      this._dataIndex = this.material.dataIndexFor(this.text);
      _buildUniformInterface.call(this);
    }

    return {

      constructor : Blotter._MaterialScope,

      set needsMaterialUpdate (value) {
        if (value === true) {
          _updateMaterial.call(this);
        }
      },

      get needsMaterialUpdate () { }, // jshint
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Material = function(mainImage, options) {
    _.defaults(this, options, {
      uniforms : {}
    });

    this._mapper = new Blotter._TextsMapper();

    this._texts = [];

    this.mainImage = mainImage;

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter.Material.prototype = (function() {

    function _defaultMainImageSrc () {
      var mainImage = [

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

          "mainImage = textTexture(fragCoord / uResolution);",

        "}"
      ];

      return mainImage.join("\n");
    }

    function _vertexSrc () {
      var vertexSrc = [

        "varying vec2 _vTexCoord;",

        "void main() {",

        "  _vTexCoord = uv;",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

        "}"
      ];

      return vertexSrc.join("\n");
    }

    function _fragmentSrc () {
      var fragmentSrc,
          userDefinedUniforms = {
            // Strings of sampler2D declarations for each user defined uniform texture.
            privateUniformTextureDeclarations : "",
            // Strings of uniform declarations for each publicly facing version of each user defined uniform.
            publicUniformDeclarations         : "",
            // Strings of uniform definitions for each publicly facing version of each user defined uniform.
            uniformDefinitions                : ""
          };

      _.reduce(this.uniforms, _.bind(function (userDefinedUniforms, uniformObject, uniformName) {
        var uniformTextureName = _uniformTextureNameForUniformName.call(this, uniformName),
            glslSwizzle = Blotter._UniformUtils.fullSwizzleStringForUniformType(uniformObject.type),
            glslDataType = Blotter._UniformUtils.glslDataTypeForUniformType(uniformObject.type);

        userDefinedUniforms.privateUniformTextureDeclarations += "uniform sampler2D " + uniformTextureName + ";\n";
        userDefinedUniforms.publicUniformDeclarations += glslDataType + " " + uniformName + ";\n";
        userDefinedUniforms.uniformDefinitions += uniformName + " = " + "texture2D(" + uniformTextureName + " , vec2(spriteIndex, 0.5))." + glslSwizzle + ";\n";

        return userDefinedUniforms;
      }, this), userDefinedUniforms);


  // ### - inspect this in chrome to see how the formatting is output.
      fragmentSrc = [

        "precision highp float;",

        // Private blotter defined uniforms.
        "uniform sampler2D _uSampler;",
        "uniform sampler2D _uSpriteIndicesTexture;",
        "uniform sampler2D _uSpriteBoundsTexture;",
        "uniform vec2 _uCanvasResolution;",

        // Private texCoord and sprite information.
        "varying vec2 _vTexCoord;",
        "vec4 _spriteBounds;",

        // Public blotter defined uniforms.
        "vec2 uResolution;",

        // Private versions of use user defined uniforms
        userDefinedUniforms.privateUniformTextureDeclarations,

        // Public versions of user defined uniforms.
        userDefinedUniforms.publicUniformDeclarations,

        // Public helper function used by user programs to retrieve texel color information within the bounds of
        // any given text sprite. This is to be used instead of `texture2D`.
        "vec4 textTexture( vec2 coord ) {",
        "   vec2 adjustedFragCoord = _spriteBounds.xy + vec2((_spriteBounds.z * coord.x), (_spriteBounds.w * coord.y));",
        "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;",
        //  If adjustedFragCoord falls outside the bounds of the current texel's sprite, return `vec4(0.0)`.
        "   if (adjustedFragCoord.x < _spriteBounds.x ||",
        "       adjustedFragCoord.x > _spriteBounds.x + _spriteBounds.z ||",
        "       adjustedFragCoord.y < _spriteBounds.y ||",
        "       adjustedFragCoord.y > _spriteBounds.y + _spriteBounds.w) {",
        "     return vec4(0.0);",
        "   }",
        "   return texture2D(_uSampler, uv);",
        "}",

  // ### - what other methods ought we expose?

        "void mainImage( out vec4 mainImage, in vec2 fragCoord );",

        this.mainImage,

        "void main( void ) {",

        //  Retrieve sprite index and sprite alpha for sprite in which texel is contained.
        "   vec4 spriteIndexData = texture2D(_uSpriteIndicesTexture, _vTexCoord);",
        "   float spriteIndex = spriteIndexData.r;",
        "   float spriteAlpha = spriteIndexData.a;",

        //  Make bounds for the current sprite globally visible.
        "   _spriteBounds = texture2D(_uSpriteBoundsTexture, vec2(spriteIndex, 0.5));",

        //  Set "uniform" values visible to user.
        "   uResolution = _spriteBounds.zw;",
            userDefinedUniforms.uniformDefinitions,

        //  Set fragment coordinate in respect to position within sprite bounds.
        "   vec2 fragCoord = gl_FragCoord.xy - _spriteBounds.xy;",
        //  Call user defined fragment function, setting outColor on return.
        "   vec4 outColor;",
        "   mainImage(outColor, fragCoord);",

        //  Multiply alpha by original spriteIndexData's fourth value."
        //  this will be 0 for texels not within any 'sprite' area."
        "   outColor.a = outColor.a * spriteAlpha;",
        "   gl_FragColor = outColor;",
        "}"
      ];

      return fragmentSrc.join("\n");
    }

    function _uniformTextureNameForUniformName (uniformName) {
      return "_" + uniformName + "Texture";
    }

    function _build (texts, ratio, sampleAccuracy) {
      var buildMapper,
          buildTextsTexture,
          buildIndicesTexture,
          buildBoundsTexture,
          buildActions;

      this._texts = texts;

      buildMapper = _.bind(function (ratio) {
        return _.bind(function (next) {
          this._mapper.on("build", function () {
            next();
          });
          this._mapper.build(this._texts, ratio);
        }, this);
      }, this);

      buildTextsTexture = _.bind(function (ratio) {
        return _.bind(function (next) {
          this._textsTexture = new Blotter._TextsTexture(this._mapper, ratio);
          this._textsTexture.on("build", function () {
            next();
          });
          this._textsTexture.build();
        }, this);
      }, this);

      buildIndicesTexture = _.bind(function (sampleAccuracy) {
        return _.bind(function (next) {
          this._indicesTexture = new Blotter._TextsIndicesTexture(this._mapper, sampleAccuracy);
          this._indicesTexture.on("build", function () {
            next();
          });
          this._indicesTexture.build();
        }, this);
      }, this);

      buildBoundsTexture = _.bind(function () {
        return _.bind(function (next) {
          this._boundsTexture = new Blotter._TextsBoundsTexture(this._mapper);
          this._boundsTexture.on("build", function () {
            next();
          });
          this._boundsTexture.build();
        }, this);
      }, this);

      buildActions = [
        buildMapper(ratio),
        buildTextsTexture(ratio),
        buildIndicesTexture(sampleAccuracy),
        buildBoundsTexture()
      ];

      _(buildActions).reduceRight(_.wrap, _.bind(function () {
        this.width = this._mapper.width * ratio;
        this.height = this._mapper.height * ratio;

        _setTextureUniformsForUniforms.call(this, this._texts.length);

        _buildMaterialUniforms.call(this);
        _buildThreeMaterial.call(this);

        this.trigger("build");
      }, this))();
    }

    function _setTextureUniformsForUniforms (textsLength) {
      _.each(this.uniforms, _.bind(function (uniformObject, uniformName) {
        var data = new Float32Array(textsLength * 4);
        uniformObject._textureData = data;
        uniformObject._texture = new THREE.DataTexture(data, textsLength, 1, THREE.RGBAFormat, THREE.FloatType);
      }, this));
    }

    function _buildMaterialUniforms () {
      this._materialUniforms = {
        _uSampler              : { type: "t" , value: this._textsTexture.texture },
        _uCanvasResolution     : { type: "2f", value: [this.width, this.height] },
        _uSpriteIndicesTexture : { type: "t" , value: this._indicesTexture.texture },
        _uSpriteBoundsTexture  : { type: "t" , value: this._boundsTexture.texture }
      };

      _.each(this.uniforms, _.bind(function (uniformObject, uniformName) {
        this._materialUniforms[_uniformTextureNameForUniformName.call(this, uniformName)] = {
          value : uniformObject._texture,
          type  : "t"
        };
      }, this));
    }

    function _buildThreeMaterial () {
      this.threeMaterial = new THREE.ShaderMaterial({
        vertexShader   : _vertexSrc.call(this),
        fragmentShader : _fragmentSrc.call(this),
        uniforms       : this._materialUniforms
      });

      this.threeMaterial.depthTest = false;
      this.threeMaterial.depthWrite = false;
      this.threeMaterial.premultipliedAlpha = false;
    }

    function _update () {
      this.trigger("update");
    }

    return {

      constructor : Blotter.Material,

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get needsUpdate () { }, // jshint

      build : function (texts, ratio, sampleAccuracy) {
        this.mainImage = this.mainImage || _defaultMainImageSrc.call(this);
        this.uniforms = Blotter._UniformUtils.extractValidUniforms(this.uniforms);

        _build.call(this, texts, ratio, sampleAccuracy);
      },

      boundsFor : function (text) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");
        return this._mapper.boundsFor(text);
      },

      dataIndexFor : function (text) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");
        return _.indexOf(this._texts, text);
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._BackBufferRenderer = function (material) {
    this._width = 1;
    this._height = 1;

    // Prepare back buffer scene

    this._scene = new THREE.Scene();

    this._plane = new THREE.PlaneGeometry(1, 1);

    this._material = material ||new THREE.MeshBasicMaterial(); // Stub material.

    this._mesh = new THREE.Mesh(this._plane, this._material);

    this._scene.add(this._mesh);

    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });

    this._camera = new THREE.OrthographicCamera(0.5, 0.5, 0.5, 0.5, 0, 100);

    this.init.apply(this, arguments);
  };

  Blotter._BackBufferRenderer.prototype = (function () {

    function _updateSize () {
      this._mesh.scale.set(this._width, this._height, 1);

      this._renderTarget = new THREE.WebGLRenderTarget(this._width, this._height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
      });
      this._renderTarget.texture.generateMipmaps = false;
      this._renderTarget.width = this._width;
      this._renderTarget.height = this._height;

      this._camera.left = this._width / - 2;
      this._camera.right = this._width / 2;
      this._camera.top = this._height / 2;
      this._camera.bottom = this._height / - 2;

      this._camera.updateProjectionMatrix();

      this._viewBuffer = new ArrayBuffer(this._width * this._height * 4);
      this._imageDataArray = new Uint8Array(this._viewBuffer);
      this._clampedImageDataArray = new Uint8ClampedArray(this._viewBuffer);

      this.imageData = new ImageData(this._clampedImageDataArray, this._width, this._height);
    }

    return {

      constructor : Blotter._BackBufferRenderer,

      set width (width) {
        this._width = width;
        _updateSize.call(this);
      },

      get width () { }, // jshint

      set height (height) {
        this._height = height;
        _updateSize.call(this);
      },

      get height () { }, // jshint

      set material (material) {
        if (material instanceof THREE.Material) {
          this._material = material;
          this._mesh.material = material;
        }
      },

      get material () { }, // jshint

      init : function (material) {
        _updateSize.call(this);
      },

      render : function () {
        this._renderer.render(this._scene, this._camera, this._renderTarget);

        this._renderer.readRenderTargetPixels(
          this._renderTarget,
          0,
          0,
          this._renderTarget.width,
          this._renderTarget.height,
          this._imageDataArray
        );
      },

      teardown : function () {
        this._renderer = null;
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._RendererScope = function (text, renderer) {
    this.text = text;
    this.renderer = renderer;
    this.ratio = this.renderer.ratio;

    this.material = new Blotter._MaterialScope(this.text, this.renderer.material);

    this.playing = false;
    this.timeDelta = 0;
    this.lastDrawTime = false;
    this.frameCount = 0;

    this.domElement = Blotter._CanvasUtils.hiDpiCanvas(0, 0, this.ratio);
    this.context = this.domElement.getContext("2d");

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter._RendererScope.prototype = (function () {

    function _setMouseEventListeners () {
      var self = this,
          eventNames = ["mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave"];

      function setMouseListener (eventName) {
        self.domElement.addEventListener(eventName, function(e) {
          var position = Blotter._CanvasUtils.normalizedMousePosition(self.domElement, e);
          self.emit(eventName, position);
        }, false);
      }

      for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        setMouseListener(eventName);
      }
    }

    function _setEventListeners () {
      _setMouseEventListeners.call(this);
    }

    function _render () {
      if (this.domElement && this.bounds) {
        this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);

        this.context.putImageData(
          this.renderer.imageData,
          this.bounds.x,
          this.bounds.y
        );

        this.trigger("update", [this.frameCount]);
      }
    }

    function _updateBounds () {
      var mappedBounds = this.renderer.material.boundsFor(this.text);

      if (mappedBounds) {
        // ### - x and y and all of this should be set directly in material. this should not have to scope into _mapper
        this.bounds = {
          w : mappedBounds.w,
          h : mappedBounds.h,
          x : -1 * Math.floor(mappedBounds.fit.x * this.ratio),
          y : -1 * Math.floor((this.renderer.material._mapper.height - (mappedBounds.fit.y + mappedBounds.h)) * this.ratio)
        };

        this.domElement.width = this.bounds.w * this.ratio;
        this.domElement.height = this.bounds.h * this.ratio;
        this.domElement.style.width = this.bounds.w + "px";
        this.domElement.style.height = this.bounds.h + "px";
      }
    }

    function _updateMaterial () {
      this.material.material = this.renderer.material;
      this.material.needsMaterialUpdate = true;

      _updateBounds.call(this);
    }

    return {

      constructor : Blotter._RendererScope,

      set needsMaterialUpdate (value) {
        if (value === true) {
          _updateMaterial.call(this);
        }
      },

      get needsMaterialUpdate () { }, // jshint

      play : function () {
        this.playing = true;
      },

      pause : function () {
        this.playing = false;
      },

      update : function () {
        var now = Date.now();
        this.frameCount += 1;
        this.timeDelta = (now - (this.lastDrawTime || now)) / 1000;
        this.lastDrawTime = now;
        _render.call(this);
      },

      appendTo : function (element) {
        element.appendChild(this.domElement);
        _setEventListeners.call(this);

        return this;
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
