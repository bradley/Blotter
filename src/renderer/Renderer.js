import "../core/";
import "../extras/";
import "../text/";
import "../material/";
import "_RenderScope";


Blotter.Renderer = function (material) {
  this.init(material);
}

Blotter.Renderer.prototype = (function () {

  function _loop () {
    var self = this,
        textScope;

    this.renderer.render(this.scene, this.camera);

    // Downsize (half resolution) rendered content into backbuffer.
    this.backBufferContext.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
    this.backBufferContext.drawImage(
      this.domElement,
      0,
      0,
      this.domElement.width,
      this.domElement.height,
      0,
      0,
      this.backBuffer.width,
      this.backBuffer.height
    );
    this.backBufferData = this.backBufferContext.getImageData(0, 0, this.backBuffer.width, this.backBuffer.height);
    for (var textId in this.textScopes) {
      textScope = this.textScopes[textId];
      if (textScope.playing) {
        textScope.update();
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
      this.renderer.setSize(width, height);

      this.domElement = this.renderer.domElement;
      this.domElementContext = this.renderer.getContext();

      this.backBuffer = blotter_CanvasUtils.canvas(material.mapper.width, material.mapper.height);
      this.backBufferContext = this.backBuffer.getContext("2d");

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
