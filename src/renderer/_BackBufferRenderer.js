import "../core/";
import "../utils/";
import "../text/";
import "../material/";
import "_RendererScope";


var blotter_BackBufferRenderer = function (material) {
  this.init(material);
}

blotter_BackBufferRenderer.prototype = (function () {

  return {

    constructor : blotter_BackBufferRenderer,

    init : function (material) {

      // Prepare back buffer scene

      this.scene = new THREE.Scene();

      this.material = new THREE.Material(); // Stub material on init.

      this.plane = new THREE.PlaneGeometry(1, 1);

      this.mesh = new THREE.Mesh(this.plane, this.material);

      this.scene.add(this.mesh);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });

      this.camera = new THREE.OrthographicCamera(0.5, 0.5, 0.5, 0.5, 0, 100);
    },
//### - naming
    update : function (width, height, material) {
      this.renderer.setSize(width, height);
      this.renderTarget = new THREE.WebGLRenderTarget(width, height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
      });
      this.renderTarget.texture.generateMipmaps = false;
      this.material = material;
      this.mesh.material = material;
      this.mesh.scale.set(width, height, 1);

      this.camera.left = width / - 2;
      this.camera.right = width / 2;
      this.camera.top = height / 2;
      this.camera.bottom = height / - 2;

      this.camera.updateProjectionMatrix();

      document.body.appendChild(this.renderer.domElement);

      this.testCanvas = blotter_CanvasUtils.canvas(width, height);
      this.textContext = this.testCanvas.getContext("2d");
      document.body.appendChild(this.testCanvas);

      // geometry.dynamic = true; ?

      // Reset pixel buffers

// ### - naming here
      this.viewBuffer = new ArrayBuffer(width * height * 4);
      this.imageDataArray = new Uint8Array(this.viewBuffer);
      this.clampedImageDataArray = new Uint8ClampedArray(this.viewBuffer);
      this.imageData = new ImageData(this.clampedImageDataArray, width, height);
    },

    render : function () {
      if (this.renderTarget) {
        this.renderer.render(this.scene, this.camera);
        this.renderer.render(this.scene, this.camera, this.renderTarget);

        this.renderer.readRenderTargetPixels(
          this.renderTarget,
          0,
          0,
          this.renderTarget.width,
          this.renderTarget.height,
          this.imageDataArray
        );
debugger;
        this.textContext.putImageData(
          this.imageData,
          this.testCanvas.width / 2,
          this.testCanvas.height / 2
        );
      }
    },

    teardown : function () {
      this.renderer = null;
    }
  }
})();
