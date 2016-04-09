import "../core/";
import "../utils/";
import "../text/";
import "../material/";
import "_RenderScope";
import "_BackBufferRenderer";


Blotter.Renderer = function (material) {
  this.init(material);
}

Blotter.Renderer.prototype = (function () {

  function _loop () {
    var self = this;

    this.backBuffer.render();
    this.imageData = this.backBuffer.imageData;

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

      this.material = material;

      this.textScopes = {};
      this.imageData;

      this.backBuffer = new blotter_BackBufferRenderer(this.material.width, this.material.height, this.material.threeMaterial)

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
      this.backBuffer.teardown();
      this.renderer = null;
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

      options.pixelRatio = this.material.pixelRatio;

      if (!this.textScopes[text.id]) {
        var scope = new blotter_RendererScope(text, this, options);
        this.textScopes[text.id] = scope;
      }

      return this.textScopes[text.id];
    }
  }
})();
