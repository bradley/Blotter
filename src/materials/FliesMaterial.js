BlotterSite.Materials.FliesMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.FliesMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.FliesMaterial.prototype, (function () {
  return {

    prepare : function () {
      this.material = new Blotter.FliesMaterial();
      this.material.uniforms.uPointCellWidth.value = 0.035;
      this.material.uniforms.uSpeed.value = 2.0;

      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
