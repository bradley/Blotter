BlotterSite.PackShaders.RGBSplitMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.RGBSplitMaterial.prototype =
  Object.create(BlotterSite.PackShaders.PackShaderBase.prototype);

_.extend(BlotterSite.PackShaders.RGBSplitMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.RGBSplitMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
