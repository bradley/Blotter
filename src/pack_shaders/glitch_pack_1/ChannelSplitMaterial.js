BlotterSite.PackShaders.ChannelSplitMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.ChannelSplitMaterial.prototype =
  Object.create(BlotterSite.PackShaders.PackShaderBase.prototype);

_.extend(BlotterSite.PackShaders.ChannelSplitMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.ChannelSplitMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
