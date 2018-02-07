(function(Blotter, _, THREE) {

  Blotter.TextTextureBuilder = (function() {

    return {

      build : function (mapping, completion) {
        var loader = new THREE.TextureLoader(),
            url;

        mapping.toCanvas(_.bind(function(canvas) {
          url = canvas.toDataURL();

          loader.load(url, _.bind(function(texture) {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = true;
            texture.needsUpdate = true;

            completion(texture);
          }, this));
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE
);
