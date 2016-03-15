import "../core/";
import "../extras/";
import "../text/";
import "../material/";
import "_RenderScope";


var Uint8ArrayCache = function (length, poolSize) {
  this.init(length, poolSize);
};

Uint8ArrayCache.prototype = (function() {

  function _buildCache (length, poolSize) {
    this.cache = [];
    for(var i = 0; i < poolSize; i++) {
      this.cache.push(new Uint8Array(length));
    }
  }

  return {
    constructor : Uint8ArrayCache,

    init : function (length, poolSize) {
      poolSize = poolSize || 10;
      this.lastIndex = 0;
      _buildCache.call(this, length, poolSize);
    },

    next : function () {
      var array = this.cache[this.lastIndex];
      this.lastIndex++;
      if (this.lastIndex == this.cache.length) {
        this.lastIndex = 0;
      }
      return array;
    }

  }
})();


// DEV NOTE: Not sure this should even work. Can context have ore than on of these?
var ImageDataCache = function (width, height, poolSize) {
  this.init(width, height, poolSize);
};

ImageDataCache.prototype = (function() {

  function _buildCache (width, height, poolSize) {
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d");
    this.cache = [];
    for(var i = 0; i < poolSize; i++) {
      this.cache.push(context.createImageData(width, height));
    }
    delete canvas;
  }

  return {
    constructor : ImageDataCache,

    init : function (width, height, poolSize) {
      poolSize = poolSize || 10;
      this.lastIndex = 0;
      _buildCache.call(this, width, height, poolSize);
    },

    next : function () {
      var array = this.cache[this.lastIndex];
      this.lastIndex++;
      if (this.lastIndex == this.cache.length) {
        this.lastIndex = 0;
      }
      return array;
    }

  }
})();

// const blotter_Pool = new thread.Pool();

// // Run inline code
// const jobC = blotter_Pool.run(
//   function(options, done) {
//     options = JSON.parse(options);
//     var canvas = document.createElement("canvas"),
//         context = canvas.getContext("2d");
//     canvas.width = options.eW;
//     canvas.height = options.eH;

//     context.drawImage(
//       option.url,
//       0,
//       0,
//       options.sW,
//       options.sH,
//       0,
//       0,
//       options.eW,
//       options.eH
//     );

//     const backBufferData = context.getImageData(0, 0, options.eW, options.eH);
//     done(backBufferData);
//   }
// );


Blotter.Renderer = function (material) {
  this.init(material);
}

