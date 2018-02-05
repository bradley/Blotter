BlotterSite.Materials.SlidingDoorMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.SlidingDoorMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.SlidingDoorMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.SlidingDoorMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.uniformDefinitions = [
        {
          name : "uDivisions",
          value : this.material.uniforms.uDivisions.value,
          min : 0.0,
          max : 30.0,
          step : 1.0,
          onChange : function (value) {
            this.material.uniforms.uDivisions.value = value;
          }.bind(this)
        },
        {
          name : "uDivisionWidth",
          value : this.material.uniforms.uDivisionWidth.value,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDivisionWidth.value = value;
          }.bind(this)
        },
        {
          name : "uAnimateHorizontal",
          value : !!this.material.uniforms.uAnimateHorizontal.value,
          onChange : function (value) {
            this.material.uniforms.uAnimateHorizontal.value = value ? 1.0 : 0.0;
          }.bind(this)
        },
        {
          name : "uFlipAnimationDirection",
          value : !!this.material.uniforms.uFlipAnimationDirection.value,
          onChange : function (value) {
            this.material.uniforms.uFlipAnimationDirection.value = value ? 1.0 : 0.0;
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
