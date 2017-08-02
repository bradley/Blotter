/*!
// ███   █    ████▄    ▄▄▄▄▀ ▄▄▄▄▀ ▄███▄   █▄▄▄▄
// █  █  █    █   █ ▀▀▀ █ ▀▀▀ █    █▀   ▀  █  ▄▀
// █ ▀ ▄ █    █   █     █     █    ██▄▄    █▀▀▌
// █  ▄▀ ███▄ ▀████    █     █     █▄   ▄▀ █  █
// ███       ▀        ▀     ▀      ▀███▀     █
//                                          ▀
// The MIT License
//
// Copyright © 2015 - ∞, Blotter / Bradley Griffith / http://bradley.computer
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
*/

(function(previousBlotter, _, THREE, Detector, EventEmitter) {

  var root = this;

  var Blotter = root.Blotter = previousBlotter = function (material, options) {
    if (!Detector.webgl) {
      Blotter.Messaging.throwError("Blotter", false, "device does not support webgl");
    }

    this._texts = [];
    this._textEventBindings = {};

    this._scopes = {};
    this._scopeEventBindings = {};

    this._renderer = new Blotter.Renderer();

    this._startTime = 0;
    this._lastDrawTime = 0;

    this.init.apply(this, arguments);
  };

  Blotter.prototype = (function () {

    function _updateMaterialUniforms () {
      var now = Date.now();

      this._material.uniforms.uTimeDelta.value = (now - (this._lastDrawTime || now)) / 1000;
      this._material.uniforms.uGlobalTime.value = (now - this._startTime) / 1000;

      this._lastDrawTime = now;
    }

    function _rendererRendered () {
      _updateMaterialUniforms.call(this);

      _.each(this._scopes, _.bind(function (scope) {
        if (scope.playing) {
          scope.render();
        }
        this.trigger("render");
      }, this));
    }

    function _updateUniformValue (uniformName) {
      if (this.mappingMaterial) {
        var value = this._material.uniforms[uniformName].value;

        this.mappingMaterial.uniformInterface[uniformName].value = value;
      }
    }

    function _updateTextUniformValue (textId, uniformName) {
      if (this.mappingMaterial) {
        var scope = this._scopes[textId],
            value = scope.material.uniforms[uniformName].value;

        this.mappingMaterial.textUniformInterface[textId][uniformName].value = value;
      }
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

            next();
          }, this));
        }, this);
      }, this);

      buildMappingMaterial = _.bind(function () {
        return _.bind(function (next) {
          Blotter.MappingMaterialBuilder.build(this._mapping, this._material, _.bind(function (newMappingMaterial) {
            this.mappingMaterial = newMappingMaterial;

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

        _.each(this._scopes, _.bind(function (scope, textId) {
          scope.mappingMaterial = this.mappingMaterial;
          scope.needsUpdate = true;
        }, this));

        this._renderer.material = this.mappingMaterial.shaderMaterial;
        this._renderer.width = this._mapping.width;
        this._renderer.height = this._mapping.height;

        if (this.autostart) {
          this.start();
        }

        this.trigger(this.lastUpdated ? "update" : "ready");
        this.lastUpdated = Date.now();
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
        options = options || {};
        _.defaults(this, options, {
          ratio  : Blotter.CanvasUtils.pixelRatio,
          autobuild : true,
          autostart : true,
          autoplay : true
        });

        this.setMaterial(material);
        this.addTexts(options.texts);

        this._renderer.on("render", _.bind(_rendererRendered, this));

        if (this.autobuild) {
          this.needsUpdate = true;
        }

        if (this.autostart) {
          this.start();
        }
      },

      start : function () {
        this.autostart = true;
        this._startTime = Date.now();
        this._renderer.start();
      },

      stop : function () {
        this.autostart = false;
        this._renderer.stop();
      },

      teardown : function () {
        this._renderer.teardown();
      },

      setMaterial : function (material) {
        Blotter.Messaging.ensureInstanceOf(material, Blotter.Material, "Blotter.Material", "Blotter", "setMaterial");

        this._material = material;

        if (this._materialEventBinding) {
          this._materialEventBinding.unsetEventCallbacks();
        }

        this._materialEventBinding = new Blotter.ModelEventBinding(material, {
          update : _.bind(function () {
            _update.call(this);
          }, this),

          updateUniform : _.bind(function (uniformName) {
            _updateUniformValue.call(this, uniformName);
          }, this),
        });
        material.on("update", this._materialEventBinding.eventCallbacks.update);
        material.on("update:uniform", this._materialEventBinding.eventCallbacks.updateUniform);
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

          this._scopeEventBindings[text.id] = new Blotter.ModelEventBinding(this._scopes[text.id], {
            updateUniform : _.bind(function (uniformName) {
              _updateTextUniformValue.call(this, text.id, uniformName);
            }, this),
          });
          this._scopes[text.id].on("update:uniform", this._scopeEventBindings[text.id].eventCallbacks.updateUniform);
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
          this._scopeEventBindings[text.id].unsetEventCallbacks();

          delete this._textEventBindings[text.id];
          delete this._scopeEventBindings[text.id];
          delete this._scopes[text.id];
        }, this));
      },

      forText : function (text) {
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter", "forText");

        if (!(this._scopes[text.id])) {
          Blotter.Messaging.logError("Blotter", "forText", "Blotter.Text object not found in blotter");
          return;
        }

        return this._scopes[text.id];
      },

      boundsForText : function (text) {
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter", "boundsForText");

        if (!(this._scopes[text.id])) {
          Blotter.Messaging.logError("Blotter", "boundsForText", "Blotter.Text object not found in blotter");
          return;
        }

        if (this._mapping) {
          return this.mappingMaterial.boundsForText(text);
        }
      }
    };
  })();

  _.extend(Blotter.prototype, EventEmitter.prototype);

  Blotter.Version = "v0.1.0";

  // Use a single webgl context regardless of number of blotter instances.
  Blotter.webglRenderer = Blotter.webglRenderer || new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });

  Blotter.Assets = Blotter.Assets || {};
  Blotter.Assets.Shaders = Blotter.Assets.Shaders || {};

})(
  this.Blotter, this._, this.THREE, this.Detector, this.EventEmitter
);

(function(Blotter, _) {

  Blotter.Messaging = (function () {

    function _formattedMessage (domain, method, message) {
      return domain + (method ? ("#" + method) : "") + ": " + message;
    }

    return {

      ensureInstanceOf : function (object, constructor, constructorStr, domain, method) {
        if (!(object instanceof constructor)) {
          this.logError(domain, method, "argument must be instanceof " + constructorStr);
          return;
        }
      },

      logError : function (domain, method, message) {
        var formatted = _formattedMessage(domain, method, message);

        console.error(formatted);
      },

      logWarning : function (domain, method, message) {
        var formatted = _formattedMessage(domain, method, message);

        console.warn(formatted);
      },

      throwError : function (domain, method, message) {
        var formatted = _formattedMessage(domain, method, message);

        throw formatted;
      }
    };
  })();

})(
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter._extendWithGettersSetters = function (obj) {
    _.each(Array.prototype.slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] && Object.getOwnPropertyDescriptor(obj, prop) && Object.getOwnPropertyDescriptor(obj, prop).set) {
            Object.getOwnPropertyDescriptor(obj, prop).set(source[prop]);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  };

})(
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.VendorPrefixes = ["ms", "moz", "webkit", "o"];

})(
  this.Blotter, this._
);

