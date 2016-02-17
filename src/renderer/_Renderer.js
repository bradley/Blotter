import "../core/";
import "../extras/";
import "../text/";
import "_UniformUtils";


var blotter_Renderer = function(width, height, uniforms) {
  this.init(width, height, uniforms);
}

blotter_Renderer.prototype = (function() {

  return {

    constructor : blotter_Renderer,

    init : function(width, height, material) {
      if (!Detector.webgl) {
        blotter_Messaging.throwError("blotter_Renderer", "device does not support webgl");
      }

      this.material = material;

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

      this.mesh = new THREE.Mesh(this.geometry, this.material);

      this.scene.add(this.mesh);
    },

    start : function() {
      if (!this.currentAnimationLoop) {
        this.loop();
      }
    },

    loop : function() {
      this.renderer.render(this.scene, this.camera);

      this.currentAnimationLoop = window.requestAnimationFrame(_.bind(function(){
        this.loop();
      }, this));
    },

    stop : function() {
      if (this.currentAnimationLoop) {
        window.cancelAnimationFrame(this.currentAnimationLoop);
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
