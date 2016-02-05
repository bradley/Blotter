import "../core/";
import "../messaging/";
import "../canvas/";
import "../text/";


var texts = ["To", "communicate", "Mars", "converse", "spirits", "report", "the", "behaviour", "of", "sea", "monster", "Describe", "horoscope", "haruspicate", "or", "scry", "Observe", "disease", "in", "signatures", "evoke", "Biography", "from", "wrinkles", "palm", "And", "tragedy", "fingers", "release", "omens", "By", "sortilege", "tea", "leaves", "riddle", "inevitable", "With", "playing", "cards", "fiddle", "pentagrams", "Or", "barbituric", "acids", "dissect", 'Sed', 'To', 'communicate', 'Mars', 'converse', 'spirits', 'report', 'the', 'behaviour', 'of', 'sea', 'monster', 'Describe', 'horoscope', 'haruspicate', 'or', 'scry', 'Observe', 'disease', 'in', 'signatures', 'evoke', 'Biography', 'from', 'wrinkles', 'palm', 'And', 'tragedy', 'fingers', 'release', 'omens', 'By', 'sortilege', 'tea', 'leaves', 'riddle', 'inevitable', 'With', 'playing', 'cards', 'fiddle', 'pentagrams', 'Or', 'barbituric', 'acids', 'dissect', 'Sed', 'tincidunt', 'tempor', 'consectetur.', 'Cras', 'imperdiet', 'suscipit', 'massa,', 'ut', 'malesuada', 'enim', 'sollicitudin', 'in.', 'Nullam', 'cursus,', 'lorem', 'vitae', 'cursus', 'gravida,', 'erat'];


var fragmentSrc = [

  "precision highp float;",

  "uniform sampler2D uSampler;",
  "uniform sampler2D spriteIndices;",

  "uniform sampler2D spriteDataTexture;",
  "uniform sampler2D centerPointsTexture;",

  "uniform float uTime;",
  "uniform float canvasWidth;",
  "uniform float canvasHeight;",
  "uniform float lenseWeight;",

  "varying vec2 vTexCoord;",


  "void main(void) {",

  "   vec2 aspect = vec2(canvasWidth, canvasHeight).xy;",

  "   vec4 spriteIndexData = texture2D(spriteIndices, vTexCoord);",
  "   float spriteIndex = spriteIndexData.x;// 0.6230769230769231;",

  "   vec4 spriteData = texture2D(spriteDataTexture, vec2(spriteIndex, 0.5));",

  "   // p = x, y percentage for texel position within of total resolution",
  "   vec2 p = (gl_FragCoord.xy - spriteData.rg) / spriteData.ba;",

  "   // m = x, y percentage for center position within total resolution",
  "   // note: you should know this, but swizzling allows access to vecN data using x,y,z, and w (or r, g, b, and a) in that order.",
  "   vec4 centerPointsData = texture2D(centerPointsTexture, vec2(spriteIndex, 0.5));",
  "   vec2 m = centerPointsData.xy;",
  "   //vec2 m = vec2(0.5);",

  "   // d = difference between p and m (obviously, but see above).",
  "   vec2 d = p - m;",

  "   // The dot function returns the dot product of the two",
  "   // input parameters, i.e. the sum of the component-wise",
  "   // products. If x and y are the same the square root of",
  "   // the dot product is equivalent to the length of the vector.",
  "   // Therefore, r = length of vector represented by d (the ",
  "   // distance of the texel from center position).",
  "   // In order to apply weights here, we add our weight to this distance",
  "   // (pushing it closer to 1 - essentially giving no effect at all) and",
  "   // find the min between our weighted distance and 1.0",
  "   float inverseLenseWeight = 1.0 - lenseWeight;",
  "   float r = min(sqrt(dot(d, d)) + inverseLenseWeight, 1.0);",

  "   vec2 offsetUV = m + (d * r);",

  "   vec2 adjustedFragCoord = spriteData.rg + vec2((spriteData.b * offsetUV.x), (spriteData.a * offsetUV.y));",
	"   //adjustedFragCoord.x = clamp(adjustedFragCoord.x, spriteData.r, (spriteData.r + spriteData.b));",
  "   //adjustedFragCoord.y = clamp(adjustedFragCoord.y, spriteData.g, (spriteData.g + spriteData.a));",
  "   vec2 uv = adjustedFragCoord.xy / aspect;",

  "   // RGB shift",
  "   vec2 offset = vec2(0.0);",
  "   if (r < 1.0) {",
  "     float amount = 0.0013;",
  "     float angle = 0.45;",
  "     offset = (amount * (1.0 - r)) * vec2(cos(angle), sin(angle));",
  "   }",
  "   vec4 cr = texture2D(uSampler, (uv + offset));",
  "   vec4 cga = texture2D(uSampler, uv);",
  "   vec4 cb = texture2D(uSampler, (uv - offset));",

  "   vec4 outColor = vec4(0.0);",
  "   if (cr.r > 0.0 || cga.g > 0.0 || cb.b > 0.0) {",
  "     // Adjust rgb values so that colors with transparency appear as if they were atop an opaque white background.",
  "     // (vec4(0.0, 0.0, 0.0, 0.5) _atop white_ is visibly the same as vec4(0.5, 0.5, 0.5, 0.0))",
  "     if (cr.a != 0.0) {",
  "       cr.r = cr.r + cr.a;",
  "     }",
  "     if (cga.a != 0.0) {",
  "       cga.g = cga.g + cga.a;",
  "     }",
  "     if (cb.b != 0.0) {",
  "       cb.b = cb.b + cb.a;",
  "     }",

  "     // Ensure offseted/shifted texels have alpha similar to the texel they are offsetting",
  "     // (this prevents texel from being invisible if cga.a = vec4(0.0, 0.0, 0.0, 0.0)",
  "     cga.a = max(cga.a, max(cr.a, cb.a));",

  "     // Set alpha adjustment value so that white texels keep their transparency.",
  "   	float alpha = 1.0 - cga.a;",
  "     // Invert colors (this is cheating but optimal) so that we have CMYK rather than RGB",
  "     // shifted colors and the combination of offsets creates a blacker rather than whiter color.",
  "     outColor = vec4((1.0 - cr.r) - alpha, (1.0 - cga.g) - alpha, (1.0 - cb.b) - alpha, cga.a);",
  "   }",
  "   else {",
  "     outColor = vec4(cr.r, cga.g, cb.b, cga.a);",
  "   }",

  "   // Multiply alpha by original spriteIndexData's alpha value.",
  "   // this will be 0 for texels not within any 'sprite' area.",
  "   outColor.a = outColor.a * spriteIndexData.a;",
  "   gl_FragColor = outColor;",
  "}"

].join("\n");

