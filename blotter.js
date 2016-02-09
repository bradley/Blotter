/******************************************************************************

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
    if (node = this.findNode(this.root, w, h))
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
    if (node = this.findNode(this.root, w, h))
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
  var BLOTTER = {
    version: "1.0.0"
  };
  var blotter_vendors = [ "ms", "moz", "webkit", "o" ];
  var blotter_requestAnimationFrame, blotter_cancelAnimationFrame;
  for (var x = 0; x < blotter_vendors.length && !window.requestAnimationFrame; ++x) {
    blotter_requestAnimationFrame = window[blotter_vendors[x] + "RequestAnimationFrame"];
    blotter_cancelAnimationFrame = window[blotter_vendors[x] + "CancelAnimationFrame"] || window[blotter_vendors[x] + "CancelRequestAnimationFrame"];
  }
  if (!blotter_requestAnimationFrame) {
    var lastTime = 0;
    blotter_requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!blotter_cancelAnimationFrame) {
    blotter_cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
  var blotter_pixelRatio = function() {
    return this.pixelRatio || function() {
      var legibilitySharpeningMultiplier = 2;
      var ctx = document.createElement("canvas").getContext("2d"), dpr = window.devicePixelRatio || 1, bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
      return dpr / bsr * legibilitySharpeningMultiplier;
    }();
  };
  var blotter_hiDpiCanvas = function(w, h, pixelRatio) {
    pixelRatio = pixelRatio || blotter_pixelRatio();
    var can = document.createElement("canvas");
    can.width = w * pixelRatio;
    can.height = h * pixelRatio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return can;
  };
  var blotter_error = function(domain, message) {
    console.error(domain + ": " + message);
  };
  BLOTTER.TextDescription = function(options) {
    this.init.apply(this, arguments);
  };
  BLOTTER.TextDescription.prototype = function() {
    function extractPaddingValues(paddingStr) {
      var extractedPaddingValues = [ 0, 0, 0, 0 ];
      var paddingSettings = (paddingStr || "").match(/\d+\w*/);
      if (paddingSettings) {
        paddingSettings = paddingSettings.slice(0, 4);
        switch (paddingSettings.length) {
         case 1:
          var trbl = paddingSettings[0];
          extractedPaddingValues = [ trbl, trbl, trbl, trbl ];
          break;

         case 2:
          var tb = paddingSettings[0], rl = paddingSettings[1];
          extractedPaddingValues = [ tb, rl, tb, rl ];
          break;

         case 3:
          var t = paddingSettings[0], rl = paddingSettings[1], b = paddingSettings[2];
          extractedPaddingValues = [ t, rl, b, rl ];
          break;

         default:
          var t = paddingSettings[0], r = paddingSettings[1], b = paddingSettings[2], l = paddingSettings[3];
          extractedPaddingValues = [ t, r, b, l ];
          break;
        }
      }
      return extractedPaddingValues;
    }
    function extractFloatValue(s) {
      var v = 0;
      if (s) {
        if (typeof s === "string" || s instanceof String) {
          var match = s.match(/\d+/);
          if (match) {
            s = match[0];
          }
        }
        v = parseFloat(s);
      }
      return v;
    }
    return {
      init: function(options) {
        var paddings = extractPaddingValues(options.padding), lineHeight = extractFloatValue(options.lineHeight);
        this.fontFamily = options.fontFamily;
        this.fontSize = options.fontSize;
        this.paddingTop = extractFloatValue(options.paddingTop || paddings[0]);
        this.paddingRight = extractFloatValue(options.paddingRight || paddings[1]);
        this.paddingBottom = extractFloatValue(options.paddingBottom || paddings[2]);
        this.paddingLeft = extractFloatValue(options.paddingLeft || paddings[3]);
        this.lineHeight = extractFloatValue(options.lineHeight);
        this.fillStyle = options.color;
      }
    };
  }();
  blotter_getTextSize = function(textStr, fontFamily, fontSize) {
    var tempText = document.createElement("p"), size;
    tempText.innerHTML = textStr;
    tempText.style.fontFamily = fontFamily;
    tempText.style.fontSize = fontSize;
    tempText.style.visibility = "hidden";
    tempText.style.display = "inline-block";
    document.body.appendChild(tempText);
    size = {
      w: $(tempText).width(),
      h: $(tempText).height()
    };
    document.body.removeChild(tempText);
    return size;
  };
  var blotter_TextureMapper = function(textDescriber, texts) {
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
      if (typeof texts === "string" || texts instanceof String) {
        texts = [ texts ];
      }
      for (var i = 0; i < texts.length; i++) {
        eachCallback.apply(this, [ texts[i] ]);
      }
      this.textsKeys = Object.keys(this.texts);
      this.determineTextsMapping();
    },
    textSizeForText: function(text) {
      var size = blotter_getTextSize(text, this.textDescriber.fontFamily, this.textDescriber.fontSize);
      size.w += this.textDescriber.paddingLeft + this.textDescriber.paddingRight;
      size.h += this.textDescriber.paddingTop + this.textDescriber.paddingBottom;
      return size;
    },
    determineTextsMapping: function() {
      var self = this, packer = new GrowingPacker(), values = this.textsKeys.map(function(k) {
        var value = self.texts[k];
        value.key = k;
        return value;
      }, self).sort(this.sortTexts);
      packer.fit(values);
      for (var k in this.texts) {
        var v = this.texts[k];
        self.texts[v.key] = v;
        delete v.key;
      }
      var wh = this.nearestPowerOfTwo(Math.max(packer.root.w, packer.root.h));
      this.width = wh;
      this.height = wh;
    },
    sortTexts: function(textA, textB) {
      var areaA = textA.w * textA.h, areaB = textB.w * textB.h;
      if (areaA < areaB) {
        return 1;
      }
      if (areaA > areaB) {
        return -1;
      }
      return 0;
    },
    nearestPowerOfTwo: function(n) {
      var powers = [ 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768 ], nearest = powers[powers.length - 1];
      for (var i = 0; i < powers.length; i++) {
        var next = powers[i + 1];
        if (powers[i] < n && next >= n) {
          nearest = next;
        }
      }
      return nearest;
    },
    getCanvas: function() {
      var canvas = blotter_hiDpiCanvas(this.width, this.height), ctx = canvas.getContext("2d");
      for (var k in this.texts) {
        var v = this.texts[k], lineHeightOffset = (v.h * this.textDescriber.lineHeight - v.h) / 2;
        ctx.font = this.textDescriber.fontSize + " " + this.textDescriber.fontFamily;
        ctx.fillStyle = this.textDescriber.fillStyle;
        ctx.fillText(k, v.fit.x + this.textDescriber.paddingLeft, v.fit.y + this.textDescriber.paddingTop + lineHeightOffset);
      }
      return canvas;
    },
    getImage: function() {
      return this.getCanvas().toDataURL();
    }
  };
  var fragmentSrc = [ "precision highp float;", "uniform sampler2D uSampler;", "uniform sampler2D spriteIndices;", "uniform sampler2D spriteDataTexture;", "uniform float uTime;", "uniform float canvasWidth;", "uniform float canvasHeight;", "uniform float lenseWeight;", "varying vec2 vTexCoord;", "void main(void) {", "   vec2 aspect = vec2(canvasWidth, canvasHeight).xy;", "   vec4 spriteIndexData = texture2D(spriteIndices, vTexCoord);", "   float spriteIndex = spriteIndexData.x;", "   vec4 spriteData = texture2D(spriteDataTexture, vec2(spriteIndex, 0.5));", "   // p = x, y percentage for texel position within of total resolution", "   vec2 p = (gl_FragCoord.xy - spriteData.rg) / spriteData.ba;", "   // m = x, y percentage for center position within total resolution", "   // note: you should know this, but swizzling allows access to vecN data using x,y,z, and w (or r, g, b, and a) in that order.", "   //vec4 centerPointsData = texture2D(centerPointsTexture, vec2(spriteIndex, 0.5));", "   //vec2 m = centerPointsData.xy;", "   vec2 m = vec2(0.5);", "   // d = difference between p and m (obviously, but see above).", "   vec2 d = p - m;", "   // The dot function returns the dot product of the two", "   // input parameters, i.e. the sum of the component-wise", "   // products. If x and y are the same the square root of", "   // the dot product is equivalent to the length of the vector.", "   // Therefore, r = length of vector represented by d (the ", "   // distance of the texel from center position).", "   // In order to apply weights here, we add our weight to this distance", "   // (pushing it closer to 1 - essentially giving no effect at all) and", "   // find the min between our weighted distance and 1.0", "   float inverseLenseWeight = 1.0 - lenseWeight;", "   float r = min(sqrt(dot(d, d)) + inverseLenseWeight, 1.0);", "   vec2 offsetUV = m + (d * r);", "   vec2 adjustedFragCoord = spriteData.rg + vec2((spriteData.b * offsetUV.x), (spriteData.a * offsetUV.y));", "   //adjustedFragCoord.x = clamp(adjustedFragCoord.x, spriteData.r, (spriteData.r + spriteData.b));", "   //adjustedFragCoord.y = clamp(adjustedFragCoord.y, spriteData.g, (spriteData.g + spriteData.a));", "   vec2 uv = adjustedFragCoord.xy / aspect;", "   // RGB shift", "   vec2 offset = vec2(0.0);", "   if (r < 1.0) {", "     float amount = 0.0013;", "     float angle = 0.45;", "     offset = (amount * (1.0 - r)) * vec2(cos(angle), sin(angle));", "   }", "   vec4 cr = texture2D(uSampler, (uv + offset));", "   vec4 cga = texture2D(uSampler, uv);", "   vec4 cb = texture2D(uSampler, (uv - offset));", "   vec4 outColor = vec4(0.0);", "   if (cr.r > 0.0 || cga.g > 0.0 || cb.b > 0.0) {", "     // Adjust rgb values so that colors with transparency appear as if they were atop an opaque white background.", "     // (vec4(0.0, 0.0, 0.0, 0.5) _atop white_ is visibly the same as vec4(0.5, 0.5, 0.5, 0.0))", "     if (cr.a != 0.0) {", "       cr.r = cr.r + cr.a;", "     }", "     if (cga.a != 0.0) {", "       cga.g = cga.g + cga.a;", "     }", "     if (cb.b != 0.0) {", "       cb.b = cb.b + cb.a;", "     }", "     // Ensure offseted/shifted texels have alpha similar to the texel they are offsetting", "     // (this prevents texel from being invisible if cga.a = vec4(0.0, 0.0, 0.0, 0.0)", "     cga.a = max(cga.a, max(cr.a, cb.a));", "     // Set alpha adjustment value so that white texels keep their transparency.", "   	float alpha = 1.0 - cga.a;", "     // Invert colors (this is cheating but optimal) so that we have CMYK rather than RGB", "     // shifted colors and the combination of offsets creates a blacker rather than whiter color.", "     outColor = vec4((1.0 - cr.r) - alpha, (1.0 - cga.g) - alpha, (1.0 - cb.b) - alpha, cga.a);", "   }", "   else {", "     outColor = vec4(cr.r, cga.g, cb.b, cga.a);", "   }", "   // Multiply alpha by original spriteIndexData's alpha value.", "   // this will be 0 for texels not within any 'sprite' area.", "   outColor.a = outColor.a * spriteIndexData.a;", "   gl_FragColor = outColor;", "}" ].join("\n");
  var vertexSrc = [ "varying vec2 vTexCoord;", "void main() {", "vTexCoord = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);", "}" ].join("\n");
  var blotter_allowedUserDefinedUniformTypes = [ "1f", "2f", "3f", "4f" ];
  BLOTTER.MappedRenderer = function($canvasRegion, textDescriber, texts, options) {
    this.init($canvasRegion, textDescriber, texts);
  };
  BLOTTER.MappedRenderer.prototype = function() {
    return {
      constructor: BLOTTER.MappedRenderer,
      init: function($canvasRegion, textDescriber, texts, options) {
        options = options || {};
        this.$canvasRegion = $canvasRegion;
        this.textDescriber = textDescriber;
        this.mapper = this.createMapper(textDescriber, texts);
        this.userDefinedUniforms = options.uniforms || {};
        this.textsKeys = this.mapper.textsKeys;
        this.pixelRatio = blotter_pixelRatio();
        this.ratioAdjustedWidth = this.mapper.width * this.pixelRatio;
        this.ratioAdjustedHeight = this.mapper.height * this.pixelRatio;
      },
      createMapper: function(textDescriber, texts) {
        if (!(textDescriber instanceof BLOTTER.TextDescription)) {
          blotter_error("blotter_renderer", "first argument must be of type Blotter.TextDescription");
          return;
        }
        return new blotter_TextureMapper(textDescriber, texts);
      },
      build: function(callback) {
        var self = this, loader = new THREE.TextureLoader(), url = this.mapper.getImage();
        loader.load(url, function(textsTexture) {
          if (!Detector.webgl) {
            blotter_error("blotter_Renderer", "device does not support webgl");
          }
          self.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
          });
          self.renderer.setSize(self.ratioAdjustedWidth, self.ratioAdjustedHeight);
          self.scene = new THREE.Scene();
          self.camera = new THREE.Camera();
          self.geometry = new THREE.PlaneGeometry(2, 2, 0);
          self.textsTexture = textsTexture;
          self.textsTexture.needsUpdate = true;
          self.canvas = self.renderer.domElement;
          $(self.canvas).css({
            width: self.mapper.width,
            height: self.mapper.height
          });
          $(self.canvas).attr({
            width: self.ratioAdjustedWidth,
            height: self.ratioAdjustedHeight
          });
          self.$canvasRegion.html(self.canvas);
          self.materialUniforms(function(uniforms) {
            self.material = new THREE.ShaderMaterial({
              vertexShader: vertexSrc,
              fragmentShader: fragmentSrc,
              uniforms: uniforms
            });
            self.material.depthTest = false;
            self.material.depthWrite = false;
            self.mesh = new THREE.Mesh(self.geometry, self.material);
            self.scene.add(self.mesh);
            callback();
          });
        });
      },
      start: function() {
        this.lastDrawTime = Date.now();
        if (!this.currentAnimationLoop) {
          this.loop();
        }
      },
      spriteIndicesTexture: function(callback) {
        var fidelityModifier = .5;
        this.spriteIndices(_.bind(function(dataPoints) {
          var texture = new THREE.DataTexture(dataPoints, this.mapper.width * fidelityModifier, this.mapper.height * fidelityModifier, THREE.RGBAFormat, THREE.FloatType);
          texture.flipY = true;
          texture.needsUpdate = true;
          callback(texture);
        }, this), fidelityModifier);
      },
      spriteIndices: function(completion, scale) {
        var scale = scale || 1, height = this.mapper.height * scale, width = this.mapper.width * scale, points = new Float32Array(height * width * 4), widthStepModifier = width % 1, indicesOffset = 1 / this.mapper.textsKeys.length / 2;
        setTimeout(_.bind(function() {
          for (i = 1; i < points.length / 4; i++) {
            var y = Math.ceil(i / (width - widthStepModifier)), x = i - (width - widthStepModifier) * (y - 1);
            var referenceIndex = 0, a = 0;
            for (ki = 0; ki < this.mapper.textsKeys.length; ki++) {
              var v = this.mapper.texts[this.mapper.textsKeys[ki]], fitY = v.fit.y * scale, fitX = v.fit.x * scale, vH = v.h * scale, vW = v.w * scale;
              if (y >= fitY && y <= fitY + vH && x >= fitX && x <= fitX + vW) {
                referenceIndex = ki / this.mapper.textsKeys.length + indicesOffset;
                a = 1;
                break;
              }
            }
            var index = i - 1;
            points[4 * index + 0] = referenceIndex;
            points[4 * index + 1] = referenceIndex;
            points[4 * index + 2] = referenceIndex;
            points[4 * index + 3] = a;
          }
          completion(points);
        }, this), 1);
      },
      spriteDataTexture: function(callback) {
        this.spriteDataArray(_.bind(function(spriteData) {
          var texture = new THREE.DataTexture(spriteData, this.mapper.textsKeys.length, 1, THREE.RGBAFormat, THREE.FloatType);
          texture.needsUpdate = true;
          callback(texture);
        }, this));
      },
      spriteDataArray: function(completion) {
        var data = new Float32Array(this.mapper.textsKeys.length * 4), i = 0;
        setTimeout(_.bind(function() {
          $.each(this.mapper.texts, _.bind(function(_, v) {
            data[4 * i] = v.fit.x * this.pixelRatio;
            data[4 * i + 1] = this.canvas.height - (v.fit.y + v.h) * this.pixelRatio;
            data[4 * i + 2] = v.w * this.pixelRatio;
            data[4 * i + 3] = v.h * this.pixelRatio;
            i++;
          }, this));
          completion(data);
        }, this), 1);
      },
      materialUniforms: function(callback) {
        var self = this, uniforms, userDefinedUniformTextures = this.uniformsForUserDefinedUniformValues();
        this.spriteIndicesTexture(_.bind(function(spriteIndicesTexture) {
          this.spriteDataTexture(_.bind(function(spriteDataTexture) {
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
                value: spriteIndicesTexture
              },
              spriteDataTexture: {
                type: "t",
                value: spriteDataTexture
              },
              canvasWidth: {
                type: "f",
                value: self.canvas.width
              },
              canvasHeight: {
                type: "f",
                value: self.canvas.height
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
          }, this));
        }, this));
      },
      uniformTextureNameForUniformName: function(uniformName) {
        return uniformName + "Texture";
      },
      uniformsForUserDefinedUniformValues: function() {
        var uniforms = {};
        this.textUniformValues = {};
        for (var uniformName in this.userDefinedUniforms) {
          if (this.userDefinedUniforms.hasOwnProperty(uniformName)) {
            for (var i = 0; i < this.mapper.textsKeys.length; i++) {
              var uniform = this.userDefinedUniforms[uniformName];
              if (blotter_allowedUserDefinedUniformTypes.indexOf(uniform.type) == -1) {
                blotter_error("blotter_Renderer", "user defined uniforms must be one of type: " + blotter_allowedUserDefinedUniformTypes.join(", "));
                return;
              }
              if (!this.isValidValueForType(uniform.type, uniform.value)) {
                blotter_error("blotter_Renderer", "user defined uniform value for " + uniformName + " is incorrect for type: " + uniform.type);
                return;
              }
              this.textUniformValues[this.mapper.textsKeys[i]][uniformName] = uniform.value;
            }
          }
          uniforms[this.uniformTextureNameForUniformName(uniformName)] = this.uniformTextureForUniformName(uniformName);
        }
        return uniforms;
      },
      updateUniformValueForText: function(text, uniformName, value) {
        if (!this.textUniformValues[text]) {
          blotter_error("blotter_Renderer", "cannot find text for updateUniformsForText");
          return;
        }
        if (!this.textUniformValues[text][uniformName]) {
          blotter_error("blotter_Renderer", "cannot find uniformName for updateUniformsForText");
          return;
        }
        if (!this.isValidValueForType(this.userDefinedUniforms[uniformName].type, value)) {
          blotter_error("blotter_Renderer", "user defined uniform value for " + uniformName + " is incorrect for type: " + this.userDefinedUniforms[uniformName].type);
          return;
        }
        this.textUniformValues[text][uniformName] = value;
        if (this.material) {
          this.material.uniforms[this.uniformTextureNameForUniformName(uniformName)] = this.uniformTextureForUniformName(uniformName);
        }
      },
      uniformTextureForUniformName: function(uniformName) {
        var uniformDescription = this.userDefinedUniforms[uniformName], data = new Float32Array(this.mapper.textsKeys.length * 4);
        if (!uniformDescription) blotter_error("blotter_Renderer", "cannot find uniformName for buildUniformTexture");
        for (var i = 0; i < this.mapper.textsKeys.length; i++) {
          var value = this.textUniformValues[this.mapper.textsKeys[i]][uniformName];
          switch (uniformDescription.type) {
           case "1f":
            data[4 * i] = value;
            data[4 * i + 1] = 0;
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
            break;

           case "2f":
            data[4 * i] = value[0];
            data[4 * i + 1] = value[1];
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
            break;

           case "3f":
            data[4 * i] = value[0];
            data[4 * i + 1] = value[1];
            data[4 * i + 2] = value[2];
            data[4 * i + 3] = 0;
            break;

           case "4f":
            data[4 * i] = value[0];
            data[4 * i + 1] = value[1];
            data[4 * i + 2] = value[2];
            data[4 * i + 3] = value[3];
            break;
          }
        }
        var texture = new THREE.DataTexture(data, this.mapper.textsKeys.length, 1, THREE.RGBAFormat, THREE.FloatType);
        texture.needsUpdate = true;
        return texture;
      },
      isValidValueForType: function(type, value) {
        var valid = false;
        switch (type) {
         case "1f":
          valid = !isNaN(value);
          break;

         case "2f":
          valid = Array.isArray(value) && value.length == 2;
          break;

         case "3f":
          valid = Array.isArray(value) && value.length == 3;
          break;

         case "4f":
          valid = Array.isArray(value) && value.length == 4;
          break;
        }
        return valid;
      },
      loop: function() {
        this.renderer.render(this.scene, this.camera);
        this.currentAnimationLoop = blotter_requestAnimationFrame(_.bind(function() {
          this.loop();
        }, this));
      },
      stop: function() {
        if (this.currentAnimationLoop) {
          blotter_cancelAnimationFrame(this.currentAnimationLoop);
          this.currentAnimationLoop = undefined;
        }
      },
      teardown: function() {
        this.stop();
        this.renderer = null;
        $(this.canvas).remove();
      }
    };
  }();
  this.BLOTTER = BLOTTER;
}();