BlotterSite.Materials = {};

BlotterSite.Materials.Material = function (el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.Material.prototype = (function () {

  return {
    constructor : BlotterSite.Materials.Material,

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

      this.uniformDefinitions = [];
    },

    render : function () {
      // override
    }
  }
})();
