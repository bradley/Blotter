(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._BackBufferRenderer = function (material) {
    this._width = 1;
    this._height = 1;

    // Prepare back buffer scene

    this._scene = new THREE.Scene();

    this._plane = new THREE.PlaneGeometry(1, 1);

    this._material = material ||new THREE.MeshBasicMaterial(); // Stub material.

    this._mesh = new THREE.Mesh(this._plane, this._material);

    this._scene.add(this._mesh);

    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });

    this._camera = new THREE.OrthographicCamera(0.5, 0.5, 0.5, 0.5, 0, 100);

    this.init.apply(this, arguments);
  };

  Blotter._BackBufferRenderer.prototype = (function () {

    function _updateSize () {
      this._mesh.scale.set(this._width, this._height, 1);

      this._renderTarget = new THREE.WebGLRenderTarget(this._width, this._height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
      });
      this._renderTarget.texture.generateMipmaps = false;
      this._renderTarget.width = this._width;
      this._renderTarget.height = this._height;

      this._camera.left = this._width / - 2;
      this._camera.right = this._width / 2;
      this._camera.top = this._height / 2;
      this._camera.bottom = this._height / - 2;

      this._camera.updateProjectionMatrix();

      this._viewBuffer = new ArrayBuffer(this._width * this._height * 4);
      this._imageDataArray = new Uint8Array(this._viewBuffer);
      this._clampedImageDataArray = new Uint8ClampedArray(this._viewBuffer);

      this.imageData = new ImageData(this._clampedImageDataArray, this._width, this._height);
    }

    return {

      constructor : Blotter._BackBufferRenderer,

      set width (width) {
        this._width = width;
        _updateSize.call(this);
      },

      get width () { }, // jshint

      set height (height) {
        this._height = height;
        _updateSize.call(this);
      },

      get height () { }, // jshint

      set material (material) {
        if (material instanceof THREE.Material) {
          this._material = material;
          this._mesh.material = material;
        }
      },

      get material () { }, // jshint

      init : function (material) {
        _updateSize.call(this);
      },

      render : function () {
        this._renderer.render(this._scene, this._camera, this._renderTarget);

        this._renderer.readRenderTargetPixels(
          this._renderTarget,
          0,
          0,
          this._renderTarget.width,
          this._renderTarget.height,
          this._imageDataArray
        );
      },

      teardown : function () {
        this._renderer = null;
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
