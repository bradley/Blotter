import "../core/";
import "../messaging/";
import "../canvas/";
import "../text/";
import "uniformTypes";


var fragmentSrc = [

  "precision highp float;",

  "uniform sampler2D uSampler;",
  "uniform sampler2D spriteIndices;",

  "uniform sampler2D spriteDataTexture;",
  "uniform sampler2D centerPointTexture;",

  "uniform float uTime;",
  "uniform float canvasWidth;",
  "uniform float canvasHeight;",
  "uniform float lenseWeight;",

  "varying vec2 vTexCoord;",


  "void main(void) {",

  "   vec2 aspect = vec2(canvasWidth, canvasHeight).xy;",

  "   vec4 spriteIndexData = texture2D(spriteIndices, vTexCoord);",
  "   float spriteIndex = spriteIndexData.x;",

  "   vec4 spriteData = texture2D(spriteDataTexture, vec2(spriteIndex, 0.5));",

  "   // p = x, y percentage for texel position within of total resolution",
  "   vec2 p = (gl_FragCoord.xy - spriteData.rg) / spriteData.ba;",

  "   // m = x, y percentage for center position within total resolution",
  "   // note: you should know this, but swizzling allows access to vecN data using x,y,z, and w (or r, g, b, and a) in that order.",
  "   vec4 centerPointData = texture2D(centerPointTexture, vec2(spriteIndex, 0.5));",
  "   vec2 m = centerPointData.xy;",
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








BLOTTER.MappedRenderer = function($canvasRegion, textDescriber, texts, options) {
  this.init($canvasRegion, textDescriber, texts, options);
}
BLOTTER.MappedRenderer.prototype = (function() {
  return {

    constructor : BLOTTER.MappedRenderer,

    init : function($canvasRegion, textDescriber, texts, options) {
      options = options || {};

      this.$canvasRegion = $canvasRegion;

      this.textDescriber = textDescriber;
      this.mapper = this.createMapper(textDescriber, texts);
      this.userDefinedUniforms = options.uniforms || {};
      this.textsKeys = this.mapper.textsKeys;

      this.pixelRatio = blotter_pixelRatio();// * 4;
      this.ratioAdjustedWidth = this.mapper.width * this.pixelRatio;
      this.ratioAdjustedHeight = this.mapper.height * this.pixelRatio;

      // Setup text specific uniforms immediately.
      this.setTextUniformValues();
    },

    createMapper : function(textDescriber, texts) {
      if (!(textDescriber instanceof BLOTTER.TextDescription)) {
        blotter_error("blotter_renderer", "first argument must be of type Blotter.TextDescription");
        return;
      }
      return new blotter_TextureMapper(textDescriber, texts);
    },

    build : function(callback) {
      var self = this,
          loader = new THREE.TextureLoader(),
          url = this.mapper.getImage();
      // load a resource
      loader.load(url, function(textsTexture) {

        if (!Detector.webgl) {
          blotter_error("blotter_Renderer", "device does not support webgl");
        }

        // Create renderer
        self.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        self.renderer.setSize(self.ratioAdjustedWidth, self.ratioAdjustedHeight);

        // Create scene
        self.scene = new THREE.Scene();

        // Create orthographic camera
        self.camera = new THREE.Camera()

        // Create plane geometry
        self.geometry = new THREE.PlaneGeometry(2, 2, 0);

        // Setup texture
        self.textsTexture = textsTexture;
        self.textsTexture.needsUpdate = true;

        // Prepare canvas
        self.canvas = self.renderer.domElement;
        $(self.canvas).css({ width: self.mapper.width, height: self.mapper.height });
        $(self.canvas).attr({ width: self.ratioAdjustedWidth, height: self.ratioAdjustedHeight });
        self.$canvasRegion.html(self.canvas);

        self.materialUniforms(function(uniforms) {

          // Attach program to geometry through a material and add to scene.
          self.material = new THREE.ShaderMaterial({
            vertexShader: vertexSrc,
            fragmentShader: fragmentSrc,
            uniforms: uniforms
          });

          self.material.depthTest = false;
          self.material.depthWrite = false;
          self.mesh = new THREE.Mesh(self.geometry,self.material);

          self.scene.add(self.mesh);

          callback();
        });
      });
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
          data[4*i] = v.fit.x * this.pixelRatio; // x
          data[4*i+1] = this.canvas.height - ((v.fit.y + v.h) * this.pixelRatio); // y
          data[4*i+2] = (v.w) * this.pixelRatio;
          data[4*i+3] = (v.h) * this.pixelRatio;
          i++;
        }, this));
        completion(data);
      }, this), 1);

    },

    materialUniforms : function(callback) {
      var self = this,
          uniforms,
          userDefinedUniformTextures = this.uniformsForUserDefinedUniformValues();

      this.spriteIndicesTexture(_.bind(function(spriteIndicesTexture) {
        this.spriteDataTexture(_.bind(function(spriteDataTexture) {

          uniforms = {
            uTime            : { type: "f", value: 1.0 },
            uSampler         : { type: "t", value: self.textsTexture },
            spriteIndices    : { type: "t", value: spriteIndicesTexture },
            spriteDataTexture: { type: "t", value: spriteDataTexture },
            canvasWidth      : { type: "f", value: self.canvas.width },
            canvasHeight     : { type: "f", value: self.canvas.height },
            lenseWeight      : { type: "f", value: 0.9 }
          };
          for (var uniformName in userDefinedUniformTextures) {
            uniforms[uniformName] = userDefinedUniformTextures[uniformName];
          }

          callback(uniforms);
        }, this));
      }, this));
    },

    uniformTextureNameForUniformName : function(uniformName) {
      return uniformName + "Texture";
    },

    uniformsForUserDefinedUniformValues : function() {
      var uniforms = {};

      for (var uniformName in this.userDefinedUniforms) {
        uniforms[this.uniformTextureNameForUniformName(uniformName)] = {
          value : this.uniformTextureForUniformName(uniformName),
          type : "t"
        }
      }
      return uniforms;
    },

    setTextUniformValues : function() {
      this.textUniformValues = {};
      for (var uniformName in this.userDefinedUniforms) {
        if (this.userDefinedUniforms.hasOwnProperty(uniformName)) {
          for (var i = 0; i < this.mapper.textsKeys.length; i++) {
            var uniform = this.userDefinedUniforms[uniformName];
            if (blotter_allowedUserDefinedUniformTypes.indexOf(uniform.type) == -1) {
              blotter_error("blotter_Renderer", "user defined uniforms must be one of type: " +
                blotter_allowedUserDefinedUniformTypes.join(", "));
              return;
            }
            if (!this.isValidValueForType(uniform.type, uniform.value)) {
              blotter_error("blotter_Renderer", "user defined uniform value for " + uniformName + " is incorrect for type: " + uniform.type);
              return;
            }

            this.textUniformValues[this.mapper.textsKeys[i]] = this.textUniformValues[this.mapper.textsKeys[i]] || {};
            this.textUniformValues[this.mapper.textsKeys[i]][uniformName] = uniform.value;
          }
        }
      }
    },

    updateUniformValueForText : function(text, uniformName, value) {
      var self = this;

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
        setTimeout(function() {
          this.material.uniforms[self.uniformTextureNameForUniformName(uniformName)] = this.uniformTextureForUniformName(uniformName);
        }, 1);
      }
    },

    uniformTextureForUniformName : function(uniformName) {
      var uniformDescription = this.userDefinedUniforms[uniformName],
          data = new Float32Array(this.mapper.textsKeys.length * 4);

      if (!uniformDescription)
        blotter_error("blotter_Renderer", "cannot find uniformName for buildUniformTexture");

      for (var i = 0; i < this.mapper.textsKeys.length; i++) {
        var value = this.textUniformValues[this.mapper.textsKeys[i]][uniformName];

        switch (uniformDescription.type) {
          case '1f':
            data[4*i]   = value; // x (r)
            data[4*i+1] = 0.0;
            data[4*i+2] = 0.0;
            data[4*i+3] = 0.0;
            break;

          case '2f':
            data[4*i]   = value[0]; // x (r)
            data[4*i+1] = value[1]; // y (g)
            data[4*i+2] = 0.0;
            data[4*i+3] = 0.0;
            break;

          case '3f':
            data[4*i]   = value[0]; // x (r)
            data[4*i+1] = value[1]; // y (g)
            data[4*i+2] = value[2]; // z (b)
            data[4*i+3] = 0.0;
            break;

          case '4f':
            data[4*i]   = value[0]; // x (r)
            data[4*i+1] = value[1]; // y (g)
            data[4*i+2] = value[2]; // z (b)
            data[4*i+3] = value[3]; // w (a)
            break;
        }
      }

      var texture = new THREE.DataTexture(data, this.mapper.textsKeys.length, 1, THREE.RGBAFormat, THREE.FloatType);
      texture.needsUpdate = true;

      return texture;
    },

    isValidValueForType : function(type, value) {
      var valid = false;
      switch (type) {
        case '1f':
          valid = !isNaN(value);
          break;

        case '2f':
          valid = Array.isArray(value) && value.length == 2;
          break;

        case '3f':
          valid = Array.isArray(value) && value.length == 3;
          break;

        case '4f':
          valid = Array.isArray(value) && value.length == 4;
          break;
      }

      return valid;
    },

    loop : function() {
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

