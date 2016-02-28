// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}/******************************************************************************

This is a binary tree based bin packing algorithm that is more complex than
the simple Packer (packer.js). Instead of starting off with a fixed width and
height, it starts with the width and height of the first block passed and then
grows as necessary to accomodate each subsequent block. As it grows it attempts
to maintain a roughly square ratio by making 'smart' choices about whether to
grow right or down.

When growing, the algorithm can only grow to the right OR down. Therefore, if
the new block is BOTH wider and taller than the current target then it will be
rejected. This makes it very important to initialize with a sensible starting
width and height. If you are providing sorted input (largest first) then this
will not be an issue.

A potential way to solve this limitation would be to allow growth in BOTH
directions at once, but this requires maintaining a more complex tree
with 3 children (down, right and center) and that complexity can be avoided
by simply chosing a sensible starting block.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

  blocks: array of any objects that have .w and .h attributes

Outputs:
-------

  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates

Example:
-------

  var blocks = [
    { w: 100, h: 100 },
    { w: 100, h: 100 },
    { w:  80, h:  80 },
    { w:  80, h:  80 },
    etc
    etc
  ];

  var packer = new GrowingPacker();
  packer.fit(blocks);

  for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }


******************************************************************************/

GrowingPacker = function() { };

GrowingPacker.prototype = {

  fit: function(blocks) {
    var n, node, block, len = blocks.length;
    var w = len > 0 ? blocks[0].w : 0;
    var h = len > 0 ? blocks[0].h : 0;
    this.root = { x: 0, y: 0, w: w, h: h };
    for (n = 0; n < len ; n++) {
      block = blocks[n];
      if (node = this.findNode(this.root, block.w, block.h))
        block.fit = this.splitNode(node, block.w, block.h);
      else
        block.fit = this.growNode(block.w, block.h);
    }
  },

  findNode: function(root, w, h) {
    if (root.used)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if ((w <= root.w) && (h <= root.h))
      return root;
    else
      return null;
  },

  splitNode: function(node, w, h) {
    node.used = true;
    node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
    node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
    return node;
  },

  growNode: function(w, h) {
    var canGrowDown  = (w <= this.root.w);
    var canGrowRight = (h <= this.root.h);

    var shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
    var shouldGrowDown  = canGrowDown  && (this.root.w >= (this.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

    if (shouldGrowRight)
      return this.growRight(w, h);
    else if (shouldGrowDown)
      return this.growDown(w, h);
    else if (canGrowRight)
     return this.growRight(w, h);
    else if (canGrowDown)
      return this.growDown(w, h);
    else
      return null; // need to ensure sensible root starting size to avoid this happening
  },

  growRight: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w + w,
      h: this.root.h,
      down: this.root,
      right: { x: this.root.w, y: 0, w: w, h: this.root.h }
    };
    var node = this.findNode(this.root, w, h);
    if (node)
      return this.splitNode(node, w, h);
    else
      return null;
  },

  growDown: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w,
      h: this.root.h + h,
      down:  { x: 0, y: this.root.h, w: this.root.w, h: h },
      right: this.root
    };
    var node = this.findNode(this.root, w, h);
    if (node)
      return this.splitNode(node, w, h);
    else
      return null;
  }

}
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () {

		try {

			var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

		} catch ( e ) {

			return false;

		}

	} )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};

