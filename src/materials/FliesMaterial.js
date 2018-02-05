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

      this.uniformDefinitions = [
        {
          name : "uPointCellWidth",
          value : 0.012,
          min : 0.0,
          max : 0.1,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uPointCellWidth.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uPointRadius",
          value : 0.85,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uPointRadius.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uDodge",
          value : !!this.material.uniforms.uDodge.value,
          onChange : function (value) {
            this.material.uniforms.uDodge.value = value ? 1.0 : 0.0;
          }.bind(this)
        },
        {
          name : "uDodgePosition (x)",
          value : this.material.uniforms.uDodgePosition.value[0],
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDodgePosition.value = [value, this.material.uniforms.uDodgePosition.value[1]];
          }.bind(this)
        },
        {
          name : "uDodgePosition (y)",
          value : this.material.uniforms.uDodgePosition.value[1],
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDodgePosition.value = [this.material.uniforms.uDodgePosition.value[0], value]
          }.bind(this)
        },
        {
          name : "uDodgeSpread",
          value : this.material.uniforms.uDodgeSpread.value,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDodgeSpread.value = value;
          }.bind(this)
        },
        {
          name : "uSpeed",
          value : this.material.uniforms.uSpeed.value,
          min : 0.0,
          max : 10.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSpeed.value = value;
          }.bind(this)
        }
      ];
    }
  }
})());