var vertexSrc = [

		"varying vec2 vTexCoord;",

		"void main() {",

			"vTexCoord = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

		"}"

].join("\n");








var blotter_Renderer = function(textDescriber, texts) {
  this.init.apply(this, arguments);
}
blotter_Renderer.prototype = (function() {
  return {

    init : function(textDescriber, texts) {
      this.textDescriber = textDescriber;
      this.mapper = this.createMapper(textDescriber, texts);
      this.textKeys = this.mapper.textKeys;
    },

    prepare : function(callback) {
      var loader = new THREE.TextureLoader();

      // load a resource
      loader.load(this.mapper.url, _.bind(function(texture) {

        this.ratio = blotter_pixelRatio;// * 4;
        var adjustedWidth = this.mapper.width * this.ratio;
        var adjustedHeight = this.mapper.height * this.ratio;



        if (!Detector.webgl) {
          // TODO: HANDLE NO WEBGL LIKE WE DO IN BLOG.
        }

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(adjustedWidth, adjustedHeight);

        // Create scene
        this.scene = new THREE.Scene();

        // Create orthographic camera
        this.camera = new THREE.Camera()

        // Create plane geometry
        this.geometry = new THREE.PlaneGeometry(2, 2, 0);

        // Setup texture
        this.texture = texture
        this.texture.needsUpdate = true;

        // Prepare canvas
        this.canvas = this.renderer.domElement;
        $(this.canvas).css({ width: this.mapper.width, height: this.mapper.height });
        $(this.canvas).attr({ width: adjustedWidth, height: adjustedHeight });


        this.spriteIndicesTexture(_.bind(function(spriteIndicesTexture) {

          this.spriteDataTexture(_.bind(function(spriteDataTexture) {

            this.centerPointsTexture(_.bind(function(centerPointsTexture) {

              // Setup initial uniforms
              this.uniforms = {
                uTime: { type: "f", value: 1.0 },
                uSampler: { type: "t", value: this.texture },
                spriteIndices: { type: "t", value: spriteIndicesTexture },
                spriteDataTexture: { type: "t", value: spriteDataTexture },
                centerPointsTexture: { type: "t", value: centerPointsTexture },
                canvasWidth: { type: "f", value: this.canvas.width },
                canvasHeight: { type: "f", value: this.canvas.height },
                lenseWeight: { type: "f", value: 0.9 }
              };

              // Attach program to geometry through a material and add to scene.
              this.material = new THREE.ShaderMaterial({
                vertexShader: vertexSrc,
                fragmentShader: fragmentSrc,
                uniforms: this.uniforms
              });

              this.material.depthTest = false;
              this.material.depthWrite = false;
              this.mesh = new THREE.Mesh(this.geometry,this.material);

              this.scene.add(this.mesh);

              callback();
            }, this));
          }, this));
        }, this));
      }, this));
    },

    createMapper : function(textDescriber, texts) {
      if (!(textDescriber instanceof Blotter.TextDescription)) {
        blotter_error("blotter_renderer", "first argument must be of type Blotter.TextDescription");
        return;
      }

      return new blotter_TextureMapper(textDescriber, texts);
    },

    start : function() {
      // Draw.
      this.lastDrawTime = Date.now();
      if (!this.currentAnimationLoop) {
        this.loop();
      }
    },

    spriteIndicesTexture : function(callback) {
    	var fidelityModifier = 0.5;
    	this.spriteIndices(_.bind(function(dataPoints) {
        var texture = new THREE.DataTexture(dataPoints, this.mapper.width * fidelityModifier, this.mapper.height * fidelityModifier, THREE.RGBAFormat, THREE.FloatType);
        texture.flipY = true;
				texture.needsUpdate = true;
        callback(texture);
      }, this), fidelityModifier);
    },

    spriteIndices : function(completion, scale) {
      var scale = scale || 1.0,
      		height = this.mapper.height * scale,
          width = this.mapper.width * scale,
      		points = new Float32Array((height * width) * 4),
          widthStepModifier = (width % 1),
          indicesOffset = (1 / this.mapper.textsKeys.length) / 2;

      setTimeout(_.bind(function() {
        for (i = 1; i < points.length / 4; i++) {

          var y = Math.ceil(i / (width - widthStepModifier)),
              x = i - ((width - widthStepModifier) * (y - 1));

          var referenceIndex = 0.0,
              a = 0.0;

          for (ki = 0; ki < this.mapper.textsKeys.length; ki++) {
            var v = this.mapper.texts[this.mapper.textsKeys[ki]],
            		fitY = v.fit.y * scale,
                fitX = v.fit.x * scale,
                vH = v.h * scale,
                vW = v.w * scale;

            if (y >= fitY && y <= fitY + vH && x >= fitX && x <= fitX + vW) {
              referenceIndex = (ki / this.mapper.textsKeys.length) + indicesOffset;
              a = 1.0;

              break;
            }
          }

          var index = i - 1;
          points[4*index+0] = referenceIndex;
          points[4*index+1] = referenceIndex;
          points[4*index+2] = referenceIndex;
          points[4*index+3] = a;
        }
        completion(points);
      }, this), 1);

    },

    spriteDataTexture : function(callback) {
    	this.spriteDataArray(_.bind(function(spriteData) {
      	var texture = new THREE.DataTexture(spriteData, this.mapper.textsKeys.length, 1, THREE.RGBAFormat, THREE.FloatType);
				texture.needsUpdate = true;
        callback(texture);
      }, this));
    },

    spriteDataArray : function(completion) {
      var data = new Float32Array(this.mapper.textsKeys.length * 4),
          i = 0;

      setTimeout(_.bind(function() {
        $.each(this.mapper.texts, _.bind(function(_, v) {
          data[4*i] = v.fit.x * this.ratio; // x
          data[4*i+1] = this.canvas.height - ((v.fit.y + v.h) * this.ratio); // y
          data[4*i+2] = (v.w) * this.ratio;
          data[4*i+3] = (v.h) * this.ratio;
          i++;
        }, this));
        completion(data);
      }, this), 1);
    },

    centerPointsTexture : function(callback) {
    	this.centerPointsArray(_.bind(function(centerPoints) {
      	var texture = new THREE.DataTexture(centerPoints, this.mapper.textsKeys.length, 1, THREE.RGBAFormat, THREE.FloatType);
				texture.needsUpdate = true;
        callback(texture);
      }, this));
    },

    centerPointsArray : function(completion) {
      var data = new Float32Array(this.mapper.textsKeys.length * 4),
          i = 0;

      setTimeout(_.bind(function() {
        $.each(this.mapper.texts, _.bind(function(_, v) {
        	var adjustedW = v.w,
          		adjustedH = v.h;
          data[4*i] = this.randomNumberBetween((adjustedW / 2) - (adjustedW / 4), (adjustedW / 2) + (adjustedW / 4)) / adjustedW; // x
          data[4*i+1] = this.randomNumberBetween((adjustedH / 2) - (adjustedH / 7), (adjustedH / 2) + (adjustedH / 7)) / adjustedH; // y
          data[4*i+2] = 0.0;
          data[4*i+3] = 0.0;
          i++;
        }, this));

        completion(data);
      }, this), 1);
    },

    randomNumberBetween : function(a, b) {
      return Math.random() * (b - a) + a;
    },

    loop : function() {
      // Convert delta to seconds by dividing by 1000
      var delta = (Date.now() - this.lastDrawTime) / 1000;
      this.lastDrawTime = Date.now();

      //update uniform for uTime = delta;
      this.renderer.render(this.scene, this.camera);

      this.currentAnimationLoop = blotter_requestAnimationFrame(_.bind(function(){
        this.loop();
      }, this));
    },

    stop : function() {
      if (this.currentAnimationLoop) {
        blotter_cancelAnimationFrame(this.currentAnimationLoop);
        this.currentAnimationLoop = undefined;
      }
    },

    teardown : function() {
      this.stop();
      this.renderer = null;
      $(this.canvas).remove();
    }
  }
})();

