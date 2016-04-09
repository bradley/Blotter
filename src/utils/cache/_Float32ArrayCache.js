var blotter_Float32ArrayCache = function (length, poolSize) {
  this.init(length, poolSize);
};

blotter_Float32ArrayCache.prototype = (function() {

  function _buildCache (length, poolSize) {
    this.cache = [];
    for(var i = 0; i < poolSize; i++) {
      this.cache.push(new Float32Array(length));
    }
  }

  return {
    constructor : blotter_Float32ArrayCache,

    init : function (length, poolSize) {
      poolSize = poolSize || 10;
      this.index = 0;
      _buildCache.call(this, length, poolSize);
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
