BlotterSite.HeroExamples = {};

BlotterSite.HeroExamples.Material = function (el) {
  this.init.apply(this, arguments);
}

BlotterSite.HeroExamples.Material.prototype = (function () {

  return {
    constructor : BlotterSite.HeroExamples.Material,

    init : function (el) {
      this.el = el;

      this.prepare();
    },

    prepare : function () {
      this.material = new Blotter.Material();
      this.blotter = new Blotter(this.material);
    },

    render : function () {
      // override
    }
  }
})();