Blotter.Renderer.prototype = (function () {

  function _loop () {
    var self = this,
        textScope;

    var time = ((new Date()).getTime() - this.startTime) / 1000;
    this.material.updateUniformValueForText(this.material.mapper.texts[1], "uLenseWeight", Math.abs(Math.sin(time)));

    this.renderer.render(this.scene, this.camera, this.backBufferTexture);
    this.renderer.render(this.scene, this.camera);

    //var buffer = this.uint8ArrayArrayCache[text.id].next();
    //this.renderer.readRenderTargetPixels(pickingTexture, mouse.x, pickingTexture.height - mouse.y, 1, 1, pixelBuffer);

    //jobC.send();
    //setTimeout(function() {
      // Downsize (half resolution) rendered content into backBuffer.
      // self.backBufferContext.clearRect(0, 0, self.backBuffer.width, self.backBuffer.height);
      // self.backBufferContext.drawImage(
      //   self.domElement,
      //   0,
      //   0,
      //   self.domElement.width,
      //   self.domElement.height,
      //   0,
      //   0,
      //   self.backBuffer.width,
      //   self.backBuffer.height
      // );
      // self.backBufferData = self.backBufferContext.getImageData(0, 0, self.backBuffer.width, self.backBuffer.height);
      //self.backBufferData = self.backBufferContext.createImageData(self.backBuffer.width, self.backBuffer.height);

      var buffer = this.uint8ArrayArrayCache.next(),
          imageDataBuffer = this.imageDataCache.next();
      this.renderer.readRenderTargetPixels(
        this.backBufferTexture,
        0,
        0,
        this.material.mapper.width,
        this.material.mapper.height,
        buffer
      );
      alert("im not sure exactly what is wrong here but we are getting closer i think. I do think this is basically the approach we want, im just not sure we are using backbuffertexture correctly. Look into readRenderTargetPixels more.");
      debugger;
      imageDataBuffer.data = buffer;

      for (var textId in self.textScopes) {
        textScope = self.textScopes[textId];
        if (textScope.playing) {
          textScope.update(imageDataBuffer);
        }
      }

      // for (var textId in self.textScopes) {
      //   textScope = self.textScopes[textId];
      //   if (textScope.playing) {
      //     var buffer = this.uint8ArrayArrayCache[textId].next(),
      //         imageDataBuffer = this.imageDataCache[textId].next();
      //     this.renderer.readRenderTargetPixels(
      //       this.backBufferTexture,
      //       textScope.size.fit.x,// * this.material.pixelRatio,
      //       this.material.height - (textScope.size.fit.y),// * this.material.pixelRatio),
      //       textScope.width,// * this.material.pixelRatio,
      //       textScope.height,// * this.material.pixelRatio,
      //       buffer);
      //     imageDataBuffer.data = buffer;

      //     textScope.update(imageDataBuffer);
      //   }
      // }
    //});

    // jobC.send(JSON.stringify({ url: this.domElementContext.toDataURL(), sW: this.domElement.width, sH: this.domElement.height, eW : this.material.mapper.width, eH : this.material.mapper.height }));
    // jobC.on('done', function(backBufferData) {

      // for (var textId in self.textScopes) {
      //   textScope = self.textScopes[textId];
      //   if (textScope.playing) {
      //     textScope.update();
      //   }
      // }
    // });

    this.currentAnimationLoop = blotter_Animation.requestAnimationFrame(function () {
      _loop.call(self);
    });
  }

  return {

    constructor : Blotter.Renderer,

    init : function (material, options) {
      var width = material.width,
          height = material.height;

      options = options || {};
      if (typeof options.autostart === "undefined") {
        options.autostart = true;
      }

      if (!Detector.webgl) {
        blotter_Messaging.throwError("Blotter.Renderer", "device does not support webgl");
      }

      if (!material.threeMaterial) {
        blotter_Messaging.throwError("Blotter.Renderer",
          "material does not expose property threeMaterial. Did you forget to call #load on your Blotter.Material object before instantiating Blotter.Renderer?");
      }

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});//, preserveDrawingBuffer: true });
      this.renderer.setSize(width, height);
      this.startTime = new Date().getTime();
      document.body.appendChild(this.renderer.domElement);

      this.domElement = this.renderer.domElement;
      this.domElementContext = this.renderer.getContext();

      // this.backBuffer = blotter_CanvasUtils.canvas(material.mapper.width, material.mapper.height);
      // this.backBufferContext = this.backBuffer.getContext("2d");
      this.backBufferTexture = new THREE.WebGLRenderTarget( material.mapper.width, material.mapper.height );
      this.backBufferTexture.texture.minFilter = THREE.LinearFilter;

      this.scene = new THREE.Scene();

      this.camera = new THREE.Camera()

      this.geometry = new THREE.PlaneGeometry(2, 2, 0);

      this.material = material;

      this.mesh = new THREE.Mesh(this.geometry, this.material.threeMaterial);

      this.scene.add(this.mesh);

      this.textScopes = {};
      this.uint8ArrayArrayCache = new Uint8ArrayCache(material.mapper.width * material.mapper.height * 4)
      this.imageDataCache = new ImageDataCache(material.mapper.width, material.mapper.height);

      if (options.autostart) {
        this.start();
      }
    },

    start : function () {
      if (!this.currentAnimationLoop) {
        _loop.call(this);
      }
    },

    stop : function () {
      if (this.currentAnimationLoop) {
        blotter_Animation.cancelAnimationFrame(this.currentAnimationLoop);
        this.currentAnimationLoop = undefined;
      }
    },

    teardown : function () {
      this.stop();
      this.renderer = null;
      this.domElement.remove();
    },

    forText : function (text, options) {
      if (!(text instanceof Blotter.Text)) {
        blotter_Messaging.logError("Blotter.Renderer", "argument must be instanceof Blotter.Text");
        return;
      }

      if (!this.material.hasText(text)) {
        blotter_Messaging.logError("Blotter.Renderer", "Blotter.Text object not found in material");
        return;
      }

      options = options || {};
      if (typeof options.autostart === "undefined") {
        options.autostart = true;
      }

      if (!this.textScopes[text.id]) {
        var scope = new blotter_RendererScope(text, this, options);
        this.textScopes[text.id] = scope;
      }

      return this.textScopes[text.id];
    }
  }
})();