// browserify support
if ( typeof module === 'object' ) {

	module.exports = Detector;

}!function() {
  var Blotter = {
    version: "1.0.0"
  };
  var blotter_VendorPrefixes = [ "ms", "moz", "webkit", "o" ];
  var blotter_Animation = function() {
    var lastTime = 0, requestAnimationFrame = window.requestAnimationFrame, cancelAnimationFrame = window.cancelAnimationFrame, vendors = blotter_VendorPrefixes;
    for (var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
      requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
      cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!requestAnimationFrame) {
      requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!cancelAnimationFrame) {
      cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
    return {
      requestAnimationFrame: function(callback) {
        requestAnimationFrame.call(window, callback);
      },
      cancelAnimationFrame: function(id) {
        cancelAnimationFrame.call(window, id);
      }
    };
  }();
  var blotter_Messaging = function() {
    function _formattedMessage(domain, message) {
      return domain + ": " + message;
    }
    return {
      logError: function(domain, message) {
        var formatted = _formattedMessage(domain, message);
        console.error(formatted);
      },
      throwError: function(domain, message) {
        var formatted = _formattedMessage(domain, message);
        throw formatted;
      }
    };
  }();
  var blotter_CanvasUtils = {
    hiDpiCanvas: function(w, h, pixelRatio) {
      pixelRatio = pixelRatio || this.pixelRatio();
      var canvas = document.createElement("canvas");
      canvas.width = w * pixelRatio;
      canvas.height = h * pixelRatio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      return canvas;
    },
    pixelRatio: function() {
      var legibilitySharpeningMultiplier = 2;
      var ctx = document.createElement("canvas").getContext("2d"), dpr = window.devicePixelRatio || 1, bsr = ctx.backingStorePixelRatio;
      for (var x = 0; x < blotter_VendorPrefixes.length && !bsr; ++x) {
        bsr = ctx[blotter_VendorPrefixes[x] + "BackingStorePixelRatio"];
      }
      bsr = bsr || 1;
      return dpr / bsr * legibilitySharpeningMultiplier;
    }
  };
  var blotter_PropertyDefaults = {
    family: "sans-serif",
    size: 12,
    leading: 1.5,
    fill: "#000",
    style: "normal",
    weight: 500,
    padding: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  };
  var blotter_TextUtils = {
    Properties: function() {
      return Object.keys(blotter_PropertyDefaults);
    }(),
    ensurePropertyValues: function(properties) {
      var _properties = properties || {}, defaultedProperties = blotter_PropertyDefaults;
      for (var i = 0; i < this.Properties.length; i++) {
        var k = this.Properties[i];
        if (k in _properties) {
          defaultedProperties[k] = _properties[k];
        }
      }
      return defaultedProperties;
    },
    stringifiedPadding: function(properties) {
      var _properties = properties || this.ensurePropertyValues(), pTop = properties.paddingTop || _properties.padding, pRight = _properties.paddingRight || _properties.padding, pBottom = _properties.paddingBottom || _properties.padding, pLeft = _properties.paddingLeft || _properties.padding;
      return pTop + "px " + pRight + "px " + pBottom + "px " + pLeft + "px";
    },
    sizeForText: function(textValue, properties) {
      var el = document.createElement("p"), properties = this.ensurePropertyValues(properties), size;
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
  Blotter.Text = function(value, properties) {
    this.init(value, properties);
  };
  Blotter.Text.prototype = function() {
    function _generateId() {
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
      }
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : r & 3 | 8).toString(16);
      });
      return uuid;
    }
    return {
      constructor: Blotter.Text,
      init: function(value, properties) {
        this.id = _generateId.call(this);
        this.value = value;
        this.properties = blotter_TextUtils.ensurePropertyValues(properties);
      }
    };
  }();
  var blotter_Mapper = function(texts) {
    this.init.apply(this, arguments);
  };
  blotter_Mapper.prototype = function() {
    function _updateTexts(texts, eachCallback) {
      if (!(texts instanceof Array)) {
        texts = [ texts ];
      }
      for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        if (texts instanceof Blotter.Text) {
          blotter_Messaging.throwError("blotter_Mapper", "argument must be instance of Blotter.Text or array of objects that are instances of Blotter.Text");
        }
        eachCallback.call(this, text);
      }
      _determineTextsMapping.call(this);
    }
    function _determineTextsMapping() {
      var packer = new GrowingPacker(), tempTextsSizesArray = [];
      for (var textId in this.textsSizes) {
        var tempSizesObject = this.textsSizes[textId];
        tempSizesObject.referenceId = textId;
        tempTextsSizesArray.push(tempSizesObject);
      }
      packer.fit(tempTextsSizesArray.sort(_sortTexts));
      for (var i = 0; i < tempTextsSizesArray.length; i++) {
        var packedSizesObject = tempTextsSizesArray[i];
        this.textsSizes[packedSizesObject.referenceId].fit = packedSizesObject.fit;
      }
      this.width = packer.root.w;
      this.height = packer.root.h;
    }
    function _sortTexts(textA, textB) {
      var areaA = textA.w * textA.h, areaB = textB.w * textB.h;
      return areaB - areaA;
    }
    return {
      constructor: blotter_Mapper,
      init: function(texts) {
        this.texts = [];
        this.textsSizes = {};
        this.width = 0;
        this.height = 0;
        this.addTexts(texts);
      },
      addTexts: function(texts) {
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
      removeTexts: function(texts) {
        _updateTexts.call(this, texts, function(text) {
          var textsIndex = this.texts.indexOf(text);
          if (textsIndex != -1) {
            this.texts.splice(textsIndex, 1);
          }
          delete this.textsSizes[text.id];
        });
      },
      sizeForText: function(text) {
        return this.textsSizes[text.id];
      },
      toCanvas: function() {
        var canvas = blotter_CanvasUtils.hiDpiCanvas(this.width, this.height), ctx = canvas.getContext("2d");
        for (var i = 0; i < this.texts.length; i++) {
          var text = this.texts[i], size = this.textsSizes[text.id], lineHeightOffset = text.properties.size / 2 + (text.properties.size * text.properties.leading - text.properties.size) / 2;
          ctx.font = text.properties.style + " " + text.properties.weight + " " + text.properties.size + "px " + text.properties.family;
          ctx.fillStyle = text.properties.fill;
          ctx.fillText(text.value, size.fit.x + text.properties.paddingLeft, size.fit.y + text.properties.paddingTop + lineHeightOffset);
        }
        return canvas;
      },
      getImage: function() {
        return this.toCanvas().toDataURL();
      }
    };
  }();
  var blotter_TextsIndicesTexture = function(mapper, fidelityModifier) {
    this.init(mapper, fidelityModifier);
  };
  blotter_TextsIndicesTexture.prototype = function() {
    function _textsIndices(completion) {
      var self = this, height = this.mapper.height * this.fidelityModifier, width = this.mapper.width * this.fidelityModifier, points = new Float32Array(height * width * 4), widthStepModifier = width % 1, indicesOffset = 1 / this.mapper.texts.length / 2;
      setTimeout(function() {
        for (var i = 1; i < points.length / 4; i++) {
          var y = Math.ceil(i / (width - widthStepModifier)), x = i - (width - widthStepModifier) * (y - 1), referenceIndex = 0, bg = 0, a = 0;
          for (var ki = 0; ki < self.mapper.texts.length; ki++) {
            var text = self.mapper.texts[ki], textSize = self.mapper.sizeForText(text), fitY = textSize.fit.y * self.fidelityModifier, fitX = textSize.fit.x * self.fidelityModifier, vH = textSize.h * self.fidelityModifier, vW = textSize.w * self.fidelityModifier;
            if (y >= fitY && y <= fitY + vH && x >= fitX && x <= fitX + vW) {
              referenceIndex = ki / self.mapper.texts.length + indicesOffset;
              a = 1;
              break;
            }
          }
          var index = i - 1;
          points[4 * index + 0] = referenceIndex;
          points[4 * index + 1] = bg;
          points[4 * index + 2] = bg;
          points[4 * index + 3] = a;
        }
        completion(points);
      }, 1);
    }
    return {
      constructor: blotter_TextsIndicesTexture,
      init: function(mapper, fidelityModifier) {
        this.mapper = mapper;
        this.fidelityModifier = fidelityModifier || .5;
      },
      build: function(callback) {
        var self = this;
        _textsIndices.call(this, function(dataPoints) {
          var texture = new THREE.DataTexture(dataPoints, self.mapper.width * self.fidelityModifier, self.mapper.height * self.fidelityModifier, THREE.RGBAFormat, THREE.FloatType);
          texture.flipY = true;
          texture.needsUpdate = true;
          callback(texture);
        });
      }
    };
  }();
  var blotter_TextsBoundsTexture = function(mapper) {
    this.init(mapper);
  };
  blotter_TextsBoundsTexture.prototype = function() {
    function _spriteBounds(completion) {
      var self = this, data = new Float32Array(this.mapper.texts.length * 4);
      setTimeout(function() {
        for (var i = 0; i < self.mapper.texts.length; i++) {
          var text = self.mapper.texts[i], textSize = self.mapper.sizeForText(text);
          data[4 * i] = textSize.fit.x * self.pixelRatio;
          data[4 * i + 1] = self.ratioAdjustedHeight - (textSize.fit.y + textSize.h) * self.pixelRatio;
          data[4 * i + 2] = textSize.w * self.pixelRatio;
          data[4 * i + 3] = textSize.h * self.pixelRatio;
        }
        completion(data);
      }, 1);
    }
    return {
      constructor: blotter_TextsBoundsTexture,
      init: function(mapper) {
        this.mapper = mapper;
        this.pixelRatio = blotter_CanvasUtils.pixelRatio();
        this.width = this.mapper.width;
        this.height = this.mapper.height;
        this.ratioAdjustedWidth = this.width * this.pixelRatio;
        this.ratioAdjustedHeight = this.height * this.pixelRatio;
      },
      build: function(callback) {
        var self = this;
        _spriteBounds.call(this, function(spriteData) {
          var texture = new THREE.DataTexture(spriteData, self.mapper.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
          texture.needsUpdate = true;
          callback(texture);
        });
      }
    };
  }();
  var blotter_UniformUtils = {
    UniformTypes: [ "1f", "2f", "3f", "4f" ],
    validValueForUniformType: function(type, value) {
      var valid = false, isValid = function(element, index, array) {
        return !isNaN(element);
      };
      switch (type) {
       case "1f":
        valid = !isNaN(value) && [ value ].every(isValid);
        break;

       case "2f":
        valid = Array.isArray(value) && value.length == 2 && value.every(isValid);
        break;

       case "3f":
        valid = Array.isArray(value) && value.length == 3 && value.every(isValid);
        break;

       case "4f":
        valid = Array.isArray(value) && value.length == 4 && value.every(isValid);
        break;

       default:
        break;
      }
      return valid;
    },
    glslDataTypeForUniformType: function(type) {
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
    fullSwizzleStringForUniformType: function(type) {
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
    }
  };
  Blotter.Renderer = function(material) {
    this.init(material);
  };
  Blotter.Renderer.prototype = function() {
    return {
      constructor: Blotter.Renderer,
      init: function(material) {
        var width = material.width, height = material.height;
        if (!Detector.webgl) {
          blotter_Messaging.throwError("Blotter.Renderer", "device does not support webgl");
        }
        if (!material.threeMaterial) {
          blotter_Messaging.throwError("Blotter.Renderer", "material does not expose property threeMaterial. Did you forget to call #load on material before instantiating Blotter.Renderer?");
        }
        this.pixelRatio = blotter_CanvasUtils.pixelRatio();
        this.ratioAdjustedWidth = width * this.pixelRatio;
        this.ratioAdjustedHeight = height * this.pixelRatio;
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        this.renderer.setSize(this.ratioAdjustedWidth, this.ratioAdjustedHeight);
        this.domElement = this.renderer.domElement;
        $(this.domElement).css({
          width: width,
          height: height
        });
        $(this.domElement).attr({
          width: this.ratioAdjustedWidth,
          height: this.ratioAdjustedHeight
        });
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.geometry = new THREE.PlaneGeometry(2, 2, 0);
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material.threeMaterial);
        this.scene.add(this.mesh);
      },
      start: function() {
        if (!this.currentAnimationLoop) {
          this.loop();
        }
      },
      loop: function() {
        var self = this;
        this.renderer.render(this.scene, this.camera);
        this.currentAnimationLoop = blotter_Animation.requestAnimationFrame(function() {
          self.loop();
        });
      },
      stop: function() {
        if (this.currentAnimationLoop) {
          blotter_Animation.cancelAnimationFrame(this.currentAnimationLoop);
          this.currentAnimationLoop = undefined;
        }
      },
      teardown: function() {
        this.stop();
        this.renderer = null;
        this.canvas.remove();
      }
    };
  }();
  Blotter.Material = function(texts, mainImageSrc, options) {
    this.init(texts, mainImageSrc, options);
  };
  Blotter.Material.prototype = function() {
    function _createMapperFromTexts(texts) {
      if (!Array.isArray(texts)) {
        texts = [ texts ];
      }
      var mapper = new blotter_Mapper(texts);
      return mapper;
    }
    function _vertexSrc() {
      var vertexSrc = [ "varying vec2 _vTexCoord;", "void main() {", "  _vTexCoord = uv;", "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);", "}" ];
      return vertexSrc.join("\n");
    }
    function _fragmentSrc() {
      var privateUserDefinedUniformTextureDeclarations = [], publicUserDefinedUniformDeclarations = [], uniformDefinitionsForUserDefinedUniforms = [], fragmentSrc;
      for (var uniformName in this.userDefinedUniforms) {
        var self = this, uniformValue = this.userDefinedUniforms[uniformName];
        privateUserDefinedUniformTextureDeclarations.push("uniform sampler2D " + _uniformTextureNameForUniformName.call(this, uniformName) + ";");
        publicUserDefinedUniformDeclarations.push(blotter_UniformUtils.glslDataTypeForUniformType(uniformValue.type) + " " + uniformName + ";");
        uniformDefinitionsForUserDefinedUniforms.push(function() {
          var textureName = _uniformTextureNameForUniformName.call(self, uniformName), swizzle = blotter_UniformUtils.fullSwizzleStringForUniformType(uniformValue.type);
          return uniformName + " = " + "texture2D(" + textureName + " , vec2(spriteIndex, 0.5))." + swizzle + ";";
        }());
      }
      privateUserDefinedUniformTextureDeclarations = privateUserDefinedUniformTextureDeclarations.join("\n");
      publicUserDefinedUniformDeclarations = publicUserDefinedUniformDeclarations.join("\n");
      uniformDefinitionsForUserDefinedUniforms = uniformDefinitionsForUserDefinedUniforms.join("\n");
      fragmentSrc = [ "precision highp float;", "uniform sampler2D _uSampler;", "uniform sampler2D _uSpriteIndicesTexture;", "uniform sampler2D _uSpriteBoundsTexture;", "uniform vec2 _uCanvasResolution;", "varying vec2 _vTexCoord;", "vec4 _spriteBounds;", "vec2 uResolution;", privateUserDefinedUniformTextureDeclarations, publicUserDefinedUniformDeclarations, "vec4 textTexture( vec2 coord ) {", "   vec2 adjustedFragCoord = _spriteBounds.xy + vec2((_spriteBounds.z * coord.x), (_spriteBounds.w * coord.y));", "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;", "   if (adjustedFragCoord.x < _spriteBounds.x ||", "       adjustedFragCoord.x > _spriteBounds.x + _spriteBounds.z ||", "       adjustedFragCoord.y < _spriteBounds.y ||", "       adjustedFragCoord.y > _spriteBounds.y + _spriteBounds.w) {", "     return vec4(0.0);", "   }", "   return texture2D(_uSampler, uv);", "}", "void mainImage( out vec4 mainImage, in vec2 fragCoord );", this.mainImageSrc, "void main( void ) {", "   vec4 spriteIndexData = texture2D(_uSpriteIndicesTexture, _vTexCoord);", "   float spriteIndex = spriteIndexData.r;", "   float spriteAlpha = spriteIndexData.a;", "   _spriteBounds = texture2D(_uSpriteBoundsTexture, vec2(spriteIndex, 0.5));", "   uResolution = _spriteBounds.zw;", uniformDefinitionsForUserDefinedUniforms, "   vec2 fragCoord = gl_FragCoord.xy - _spriteBounds.xy;", "   vec4 outColor;", "   mainImage(outColor, fragCoord);", "   outColor.a = outColor.a * spriteAlpha;", "   gl_FragColor = outColor;", "}" ];
      return fragmentSrc.join("\n");
    }
    function _setTextsUniformsValues() {
      for (var uniformName in this.userDefinedUniforms) {
        if (this.userDefinedUniforms.hasOwnProperty(uniformName)) {
          for (var i = 0; i < this.mapper.texts.length; i++) {
            var text = this.mapper.texts[i], uniform = this.userDefinedUniforms[uniformName];
            if (blotter_UniformUtils.UniformTypes.indexOf(uniform.type) == -1) {
              blotter_Messaging.logError("Blotter.Material", "user defined uniforms must be one of type: " + blotter_UniformUtils.UniformTypes.join(", "));
              return;
            }
            if (!blotter_UniformUtils.validValueForUniformType(uniform.type, uniform.value)) {
              blotter_Messaging.logError("Blotter.Material", "user defined uniform value for " + uniformName + " is incorrect for type: " + uniform.type);
              return;
            }
            this.textsUniformsValues[text.id] = this.textsUniformsValues[text.id] || {};
            this.textsUniformsValues[text.id][uniformName] = JSON.parse(JSON.stringify(uniform));
          }
        }
      }
    }
    function _materialUniforms(callback) {
      var self = this, uniforms, userDefinedUniformTextures = _uniformsForUserDefinedUniformValues.call(this), indicesTexture = new blotter_TextsIndicesTexture(this.mapper, this.fidelityModifier), boundsTexture = new blotter_TextsBoundsTexture(this.mapper);
      indicesTexture.build(function(spriteIndicesTexture) {
        boundsTexture.build(function(spriteBoundsTexture) {
          uniforms = {
            _uSampler: {
              type: "t",
              value: self.textsTexture
            },
            _uCanvasResolution: {
              type: "2f",
              value: [ self.ratioAdjustedWidth, self.ratioAdjustedHeight ]
            },
            _uSpriteIndicesTexture: {
              type: "t",
              value: spriteIndicesTexture
            },
            _uSpriteBoundsTexture: {
              type: "t",
              value: spriteBoundsTexture
            }
          };
          for (var uniformName in userDefinedUniformTextures) {
            uniforms[uniformName] = userDefinedUniformTextures[uniformName];
          }
          callback(uniforms);
        });
      });
    }
    function _uniformTextureNameForUniformName(uniformName) {
      return "_" + uniformName + "Texture";
    }
    function _uniformsForUserDefinedUniformValues() {
      var uniformsAsTextures = {};
      for (var uniformName in this.userDefinedUniforms) {
        uniformsAsTextures[_uniformTextureNameForUniformName.call(this, uniformName)] = {
          value: _uniformTextureForUniformName.call(this, uniformName),
          type: "t"
        };
      }
      return uniformsAsTextures;
    }
    function _uniformTextureForUniformName(uniformName) {
      var uniformDescription = this.userDefinedUniforms[uniformName], data = new Float32Array(this.mapper.texts.length * 4);
      if (!uniformDescription) blotter_Messaging.logError("Blotter.Composer", "cannot find uniformName for _uniformTextureForUniformName");
      for (var i = 0; i < this.mapper.texts.length; i++) {
        var text = this.mapper.texts[i], textUniformsValues = this.textsUniformsValues[text.id];
        if (textUniformsValues) {
          var textUniform = textUniformsValues[uniformName];
          switch (textUniform.type) {
           case "1f":
            data[4 * i] = textUniform.value;
            data[4 * i + 1] = 0;
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
            break;

           case "2f":
            data[4 * i] = textUniform.value[0];
            data[4 * i + 1] = textUniform.value[1];
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
            break;

           case "3f":
            data[4 * i] = textUniform.value[0];
            data[4 * i + 1] = textUniform.value[1];
            data[4 * i + 2] = textUniform.value[2];
            data[4 * i + 3] = 0;
            break;

           case "4f":
            data[4 * i] = textUniform.value[0];
            data[4 * i + 1] = textUniform.value[1];
            data[4 * i + 2] = textUniform.value[2];
            data[4 * i + 3] = textUniform.value[3];
            break;

           default:
            data[4 * i] = 0;
            data[4 * i + 1] = 0;
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
            break;
          }
        } else {
          data[4 * i] = 0;
          data[4 * i + 1] = 0;
          data[4 * i + 2] = 0;
          data[4 * i + 3] = 0;
        }
      }
      var texture = new THREE.DataTexture(data, this.mapper.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
      texture.needsUpdate = true;
      return texture;
    }
    return {
      constructor: Blotter.Material,
      init: function(texts, mainImageSrc, options) {
        options = options || {};
        this.mapper = _createMapperFromTexts.call(this, texts);
        this.mainImageSrc = mainImageSrc;
        this.userDefinedUniforms = options.uniforms || {};
        this.fidelityModifier = .5;
        this.pixelRatio = blotter_CanvasUtils.pixelRatio();
        this.width = this.mapper.width;
        this.height = this.mapper.height;
        this.ratioAdjustedWidth = this.width * this.pixelRatio;
        this.ratioAdjustedHeight = this.height * this.pixelRatio;
        this.textsUniformsValues = {};
        _setTextsUniformsValues.call(this);
      },
      load: function(callback) {
        var self = this, loader = new THREE.TextureLoader(), url = this.mapper.getImage();
        loader.load(url, function(textsTexture) {
          self.textsTexture = textsTexture;
          self.textsTexture.generateMipmaps = false;
          self.textsTexture.minFilter = THREE.LinearFilter;
          self.textsTexture.magFilter = THREE.LinearFilter;
          self.textsTexture.needsUpdate = true;
          _materialUniforms.call(self, function(uniforms) {
            self.threeMaterial = new THREE.ShaderMaterial({
              vertexShader: _vertexSrc.call(self),
              fragmentShader: _fragmentSrc.call(self),
              uniforms: uniforms
            });
            self.threeMaterial.depthTest = false;
            self.threeMaterial.depthWrite = false;
            callback();
          });
        });
      },
      updateUniformValueForText: function(text, uniformName, value) {
        var self = this, textsUniformsObject = this.textsUniformsValues[text.id];
        if (!textsUniformsObject) {
          blotter_Messaging.logError("Blotter.Material", "cannot find text for updateUniformsForText");
          return;
        }
        if (!textsUniformsObject[uniformName]) {
          blotter_Messaging.logError("Blotter.Material", "cannot find uniformName for updateUniformsForText");
          return;
        }
        if (!blotter_UniformUtils.validValueForUniformType(textsUniformsObject[uniformName].type, value)) {
          blotter_Messaging.logError("Blotter.Material", "user defined uniform value for " + uniformName + " is incorrect for type: " + this.userDefinedUniforms[uniformName].type);
          return;
        }
        textsUniformsObject[uniformName].value = value;
        setTimeout(function() {
          self.threeMaterial.uniforms[_uniformTextureNameForUniformName.call(self, uniformName)] = {
            type: "t",
            value: _uniformTextureForUniformName.call(self, uniformName)
          };
          self.threeMaterial.needsUpdate = true;
        }, 1);
      }
    };
  }();
  this.Blotter = Blotter;
}();