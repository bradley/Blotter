import "../core/";
import "../utils/";
import "../text/";


var blotter_TextsTexture = function(mapper) {
  this.mapper

  // Stub texture - resets on build.
  this.texture = new THREE.Texture();

  this.init.apply(this, arguments);
}

blotter_TextsTexture.prototype = (function() {

  return {

    constructor : blotter_TextsTexture,

    init : function (mapper) {
      this.mapper = mapper;

      _.extendOwn(this, EventEmitter.prototype);
    },

    build : function () {
      var loader = new THREE.TextureLoader();
      loader.load(this.mapper.getImage(), _.bind(function(texture) {
        this.texture = texture;
        this.texture.generateMipmaps = false;
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.magFilter = THREE.LinearFilter;
        this.texture.needsUpdate = true;

        this.trigger("build");
      }, this));
    }
  }
})();
