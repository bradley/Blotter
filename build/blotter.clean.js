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

  var Blotter = root.Blotter = previousBlotter = function (material, options) {
    if (!Detector.webgl) {
    // ### - messaging
      Blotter.Messaging.throwError("Blotter", "device does not support webgl");
    }

    this.Version = "v0.1.0";

    this._texts = [];

    this._textEventBindings = {};

    this._scopes = {};

    this._renderer = new Blotter.Renderer();

    _.extendOwn(this, EventEmitter.prototype);
    this.init.apply(this, arguments);
  };

  Blotter.prototype = (function () {

    function _renderScopes () {
      _.each(this._scopes, _.bind(function (scope) {
        if (scope.playing) {
          scope.render();
        }
      }, this));
    }

    function _update () {
      var buildMapping,
          buildMappingMaterial,
          mappingMaterial,
          buildStages;

      buildMapping = _.bind(function () {
        return _.bind(function (next) {
          Blotter.MappingBuilder.build(this._texts, _.bind(function (mapping) {
            this._mapping = mapping;
            this._mapping.ratio = this.ratio;
            this._renderer.width = this._mapping.width;
            this._renderer.height = this._mapping.height;

            next();
          }, this));
        }, this);
      }, this);

      buildMappingMaterial = _.bind(function () {
        return _.bind(function (next) {
          Blotter.MappingMaterialBuilder.build(this._mapping, this._material, _.bind(function (newMappingMaterial) {
            mappingMaterial = newMappingMaterial;
            next();
          }, this));
        }, this);
      }, this);

      buildStages = [
        buildMapping(),
        buildMappingMaterial()
      ];

      _(buildStages).reduceRight(_.wrap, _.bind(function () {
        this._renderer.stop();

        _.each(this._scopes, function (scope, textId) {
          scope.mappingMaterial = mappingMaterial;
          scope.needsUpdate = true;
        });

        this._renderer.material = mappingMaterial.shaderMaterial;
        this._renderer.start();

        this.trigger(this.mappingMaterial ? "update" : "ready");
        this.mappingMaterial = mappingMaterial;
      }, this))();
    }

    return {

      constructor : Blotter,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get material () {
        return this._material;
      },

      set material (material) {
        this.setMaterial(material);
      },

      get texts () {
        return this._texts;
      },

      set texts (texts) {
        this.removeTexts(this._texts);
        this.addTexts(texts);
      },

      get imageData () {
        return this._renderer.imageData;
      },

      init : function (material, options) {
        _.defaults(this, options, {
          ratio  : Blotter.CanvasUtils.pixelRatio,
          autobuild : true,
          autostart : true,
          autoplay : true
        });

        this.setMaterial(material);
        this.addTexts(options.texts);

        this._renderer.on("render", _.bind(_renderScopes, this));

        if (this.autobuild) {
          this.needsUpdate = true;
        }

        if (this.autostart) {
          this.start();
        }
      },

      start : function () {
        this._renderer.start();
      },

      stop : function () {
        this._renderer.stop();
      },

      teardown : function () {
        this._renderer.teardown();
      },

      setMaterial : function (material) {
        Blotter.Messaging.ensureInstanceOf(material, Blotter.Material, "Blotter.Material", "Blotter.Renderer");

        this._material = material;

        if (this._materialEventBinding) {
          this._materialEventBinding.unsetEventCallbacks();
        }

        this._materialEventBinding = new Blotter.ModelEventBinding(material, {
          update : _.bind(function () {
            _update.call(this);
          }, this)
        });
        material.on("update", this._materialEventBinding.eventCallbacks.update);
      },

      addText : function (text) {
        this.addTexts(text);
      },

      addTexts : function (texts) {
        var filteredTexts = Blotter.TextUtils.filterTexts(texts),
            newTexts = _.difference(filteredTexts, this._texts);

        _.each(newTexts, _.bind(function (text) {
          this._texts.push(text);

          this._textEventBindings[text.id] = new Blotter.ModelEventBinding(text, {
            update : _.bind(function () {
              _update.call(this);
            }, this)
          });
          text.on("update", this._textEventBindings[text.id].eventCallbacks.update);

          this._scopes[text.id] = new Blotter.RenderScope(text, this);
        }, this));
      },

      removeText : function (text) {
        this.removeTexts(text);
      },

      removeTexts : function (texts) {
        var filteredTexts = Blotter.TextUtils.filterTexts(texts),
            removedTexts = _.intersection(this._texts, filteredTexts);

        _.each(removedTexts, _.bind(function (text) {
          this._texts = _.without(this._texts, text);

          this._textEventBindings[text.id].unsetEventCallbacks();

          delete this._textEventBindings[text.id];
          delete this._scopes[text.id];
        }, this));
      },

      forText : function (text) {
        // ### - messaging
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Renderer");

        if (!(this._scopes[text.id])) {
          // ### - messaging
          Blotter.Messaging.logError("Blotter.Renderer", "Blotter.Text object not found in blotter. Set needsUpdate to true.");
          return;
        }

        return this._scopes[text.id];
      },

      boundsForText : function (text) {
        // ### - messaging
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Renderer");

        if (!(this._scopes[text.id])) {
          // ### - messaging
          Blotter.Messaging.logError("Blotter.Renderer", "Blotter.Text object not found in blotter.");
          return;
        }

        if (this._mapping) {
          return this.mappingMaterial.boundsForText(text);
        }
      }
    };
  })();

  //EventEmitter.prototype.apply(Blotter.prototype);
  //_.extend(Blotter.prototype, EventEmitter.prototype);
})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Material = function(mainImage, options) {
    _.defaults(options, {
      uniforms : {}
    });

    this.mainImage = mainImage;
    this.uniforms = options.uniforms;

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

    return {

      constructor : Blotter.Material,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          this.trigger("update");
        }
      },

      get mainImage () {
        return this._mainImage;
      },

      set mainImage (mainImage) {
        this._mainImage = mainImage || _defaultMainImageSrc();
      },

      get uniforms () {
        return this._uniforms;
      },

      set uniforms (uniforms) {
        this._uniforms = Blotter.UniformUtils.extractValidUniforms(uniforms);
      }
    };
  })();

  //EventEmitter.prototype.apply(Blotter.Material.prototype);
  //_.extend(Blotter.Material.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Text = function (value, properties) {
    this.id = THREE.Math.generateUUID();
    this.value = value;
    this.properties = properties;

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter.Text.prototype = {
    constructor : Blotter.Text,

    get needsUpdate () { }, // jshint

    set needsUpdate (value) {
      if (value === true) {
        this.trigger("update");
      }
    },

    get properties () {
      return this._properties;
    },

    set properties (properties) {
      this._properties = Blotter.TextUtils.ensurePropertyValues(properties);
    }
  };

  //EventEmitter.prototype.apply(Blotter.Text.prototype);
  //_.extend(Blotter.Text.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Messaging = (function () {

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

