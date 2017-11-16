BlotterSite.PackShaders.SlidingDoorMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.SlidingDoorMaterial.prototype =
  Object.create(BlotterSite.PackShaders.PackShaderBase.prototype);

_.extend(BlotterSite.PackShaders.SlidingDoorMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.SlidingDoorMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
