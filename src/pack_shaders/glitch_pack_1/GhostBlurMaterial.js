BlotterSite.PackShaders.GhostBlurMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.GhostBlurMaterial.prototype =
  Object.create(BlotterSite.PackShaders.PackShaderBase.prototype);

_.extend(BlotterSite.PackShaders.GhostBlurMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.GhostBlurMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