// ### - use this more
      logWarning : function (domain, message) {
        var formatted = _formattedMessage(domain, message);
        console.warn(formatted);
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

  Blotter.VendorPrefixes = ["ms", "moz", "webkit", "o"];

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

  (function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.ModelEventBinding = function (model, eventCallbacks) {
    this.model = model;
    this.eventCallbacks = eventCallbacks || {};
  };

  Blotter.ModelEventBinding.prototype = {

    constructor : Blotter.ModelEventBinding,

    unsetEventCallbacks : function () {
      _.each(this.eventCallbacks, _.bind(function (callback, eventKey) {
        this.model.off(eventKey, callback);
      }, this));
    }
  };

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.CanvasUtils = {

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

      this.updateCanvasSize(canvas, w, h, ratio);

  	  return canvas;
  	},

    updateCanvasSize : function (canvas, w, h, ratio) {
      ratio = ratio || 1;

      canvas.width = w * ratio;
      canvas.height = h * ratio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    },

  	// Returns the device's pixel ratio

  	pixelRatio : (function () {
      var ctx = document.createElement("canvas").getContext("2d"),
          dpr = window.devicePixelRatio || 1,
          bsr = ctx.backingStorePixelRatio;

      for(var x = 0; x < Blotter.VendorPrefixes.length && !bsr; ++x) {
        bsr = ctx[Blotter.VendorPrefixes[x]+"BackingStorePixelRatio"];
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

	Blotter.PropertyDefaults = {
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

	Blotter.TextUtils = {

		Properties : _.keys(Blotter.PropertyDefaults),

		// Recieves property values (optional) and fills in any missing values with default values

		ensurePropertyValues : function(properties) {
			properties = _.defaults(properties || {}, Blotter.PropertyDefaults);
			return properties;
		},

		filterTexts : function(texts) {
			if (texts instanceof Blotter.Text) {
        texts = [texts];
      } else {
        texts = _.toArray(texts);
      }

      return _.filter(texts, _.bind(function (text) {
        var isText = text instanceof Blotter.Text;

        if (!isText) {
  // ### - messaging
          Blotter.Messaging.logError("Blotter.Renderer", "object not instance of Blotter.Text");
        }

        return isText;
      }, this));
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

  Blotter.UniformUtils = {

    // Uniform type values we accept for user defined uniforms

    UniformTypes : ["1f", "2f", "3f", "4f"],

    // Determine if value is valid for user defined uniform type

    validValueForUniformType : function (type, value) {
      var valid = false,
          isValid = function (element, _, _) {
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
        if (Blotter.UniformUtils.UniformTypes.indexOf(uniformObject.type) == -1) {
  // ### - messaging
          Blotter.Messaging.logError(domain, "uniforms must be one of type: " +
            Blotter.UniformUtils.UniformTypes.join(", "));
          return memo;
        }

        if (!Blotter.UniformUtils.validValueForUniformType(uniformObject.type, uniformObject.value)) {
  // ### - messaging
          Blotter.Messaging.logError(domain, "uniform value for " + uniformName + " is incorrect for type: " + uniformObject.type);
          return memo;
        }

        memo[uniformName] = _.pick(uniformObject, "type", "value");
        return memo;
      }, {});
    }

  };

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Mapping = function (texts, textBounds, width, height) {
    this.texts = texts;

    this._textBounds = textBounds;

    this._width = width;
    this._height = height;

    this._ratio = 1;
  };

  Blotter.Mapping.prototype = (function () {

    function _getYOffset (size, lineHeight) {
      lineHeight = lineHeight || Blotter.TextUtils.ensurePropertyValues().leading;
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

      constructor : Blotter.Mapping,

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
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");

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
        var canvas = Blotter.CanvasUtils.hiDpiCanvas(this._width, this._height, this._ratio),
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

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.MappingMaterial = function(mapping, material, shaderMaterial, userUniformDataTextureObjects) {
    this.mapping = mapping;
    this.material = material;
    this.shaderMaterial = shaderMaterial;

    this._userUniformDataTextureObjects = userUniformDataTextureObjects;

    this.init.apply(this, arguments);
  };

  Blotter.MappingMaterial.prototype = (function() {

    function _setValueAtIndexInDataTextureObject (value, i, dataTextureObject) {
        var type = dataTextureObject.userUniform.type,
            data = dataTextureObject.data;

        if (!Blotter.UniformUtils.validValueForUniformType(type, value)) {
          // ### - messaging
          Blotter.Messaging.logError("Blotter.MappingMaterial", "uniform value not valid for uniform type: " + this._type);
          return;
        }

        if (type == "1f") {
          data[4*i]   = value;    // x (r)
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        } else if (type == "2f") {
          data[4*i]   = value[0]; // x (r)
          data[4*i+1] = value[1]; // y (g)
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        } else if (type == "3f") {
          data[4*i]   = value[0]; // x (r)
          data[4*i+1] = value[1]; // y (g)
          data[4*i+2] = value[2]; // z (b)
          data[4*i+3] = 0.0;
        } else if (type == "4f") {
          data[4*i]   = value[0]; // x (r)
          data[4*i+1] = value[1]; // y (g)
          data[4*i+2] = value[2]; // z (b)
          data[4*i+3] = value[3]; // w (a)
        } else {
          data[4*i]   = 0.0;
          data[4*i+1] = 0.0;
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
        }

        dataTextureObject.texture.needsUpdate = true;
    }

    function _getUniformInterfaceForIndexAndDataTextureObject (index, dataTextureObject) {
      return {
        _type : dataTextureObject.userUniform.type,
        _value : dataTextureObject.userUniform.value,

        get type () {
          return this._type;
        },

        set type (v) {
          // ### - messaging
          Blotter.Messaging.logError("Blotter.MaterialScope", "uniform types may not be updated");
        },

        get value () {
          return this._value;
        },

        set value (v) {
          if (!Blotter.UniformUtils.validValueForUniformType(this._type, v)) {
            // ### - messaging
            Blotter.Messaging.logError("Blotter.MaterialScope", "uniform value not valid for uniform type: " + this._type);
            return;
          }
          this._value = v;

          _setValueAtIndexInDataTextureObject(v, index, dataTextureObject);
        }
      };
    }

    function _getUniformInterface (mapping, userUniformDataTextureObjects) {
      return _.reduce(mapping.texts, function (memo, text, i) {
        memo[text.id] = _.reduce(userUniformDataTextureObjects, function (memo, dataTextureObject, uniformName) {
          memo[uniformName] = _getUniformInterfaceForIndexAndDataTextureObject(i, dataTextureObject);
          _setValueAtIndexInDataTextureObject(dataTextureObject.userUniform.value, i, dataTextureObject);
          return memo;
        }, {});
        return memo;
      }, {});
    }

    return {

      constructor : Blotter.MappingMaterial,

      get mainImage () {
        return this.material.mainImage;
      },

      get width () {
        return this.mapping.width;
      },

      get height () {
        return this.mapping.height;
      },

      get ratio () {
        return this.mapping.ratio;
      },

      init : function (mapping, material, shaderMaterial, userUniformDataTextureObjects) {
        this._uniforms = _getUniformInterface(this.mapping, this._userUniformDataTextureObjects);
      },

      uniformsInterfaceForText : function (text) {
        return this._uniforms[text.id];
      },

      boundsForText : function (text) {
        // ### - messaging
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.MappingMaterial");
        return this.mapping.boundsForText(text);
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  var root = this;

  Blotter.Renderer = function () {
    this._currentAnimationLoop = false;

    // Prepare back buffer scene

    this._scene = new THREE.Scene();

    this._plane = new THREE.PlaneGeometry(1, 1);

    this._material = new THREE.MeshBasicMaterial(); // Stub material.

    this._mesh = new THREE.Mesh(this._plane, this._material);
    this._scene.add(this._mesh);

    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });

    this._camera = new THREE.OrthographicCamera(0.5, 0.5, 0.5, 0.5, 0, 100);

    _.extendOwn(this, EventEmitter.prototype);
    this.init.apply(this, arguments);
  };

  Blotter.Renderer.prototype = (function () {

    function _getRenderTargetWithSize (width, height) {
      var renderTarget = new THREE.WebGLRenderTarget(width, height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
      });
      renderTarget.texture.generateMipmaps = false;
      renderTarget.width = width;
      renderTarget.height = height;

      return renderTarget;
    }

    function _loop () {
      this._renderer.render(this._scene, this._camera, this._renderTarget);

      this._renderer.readRenderTargetPixels(
        this._renderTarget,
        0,
        0,
        this._renderTarget.width,
        this._renderTarget.height,
        this._imageDataArray
      );

      this.trigger("render");

      this._currentAnimationLoop = root.requestAnimationFrame(_.bind(_loop, this));
    }

    return {

      constructor : Blotter.Renderer,

      get material () { }, // jshint

      set material (material) {
        if (material instanceof THREE.Material) {
          this._material = material;
          this._mesh.material = material;
        }
      },

      get width () {
        return this._width;
      },

      set width (width) {
        this.setSize(width, this._height);
      },

      get height () {
        return this._height;
      },

      set height (height) {
        this.setSize(this._width, height);
      },

      init : function () {
        this.setSize(1, 1);
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

      setSize : function (width, height) {
        this._width = width || 1;
        this._height = height || 1;

        this._renderer.setSize(this._width, this._height);

        this._mesh.scale.set(this._width, this._height, 1);

        this._camera.left = this._width / - 2;
        this._camera.right = this._width / 2;
        this._camera.top = this._height / 2;
        this._camera.bottom = this._height / - 2;
        this._camera.updateProjectionMatrix();

        this._renderTarget = _getRenderTargetWithSize(this._width, this._height);

        this._viewBuffer = new ArrayBuffer(this._width * this._height * 4);
        this._imageDataArray = new Uint8Array(this._viewBuffer);
        this._clampedImageDataArray = new Uint8ClampedArray(this._viewBuffer);

        this.imageData = new ImageData(this._clampedImageDataArray, this._width, this._height);
      },

      teardown : function () {
        this.stop();
        this._renderer = null;
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.RenderScope = function (text, blotter) {
    this.text = text;
    this.blotter = blotter;

    this.material = {
      mainImage : this.blotter.material.mainImage
    };

    this._mappingMaterial = blotter.mappingMaterial;

    this.playing = this.blotter.autoplay;
    this.timeDelta = 0;
    this.lastDrawTime = false;
    this.frameCount = 0;

    this.domElement = Blotter.CanvasUtils.hiDpiCanvas(0, 0, this.blotter.ratio);
    this.context = this.domElement.getContext("2d");

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter.RenderScope.prototype = (function () {

    function _setMouseEventListeners () {
      var self = this,
          eventNames = ["mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave"];

      function setMouseListener (eventName) {
        self.domElement.addEventListener(eventName, function(e) {
          var position = Blotter.CanvasUtils.normalizedMousePosition(self.domElement, e);
          self.emit(eventName, position);
        }, false);
      }

      for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        setMouseListener(eventName);
      }
    }

    function _getBoundsForMappingMaterialAndText (mappingMaterial, text) {
      var bounds = mappingMaterial.boundsForText(text);

      if (bounds) {
        return {
          w : bounds.w,
          h : bounds.h,
          x : -1 * Math.floor(bounds.x),
          // ### --- !
          y : -1 * Math.floor(mappingMaterial.height - (bounds.y + bounds.h))
        };
      }
    }

    function _update () {
      var mappingMaterial = this._mappingMaterial,
          bounds = mappingMaterial && _getBoundsForMappingMaterialAndText(mappingMaterial, this.text);

      if (mappingMaterial && bounds) {
        Blotter.CanvasUtils.updateCanvasSize(
          this.domElement,
          bounds.w / this.blotter.ratio,
          bounds.h / this.blotter.ratio,
          this.blotter.ratio
        );

        // TODO: Update uniform values using old mappingMaterial uniform values if it exists.
        this.material.uniforms = mappingMaterial.uniformsInterfaceForText(this.text);
        this.material.mainImage = mappingMaterial.mainImage;

        this.trigger(this.bounds ? "update" : "ready");
        this.bounds = bounds;
      }
    }

    return {

      constructor : Blotter.RenderScope,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get mappingMaterial () { },

      set mappingMaterial (mappingMaterial) {
        this._mappingMaterial = mappingMaterial;
      },

      play : function () {
        this.playing = true;
      },

      pause : function () {
        this.playing = false;
      },

      render : function () {
        if (this.bounds) {
          var now = Date.now();

          this.frameCount += 1;
          this.timeDelta = (now - (this.lastDrawTime || now)) / 1000;
          this.lastDrawTime = now;

          this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);

          this.context.putImageData(
            this.blotter.imageData,
            this.bounds.x,
            this.bounds.y
          );

          this.trigger("render", [this.frameCount]);
        }
      },

      appendTo : function (element) {
        element.appendChild(this.domElement);

        _setMouseEventListeners.call(this);

        return this;
      }
    };
  })();

  //EventEmitter.prototype.apply(Blotter.RenderScope.prototype);
  //_.extend(Blotter.RenderScope.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  // Create a Data Texture holding the boundaries (x/y offset and w/h) that should be available to any given texel for any given text.

  Blotter.BoundsDataTextureBuilder = (function () {

    function _boundsDataForMapping (mapping) {
      var texts = mapping.texts,
          data = new Float32Array(texts.length * 4);

      for (var i = 0; i < texts.length; i++) {
        var text = texts[i],
            bounds = mapping.boundsForText(text);

        data[4*i]   = bounds.x;                               // x
        data[4*i+1] = mapping.height - (bounds.y + bounds.h); // y
        data[4*i+2] = bounds.w;                               // w
        data[4*i+3] = bounds.h;                               // h
      }

      return data;
    }

    return {

// ### - does this need to use ratio too? seems like we may lose some fidelity since we dont. unsure how this even works. GLSL magic i guess.
      build : function (mapping, completion) {
        setImmediate(function() {
          var data = _boundsDataForMapping(mapping),
              texture = new THREE.DataTexture(data, mapping.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);

          texture.needsUpdate = true;

          completion(texture);
        });
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  // Create a Data Texture the size of our text map wherein every texel holds the index of text whose boundaries contain the given texel's position.

  Blotter.IndicesDataTextureBuilder = (function () {

    function _indicesDataForMapping (mapping, width, height, sampleAccuracy) {

      var ratio = mapping.ratio,
          points = new Float32Array((height * width) * 4),
          widthStepModifier = width % 1,
          indicesOffset = (1 / mapping.texts.length) / 2; // Values stored in this texture will be sampled from the 'middle' of their texel position.

      for (var i = 1; i < points.length / 4; i++) {

        var y = Math.ceil(i / (width - widthStepModifier)),
            x = i - ((width - widthStepModifier) * (y - 1)),
            refIndex = 0.0,
            bg = 0.0,
            a = 0.0;

        for (var ki = 0; ki < mapping.texts.length; ki++) {
          var text = mapping.texts[ki],
              bounds = mapping.boundsForText(text),
              bW = (bounds.w / ratio) * sampleAccuracy,
              bH = (bounds.h / ratio) * sampleAccuracy,
              bX = (bounds.x / ratio) * sampleAccuracy,
              bY = (bounds.y / ratio) * sampleAccuracy;

          // If x and y are within the fit bounds of the text space within our mapped texts texture.
          if (y >= bY &&
              y <= bY + bH &&
              x >= bX &&
              x <= bX + bW) {
            refIndex = (ki / mapping.texts.length) + indicesOffset;
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
      return points;
    }

    return {

      build : function (mapping, completion) {
        // ### - remove this shit following documentation.
        // There is a negative coorelation between the sampleAccuracy value and
        // the speed at which texture generation happens.
        // However, the lower this value, the less sampleAccuracy you can expect
        // for indexing into uniforms for any given text.
        // Value must be between 0.0 and 1.0, and you are advised to keep it around 0.5.
        var sampleAccuracy = 0.5;

        setImmediate(function() {
          var width = (mapping.width / mapping.ratio) * sampleAccuracy,
              height = (mapping.height / mapping.ratio) * sampleAccuracy,
              data = _indicesDataForMapping(mapping, width, height, sampleAccuracy),
              texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);

          texture.flipY = true;
          texture.needsUpdate = true;

          completion(texture);
        });
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);


(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.TextTextureBuilder = (function() {

    return {

      build : function (mapping, completion) {
        var loader = new THREE.TextureLoader();

        loader.load(mapping.toDataURL(), _.bind(function(texture) {
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.needsUpdate = true;

          completion(texture);
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.MappingBuilder = (function () {

    // Sort texts based on area of space required for any given text, descending

    function _sortTexts (textA, textB) {
      var areaA = textA.w * textA.h,
          areaB = textB.w * textB.h;

      return areaB - areaA;
    }

    function _getTextSizes (texts) {
      return _.reduce(texts, function (textSizes, text) {
        var size = Blotter.TextUtils.sizeForText(text.value, text.properties);
        textSizes[text.id] = size;
        return textSizes;
      }, []);
    }

    return {

// ### - does this work with no texts? It should return an empty mapping
      build : function (texts, completion) {
        setImmediate(function() {
          var filteredTexts = Blotter.TextUtils.filterTexts(texts),
              textSizes = _getTextSizes(filteredTexts),
              packer = new GrowingPacker(),
              tempTextBounds = [],
              textBounds = {},
              mapping;

          // Build array of objects holding a Text object's id, width, and height for sorting.
          for (var textId in textSizes) {
            if (textSizes.hasOwnProperty(textId)) {
              var tempSizesObject = textSizes[textId];
              tempSizesObject.referenceId = textId;
              tempTextBounds.push(tempSizesObject);
            }
          }

          // Add fit object to all objects in tempTextBounds.
          packer.fit(tempTextBounds.sort(_sortTexts));

          // Add fit objects back into this._textBounds for each Text id.
          for (var i = 0; i < tempTextBounds.length; i++) {
            var packedSizesObject = tempTextBounds[i];
            textBounds[packedSizesObject.referenceId] = {
              w : packedSizesObject.w,
              h : packedSizesObject.h,
              x : packedSizesObject.fit.x,
// ### -- hmmmmm....
              y : packer.root.h - (packedSizesObject.fit.y + packedSizesObject.h)
            };
          }

          completion(new Blotter.Mapping(filteredTexts, textBounds, packer.root.w, packer.root.h));
        });
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.MappingMaterialBuilder = (function() {

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

    function _fragmentSrc (uniforms, mainImageSrc) {
      var fragmentSrc,
          userDefinedUniforms = {
            // Strings of sampler2D declarations for each user defined uniform texture.
            privateUniformTextureDeclarations : "",
            // Strings of uniform declarations for each publicly facing version of each user defined uniform.
            publicUniformDeclarations         : "",
            // Strings of uniform definitions for each publicly facing version of each user defined uniform.
            uniformDefinitions                : ""
          };

      _.reduce(uniforms, function (userDefinedUniforms, uniformObject, uniformName) {
        var uniformTextureName = _userUniformDataTextureNameForUniformName(uniformName),
            glslSwizzle = Blotter.UniformUtils.fullSwizzleStringForUniformType(uniformObject.userUniform.type),
            glslDataType = Blotter.UniformUtils.glslDataTypeForUniformType(uniformObject.userUniform.type);

        userDefinedUniforms.privateUniformTextureDeclarations += "uniform sampler2D " + uniformTextureName + ";\n";
        userDefinedUniforms.publicUniformDeclarations += glslDataType + " " + uniformName + ";\n";
        userDefinedUniforms.uniformDefinitions += uniformName + " = " + "texture2D(" + uniformTextureName + " , vec2(textIndex, 0.5))." + glslSwizzle + ";\n";

        return userDefinedUniforms;
      }, userDefinedUniforms);


      // ### - inspect this in chrome to see how the formatting is output.
      fragmentSrc = [

        "precision highp float;",

        // Private blotter defined uniforms.
        "uniform sampler2D _uSampler;",
        "uniform vec2 _uCanvasResolution;",

        "uniform sampler2D _uTextIndicesTexture;",
        "uniform sampler2D _uTextBoundsTexture;",

        // Private texCoord and bounds information.
        "varying vec2 _vTexCoord;",
        "vec4 _textBounds;",

        // Public blotter defined uniforms.
        "vec2 uResolution;",

        // Private versions of use user defined uniforms
        userDefinedUniforms.privateUniformTextureDeclarations,

        // Public versions of user defined uniforms.
        userDefinedUniforms.publicUniformDeclarations,

        // Public helper function used by user programs to retrieve texel color information within the bounds of
        // any given text text. This is to be used instead of `texture2D`.
        "vec4 textTexture( vec2 coord ) {",
        "   vec2 adjustedFragCoord = _textBounds.xy + vec2((_textBounds.z * coord.x), (_textBounds.w * coord.y));",
        "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;",
        //  If adjustedFragCoord falls outside the bounds of the current texel's text, return `vec4(0.0)`.
        "   if (adjustedFragCoord.x < _textBounds.x ||",
        "       adjustedFragCoord.x > _textBounds.x + _textBounds.z ||",
        "       adjustedFragCoord.y < _textBounds.y ||",
        "       adjustedFragCoord.y > _textBounds.y + _textBounds.w) {",
        "     return vec4(0.0);",
        "   }",
        "   return texture2D(_uSampler, uv);",
        "}",

      // ### - what other methods ought we expose?

        "void mainImage( out vec4 mainImage, in vec2 fragCoord );",

        mainImageSrc,

        "void main( void ) {",

        //  Retrieve text index and text alpha for text bounds in which texel is contained.
        "   vec4 textIndexData = texture2D(_uTextIndicesTexture, _vTexCoord);",
        "   float textIndex = textIndexData.r;",
        "   float textAlpha = textIndexData.a;",

        //  Make bounds for the current text globally visible.
        "   _textBounds = texture2D(_uTextBoundsTexture, vec2(textIndex, 0.5));",

        //  Set "uniform" values visible to user.
        "   uResolution = _textBounds.zw;",
            userDefinedUniforms.uniformDefinitions,

        //  Set fragment coordinate in respect to position within text bounds.
        "   vec2 fragCoord = gl_FragCoord.xy - _textBounds.xy;",
        //  Call user defined fragment function, setting outColor on return.
        "   vec4 outColor;",
        "   mainImage(outColor, fragCoord);",

        //  Multiply alpha by original textIndexData's fourth value."
        //  this will be 0 for texels not within any 'text' area."
        "   outColor.a = outColor.a * textAlpha;",
        "   gl_FragColor = outColor;",
        "}"

      ];

      return fragmentSrc.join("\n");
    }

    function _userUniformDataTextureNameForUniformName (uniformName) {
      return "_" + uniformName + "Texture";
    }

    function _buildMappedTextsTexture (mapping, completion) {
      Blotter.TextTextureBuilder.build(mapping, function (texture) {
        completion(texture);
      });
    }

    function _buildMappingDataTextureObjects (mapping, completion) {
      var buildIndicesTexture,
          buildBoundsTexture,
          mappingDataTextureObjects = [],
          buildStages;

      buildIndicesTexture = function () {
        return function (next) {
          Blotter.IndicesDataTextureBuilder.build(mapping, function (texture) {
            mappingDataTextureObjects.push({
              uniformName : "_uTextIndicesTexture",
              texture : texture
            });
            next();
          });
        };
      };

      buildBoundsTexture = function () {
        return function (next) {
          Blotter.BoundsDataTextureBuilder.build(mapping, function (texture) {
            mappingDataTextureObjects.push({
              uniformName : "_uTextBoundsTexture",
              texture : texture
            });
            next();
          });
        };
      };

      buildStages = [
        buildIndicesTexture(),
        buildBoundsTexture()
      ];

      _(buildStages).reduceRight(_.wrap, function () {
        completion(mappingDataTextureObjects);
      })();
    }

    function _buildUserUniformDataTextureObjects (userUniforms, dataLength, completion) {
      userUniforms = Blotter.UniformUtils.extractValidUniforms(userUniforms);

      var userUniformDataTextureObjects = _.reduce(userUniforms, function (memo, userUniform, uniformName) {
        var data = new Float32Array(dataLength * 4);
        memo[uniformName] = {
          userUniform : userUniform,
          data : data,
          texture : new THREE.DataTexture(data, dataLength, 1, THREE.RGBAFormat, THREE.FloatType)
        };
        return memo;
      }, {});

      completion(userUniformDataTextureObjects);
    }

    function _getUniformsForMappingDataTextureObjects (mappingDataTextureObjects) {
      return _.reduce(mappingDataTextureObjects, function (memo, mappingDataTextureObject) {
        memo[mappingDataTextureObject.uniformName] = {
          type : "t",
          value : mappingDataTextureObject.texture
        };
        return memo;
      }, {});
    }

    function _getUniformsForUserUniformDataObjects (userUniformDataObjects) {
      return _.reduce(userUniformDataObjects, function (memo, uniformDataObject, uniformName) {
        memo[_userUniformDataTextureNameForUniformName(uniformName)] = {
          type : "t",
          value : uniformDataObject.texture
        };
        return memo;
      }, {});
    }

    function _getUniforms (width, height, mappedTextsTexture, mappingDataTextureObjects, userUniformDataTextureObjects) {
      var uniforms = {
        _uSampler : { type : "t", value : mappedTextsTexture },
        _uCanvasResolution : { type : "2f", value : [width, height] }
      };

      _.extend(uniforms, _getUniformsForMappingDataTextureObjects(mappingDataTextureObjects));
      _.extend(uniforms, _getUniformsForUserUniformDataObjects(userUniformDataTextureObjects));

      return uniforms;
    }

    function _getThreeMaterial (vertexSrc, fragmentSrc, uniforms) {
      var threeMaterial = new THREE.ShaderMaterial({
        vertexShader : vertexSrc,
        fragmentShader : fragmentSrc,
        uniforms : uniforms
      });

      threeMaterial.depthTest = false;
      threeMaterial.depthWrite = false;
      threeMaterial.premultipliedAlpha = false;

      return threeMaterial;
    }

    return {

      build : function (mapping, material, completion) {
        var buildMappedTextsTexture,
            buildMappingDataTextureObjects,
            buildUserUniformDataAndDataTextureObjects,
            mappedTextsTexture,
            mappingDataTextureObjects,
            userUniformDataAndDataTextureObjects,
            buildStages;

        buildMappedTextsTexture = function () {
          return function (next) {
            _buildMappedTextsTexture(mapping, function (texture) {
              mappedTextsTexture = texture;
              next();
            });
          };
        };

        buildMappingDataTextureObjects = function () {
          return function (next) {
            _buildMappingDataTextureObjects(mapping, function (objects) {
              mappingDataTextureObjects = objects;
              next();
            });
          };
        };

        buildUserUniformDataTextureObjects = function () {
          return function (next) {
            _buildUserUniformDataTextureObjects(material.uniforms, mapping.texts.length, function (objects) {
              userUniformDataTextureObjects = objects;
              next();
            });
          };
        };

        buildStages = [
          buildMappedTextsTexture(),
          buildMappingDataTextureObjects(),
          buildUserUniformDataTextureObjects()
        ];

        _(buildStages).reduceRight(_.wrap, function () {
          var uniforms = _getUniforms(
                mapping.width,
                mapping.height,
                mappedTextsTexture,
                mappingDataTextureObjects,
                userUniformDataTextureObjects
              ),
              userUniforms = _.omit(uniforms, "_uCanvasResolution", "_uSampler", "_uTextBoundsTexture", "_uTextIndicesTexture"),
              threeMaterial = _getThreeMaterial(_vertexSrc(), _fragmentSrc(userUniformDataTextureObjects, material.mainImage), uniforms);

          completion(new Blotter.MappingMaterial(mapping, material, threeMaterial, userUniformDataTextureObjects));
        })();
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
