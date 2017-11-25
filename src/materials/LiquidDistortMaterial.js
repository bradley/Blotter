BlotterSite.Materials.LiquidDistortMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.LiquidDistortMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.LiquidDistortMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.LiquidDistortMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
