var blotter_ImageDataCache = function (width, height, poolSize) {
  this.init(width, height, poolSize);
};

blotter_ImageDataCache.prototype = (function() {

  function _buildCache (width, height, poolSize) {
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d");
    this.cache = [];
    for(var i = 0; i < poolSize; i++) {
      this.cache.push(context.createImageData(width, height));
    }
    delete canvas;
  }

  return {
    constructor : blotter_ImageDataCache,

    init : function (width, height, poolSize) {
      poolSize = poolSize || 10;
      this.index = 0;
      _buildCache.call(this, width, height, poolSize);
    },

    next : function () {
      this.current = this.cache[this.index];
      this.index++;
      if (this.index == this.cache.length) {
        this.index = 0;
      }
      return this.current;
    }

  }
})();