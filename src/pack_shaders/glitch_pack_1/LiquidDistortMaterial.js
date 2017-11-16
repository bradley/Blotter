BlotterSite.PackShaders.LiquidDistortMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.LiquidDistortMaterial.prototype =
  Object.create(BlotterSite.PackShaders.PackShaderBase.prototype);

_.extend(BlotterSite.PackShaders.LiquidDistortMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.LiquidDistortMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
