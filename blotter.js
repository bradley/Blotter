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
!function() {
  var blotter = {
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
    function extractPaddingValues() {
      var extractedPaddingValues = [ 0, 0, 0, 0 ];
      var paddingSettings = (options.padding || "").match(/\d+\w*/);
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
    var paddings = extractPaddingValues();
    options.paddingTop = options.paddingTop || paddings[0];
    options.paddingRight = options.paddingRight || paddings[1];
    options.paddingBottom = options.paddingBottom || paddings[2];
    options.paddingLeft = options.paddingLeft || paddings[3];
    return {
      fontFamily: options.fontFamily,
      fontSize: options.fontSize,
      paddingTop: options.paddingTop,
      paddingRight: options.paddingRight,
      paddingBottom: options.paddingBottom,
      paddingLeft: options.paddingLeft,
      lineHeight: options.lineHeight,
      fillStyle: options.color
    };
  };
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
      for (var i = 0; i < texts.length; texts++) {
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
  var texts = [ "To", "communicate", "Mars", "converse", "spirits", "report", "the", "behaviour", "of", "sea", "monster", "Describe", "horoscope", "haruspicate", "or", "scry", "Observe", "disease", "in", "signatures", "evoke", "Biography", "from", "wrinkles", "palm", "And", "tragedy", "fingers", "release", "omens", "By", "sortilege", "tea", "leaves", "riddle", "inevitable", "With", "playing", "cards", "fiddle", "pentagrams", "Or", "barbituric", "acids", "dissect", "Sed", "To", "communicate", "Mars", "converse", "spirits", "report", "the", "behaviour", "of", "sea", "monster", "Describe", "horoscope", "haruspicate", "or", "scry", "Observe", "disease", "in", "signatures", "evoke", "Biography", "from", "wrinkles", "palm", "And", "tragedy", "fingers", "release", "omens", "By", "sortilege", "tea", "leaves", "riddle", "inevitable", "With", "playing", "cards", "fiddle", "pentagrams", "Or", "barbituric", "acids", "dissect", "Sed", "tincidunt", "tempor", "consectetur.", "Cras", "imperdiet", "suscipit", "massa,", "ut", "malesuada", "enim", "sollicitudin", "in.", "Nullam", "cursus,", "lorem", "vitae", "cursus", "gravida,", "erat" ];
  var fragmentSrc = [ "precision highp float;", "uniform sampler2D uSampler;", "uniform sampler2D spriteIndices;", "uniform sampler2D spriteDataTexture;", "uniform sampler2D centerPointsTexture;", "uniform float uTime;", "uniform float canvasWidth;", "uniform float canvasHeight;", "uniform float lenseWeight;", "varying vec2 vTexCoord;", "void main(void) {", "   vec2 aspect = vec2(canvasWidth, canvasHeight).xy;", "   vec4 spriteIndexData = texture2D(spriteIndices, vTexCoord);", "   float spriteIndex = spriteIndexData.x;// 0.6230769230769231;", "   vec4 spriteData = texture2D(spriteDataTexture, vec2(spriteIndex, 0.5));", "   // p = x, y percentage for texel position within of total resolution", "   vec2 p = (gl_FragCoord.xy - spriteData.rg) / spriteData.ba;", "   // m = x, y percentage for center position within total resolution", "   // note: you should know this, but swizzling allows access to vecN data using x,y,z, and w (or r, g, b, and a) in that order.", "   vec4 centerPointsData = texture2D(centerPointsTexture, vec2(spriteIndex, 0.5));", "   vec2 m = centerPointsData.xy;", "   //vec2 m = vec2(0.5);", "   // d = difference between p and m (obviously, but see above).", "   vec2 d = p - m;", "   // The dot function returns the dot product of the two", "   // input parameters, i.e. the sum of the component-wise", "   // products. If x and y are the same the square root of", "   // the dot product is equivalent to the length of the vector.", "   // Therefore, r = length of vector represented by d (the ", "   // distance of the texel from center position).", "   // In order to apply weights here, we add our weight to this distance", "   // (pushing it closer to 1 - essentially giving no effect at all) and", "   // find the min between our weighted distance and 1.0", "   float inverseLenseWeight = 1.0 - lenseWeight;", "   float r = min(sqrt(dot(d, d)) + inverseLenseWeight, 1.0);", "   vec2 offsetUV = m + (d * r);", "   vec2 adjustedFragCoord = spriteData.rg + vec2((spriteData.b * offsetUV.x), (spriteData.a * offsetUV.y));", "   //adjustedFragCoord.x = clamp(adjustedFragCoord.x, spriteData.r, (spriteData.r + spriteData.b));", "   //adjustedFragCoord.y = clamp(adjustedFragCoord.y, spriteData.g, (spriteData.g + spriteData.a));", "   vec2 uv = adjustedFragCoord.xy / aspect;", "   // RGB shift", "   vec2 offset = vec2(0.0);", "   if (r < 1.0) {", "     float amount = 0.0013;", "     float angle = 0.45;", "     offset = (amount * (1.0 - r)) * vec2(cos(angle), sin(angle));", "   }", "   vec4 cr = texture2D(uSampler, (uv + offset));", "   vec4 cga = texture2D(uSampler, uv);", "   vec4 cb = texture2D(uSampler, (uv - offset));", "   vec4 outColor = vec4(0.0);", "   if (cr.r > 0.0 || cga.g > 0.0 || cb.b > 0.0) {", "     // Adjust rgb values so that colors with transparency appear as if they were atop an opaque white background.", "     // (vec4(0.0, 0.0, 0.0, 0.5) _atop white_ is visibly the same as vec4(0.5, 0.5, 0.5, 0.0))", "     if (cr.a != 0.0) {", "       cr.r = cr.r + cr.a;", "     }", "     if (cga.a != 0.0) {", "       cga.g = cga.g + cga.a;", "     }", "     if (cb.b != 0.0) {", "       cb.b = cb.b + cb.a;", "     }", "     // Ensure offseted/shifted texels have alpha similar to the texel they are offsetting", "     // (this prevents texel from being invisible if cga.a = vec4(0.0, 0.0, 0.0, 0.0)", "     cga.a = max(cga.a, max(cr.a, cb.a));", "     // Set alpha adjustment value so that white texels keep their transparency.", "   	float alpha = 1.0 - cga.a;", "     // Invert colors (this is cheating but optimal) so that we have CMYK rather than RGB", "     // shifted colors and the combination of offsets creates a blacker rather than whiter color.", "     outColor = vec4((1.0 - cr.r) - alpha, (1.0 - cga.g) - alpha, (1.0 - cb.b) - alpha, cga.a);", "   }", "   else {", "     outColor = vec4(cr.r, cga.g, cb.b, cga.a);", "   }", "   // Multiply alpha by original spriteIndexData's alpha value.", "   // this will be 0 for texels not within any 'sprite' area.", "   outColor.a = outColor.a * spriteIndexData.a;", "   gl_FragColor = outColor;", "}" ].join("\n");
  var vertexSrc = [ "varying vec2 vTexCoord;", "void main() {", "vTexCoord = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);", "}" ].join("\n");
  var blotter_Renderer = function(textDescriber, texts) {
    this.init.apply(this, arguments);
  };
  blotter_Renderer.prototype = function() {
    return {
      init: function(textDescriber, texts) {
        this.textDescriber = textDescriber;
        this.mapper = this.createMapper(textDescriber, texts);
        this.textKeys = this.mapper.textKeys;
      },
      prepare: function(callback) {
        var loader = new THREE.TextureLoader();
        loader.load(this.mapper.url, _.bind(function(texture) {
          this.ratio = blotter_pixelRatio;
          var adjustedWidth = this.mapper.width * this.ratio;
          var adjustedHeight = this.mapper.height * this.ratio;
          if (!Detector.webgl) {}
          this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
          });
          this.renderer.setSize(adjustedWidth, adjustedHeight);
          this.scene = new THREE.Scene();
          this.camera = new THREE.Camera();
          this.geometry = new THREE.PlaneGeometry(2, 2, 0);
          this.texture = texture;
          this.texture.needsUpdate = true;
          this.canvas = this.renderer.domElement;
          $(this.canvas).css({
            width: this.mapper.width,
            height: this.mapper.height
          });
          $(this.canvas).attr({
            width: adjustedWidth,
            height: adjustedHeight
          });
          this.spriteIndicesTexture(_.bind(function(spriteIndicesTexture) {
            this.spriteDataTexture(_.bind(function(spriteDataTexture) {
              this.centerPointsTexture(_.bind(function(centerPointsTexture) {
                this.uniforms = {
                  uTime: {
                    type: "f",
                    value: 1
                  },
                  uSampler: {
                    type: "t",
                    value: this.texture
                  },
                  spriteIndices: {
                    type: "t",
                    value: spriteIndicesTexture
                  },
                  spriteDataTexture: {
                    type: "t",
                    value: spriteDataTexture
                  },
                  centerPointsTexture: {
                    type: "t",
                    value: centerPointsTexture
                  },
                  canvasWidth: {
                    type: "f",
                    value: this.canvas.width
                  },
                  canvasHeight: {
                    type: "f",
                    value: this.canvas.height
                  },
                  lenseWeight: {
                    type: "f",
                    value: .9
                  }
                };
                this.material = new THREE.ShaderMaterial({
                  vertexShader: vertexSrc,
                  fragmentShader: fragmentSrc,
                  uniforms: this.uniforms
                });
                this.material.depthTest = false;
                this.material.depthWrite = false;
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.scene.add(this.mesh);
                callback();
              }, this));
            }, this));
          }, this));
        }, this));
      },
      createMapper: function(textDescriber, texts) {
        if (!(textDescriber instanceof Blotter.TextDescription)) {
          blotter_error("blotter_renderer", "first argument must be of type Blotter.TextDescription");
          return;
        }
        return new blotter_TextureMapper(textDescriber, texts);
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
            data[4 * i] = v.fit.x * this.ratio;
            data[4 * i + 1] = this.canvas.height - (v.fit.y + v.h) * this.ratio;
            data[4 * i + 2] = v.w * this.ratio;
            data[4 * i + 3] = v.h * this.ratio;
            i++;
          }, this));
          completion(data);
        }, this), 1);
      },
      centerPointsTexture: function(callback) {
        this.centerPointsArray(_.bind(function(centerPoints) {
          var texture = new THREE.DataTexture(centerPoints, this.mapper.textsKeys.length, 1, THREE.RGBAFormat, THREE.FloatType);
          texture.needsUpdate = true;
          callback(texture);
        }, this));
      },
      centerPointsArray: function(completion) {
        var data = new Float32Array(this.mapper.textsKeys.length * 4), i = 0;
        setTimeout(_.bind(function() {
          $.each(this.mapper.texts, _.bind(function(_, v) {
            var adjustedW = v.w, adjustedH = v.h;
            data[4 * i] = this.randomNumberBetween(adjustedW / 2 - adjustedW / 4, adjustedW / 2 + adjustedW / 4) / adjustedW;
            data[4 * i + 1] = this.randomNumberBetween(adjustedH / 2 - adjustedH / 7, adjustedH / 2 + adjustedH / 7) / adjustedH;
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
            i++;
          }, this));
          completion(data);
        }, this), 1);
      },
      randomNumberBetween: function(a, b) {
        return Math.random() * (b - a) + a;
      },
      loop: function() {
        var delta = (Date.now() - this.lastDrawTime) / 1e3;
        this.lastDrawTime = Date.now();
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
  this.blotter = blotter;
}();