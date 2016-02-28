import "../core/";
import "../extras/";
import "../text/";
import "_UniformUtils";


Blotter.Renderer = function (material) {
  this.init(material);
}

Blotter.Renderer.prototype = (function () {

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
          "material does not expose property threeMaterial. Did you forget to call #load on material before instantiating Blotter.Renderer?");
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
    }
  }
})();
