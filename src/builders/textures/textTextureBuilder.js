(function(Blotter, _, THREE) {

  Blotter.TextTextureBuilder = (function() {

    return {

      build : function (mapping, completion) {
        var loader = new THREE.TextureLoader();

        loader.load(mapping.toDataURL(), _.bind(function(texture) {
          texture.generateMipmaps = true; // TODO: Make optional.
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.needsUpdate = true;

          completion(texture);
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE
);
