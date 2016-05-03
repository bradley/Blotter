// Create a Data Texture holding the boundaries (x/y offset and w/h) that should be available to any given texel for any given text.

var blotter_TextsBoundsTexture = function (mapper) {
  this.init(mapper);
}

blotter_TextsBoundsTexture.prototype = (function () {

  function _spriteBounds (completion) {
    var data = new Float32Array(this.texts.length * 4);

    setImmediate(_.bind(function() {
      for (var i = 0; i < this.texts.length; i++) {
        var text = this.texts[i],
            bounds = this.mapper.boundsFor(text);

        data[4*i]   = bounds.fit.x * this.ratio;                                             // x
        data[4*i+1] = (this.height * this.ratio) - ((bounds.fit.y + bounds.h) * this.ratio); // y
        data[4*i+2] = bounds.w * this.ratio;                                                 // w
        data[4*i+3] = bounds.h * this.ratio;                                                 // h
      };

      completion(data);
    }, this));
  }

  return {

    constructor : blotter_TextsBoundsTexture,

    init : function (mapper) {
      this.mapper = mapper;

      // Stub texture - resets on build.
      this.texture = new THREE.DataTexture([], 0, 0, THREE.RGBAFormat, THREE.FloatType);

      _.extendOwn(this, EventEmitter.prototype);
    },

    build : function () {
      this.texts = this.mapper.texts;
      this.width = this.mapper.width;
      this.height = this.mapper.height;
      this.ratio = this.mapper.ratio;

      _spriteBounds.call(this, _.bind(function(spriteData) {
        this.texture = new THREE.DataTexture(spriteData, this.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
        this.texture.needsUpdate = true;

        this.trigger("build");
      }, this));
    }
  }
})();
