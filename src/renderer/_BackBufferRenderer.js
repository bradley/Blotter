import "../core/";
import "../utils/";
import "../text/";
import "../material/";
import "_RenderScope";


var blotter_BackBufferRenderer = function (width, height, material) {
  this.init(width, height, material);
}

blotter_BackBufferRenderer.prototype = (function () {

  return {

    constructor : blotter_BackBufferRenderer,

    init : function (width, height, material) {

      // Prepare back buffer scene

      this.scene = new THREE.Scene();

      this.renderTarget = new THREE.WebGLRenderTarget(width, height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
      });
      this.renderTarget.texture.generateMipmaps = false;
      this.renderTarget.width = width;
      this.renderTarget.height = height;

      this.material = material;

      this.plane = new THREE.PlaneGeometry(width, height);

      this.mesh = new THREE.Mesh(this.plane, this.material);

      this.scene.add(this.mesh);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });

      this.camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 0, 100);


      // Prepare pixel buffers

      this.viewBuffer = new ArrayBuffer(width * height * 4);
      this.imageDataArray = new Uint8Array(this.viewBuffer);
      this.clampedImageDataArray = new Uint8ClampedArray(this.viewBuffer);
      this.imageData = new ImageData(this.clampedImageDataArray, width, height);
    },

    render : function () {
      this.renderer.render(this.scene, this.camera, this.renderTarget);

      this.renderer.readRenderTargetPixels(
        this.renderTarget,
        0,
        0,
        this.renderTarget.width,
        this.renderTarget.height,
        this.imageDataArray
      );
    },

    teardown : function () {
      this.renderer = null;
    }
  }
})();
