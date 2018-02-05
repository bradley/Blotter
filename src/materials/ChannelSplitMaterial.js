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

      this.uniformDefinitions = [
        {
          name : "uOffset",
          value : this.material.uniforms.uOffset.value,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uOffset.value = value;
          }.bind(this)
        },
        {
          name : "uRotation",
          value : this.material.uniforms.uRotation.value,
          min : 0.0,
          max : 360.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uRotation.value = value;
          }.bind(this)
        },
        {
          name : "uApplyBlur",
          value : !!this.material.uniforms.uApplyBlur.value,
          onChange : function (value) {
            this.material.uniforms.uApplyBlur.value = value ? 1.0 : 0.0;
          }.bind(this)
        },
        {
          name : "uAnimateNoise",
          value : !!this.material.uniforms.uAnimateNoise.value,
          onChange : function (value) {
            this.material.uniforms.uAnimateNoise.value = value ? 1.0 : 0.0;
          }.bind(this)
        }
      ];
    }
  }
})());
