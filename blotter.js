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
    paddingTop: null,
    paddingRight: null,
    paddingBottom: null,
    paddingLeft: null
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
      return "" + pTop + "px " + pRight + "px " + pBottom + "px " + pLeft + "px";
    },
    sizeForText: function(textValue, properties) {
      var el = document.createElement("p"), properties = this.ensurePropertyValues(properties), size;
      el.innerHTML = textValue;
      el.style.fontFamily = properties.family;
      el.style.fontSize = properties.size;
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
  Blotter.Mapper = function(texts) {
    this.init.apply(this, arguments);
  };
  Blotter.Mapper.prototype = function() {
    function _updateTexts(texts, eachCallback) {
      if (!(texts instanceof Array)) {
        texts = [ texts ];
      }
      for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        if (texts instanceof Blotter.Text) {
          blotter_Messaging.throwError("Blotter.Mapper", "argument must be instance of Blotter.Text or array of objects that are instances of Blotter.Text");
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
      constructor: Blotter.Mapper,
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
          var text = this.texts[i], size = this.textsSizes[text.id], lineHeightOffset = (size.h * text.properties.leading - size.h) / 2;
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
    }
  };
  var blotter_Renderer = function(width, height, uniforms) {
    this.init(width, height, uniforms);
  };
  blotter_Renderer.prototype = function() {
    return {
      constructor: blotter_Renderer,
      init: function(width, height, material) {
        if (!Detector.webgl) {
          blotter_Messaging.throwError("blotter_Renderer", "device does not support webgl");
        }
        this.material = material;
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
        this.mesh = new THREE.Mesh(this.geometry, this.material);
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
  var fragmentSrc = [ "precision highp float;", "uniform sampler2D uSampler;", "uniform sampler2D spriteIndices;", "uniform sampler2D textSpriteBoundsTexture;", "uniform sampler2D centerPointTexture;", "uniform float uTime;", "uniform float canvasWidth;", "uniform float canvasHeight;", "uniform float lenseWeight;", "varying vec2 vTexCoord;", "void main(void) {", "   vec2 aspect = vec2(canvasWidth, canvasHeight).xy;", "   vec4 spriteIndexData = texture2D(spriteIndices, vTexCoord);", "   float spriteIndex = spriteIndexData.x;", "   vec4 spriteData = texture2D(textSpriteBoundsTexture, vec2(spriteIndex, 0.5));", "   // p = x, y percentage for texel position within of total resolution", "   vec2 p = (gl_FragCoord.xy - spriteData.rg) / spriteData.ba;", "   // m = x, y percentage for center position within total resolution", "   // note: you should know this, but swizzling allows access to vecN data using x,y,z, and w (or r, g, b, and a) in that order.", "   vec4 centerPointData = texture2D(centerPointTexture, vec2(spriteIndex, 0.5));", "   vec2 m = centerPointData.xy;", "   //vec2 m = vec2(0.5);", "   // d = difference between p and m (obviously, but see above).", "   vec2 d = p - m;", "   // The dot function returns the dot product of the two", "   // input parameters, i.e. the sum of the component-wise", "   // products. If x and y are the same the square root of", "   // the dot product is equivalent to the length of the vector.", "   // Therefore, r = length of vector represented by d (the ", "   // distance of the texel from center position).", "   // In order to apply weights here, we add our weight to this distance", "   // (pushing it closer to 1 - essentially giving no effect at all) and", "   // find the min between our weighted distance and 1.0", "   float inverseLenseWeight = 1.0 - lenseWeight;", "   float r = min(sqrt(dot(d, d)) + inverseLenseWeight, 1.0);", "   vec2 offsetUV = m + (d * r);", "   vec2 adjustedFragCoord = spriteData.rg + vec2((spriteData.b * offsetUV.x), (spriteData.a * offsetUV.y));", "   //adjustedFragCoord.x = clamp(adjustedFragCoord.x, spriteData.r, (spriteData.r + spriteData.b));", "   //adjustedFragCoord.y = clamp(adjustedFragCoord.y, spriteData.g, (spriteData.g + spriteData.a));", "   vec2 uv = adjustedFragCoord.xy / aspect;", "   // RGB shift", "   vec2 offset = vec2(0.0);", "   if (r < 1.0) {", "     float amount = 0.0013;", "     float angle = 0.45;", "     offset = (amount * (1.0 - r)) * vec2(cos(angle), sin(angle));", "   }", "   vec4 cr = texture2D(uSampler, (uv + offset));", "   vec4 cga = texture2D(uSampler, uv);", "   vec4 cb = texture2D(uSampler, (uv - offset));", "   vec4 outColor = vec4(0.0);", "   if (cr.r > 0.0 || cga.g > 0.0 || cb.b > 0.0) {", "   //if (r < 1.0) {", "     // Adjust rgb values so that colors with transparency appear as if they were atop an opaque white background.", "     // (vec4(0.0, 0.0, 0.0, 0.5) _atop white_ is visibly the same as vec4(0.5, 0.5, 0.5, 0.0))", "     if (cr.a != 0.0) {", "       cr.r = cr.r + cr.a;", "     }", "     if (cga.a != 0.0) {", "       cga.g = cga.g + cga.a;", "     }", "     if (cb.b != 0.0) {", "       cb.b = cb.b + cb.a;", "     }", "     // Ensure offseted/shifted texels have alpha similar to the texel they are offsetting", "     // (this prevents texel from being invisible if cga.a = vec4(0.0, 0.0, 0.0, 0.0)", "     cga.a = max(cga.a, max(cr.a, cb.a));", "     // Set alpha adjustment value so that white texels keep their transparency.", "   	float alpha = 1.0 - cga.a;", "     // Invert colors (this is cheating but optimal) so that we have CMYK rather than RGB", "     // shifted colors and the combination of offsets creates a blacker rather than whiter color.", "     outColor = vec4((1.0 - cr.r) - alpha, (1.0 - cga.g) - alpha, (1.0 - cb.b) - alpha, cga.a);", "     //outColor = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   else {", "     outColor = vec4(cr.r, cga.g, cb.b, cga.a);", "     //outColor = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   // Multiply alpha by original spriteIndexData's alpha value.", "   // this will be 0 for texels not within any 'sprite' area.", "   outColor.a = outColor.a * spriteIndexData.a;", "   gl_FragColor = outColor;", "}" ].join("\n");
  var vertexSrc = [ "varying vec2 vTexCoord;", "void main() {", "vTexCoord = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);", "}" ].join("\n");
  Blotter.Composer = function(texts, options) {
    this.init(texts, options);
  };
  Blotter.Composer.prototype = function() {
    function _setTextsUniformsValues() {
      for (var uniformName in this.userDefinedUniforms) {
        if (this.userDefinedUniforms.hasOwnProperty(uniformName)) {
          for (var i = 0; i < this.mapper.texts.length; i++) {
            var text = this.mapper.texts[i], uniform = this.userDefinedUniforms[uniformName];
            if (blotter_UniformUtils.UniformTypes.indexOf(uniform.type) == -1) {
              blotter_Messaging.logError("blotter_Renderer", "user defined uniforms must be one of type: " + blotter_UniformUtils.UniformTypes.join(", "));
              return;
            }
            if (!blotter_UniformUtils.validValueForUniformType(uniform.type, uniform.value)) {
              blotter_Messaging.logError("blotter_Renderer", "user defined uniform value for " + uniformName + " is incorrect for type: " + uniform.type);
              return;
            }
            this.textsUniformsValues[text.id] = this.textsUniformsValues[text.id] || {};
            this.textsUniformsValues[text.id][uniformName] = JSON.parse(JSON.stringify(uniform));
          }
        }
      }
    }
    function _materialUniforms(callback) {
      var self = this, uniforms, userDefinedUniformTextures = _uniformsForUserDefinedUniformValues.call(this);
      _textSpriteIndicesTexture.call(self, function(textSpriteIndicesTexture) {
        _textSpriteBoundsTexture.call(self, function(textSpriteBoundsTexture) {
          uniforms = {
            uTime: {
              type: "f",
              value: 1
            },
            uSampler: {
              type: "t",
              value: self.textsTexture
            },
            spriteIndices: {
              type: "t",
              value: textSpriteIndicesTexture
            },
            textSpriteBoundsTexture: {
              type: "t",
              value: textSpriteBoundsTexture
            },
            canvasWidth: {
              type: "f",
              value: self.ratioAdjustedWidth
            },
            canvasHeight: {
              type: "f",
              value: self.ratioAdjustedHeight
            },
            lenseWeight: {
              type: "f",
              value: .9
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
      return uniformName + "Texture";
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
    function _textSpriteIndicesTexture(callback) {
      var self = this;
      _spriteIndices.call(this, function(dataPoints) {
        var texture = new THREE.DataTexture(dataPoints, self.mapper.width * self.fidelityModifier, self.mapper.height * self.fidelityModifier, THREE.RGBAFormat, THREE.FloatType);
        texture.flipY = true;
        texture.needsUpdate = true;
        callback(texture);
      });
    }
    function _spriteIndices(completion) {
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
    function _textSpriteBoundsTexture(completion) {
      var self = this;
      _spriteBoundsArray.call(this, function(spriteData) {
        var texture = new THREE.DataTexture(spriteData, self.mapper.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
        texture.needsUpdate = true;
        completion(texture);
      });
    }
    function _spriteBoundsArray(completion) {
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
      constructor: Blotter.Composer,
      init: function(texts, options) {
        options = options || {};
        this.mapper = new Blotter.Mapper(texts);
        this.userDefinedUniforms = options.uniforms || {};
        this.fidelityModifier = .5;
        this.pixelRatio = blotter_CanvasUtils.pixelRatio();
        this.ratioAdjustedWidth = this.mapper.width * this.pixelRatio;
        this.ratioAdjustedHeight = this.mapper.height * this.pixelRatio;
        this.textsUniformsValues = {};
        _setTextsUniformsValues.call(this);
      },
      build: function(callback) {
        var self = this, loader = new THREE.TextureLoader(), url = this.mapper.getImage();
        loader.load(url, function(textsTexture) {
          self.textsTexture = textsTexture;
          self.textsTexture.generateMipmaps = false;
          self.textsTexture.minFilter = THREE.LinearFilter;
          self.textsTexture.magFilter = THREE.LinearFilter;
          self.textsTexture.needsUpdate = true;
          _materialUniforms.call(self, function(uniforms) {
            var material = new THREE.ShaderMaterial({
              vertexShader: vertexSrc,
              fragmentShader: fragmentSrc,
              uniforms: uniforms
            });
            material.depthTest = false;
            material.depthWrite = false;
            self.renderer = new blotter_Renderer(self.mapper.width, self.mapper.height, material);
            callback();
          });
        });
      },
      start: function() {
        this.renderer.start();
      },
      updateUniformValueForText: function(text, uniformName, value) {
        var self = this, textsUniformsObject = this.textsUniformsValues[text.id];
        if (!textsUniformsObject) {
          blotter_Messaging.logError("blotter_Renderer", "cannot find text for updateUniformsForText");
          return;
        }
        if (!textsUniformsObject[uniformName]) {
          blotter_Messaging.logError("blotter_Renderer", "cannot find uniformName for updateUniformsForText");
          return;
        }
        if (!blotter_UniformUtils.validValueForUniformType(textsUniformsObject[uniformName].type, value)) {
          blotter_Messaging.logError("blotter_Renderer", "user defined uniform value for " + uniformName + " is incorrect for type: " + this.userDefinedUniforms[uniformName].type);
          return;
        }
        textsUniformsObject[uniformName].value = value;
        if (this.renderer) {
          setTimeout(function() {
            self.renderer.material.uniforms[_uniformTextureNameForUniformName.call(self, uniformName)] = {
              type: "t",
              value: _uniformTextureForUniformName.call(self, uniformName)
            };
            self.renderer.material.needsUpdate = true;
          }, 1);
        }
      }
    };
  }();
  this.Blotter = Blotter;
}();