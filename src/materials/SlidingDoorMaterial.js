BlotterSite.Materials.SlidingDoorMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.SlidingDoorMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.SlidingDoorMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.SlidingDoorMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
