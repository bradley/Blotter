BlotterSite.PackShaders = {};

BlotterSite.PackShaders.PackShaderBase = function (el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.PackShaderBase.prototype = (function () {

  return {
    constructor : BlotterSite.PackShaders.PackShaderBase,

    init : function (el, text) {
      this.el = el;
      this.text = text;

      this.prepare();
      this._setListeners();
    },

    _setListeners : function () {
      this.blotter.on("render", _.bind(this.render, this));
    },

    prepare : function () {
      this.material = new Blotter.Material();
      this.blotter = new Blotter(this.material, { texts : this.text });
      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    },

    render : function () {
      // update
    }
  }
})();