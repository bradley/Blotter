BlotterSite.Materials.LiquidDistortMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.LiquidDistortMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.LiquidDistortMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.LiquidDistortMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.uniformDefinitions = [
        {
          name : "uSpeed",
          value : this.material.uniforms.uSpeed.value,
          min : 0.0,
          max : 5.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSpeed.value = value;
          }.bind(this)
        },
        {
          name : "uVolatility",
          value : this.material.uniforms.uVolatility.value,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uVolatility.value = value;
          }.bind(this)
        },
        {
          name : "uSeed",
          value : this.material.uniforms.uSeed.value,
          min : 0.0,
          max : 20.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSeed.value = value;
          }.bind(this)
        },
      ];
    }
  }
})());
