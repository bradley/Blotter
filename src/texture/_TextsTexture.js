import "../core/";
import "../utils/";
import "../text/";


var blotter_TextsTexture = function(texts) {
  this.init(texts);
}

blotter_TextsTexture.prototype = (function() {

  return {

    constructor : blotter_TextsTexture,

    init : function (texts, ratio) {
      this.texts = texts;
      this.ratio = ratio;

      // Stub texture - resets on build.
      this.texture = new THREE.Texture();

      _.extendOwn(this, EventEmitter.prototype);
    },

    build : function () {
      var loader = new THREE.TextureLoader();

      if (!_.isArray(this.texts)) {
        this.texts = _.toArray(this.texts);
      }

      this.mapper = new blotter_TextsMapper(texts, { ratio : this.ratio, flipY : true });
      this.width = this.mapper.width * this.ratio;
      this.height = this.mapper.height * this.ratio;

      loader.load(this.mapper.getImage(), _.bind(function(texture) {
        this.texture = texture;
        this.texture.generateMipmaps = false;
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.magFilter = THREE.LinearFilter;
        this.texture.needsUpdate = true;

        this.trigger("build");
      }, this));
    },

    boundsFor : function (text) {
      return this.mapper.boundsFor(text);
    }
  }
})();
