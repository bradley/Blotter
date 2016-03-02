import "../core/";
import "../extras/";
import "../text/";
import "_UniformUtils";


var blotter_RendererScope = function (text, renderer, options) {
  this.init(text, renderer, options);
}

blotter_RendererScope.prototype = (function () {

  function _render () {
    var size = this.renderer.material.mapper.sizeForText(this.text),
        pixelRatio = blotter_CanvasUtils.pixelRatio;
    if (this.domElement) {
      this.context.clearRect(0, 0, size.w, size.h);
      this.context.drawImage(
        this.renderer.domElement,
        size.fit.x * pixelRatio,
        size.fit.y * pixelRatio,
        size.w * pixelRatio,
        size.h * pixelRatio,
        0,
        0,
        size.w,
        size.h
      );
    }
  }

  return {

    constructor : blotter_RendererScope,

    init : function (text, renderer, options) {
      options = options || {};
      if (typeof options.autostart === "undefined") {
        options.autostart = true;
      }

      this.text = text;
      this.renderer = renderer;

      this.width = this.renderer.material.mapper.sizeForText(text).w;
      this.height = this.renderer.material.mapper.sizeForText(text).h;
      this.playing = options.autostart;
      this.timeDelta = 0;
      this.lastDrawTime;
      this.frameCount = 0;

      this.domElement;
      this.context;
    },

    play : function () {
      this.playing = true;
    },

    pause : function () {
      this.playing = false;
    },

    update : function () {
      this.playing += 1;
      this.timeDelta = (Date.now() - this.lastDrawTime) / 1000;
      this.lastDrawTime = Date.now();
      _render.call(this);
    },

    appendTo : function (element) {
      if (this.domElement) {
        this.domElement.remove();
        this.context = null;
      }
      this.domElement = blotter_CanvasUtils.hiDpiCanvas(this.width, this.height);
      this.context = this.domElement.getContext("2d");
      element.appendChild(this.domElement);
    }
  }
})();



Blotter.Renderer = function (material) {
  this.init(material);
}

Blotter.Renderer.prototype = (function () {

  function _loop () {
    var self = this;

    this.renderer.render(this.scene, this.camera);

    for (textId in this.textScopes) {
      var scope = this.textScopes[textId];
      if (scope.playing) {
        scope.update();
      }
    }

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

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width * blotter_CanvasUtils.pixelRatio, height * blotter_CanvasUtils.pixelRatio);

      this.domElement = this.renderer.domElement;

      this.scene = new THREE.Scene();

      this.camera = new THREE.Camera()

      this.geometry = new THREE.PlaneGeometry(2, 2, 0);

      this.material = material;

      this.mesh = new THREE.Mesh(this.geometry, this.material.threeMaterial);

      this.scene.add(this.mesh);

      this.textScopes = {};

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
      this.canvas.remove();
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

      var scope = new blotter_RendererScope(text, this, options);
      this.textScopes[text.id] = scope;
      return scope;
    }
  }
})();
