BlotterSite.Materials.RollingDistortMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.RollingDistortMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.RollingDistortMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.RollingDistortMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
