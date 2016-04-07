import "../core/";
import "../extras/";
import "../text/";
import "../material/";
import "../cache/";
import "_RenderScope";


Blotter.Renderer = function (material) {
  this.init(material);
}

Blotter.Renderer.prototype = (function () {

  function _loop () {
    var self = this;

    this.backBufferRenderer.render(this.backBufferScene, this.backBufferCamera, this.backBufferTexture);

    this.backBufferRenderer.readRenderTargetPixels(
      this.backBufferTexture,
      0,
      0,
      this.backBufferTexture.width,
      this.backBufferTexture.height,
      this.frameBuffer
    );

    for (var textId in this.textScopes) {
      if (this.textScopes[textId].playing) {
        this.textScopes[textId].update();
      }
    }

    this.currentAnimationLoop = blotter_Animation.requestAnimationFrame(function () {
      _loop.call(self);
    });
  }

  return {

    constructor : Blotter.Renderer,

    init : function (material, options) {

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

      this.blotterMaterial = material;

      this.textScopes = {};


      // Prepare back buffer scene

      var backBufferWidth = this.blotterMaterial.width,
          backBufferHeight = this.blotterMaterial.height;

      this.backBufferScene = new THREE.Scene();

      this.backBufferTexture = new THREE.WebGLRenderTarget(backBufferWidth, backBufferHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
      });
      this.backBufferTexture.texture.generateMipmaps = false;
      this.backBufferTexture.width = backBufferWidth;
      this.backBufferTexture.height = backBufferHeight;

      this.backBufferMaterial = this.blotterMaterial.threeMaterial;

      this.backBufferPlane = new THREE.PlaneGeometry(backBufferWidth, backBufferHeight);

      this.backBufferObject = new THREE.Mesh(this.backBufferPlane, this.backBufferMaterial);

      this.backBufferScene.add(this.backBufferObject);

      this.backBufferRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });
      this.backBufferRenderer.setSize(backBufferWidth, backBufferHeight);

      this.backBufferCamera = new THREE.OrthographicCamera(backBufferWidth / - 2, backBufferWidth / 2, backBufferHeight / 2, backBufferHeight / - 2, 0, 100);


      // Prepare pixel buffers

      this.sharedBuffer = new ArrayBuffer(backBufferWidth * backBufferHeight * 4);
      this.frameBuffer = new Uint8Array(this.sharedBuffer);
      this.imageDataBuffer = new Uint8ClampedArray(this.sharedBuffer);
      this.imageData = new ImageData(this.imageDataBuffer, backBufferWidth, backBufferHeight);


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

      if (!this.blotterMaterial.hasText(text)) {
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
