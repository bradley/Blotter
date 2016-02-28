import "../core/";
import "../extras/";
import "../text/";
import "_UniformUtils";


Blotter.Renderer = function (material) {
  this.init(material);
}

Blotter.Renderer.prototype = (function () {

  function _createOutCanvasCtx (element) {
    var testText = this.material.mapper.texts[35],
        size = this.material.mapper.sizeForText(testText),
        canvas = blotter_CanvasUtils.hiDpiCanvas(size.w, size.h);
    element.appendChild(canvas);
    return canvas.getContext("2d");
  }

  function _renderToOutCanvasCtx () {
    var testText = this.material.mapper.texts[35],
        size = this.material.mapper.sizeForText(testText);
    if (this.outCanvasCtx) {
      this.outCanvasCtx.clearRect(0, 0, size.w, size.h);
      this.outCanvasCtx.drawImage(this.domElement, size.fit.x * this.pixelRatio, size.fit.y * this.pixelRatio, size.w * this.pixelRatio, size.h * this.pixelRatio, 0, 0, size.w, size.h);
    }
  }

  return {

    constructor : Blotter.Renderer,

    init : function (material) {
      var width = material.width,
          height = material.height;

      if (!Detector.webgl) {
        blotter_Messaging.throwError("Blotter.Renderer", "device does not support webgl");
      }

      if (!material.threeMaterial) {
        blotter_Messaging.throwError("Blotter.Renderer",
          "material does not expose property threeMaterial. Did you forget to call #load on your Blotter.Material object before instantiating Blotter.Renderer?");
      }

      this.pixelRatio = blotter_CanvasUtils.pixelRatio();
      this.ratioAdjustedWidth = width * this.pixelRatio;
      this.ratioAdjustedHeight = height * this.pixelRatio;

      // Create renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(this.ratioAdjustedWidth, this.ratioAdjustedHeight);

      // Prepare canvas
      this.domElement = this.renderer.domElement;
      $(this.domElement).css({ width: width, height: height });
      $(this.domElement).attr({ width: this.ratioAdjustedWidth, height: this.ratioAdjustedHeight });

      // Create scene
      this.scene = new THREE.Scene();

      // Create orthographic camera
      this.camera = new THREE.Camera()

      // Create plane geometry
      this.geometry = new THREE.PlaneGeometry(2, 2, 0);

      this.material = material;

      this.mesh = new THREE.Mesh(this.geometry, this.material.threeMaterial);

      this.scene.add(this.mesh);
    },

    start : function () {
      if (!this.currentAnimationLoop) {
        this.loop();
      }
    },

    loop : function () {
      var self = this;
      this.renderer.render(this.scene, this.camera);

      _renderToOutCanvasCtx.call(this);

      this.currentAnimationLoop = blotter_Animation.requestAnimationFrame(function () {
        self.loop();
      });
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

    appendTo : function (element) {
      this.outCanvasCtx = _createOutCanvasCtx.call(this, element);
    },
  }
})();
