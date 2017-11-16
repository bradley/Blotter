BlotterSite.PackShaders.RollingDistortMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.RollingDistortMaterial.prototype =
  Object.create(BlotterSite.PackShaders.PackShaderBase.prototype);

_.extend(BlotterSite.PackShaders.RollingDistortMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.RollingDistortMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
