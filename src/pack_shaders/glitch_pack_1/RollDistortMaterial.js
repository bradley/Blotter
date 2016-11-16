BlotterSite.PackShaders.RollDistortMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.RollDistortMaterial.prototype =
  Object.create(BlotterSite.PackShaders.PackShaderBase.prototype);

_.extend(BlotterSite.PackShaders.RollDistortMaterial.prototype, (function () {
  return {
    prepare : function () {
      this.material = new Blotter.RollDistortMaterial();
      this.material.uniforms.uDistortion.value = 6.0;
      this.material.uniforms.uDistortion2.value = 18.0;

      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.startTime = new Date().getTime();
    },

    render : function () {
      var time = (new Date().getTime() - this.startTime) / 1000;
      this.material.uniforms.uTime.value = time;
    }
  }
})());