(function(Blotter, _, EventEmitter) {

  Blotter.EmitterObject = function (settings) {
    this.init.call(this, arguments);
  };

  Blotter.EmitterObject.prototype = {

    constructor : Blotter.ModelEventBinding,

    init : function (settings) {
      _.defaults(this, settings);
    }
  };

  _.extend(Blotter.EmitterObject.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.EventEmitter
);

  (function(Blotter, _) {

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
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.CanvasUtils = {

    // Creates and returns a high a canvas

    canvas : function (w, h, options) {
      options = options || {};
      var canvas = document.createElement("canvas");

      canvas.className = options.class;
      canvas.innerHTML = options.html;

      canvas.width = w;
      canvas.height = h;

      return canvas;
    },

    // Creates and returns a high DPI canvas based on a device specific pixel ratio

    hiDpiCanvas : function (w, h, ratio, options) {
      ratio = ratio || this.pixelRatio;
      options = options || {};
      var canvas = document.createElement("canvas");

      canvas.className = options.class;
      canvas.innerHTML = options.html;

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
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.PropertyDefaults = {
    family       : 'sans-serif',
    size         : 12,
    leading      : 1.5,
    fill         : '#000',
    style        : 'normal',
    weight       : 400,
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
          Blotter.Messaging.logWarning("Blotter.TextUtils", "filterTexts", "object must be instance of Blotter.Text");
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
      // Using a <span> here may not be the best approach. In theory a user's stylesheet
      //   could override the necessary styling for determining sizes below. With growing
      //   support for custom tags in html, we may consider using them if this raises problems.
      var el = document.createElement("span"),
          size;

      properties = this.ensurePropertyValues(properties);

      el.innerHTML = textValue;
      el.style.display = "inline-block";
      el.style.fontFamily = properties.family;
      el.style.fontSize = properties.size + "px";
      el.style.fontWeight = properties.weight;
      el.style.fontStyle = properties.style;
      el.style.lineHeight = properties.leading;
      el.style.maxWidth = "none";
      el.style.padding = this.stringifiedPadding(properties);
      el.style.position = "absolute";
      el.style.width = "auto";
      el.style.visibility = "hidden";


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
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.UniformUtils = {

    // Uniform type values we accept for public uniforms

    UniformTypes : ["1f", "2f", "3f", "4f"],

    // Default uniforms (required) provided to all materials

    defaultUniforms : {
      uResolution : { type : "2f", value : [0.0, 0.0] }, // Resolution of individual text areas within mapping texture
      uAspect : { type : "1f", value : 1.0 }, // Width / Height
      uGlobalTime : { type : "1f", value : 0.0 }, // The global time in seconds
      uTimeDelta : { type : "1f", value : 0.0 }, // The render time in seconds
      uBlendColor : { type : "4f", value : [1.0, 1.0, 1.0, 1.0] }
    },

    // Determine if value is valid for public uniform type

    validValueForUniformType : function (type, value) {
      var valid = false,
          isValid = function (element) {
            return !isNaN(element);
          };

      switch (type) {
        case "1f":
          valid = !isNaN(value) && [value].every(isValid);
          break;

        case "2f":
          valid = _.isArray(value) && value.length == 2 && value.every(isValid);
          break;

        case "3f":
          valid = _.isArray(value) && value.length == 3 && value.every(isValid);
          break;

        case "4f":
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
        case "1f":
          dataType = "float";
          break;

        case "2f":
          dataType = "vec2";
          break;

        case "3f":
          dataType = "vec3";
          break;

        case "4f":
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
        case "1f":
          swizzleString = "x";
          break;

        case "2f":
          swizzleString = "xy";
          break;

        case "3f":
          swizzleString = "xyz";
          break;

        case "4f":
          swizzleString = "xyzw";
          break;

        default:
          break;
      }

      return swizzleString;
    },

    // Given an object containing uniform descriptions, return an object containing only valid uniforms based on the uniform's type and value

    extractValidUniforms : function (uniforms) {
      uniforms = uniforms || {};
      return _.reduce(uniforms, function (memo, uniformDescription, uniformName) {
        if (Blotter.UniformUtils.UniformTypes.indexOf(uniformDescription.type) == -1) {
          Blotter.Messaging.logError("Blotter.UniformUtils", "extractValidUniforms", "uniforms must be one of type: " +
            Blotter.UniformUtils.UniformTypes.join(", "));
          return memo;
        }

        if (!Blotter.UniformUtils.validValueForUniformType(uniformDescription.type, uniformDescription.value)) {
          Blotter.Messaging.logError("Blotter.UniformUtils", "extractValidUniforms", "uniform value for " + uniformName + " is incorrect for type: " + uniformDescription.type);
          return memo;
        }

        memo[uniformName] = _.pick(uniformDescription, "type", "value");
        return memo;
      }, {});
    },

    ensureHasRequiredDefaultUniforms : function (uniforms, domain, method) {
      if (!(Blotter.UniformUtils.hasRequiredDefaultUniforms(uniforms))) {
        this.logError(domain, method, "uniforms object is missing required default uniforms defined in Blotter.UniformUtils.defaultUniforms");
        return;
      }
    },

    hasRequiredDefaultUniforms : function (uniforms) {
      var missingKeys = _.difference(_.allKeys(Blotter.UniformUtils.defaultUniforms), _.allKeys(uniforms));

      return !!!missingKeys.length;
    }

  };

})(
  this.Blotter, this._
);

(function(Blotter, _, THREE, EventEmitter) {

  Blotter.Text = function (value, properties) {
    this.id = THREE.Math.generateUUID();
    this.value = value;
    this.properties = properties;
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

  Blotter._extendWithGettersSetters(Blotter.Text.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.EventEmitter
);

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

(function(Blotter, _) {

  Blotter.Assets.Shaders.Inf = [
    "//",
    "// Author : Bradley Griffith",
    "// License : Distributed under the MIT License.",
    "//",
    "bool isinf(float val) {",
    "    return (val != 0.0 && val * 2.0 == val) ? true : false;",
    "}",
  ].join("\n");

})(
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.Assets.Shaders.LineMath = [
    Blotter.Assets.Shaders.Inf,
    "",
    "//",
    "// Author : Bradley Griffith",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "// Returns the slope of a line given the degrees of the angle on which that line is rotated;",
    "float slopeForDegrees(float deg) {",
    "    // Ensure degrees stay withing 0.0 - 360.0",
    "    deg = mod(deg, 360.0);",

    "    float radians = deg * (PI / 180.0);",

    "    return tan(radians);",
    "}",

    "// Given x, a slope, and another point, find y for x.",
    "float yForXOnSlope(float x, float slope, vec2 p2) {",
    "    return -1.0 * ((slope * (p2.x - x)) - p2.y);",
    "}",

    "// Given y, a slope, and another point, find x for y.",
    "float xForYOnSlope(float y, float slope, vec2 p2) {",
    "    return ((y - p2.y) + (slope * p2.x)) / slope;",
    "}",

    "// Returns slope adjusted for screen ratio.",
    "float normalizedSlope(float slope, vec2 resolution) {",
    "    vec2 p = vec2(1.0) / resolution;",
    "    return ((slope * 100.0) / p.x) / (100.0 / p.x);",
    "}",

    "// Returns offsets (+/-) for any coordinate at distance given slope.",
    "//   Note: This function does not normalize distance.",
    "//   Note: This function does not adjust slope for screen ratio.",
    "vec2 offsetsForCoordAtDistanceOnSlope(float d, float slope) {",
    "    return vec2(",
    "        (d * cos(atan(slope))),",
    "        (d * sin(atan(slope)))",
    "    );",
    "}",
    "// Returns a boolean designating whether or not an infinite line intersects with an infinite line, and sets an `out` variable for the intersection point if it is found.",
    "//   Note: This function does not adjust slope for screen ratio.",
    "bool lineLineIntersection (out vec2 intersect, in vec2 p1, in float m1, in vec2 p2, in float m2) {",
    "    // See: http://gamedev.stackexchange.com/questions/44720/line-intersection-from-parametric-equation",
    "    //      http://stackoverflow.com/questions/41687083/formula-to-determine-if-an-infinite-line-and-a-line-segment-intersect/41687904#41687904",

    "    bool isIntersecting = false;",

    "    float dx = 1.0;",
    "    float dy = m1;",

    "    float dxx = 1.0;",
    "    float dyy = m2;",

    "    float denominator = ((dxx * dy) - (dyy * dx));",
    "    if (denominator == 0.0) {",
    "        // Lines are parallel",
    "        return isIntersecting;",
    "    }",

    "    if (isinf(dy)) {",
    "        float y = yForXOnSlope(p1.x, m2, p2);",
    "        isIntersecting = true;",
    "        intersect = vec2(p1.x, y);",
    "        return isIntersecting;",
    "    }",

    "    if (isinf(dyy)) {",
    "        float y = yForXOnSlope(p2.x, m1, p1);",
    "        isIntersecting = true;",
    "        intersect = vec2(p2.x, y);",
    "        return isIntersecting;",
    "    }",

    "    float u = ((dx * (p2.y - p1.y)) + (dy * (p1.x - p2.x))) / denominator;",

    "    isIntersecting = true;",
    "    intersect = p2 + (u * vec2(dxx, dyy));",

    "    return isIntersecting;",
    "}",

    "// Returns a boolean designating whether or not an infinite line intersects with a line segment, and sets an `out` variable for the intersection point if it is found.",
    "//   Note: This function does not adjust slope for screen ratio.",
    "bool lineLineSegmentIntersection (out vec2 intersect, in vec2 point, in float m, in vec2 pA, in vec2 pB) {",
    "    // See: http://gamedev.stackexchange.com/questions/44720/line-intersection-from-parametric-equation",
    "    //      http://stackoverflow.com/questions/41687083/formula-to-determine-if-an-infinite-line-and-a-line-segment-intersect/41687904#41687904",

    "    bool isIntersecting = false;",

    "    float dx = 1.0;",
    "    float dy = m;",

    "    float dxx = pB.x - pA.x;",
    "    float dyy = pB.y - pA.y;",

    "    float denominator = ((dxx * dy) - (dyy * dx));",
    "    if (denominator == 0.0 || (isinf(dyy / dxx) && isinf(dy))) {",
    "        // Lines are parallel",
    "        return isIntersecting;",
    "    }",

    "    if (isinf(dy)) {",
    "        float m2 = dyy / dxx;",
    "        float y = yForXOnSlope(point.x, m2, pB);",
    "        isIntersecting = true;",
    "        intersect = vec2(point.x, y);",
    "        return isIntersecting;",
    "    }",

    "    float u = ((dx * (pA.y - point.y)) + (dy * (point.x - pA.x))) / denominator;",

    "    if (u >= 0.0 && u <= 1.0) {",
    "        // Intersection occured on line segment",
    "        isIntersecting = true;",
    "        intersect = pA + (u * vec2(dxx, dyy));",
    "    }",

    "    return isIntersecting;",
    "}",
    "// Dev Note: Terrible code. Needs refactor. Just trying to find ",
    "//   which two edges of the rect the intersections occur at.",
    "void intersectsOnRectForLine(out vec2 iA, out vec2 iB, in vec2 rMinXY, in vec2 rMaxXY, in vec2 point, in float slope) {",
    "    bool firstIntersectFound = false;",

    "    vec2 intersectLeft = vec2(0.0);",
    "    vec2 intersectTop = vec2(0.0);",
    "    vec2 intersectRight = vec2(0.0);",
    "    vec2 intersectBottom = vec2(0.0);",

    "    bool intersectsLeft = lineLineSegmentIntersection(intersectLeft, point, slope, rMinXY, vec2(rMinXY.x, rMaxXY.y));",
    "    bool intersectsTop = lineLineSegmentIntersection(intersectTop, point, slope, vec2(rMinXY.x, rMaxXY.y), rMaxXY);",
    "    bool intersectsRight = lineLineSegmentIntersection(intersectRight, point, slope, rMaxXY, vec2(rMaxXY.x, rMinXY.y));",
    "    bool intersectsBottom = lineLineSegmentIntersection(intersectBottom, point, slope, rMinXY, vec2(rMaxXY.x, rMinXY.y));",


    "    if (intersectsLeft) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectLeft;",
    "        }",
    "        else {",
    "            iA = intersectLeft;",
    "            firstIntersectFound = true;",
    "        }",
    "    }",

    "    if (intersectsTop) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectTop;",
    "        }",
    "        else {",
    "            iA = intersectTop;",
    "            firstIntersectFound = true;",
    "        }",
    "    }",

    "    if (intersectsRight) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectRight;",
    "        }",
    "        else {",
    "            iA = intersectRight;",
    "            firstIntersectFound = true;",
    "        }",
    "    }",

    "    if (intersectsBottom) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectBottom;",
    "        }",
    "        else {",
    "            iA = intersectBottom;",
    "        }",
    "    }",
    "}"

  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.BlinnPhongSpecular = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "float blinnPhongSpecular( vec3 lightDirection, vec3 viewDirection, vec3 surfaceNormal, float shininess ) {",
    "",
    "  //Calculate Blinn-Phong power",
    "  vec3 H = normalize(viewDirection + lightDirection);",
    "  return pow(max(0.0, dot(surfaceNormal, H)), shininess);",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Easing = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "float linear( float t, float b, float c, float d )",
    "{",
    "    return t * ( c / d ) + b;",
    "}",
    "",
    "float linear( float t )",
    "{",
    "    return t;",
    "}",
    "",
    "float inQuad( float t, float b, float c, float d )",
    "{",
    "    return c * ( t /= d ) * t + b;",
    "}",
    "",
    "float inQuad( float t )",
    "{",
    "    return t * t;",
    "}",
    "",
    "float outQuad( float t, float b, float c, float d )",
    "{",
    "    return -c * ( t /= d ) * ( t - 2.0 ) + b;",
    "}",
    "",
    "float outQuad( float t )",
    "{",
    "    return - ( t -= 1.0 ) * t + 1.0;",
    "}",
    "",
    "float inOutQuad( float t, float b, float c, float d )",
    "{",
    "    if( ( t /= d / 2.0 ) < 1.0 ) {",
    "      return c / 2.0 * t * t + b;",
    "    }",
    "    return - c / 2.0 * ( ( --t ) * ( t - 2.0 ) - 1.0 ) + b;",
    "}",
    "",
    "float inOutQuad( float t )",
    "{",
    "    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * t * t;",
    "    return -0.5 * ( ( --t ) * ( t-2 ) - 1 );",
    "}",
    "",
    "float inCubic( float t, float b, float c, float d )",
    "{",
    "    return c * ( t /= d ) * t * t + b;",
    "}",
    "",
    "float inCubic( float t )",
    "{",
    "    return t * t * t;",
    "}",
    "",
    "float outCubic( float t, float b, float c, float d )",
    "{",
    "    return c * ( ( t = t/d - 1.0 ) * t * t + 1.0 ) + b;",
    "}",
    "",
    "float outCubic( float t )",
    "{",
    "    return ( ( --t ) * t * t + 1.0 );",
    "}",
    "",
    "float inOutCubic( float t, float b, float c, float d )",
    "{",
    "    if( ( t /= d / 2.0 ) < 1.0 ) return  c / 2.0 * t * t * t + b;",
    "    return c / 2.0 * ( ( t -= 2.0 ) * t * t + 2.0 ) + b;",
    "}",
    "",
    "float inOutCubic( float t )",
    "{",
    "    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * t * t * t;",
    "    return 0.5 * ( ( t -= 2.0 ) * t * t + 2.0 );",
    "}",
    "",
    "float inQuart( float t, float b, float c, float d )",
    "{",
    "    return c * ( t /= d ) * t * t * t + b;",
    "}",
    "",
    "float inQuart( float t )",
    "{",
    "    return t * t * t * t;",
    "}",
    "",
    "float outQuart( float t, float b, float c, float d )",
    "{",
    "    return -c * ( ( t = t/d - 1.0 ) * t * t * t - 1.0 ) + b;",
    "}",
    "",
    "float outQuart( float t )",
    "{",
    "    return - ( ( --t ) * t * t * t - 1.0 );",
    "}",
    "",
    "float inOutQuart( float t, float b, float c, float d )",
    "{",
    "    if ( ( t /= d / 2.0 ) < 1.0 ) return c / 2.0 * t * t * t * t + b;",
    "    return -c / 2.0 * ( ( t -= 2.0 ) * t * t * t - 2.0 ) + b;",
    "}",
    "",
    "float inOutQuart( float t )",
    "{",
    "    if ( (t /= 0.5 ) < 1.0 ) return 0.5 * t * t * t * t;",
    "    return -0.5 * ( ( t -= 2.0 ) * t * t * t - 2.0 );",
    "}",
    "",
    "float inQuint( float t, float b, float c, float d )",
    "{",
    "    return c * ( t /= d ) * t * t * t * t + b;",
    "}",
    "",
    "float inQuint( float t )",
    "{",
    "    return t * t * t * t * t;",
    "}",
    "",
    "float outQuint( float t, float b, float c, float d )",
    "{",
    "    return c * ( ( t = t/d - 1.0) * t * t * t * t + 1.0 ) + b;",
    "}",
    "",
    "float outQuint( float t )",
    "{",
    "    return ( ( --t ) * t * t * t * t + 1.0 );",
    "}",
    "",
    "float inOutQuint( float t, float b, float c, float d )",
    "{",
    "    if( ( t /= d /2.0 ) < 1.0 ) return  c / 2.0 * t * t * t * t * t + b;",
    "    return c / 2.0 * ( ( t -= 2.0 ) * t * t * t * t + 2.0) + b;",
    "}",
    "",
    "float inOutQuint( float t )",
    "{",
    "    if ( ( t /= 0.5 ) < 1.0 ) return 0.5 * t * t * t * t * t;",
    "    return 0.5 * ( ( t -= 2 ) * t * t * t * t + 2.0 );",
    "}",
    "",
    "float inSine( float t, float b, float c, float d )",
    "{",
    "    return -c * cos( t / d * ( 1.5707963268 ) ) + c + b;",
    "}",
    "",
    "float inSine( float t )",
    "{",
    "    return -1.0 * cos( t * ( 1.5707963268 ) ) + 1.0;",
    "}",
    "",
    "float outSine( float t, float b, float c, float d )",
    "{",
    "    return c * sin( t / d * ( 1.5707963268 ) ) + b;",
    "}",
    "",
    "float outSine( float t )",
    "{",
    "    return sin( t * ( 1.5707963268 ) );",
    "}",
    "",
    "float inOutSine( float t, float b, float c, float d )",
    "{",
    "    return - c / 2.0 * ( cos( 3.1415926536 * t / d ) - 1.0 ) + b;",
    "}",
    "",
    "float inOutSine( float t )",
    "{",
    "    return -0.5 * ( cos( 3.1415926536 * t ) - 1.0 );",
    "}",
    "",
    "float inExpo( float t, float b, float c, float d )",
    "{",
    "    return ( t == 0.0 ) ? b : c * pow( 2.0, 10.0 * ( t / d - 1.0 ) ) + b;",
    "}",
    "",
    "float inExpo( float t )",
    "{",
    "    return ( t == 0 ) ? 0.0 : pow( 2.0, 10.0 * ( t - 1.0 ) );",
    "}",
    "",
    "float outExpo( float t, float b, float c, float d )",
    "{",
    "    return ( t == d ) ? b + c : c * ( - pow( 2.0, -10.0 * t / d ) + 1.0 ) + b;",
    "}",
    "",
    "float outExpo( float t )",
    "{",
    "    return ( t == 1.0 ) ? 1.0 : ( - pow( 2.0, -10.0 * t ) + 1.0 );",
    "}",
    "",
    "float inOutExpo( float t, float b, float c, float d )",
    "{",
    "    if( t == 0 ) return b;",
    "    if( t == d ) return b + c;",
    "    if(( t /= d / 2.0 ) < 1.0 ) return c / 2.0 * pow( 2.0, 10.0 * ( t - 1.0 ) ) + b;",
    "    return c / 2.0 * ( - pow( 2.0, -10.0 * --t ) + 2.0 ) + b;",
    "}",
    "",
    "float inOutExpo( float t )",
    "{",
    "    if( t == 0.0 ) return 0.0;",
    "    if( t == 1.0 ) return 1.0;",
    "    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * pow( 2.0, 10.0 * ( t - 1.0 ) );",
    "    return 0.5 * ( - pow( 2.0, -10.0 * --t ) + 2.0 );",
    "}",
    "",
    "float inCirc( float t, float b, float c, float d )",
    "{",
    "    return -c * ( sqrt( 1.0 - (t/=d)*t) - 1) + b;",
    "}",
    "",
    "float inCirc( float t )",
    "{",
    "    return - ( sqrt( 1.0 - t*t) - 1);",
    "}",
    "",
    "float outCirc( float t, float b, float c, float d )",
    "{",
    "    return c * sqrt( 1.0 - (t=t/d-1)*t) + b;",
    "}",
    "",
    "float outCirc( float t )",
    "{",
    "    return sqrt( 1.0 - (--t)*t);",
    "}",
    "",
    "float inOutCirc( float t, float b, float c, float d )",
    "{",
    "    if ( ( t /= d / 2.0 ) < 1 ) return - c / 2.0 * ( sqrt( 1.0 - t * t ) - 1.0 ) + b;",
    "    return c / 2.0 * ( sqrt( 1.0 - ( t -= 2.0 ) * t ) + 1.0 ) + b;",
    "}",
    "",
    "float inOutCirc( float t )",
    "{",
    "    if( ( t /= 0.5 ) < 1.0 ) return -0.5 * ( sqrt( 1.0 - t * t ) - 1.0 );",
    "    return 0.5 * ( sqrt( 1.0 - ( t -= 2.0 ) * t ) + 1.0 );",
    "}",
    "",
    "float inElastic( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158; float p = 0.0; float a = c;",
    "    if( t == 0 ) return b;  if( ( t /= d ) == 1 ) return b + c;",
    "    p = d * 0.3;",
    "    if( a < abs( c ) ) { a = c; float s = p / 4.0; }",
    "    else s = 0.1591549431 * p / ( 6.2831853072 ) * asin( c / a );",
    "    return -( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) )  + b;",
    "}",
    "",
    "float inElastic( float t )",
    "{",
    "    float s = 1.70158; float p = 0.0; float a = 1.0;",
    "    if( t == 0.0 ) return 0.0;",
    "    if( t == 1.0 ) return 1.0;",
    "    p = 0.3;",
    "    s = p / ( 6.2831853072 ) * asin( 1.0 / a );",
    "    return -( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) );",
    "}",
    "",
    "float outElastic( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158; float p = 0.0; float a = c;",
    "    if( t == 0.0 ) return b;",
    "    if( (t /= d ) == 1.0 ) return b + c;",
    "    p = d * 0.3;",
    "    if( a < abs( c ) ) { a = c; s = p / 4.0; }",
    "    else { s = p / ( 6.2831853072 ) * asin( c / a ); }",
    "    return a * pow( 2.0, -10.0 * t ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) + c + b;",
    "}",
    "",
    "float outElastic( float t )",
    "{",
    "    float s = 1.70158; float p = 0.0 ; float a = 1.0;",
    "    if( t == 0.0 ) return 0.0;  if( t == 1.0 ) return 1.0;",
    "    p = 0.3;",
    "    s = p / ( 6.2831853072 ) * asin( 1.0 / a );",
    "    return a * pow( 2.0, -10.0 * t ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) + 1.0;",
    "}",
    "",
    "float inOutElastic( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158; float p = 0.0; float a = c;",
    "    if( t == 0.0 ) return b;",
    "    if( ( t /= d / 2.0 ) == 2.0 ) return b + c;",
    "    p = d * ( 0.3 * 1.5 );",
    "    if( a < abs( c ) ) { a = c; s = p / 4.0; }",
    "    else { s = p / ( 6.2831853072 ) * asin( c / a ); }",
    "    if( t < 1.0 ) return -0.5 * ( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) ) + b;",
    "    return a * pow( 2.0, -10.0 * ( t -= 1.0 ) ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) * 0.5 + c + b;",
    "}",
    "",
    "float inOutElastic( float t )",
    "{",
    "    float s = 1.70158; float p = 0; float a = 1.0;",
    "    if( t == 0 ) return 0.0;",
    "    if( ( t /= 0.5 ) == 2.0 ) return 1.0;",
    "    p = ( 0.3 * 1.5 );",
    "    s = p / ( 6.2831853072 ) * asin( 1.0 / a );",
    "    if( t < 1.0 ) return -0.5 * ( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) );",
    "    return a * pow( 2.0, -10.0 * ( t -= 1.0 ) ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) * 0.5 + 1.0;",
    "}",
    "",
    "float inBack( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158;",
    "    return c * ( t /= d ) * t * ( ( s + 1.0 ) * t - s ) + b;",
    "}",
    "",
    "float inBack( float t )",
    "{",
    "    float s = 1.70158;",
    "    return t * t * ( ( s + 1.0 ) * t - s);",
    "}",
    "",
    "float outBack( float t,  float b,  float c,  float d )",
    "{",
    "    float s = 1.70158;",
    "    return c * ( ( t = t / d - 1.0 ) * t * ( ( s + 1.0 ) * t + s ) + 1.0 ) + b;",
    "}",
    "",
    "float outBack( float t )",
    "{",
    "    float s = 1.70158;",
    "    return ( ( --t ) * t * ( ( s + 1.0 ) * t + s ) + 1.0);",
    "}",
    "",
    "float inOutBack( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158;",
    "    if( ( t /= d / 2.0 ) < 1.0 ) return c / 2.0 * ( t * t * ( ( ( s *= 1.525 ) + 1.0 ) * t - s ) ) + b;",
    "    return c / 2.0 * ( ( t -= 2.0 ) * t * ( ( ( s *= ( 1.525 ) ) + 1.0 ) * t + s ) + 2.0 ) + b;",
    "}",
    "",
    "float inOutBack( float t )",
    "{",
    "    float s = 1.70158;",
    "    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * ( t * t * ( ( ( s *= 1.525 ) + 1.0 ) * t - s ) );",
    "    return 0.5 * ( ( t -= 2 ) * t * ( ( ( s *= ( 1.525 ) ) + 1.0 ) * t + s ) + 2.0 );",
    "}",
    "",
    "float outBounce( float t, float b, float c, float d )",
    "{",
    "    if( ( t /= d ) < ( 1.0 / 2.75 ) ) {",
    "        return c * ( 7.5625 * t * t ) + b;",
    "    } else if ( t < ( 2.0 / 2.75 ) ) {",
    "        return c * ( 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + 0.75 ) + b;",
    "    } else if ( t < ( 2.5 / 2.75 ) ) {",
    "        return c * ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + 0.9375 ) + b;",
    "    } else {",
    "        return c * ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + 0.984375 ) + b;",
    "    }",
    "}",
    "",
    "float outBounce( float t )",
    "{",
    "    if( t < ( 1.0 / 2.75 ) ) {",
    "        return ( 7.5625 * t * t );",
    "    } else if ( t < ( 2.0 / 2.75 ) ) {",
    "        return ( 7.5625 * ( t-= ( 1.5 / 2.75 ) ) * t + .75 );",
    "    } else if ( t < ( 2.5 / 2.75 ) ) {",
    "        return ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + 0.9375 );",
    "    } else {",
    "        return ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + 0.984375 );",
    "    }",
    "}",
    "",
    "float inBounce( float t, float b, float c, float d )",
    "{",
    "    return c - outBounce( d - t, 0.0, c, d ) + b;",
    "}",
    "",
    "float inBounce( float t )",
    "{",
    "    return 1.0 - outBounce( 1.0 - t);",
    "}",
    "",
    "float inOutBounce( float t, float b, float c, float d )",
    "{",
    "    if ( t < d /2.0 ) return inBounce ( t * 2.0, 0.0, c, d ) * 0.5 + b;",
    "    return outBounce ( t * 2.0 - d, 0, c, d ) * 0.5 + c * 0.5 + b;",
    "}",
    "",
    "float inOutBounce( float t )",
    "{",
    "    if ( t < 0.5 ) return inBounce( t * 2.0 ) * 0.5;",
    "    return outBounce( t * 2.0 - 1.0 ) * 0.5 + 0.5;",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Gamma = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "const vec3 cGammaCorrection = vec3( 0.4545454545 );",
    "",
    "vec3 gamma( in vec3 color )",
    "{",
    "  return pow( color, cGammaCorrection );",
    "}",
    "",
    "vec4 gamma( in vec4 color )",
    "{",
    "  return vec4( gamma( color.rgb ), color.a );",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Map = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "float map( float value, float inMin, float inMax, float outMin, float outMax )",
    "{",
    "    return ( (value - inMin) / ( inMax - inMin ) * ( outMax - outMin ) ) + outMin;",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Noise = [
    "//",
    "// Author : Patricio Gonzalez Vivo and Jen Lowe",
    "// License : Distributed under the MIT License.",
    "// Source : https://github.com/patriciogonzalezvivo/thebookofshaders",
    "//",
    "float random (in float _x) {",
    "    return fract(sin(_x)*1e4);",
    "}",
    "",
    "float random (in vec2 co) {",
    "    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);",
    "}",
    "",
    "float noise (in float _x) {",
    "    float i = floor(_x);",
    "    float f = fract(_x);",
    "    float u = f * f * (3.0 - 2.0 * f);",
    "    return mix(random(i), random(i + 1.0), u);",
    "}",
    "",
    "float noise (in vec2 _st) {",
    "    vec2 i = floor(_st);",
    "    vec2 f = fract(_st);",
    "    // Four corners in 2D of a tile",
    "    float a = random(i);",
    "    float b = random(i + vec2(1.0, 0.0));",
    "    float c = random(i + vec2(0.0, 1.0));",
    "    float d = random(i + vec2(1.0, 1.0));",
    "    vec2 u = f * f * (3.0 - 2.0 * f);",
    "    return mix(a, b, u.x) + ",
    "            (c - a)* u.y * (1.0 - u.x) + ",
    "            (d - b) * u.x * u.y;",
    "}",
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Noise2D = [
    "//",
    "// Description : Array and textureless GLSL 2D simplex noise function.",
    "//      Author : Ian McEwan, Ashima Arts.",
    "//  Maintainer : ijm",
    "//     Lastmod : 20110822 (ijm)",
    "//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.",
    "//               Distributed under the MIT License. See LICENSE file.",
    "//               https://github.com/ashima/webgl-noise",
    "//",
    "",
    "vec2 n2mod289(vec2 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec3 n2mod289(vec3 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec4 n2mod289(vec4 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec3 permute(vec3 x) {",
    "  return n2mod289(((x*34.0)+1.0)*x);",
    "}",
    "",
    "float snoise(vec2 v)",
    "  {",
    "  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0",
    "                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)",
    "                     -0.577350269189626,  // -1.0 + 2.0 * C.x",
    "                      0.024390243902439); // 1.0 / 41.0",
    "// First corner",
    "  vec2 i  = floor(v + dot(v, C.yy) );",
    "  vec2 x0 = v -   i + dot(i, C.xx);",
    "",
    "// Other corners",
    "  vec2 i1;",
    "  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0",
    "  //i1.y = 1.0 - i1.x;",
    "  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);",
    "  // x0 = x0 - 0.0 + 0.0 * C.xx ;",
    "  // x1 = x0 - i1 + 1.0 * C.xx ;",
    "  // x2 = x0 - 1.0 + 2.0 * C.xx ;",
    "  vec4 x12 = x0.xyxy + C.xxzz;",
    "  x12.xy -= i1;",
    "",
    "// Permutations",
    "  i = n2mod289(i); // Avoid truncation effects in permutation",
    "  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))",
    "   + i.x + vec3(0.0, i1.x, 1.0 ));",
    "",
    "  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);",
    "  m = m*m ;",
    "  m = m*m ;",
    "",
    "// Gradients: 41 points uniformly over a line, mapped onto a diamond.",
    "// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)",
    "",
    "  vec3 x = 2.0 * fract(p * C.www) - 1.0;",
    "  vec3 h = abs(x) - 0.5;",
    "  vec3 ox = floor(x + 0.5);",
    "  vec3 a0 = x - ox;",
    "",
    "// Normalise gradients implicitly by scaling m",
    "// Approximation of: m *= inversesqrt( a0*a0 + h*h );",
    "  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );",
    "",
    "// Compute final noise value at P",
    "  vec3 g;",
    "  g.x  = a0.x  * x0.x  + h.x  * x0.y;",
    "  g.yz = a0.yz * x12.xz + h.yz * x12.yw;",
    "  return 130.0 * dot(m, g);",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Noise3D = [
    "//",
    "// Description : Array and textureless GLSL 2D/3D/4D simplex",
    "//               noise functions.",
    "//      Author : Ian McEwan, Ashima Arts.",
    "//  Maintainer : ijm",
    "//     Lastmod : 20110822 (ijm)",
    "//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.",
    "//               Distributed under the MIT License. See LICENSE file.",
    "//               https://github.com/ashima/webgl-noise",
    "//",
    "",
    "vec2 n3mod289(vec2 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec3 n3mod289(vec3 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec4 n3mod289(vec4 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec4 permute(vec4 x) {",
    "     return n3mod289(((x*34.0)+1.0)*x);",
    "}",
    "",
    "vec4 taylorInvSqrt(vec4 r)",
    "{",
    "  return 1.79284291400159 - 0.85373472095314 * r;",
    "}",
    "",
    "float snoise(vec3 v)",
    "  {",
    "  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;",
    "  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);",
    "",
    "// First corner",
    "  vec3 i  = floor(v + dot(v, C.yyy) );",
    "  vec3 x0 =   v - i + dot(i, C.xxx) ;",
    "",
    "// Other corners",
    "  vec3 g = step(x0.yzx, x0.xyz);",
    "  vec3 l = 1.0 - g;",
    "  vec3 i1 = min( g.xyz, l.zxy );",
    "  vec3 i2 = max( g.xyz, l.zxy );",
    "",
    "  //   x0 = x0 - 0.0 + 0.0 * C.xxx;",
    "  //   x1 = x0 - i1  + 1.0 * C.xxx;",
    "  //   x2 = x0 - i2  + 2.0 * C.xxx;",
    "  //   x3 = x0 - 1.0 + 3.0 * C.xxx;",
    "  vec3 x1 = x0 - i1 + C.xxx;",
    "  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y",
    "  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y",
    "",
    "// Permutations",
    "  i = n3mod289(i);",
    "  vec4 p = permute( permute( permute(",
    "             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))",
    "           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))",
    "           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));",
    "",
    "// Gradients: 7x7 points over a square, mapped onto an octahedron.",
    "// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)",
    "  float n_ = 0.142857142857; // 1.0/7.0",
    "  vec3  ns = n_ * D.wyz - D.xzx;",
    "",
    "  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)",
    "",
    "  vec4 x_ = floor(j * ns.z);",
    "  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)",
    "",
    "  vec4 x = x_ *ns.x + ns.yyyy;",
    "  vec4 y = y_ *ns.x + ns.yyyy;",
    "  vec4 h = 1.0 - abs(x) - abs(y);",
    "",
    "  vec4 b0 = vec4( x.xy, y.xy );",
    "  vec4 b1 = vec4( x.zw, y.zw );",
    "",
    "  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;",
    "  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;",
    "  vec4 s0 = floor(b0)*2.0 + 1.0;",
    "  vec4 s1 = floor(b1)*2.0 + 1.0;",
    "  vec4 sh = -step(h, vec4(0.0));",
    "",
    "  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;",
    "  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;",
    "",
    "  vec3 p0 = vec3(a0.xy,h.x);",
    "  vec3 p1 = vec3(a0.zw,h.y);",
    "  vec3 p2 = vec3(a1.xy,h.z);",
    "  vec3 p3 = vec3(a1.zw,h.w);",
    "",
    "//Normalise gradients",
    "  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));",
    "  p0 *= norm.x;",
    "  p1 *= norm.y;",
    "  p2 *= norm.z;",
    "  p3 *= norm.w;",
    "",
    "// Mix final noise value",
    "  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);",
    "  m = m * m;",
    "  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),",
    "                                dot(p2,x2), dot(p3,x3) ) );",
    "  }"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Noise4D = [
    "//",
    "// Description : Array and textureless GLSL 2D/3D/4D simplex",
    "//               noise functions.",
    "//      Author : Ian McEwan, Ashima Arts.",
    "//  Maintainer : ijm",
    "//     Lastmod : 20110822 (ijm)",
    "//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.",
    "//               Distributed under the MIT License. See LICENSE file.",
    "//               https://github.com/ashima/webgl-noise",
    "//",
    "",
    "vec4 mod289(vec4 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0; }",
    "",
    "float mod289(float x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0; }",
    "",
    "vec4 permute(vec4 x) {",
    "     return mod289(((x*34.0)+1.0)*x);",
    "}",
    "",
    "float permute(float x) {",
    "     return mod289(((x*34.0)+1.0)*x);",
    "}",
    "",
    "vec4 taylorInvSqrt(vec4 r)",
    "{",
    "  return 1.79284291400159 - 0.85373472095314 * r;",
    "}",
    "",
    "float taylorInvSqrt(float r)",
    "{",
    "  return 1.79284291400159 - 0.85373472095314 * r;",
    "}",
    "",
    "vec4 grad4(float j, vec4 ip)",
    "  {",
    "  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);",
    "  vec4 p,s;",
    "",
    "  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;",
    "  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);",
    "  s = vec4(lessThan(p, vec4(0.0)));",
    "  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;",
    "",
    "  return p;",
    "  }",
    "",
    "// (sqrt(5) - 1)/4 = F4, used once below",
    "#define F4 0.309016994374947451",
    "",
    "float snoise(vec4 v)",
    "  {",
    "  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4",
    "                        0.276393202250021,  // 2 * G4",
    "                        0.414589803375032,  // 3 * G4",
    "                       -0.447213595499958); // -1 + 4 * G4",
    "",
    "// First corner",
    "  vec4 i  = floor(v + dot(v, vec4(F4)) );",
    "  vec4 x0 = v -   i + dot(i, C.xxxx);",
    "",
    "// Other corners",
    "",
    "// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)",
    "  vec4 i0;",
    "  vec3 isX = step( x0.yzw, x0.xxx );",
    "  vec3 isYZ = step( x0.zww, x0.yyz );",
    "//  i0.x = dot( isX, vec3( 1.0 ) );",
    "  i0.x = isX.x + isX.y + isX.z;",
    "  i0.yzw = 1.0 - isX;",
    "//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );",
    "  i0.y += isYZ.x + isYZ.y;",
    "  i0.zw += 1.0 - isYZ.xy;",
    "  i0.z += isYZ.z;",
    "  i0.w += 1.0 - isYZ.z;",
    "",
    "  // i0 now contains the unique values 0,1,2,3 in each channel",
    "  vec4 i3 = clamp( i0, 0.0, 1.0 );",
    "  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );",
    "  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );",
    "",
    "  //  x0 = x0 - 0.0 + 0.0 * C.xxxx",
    "  //  x1 = x0 - i1  + 1.0 * C.xxxx",
    "  //  x2 = x0 - i2  + 2.0 * C.xxxx",
    "  //  x3 = x0 - i3  + 3.0 * C.xxxx",
    "  //  x4 = x0 - 1.0 + 4.0 * C.xxxx",
    "  vec4 x1 = x0 - i1 + C.xxxx;",
    "  vec4 x2 = x0 - i2 + C.yyyy;",
    "  vec4 x3 = x0 - i3 + C.zzzz;",
    "  vec4 x4 = x0 + C.wwww;",
    "",
    "// Permutations",
    "  i = mod289(i);",
    "  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);",
    "  vec4 j1 = permute( permute( permute( permute (",
    "             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))",
    "           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))",
    "           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))",
    "           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));",
    "",
    "// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope",
    "// 7*7*6 = 294, which is close to the ring size 17*17 = 289.",
    "  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;",
    "",
    "  vec4 p0 = grad4(j0,   ip);",
    "  vec4 p1 = grad4(j1.x, ip);",
    "  vec4 p2 = grad4(j1.y, ip);",
    "  vec4 p3 = grad4(j1.z, ip);",
    "  vec4 p4 = grad4(j1.w, ip);",
    "",
    "// Normalise gradients",
    "  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));",
    "  p0 *= norm.x;",
    "  p1 *= norm.y;",
    "  p2 *= norm.z;",
    "  p3 *= norm.w;",
    "  p4 *= taylorInvSqrt(dot(p4,p4));",
    "",
    "// Mix contributions from the five corners",
    "  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);",
    "  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);",
    "  m0 = m0 * m0;",
    "  m1 = m1 * m1;",
    "  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))",
    "               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;",
    "",
    "  }"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.PI = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "#define TWO_PI 6.2831853072",
    "#define PI 3.14159265359",
    "#define HALF_PI 1.57079632679"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Random = [
    "//",
    "// Author : Patricio Gonzalez Vivo and Jen Lowe",
    "// License : Distributed under the MIT License.",
    "// Source : https://github.com/patriciogonzalezvivo/thebookofshaders",
    "//",
    "",
    "float random (in float _x) {",
  	"    return fract(sin(_x)*1e4);",
  	"}",
  	"",
  	"float random (in vec2 co) {",
  	"    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);",
	  "}"
  ].join("\n");

})(
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.Mapping = function (texts, textBounds, width, height) {
    this.texts = texts;

    this._textBounds = textBounds;

    this._width = width;
    this._height = height;

    this._ratio = 1;
  };

  Blotter.Mapping.prototype = (function () {

    function _getLineHeightPixels (size, lineHeight) {
      lineHeight = lineHeight || Blotter.TextUtils.ensurePropertyValues().leading;
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
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Mapping", "boundsForText");

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
        var canvas = Blotter.CanvasUtils.hiDpiCanvas(this._width, this._height, this._ratio),
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

        img.onload = _.bind(function () {
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

})(
  this.Blotter, this._
);

(function(Blotter, _, EventEmitter) {

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
    }

    function _getUniformInterfaceForDataTextureObject (dataTextureObject) {
      var interface = {
        _type : dataTextureObject.userUniform.type,
        _value : dataTextureObject.userUniform.value,

        get value () {
          return this._value;
        },

        set value (v) {
          if (!Blotter.UniformUtils.validValueForUniformType(this._type, v)) {
            Blotter.Messaging.logError("Blotter.MappingMaterial", false, "uniform value not valid for uniform type: " + this._type);
            return;
          }
          this._value = v;

          this.trigger("update");
        }
      };

      _.extend(interface, EventEmitter.prototype);

      return interface;
    }

    function _getTextUniformInterface (mapping, userUniformDataTextureObjects) {
      return _.reduce(mapping.texts, function (memo, text, i) {
        memo[text.id] = _.reduce(userUniformDataTextureObjects, function (memo, dataTextureObject, uniformName) {
          memo[uniformName] = _getUniformInterfaceForDataTextureObject(dataTextureObject);

          memo[uniformName].on("update", function () {
            _setValueAtIndexInDataTextureObject(memo[uniformName].value, i, dataTextureObject);

            dataTextureObject.texture.needsUpdate = true;
          });

          memo[uniformName].value = dataTextureObject.userUniform.value;

          return memo;
        }, {});

        return memo;
      }, {});
    }

    function _getUniformInterface (mapping, userUniformDataTextureObjects, textUniformInterface) {
      return _.reduce(userUniformDataTextureObjects, function (memo, dataTextureObject, uniformName) {
        memo[uniformName] = _getUniformInterfaceForDataTextureObject(dataTextureObject);

        memo[uniformName].on("update", function () {
          _.each(mapping.texts, function (text) {
            textUniformInterface[text.id][uniformName].value = memo[uniformName].value;
          });

          dataTextureObject.texture.needsUpdate = true;
        });

        return memo;
      }, {});
    }

    return {

      constructor : Blotter.MappingMaterial,

      get uniforms () {
        return this.material.uniforms;
      },

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
        this.textUniformInterface = _getTextUniformInterface(this.mapping, this._userUniformDataTextureObjects);
        this.uniformInterface = _getUniformInterface(this.mapping, this._userUniformDataTextureObjects, this.textUniformInterface);
      },

      boundsForText : function (text) {
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.MappingMaterial", "boundsForText");
        return this.mapping.boundsForText(text);
      }
    };
  })();

})(
  this.Blotter, this._, this.EventEmitter
);

(function(Blotter, _, EventEmitter) {

  Blotter.Material = function () {
    this.init.apply(this, arguments);
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

    function _getUniformInterfaceForUniformDescription (uniformDescription) {
      var interface = {
        _type : uniformDescription.type,
        _value : uniformDescription.value,

        get type () {
          return this._type;
        },

        set type (v) {
          this._type = v;
        },

        get value () {
          return this._value;
        },

        set value (v) {
          if (!Blotter.UniformUtils.validValueForUniformType(this._type, v)) {
            Blotter.Messaging.logError("Blotter.Material", false, "uniform value not valid for uniform type: " + this._type);
            return;
          }
          this._value = v;

          this.trigger("update");
        }
      };

      _.extend(interface, EventEmitter.prototype);

      return interface;
    }

    function _getUniformInterface (uniforms) {
      return _.reduce(uniforms, _.bind(function (memo, uniformDescription, uniformName) {
        memo[uniformName] = _getUniformInterfaceForUniformDescription(uniformDescription);
        memo[uniformName].on("update", _.bind(function () {
          this.trigger("update:uniform", [uniformName]);
        }, this));

        return memo;
      }, this), {});
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
        this._uniforms = _getUniformInterface.call(this, Blotter.UniformUtils.extractValidUniforms(
          _.extend(uniforms, Blotter.UniformUtils.defaultUniforms)
        ));
      },

      init : function () {
        this.mainImage = _defaultMainImageSrc();
        this.uniforms = {};
      }
    };
  })();

  Blotter._extendWithGettersSetters(Blotter.Material.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.EventEmitter
);

(function(Blotter, _) {

  Blotter.ShaderMaterial = function(mainImage, options) {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.ShaderMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.ShaderMaterial.prototype, (function () {

    return {

      constructor : Blotter.RGBSplitMaterial,

      init : function (mainImage, options) {
        _.defaults(this, options);

        this.mainImage = mainImage;
      }
    };

  })());

})(
  this.Blotter, this._
);

(function(Blotter, _, EventEmitter) {

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

    this.domElement = Blotter.CanvasUtils.hiDpiCanvas(0, 0, this.blotter.ratio, {
      class : "b-canvas",
      html : text.value
    });

    this.context = this.domElement.getContext("2d");
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
          y : -1 * Math.floor(mappingMaterial.height - (bounds.y + bounds.h))
        };
      }
    }

    function _transferInferfaceValues (oldInterface, newInterface) {
      _.each(oldInterface, function(interfaceObject, uniformName) {
        var newInterfaceObject = newInterface[uniformName];

        if (newInterfaceObject) {
          var typesMatch = newInterfaceObject.type == interfaceObject.type,
              valuesMatch = newInterfaceObject.value == interfaceObject.value;

          if (typesMatch && !valuesMatch) {
            newInterfaceObject.value = interfaceObject.value;
          }
        }
      });
    }

    function _getUniformInterfaceForUniformDescription (uniformDescription) {
      var interface = {
        _type : uniformDescription.type,
        _value : uniformDescription.value,

        get type () {
          return this._type;
        },

        set type (v) {
          Blotter.Messaging.logError("Blotter.RenderScope", false, "uniform types may not be updated through a text scope");
        },

        get value () {
          return this._value;
        },

        set value (v) {
          if (!Blotter.UniformUtils.validValueForUniformType(this._type, v)) {
            Blotter.Messaging.logError("Blotter.RenderScope", false, "uniform value not valid for uniform type: " + this._type);
            return;
          }
          this._value = v;

          this.trigger("update");
        }
      };

      _.extend(interface, EventEmitter.prototype);

      return interface;
    }

    function _getUniformInterfaceForMaterialUniforms (uniforms) {
      return _.reduce(uniforms, _.bind(function (memo, uniformDescription, uniformName) {
        memo[uniformName] = _getUniformInterfaceForUniformDescription(uniformDescription);
        memo[uniformName].on("update", _.bind(function () {
          this.trigger("update:uniform", [uniformName]);
        }, this));

        return memo;
      }, this), {});
    }

    function _update () {
      var mappingMaterial = this._mappingMaterial,
          bounds = mappingMaterial && _getBoundsForMappingMaterialAndText(mappingMaterial, this.text),
          previousUniforms = this.material.uniforms;

      if (mappingMaterial && bounds) {
        Blotter.CanvasUtils.updateCanvasSize(
          this.domElement,
          bounds.w / this.blotter.ratio,
          bounds.h / this.blotter.ratio,
          this.blotter.ratio
        );
        this.domElement.innerHTML = this.text.value;

        this.bounds = bounds;

        this.material.uniforms = _getUniformInterfaceForMaterialUniforms.call(this, mappingMaterial.uniforms);
        this.material.mainImage = mappingMaterial.mainImage;

        if (previousUniforms) {
          _transferInferfaceValues(previousUniforms, this.material.uniforms);
        }

        this.trigger(this.lastUpdated ? "update" : "ready");
        this.lastUpdated = Date.now();
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
        if (typeof element.append === "function") {
          element.append(this.domElement);
        } else {
          element.appendChild(this.domElement);
        }

        _setMouseEventListeners.call(this);

        return this;
      }
    };
  })();

  Blotter._extendWithGettersSetters(Blotter.RenderScope.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.EventEmitter
);

(function(Blotter, _, THREE, EventEmitter) {

  var root = this;

  Blotter.Renderer = function () {
    this._currentAnimationLoop = false;

    this._scene = new THREE.Scene();

    this._plane = new THREE.PlaneGeometry(1, 1);

    this._material = new THREE.MeshBasicMaterial(); // Stub material.

    this._mesh = new THREE.Mesh(this._plane, this._material);
    this._scene.add(this._mesh);

    this._camera = new THREE.OrthographicCamera(0.5, 0.5, 0.5, 0.5, 0, 100);

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
      Blotter.webglRenderer.render(this._scene, this._camera, this._renderTarget);

      Blotter.webglRenderer.readRenderTargetPixels(
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
      }
    };
  })();

  Blotter._extendWithGettersSetters(Blotter.Renderer.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.EventEmitter
);

(function(Blotter, _, THREE, setImmediate) {

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
  this.Blotter, this._, this.THREE, this.setImmediate
);

(function(Blotter, _, THREE, setImmediate) {

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
  this.Blotter, this._, this.THREE, this.setImmediate
);


(function(Blotter, _, THREE) {

  Blotter.TextTextureBuilder = (function() {

    return {

      build : function (mapping, completion) {
        var loader = new THREE.TextureLoader(),
            url;

        mapping.toCanvas(_.bind(function(canvas) {
          url = canvas.toDataURL();

          loader.load(url, _.bind(function(texture) {
            texture.generateMipmaps = true; // TODO: Make optional.
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.needsUpdate = true;

            completion(texture);
          }, this));
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE
);

(function(Blotter, _, THREE, GrowingPacker, setImmediate) {

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
              y : packer.root.h - (packedSizesObject.fit.y + packedSizesObject.h)
            };
          }

          completion(new Blotter.Mapping(filteredTexts, textBounds, packer.root.w, packer.root.h));
        });
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE) {

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
          userUniforms = {
            // Strings of sampler2D declarations for each user defined and default uniform texture.
            privateUniformTextureDeclarations : "",
            // Strings of uniform declarations for each publicly facing version of each user defined and default uniform.
            publicUniformDeclarations         : "",
            // Strings of uniform definitions for each publicly facing version of each user defined and default uniform.
            uniformDefinitions                : ""
          };

      _.reduce(uniforms, function (userUniforms, uniformObject, uniformName) {
        var uniformTextureName = _userUniformDataTextureNameForUniformName(uniformName),
            glslSwizzle = Blotter.UniformUtils.fullSwizzleStringForUniformType(uniformObject.userUniform.type),
            glslDataType = Blotter.UniformUtils.glslDataTypeForUniformType(uniformObject.userUniform.type);

        userUniforms.privateUniformTextureDeclarations += "uniform sampler2D " + uniformTextureName + ";\n";
        userUniforms.publicUniformDeclarations += glslDataType + " " + uniformName + ";\n";
        userUniforms.uniformDefinitions += "   " + uniformName + " = " + "texture2D(" + uniformTextureName + " , vec2(textIndex, 0.5))." + glslSwizzle + ";\n";

        return userUniforms;
      }, userUniforms);

      fragmentSrc = [

        Blotter.Assets.Shaders.Blending,

        Blotter.Assets.Shaders.TextTexture,

        // Private blotter defined uniforms.
        "uniform sampler2D _uSampler;",
        "uniform vec2 _uCanvasResolution;",
        "uniform sampler2D _uTextIndicesTexture;",
        "uniform sampler2D _uTextBoundsTexture;",

        // Private texCoord and bounds information.
        "varying vec2 _vTexCoord;",
        "vec4 _textBounds;",

        // Private versions of user defined and default uniform declarations
        userUniforms.privateUniformTextureDeclarations,

        // Public versions of user defined and default uniform declarations
        userUniforms.publicUniformDeclarations,

        "// Helper function used by user programs to retrieve texel color information within the bounds of",
        "// any given text. This is to be used instead of `texture2D` in the fragment sources for all Blotter materials.",
        "vec4 textTexture(vec2 coord) {",
        "   vec2 adjustedFragCoord = _textBounds.xy + vec2((_textBounds.z * coord.x), (_textBounds.w * coord.y));",
        "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;",

        "   //  If adjustedFragCoord falls outside the bounds of the current texel's text, return `vec4(0.0)`.",
        "   if (adjustedFragCoord.x < _textBounds.x ||",
        "       adjustedFragCoord.x > _textBounds.x + _textBounds.z ||",
        "       adjustedFragCoord.y < _textBounds.y ||",
        "       adjustedFragCoord.y > _textBounds.y + _textBounds.w) {",
        "     return vec4(0.0);",
        "   }",

        "   return texture2D(_uSampler, uv);",
        "}",

        "void mainImage(out vec4 mainImage, in vec2 fragCoord);",

        mainImageSrc,

        "void main(void) {",

        //  Retrieve text index and text alpha for text bounds in which texel is contained.
        "   vec4 textIndexData = texture2D(_uTextIndicesTexture, _vTexCoord);",
        "   float textIndex = textIndexData.r;",
        "   float textAlpha = textIndexData.a;",

        //  Make bounds for the current text globally visible.
        "   _textBounds = texture2D(_uTextBoundsTexture, vec2(textIndex, 0.5));",


        //  Set "uniform" values visible to user.
        userUniforms.uniformDefinitions,
        "   uResolution = _textBounds.zw;",
        "   uAspect = _textBounds.z /_textBounds.w;",

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
      Blotter.UniformUtils.ensureHasRequiredDefaultUniforms(userUniforms,
        "Blotter.MappingMaterialBuilder",
        "_buildUserUniformDataTextureObjects");

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
  this.Blotter, this._, this.THREE
);
