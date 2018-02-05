BlotterSite.Materials.RollingDistortMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.Materials.RollingDistortMaterial.prototype =
  Object.create(BlotterSite.Materials.Material.prototype);

_.extend(BlotterSite.Materials.RollingDistortMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.RollingDistortMaterial();
      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.uniformDefinitions = [
        {
          name : "uSineDistortSpread",
          value : 0.025,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSineDistortSpread.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uSineDistortCycleCount",
          value : this.material.uniforms.uSineDistortCycleCount.value,
          min : 0.0,
          max : 7.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSineDistortCycleCount.value = value;
          }.bind(this)
        },
        {
          name : "uSineDistortAmplitude",
          value : 0.125,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uSineDistortAmplitude.value = value;
          }.bind(this),
          setImmediate : true
        },
        {
          name : "uNoiseDistortVolatility",
          value : this.material.uniforms.uNoiseDistortVolatility.value,
          min : 0.0,
          max : 250.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uNoiseDistortVolatility.value = value;
          }.bind(this)
        },
        {
          name : "uNoiseDistortAmplitude",
          value : this.material.uniforms.uNoiseDistortAmplitude.value,
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uNoiseDistortAmplitude.value = value;
          }.bind(this)
        },
        {
          name : "uDistortPosition (x)",
          value : this.material.uniforms.uDistortPosition.value[0],
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDistortPosition.value = [value, this.material.uniforms.uDistortPosition.value[1]];
          }.bind(this)
        },
        {
          name : "uDistortPosition (y)",
          value : this.material.uniforms.uDistortPosition.value[1],
          min : 0.0,
          max : 1.0,
          step : 0.001,
          onChange : function (value) {
            this.material.uniforms.uDistortPosition.value = [this.material.uniforms.uDistortPosition.value[0], value]
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
