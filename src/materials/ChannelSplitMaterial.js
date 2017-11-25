BlotterSite.Materials.ChannelSplitMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.ChannelSplitMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.ChannelSplitMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.ChannelSplitMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
