(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._TextsTextureProvider = function(mapper) {
    this._mapper = mapper;

    // Stub texture - resets on build.
    this.texture = new THREE.Texture();

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter._TextsTextureProvider.prototype = (function() {

    return {

      constructor : Blotter._TextsTextureProvider,

      build : function () {
        var loader = new THREE.TextureLoader();
        loader.load(this._mapper.getImage(), _.bind(function(texture) {
          this.texture = texture;
          this.texture.generateMipmaps = false;
          this.texture.minFilter = THREE.LinearFilter;
          this.texture.magFilter = THREE.LinearFilter;
          this.texture.needsUpdate = true;

          this.trigger("build");
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
