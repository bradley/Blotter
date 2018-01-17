import {
  Scene,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  OrthographicCamera,
  WebGLRenderTarget,
  Material,
  LinearFilter,
  RGBAFormat,
  UnsignedByteType
} from "three";
import { bind } from "underscore";
import EventEmitter from "wolfy87-eventemitter";
import { extendWithGettersSetters } from "../helpers";


var Renderer = function () {
  this._currentAnimationLoop = false;

  this._scene = new Scene();

  this._plane = new PlaneGeometry(1, 1);

  this._material = new MeshBasicMaterial(); // Stub material.

  this._mesh = new Mesh(this._plane, this._material);
  this._scene.add(this._mesh);

  this._camera = new OrthographicCamera(0.5, 0.5, 0.5, 0.5, 0, 100);

  this.init.apply(this, arguments);
};

Renderer.prototype = (function () {

  function _getRenderTargetWithSize (width, height) {
    var renderTarget = new WebGLRenderTarget(width, height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      type: UnsignedByteType
    });

    renderTarget.texture.generateMipmaps = false;
    renderTarget.width = width;
    renderTarget.height = height;

    return renderTarget;
  }

  function _loop () {
    Blotter.WEBGL_RENDERER.render(this._scene, this._camera, this._renderTarget);

    Blotter.WEBGL_RENDERER.readRenderTargetPixels(
      this._renderTarget,
      0,
      0,
      this._renderTarget.width,
      this._renderTarget.height,
      this._imageDataArray
    );

    this.trigger("render");

    this._currentAnimationLoop = window.requestAnimationFrame(bind(_loop, this));
  }

  return {

    constructor : Renderer,

    get material () { }, // jshint

    set material (material) {
      if (material instanceof Material) {
        this._material = material;
        this._mesh.material = material;
      }
    },

    get width () {
      return this._width;
    },

    set width (width) {
      this.setSize(width, this._height);
    },

    get height () {
      return this._height;
    },

    set height (height) {
      this.setSize(this._width, height);
    },

    init : function () {
      this.setSize(1, 1);
    },

    start : function () {
      if (!this._currentAnimationLoop) {
        _loop.call(this);
      }
    },

    stop : function () {
      if (this._currentAnimationLoop) {
        window.cancelAnimationFrame(this._currentAnimationLoop);
        this._currentAnimationLoop = undefined;
      }
    },

    setSize : function (width, height) {
      this._width = width || 1;
      this._height = height || 1;

      this._mesh.scale.set(this._width, this._height, 1);

      this._camera.left = this._width / - 2;
      this._camera.right = this._width / 2;
      this._camera.top = this._height / 2;
      this._camera.bottom = this._height / - 2;
      this._camera.updateProjectionMatrix();

      this._renderTarget = _getRenderTargetWithSize(this._width, this._height);

      this._viewBuffer = new ArrayBuffer(this._width * this._height * 4);
      this._imageDataArray = new Uint8Array(this._viewBuffer);
      this._clampedImageDataArray = new Uint8ClampedArray(this._viewBuffer);

      this.imageData = new ImageData(this._clampedImageDataArray, this._width, this._height);
    },

    teardown : function () {
      this.stop();
    }
  };
})();

extendWithGettersSetters(Renderer.prototype, EventEmitter.prototype);


export { Renderer };
