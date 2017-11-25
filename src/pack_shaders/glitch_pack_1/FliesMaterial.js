BlotterSite.PackShaders.FliesMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.FliesMaterial.prototype =
  Object.create(BlotterSite.PackShaders.PackShaderBase.prototype);

_.extend(BlotterSite.PackShaders.FliesMaterial.prototype, (function () {
  return {

    prepare : function () {
      this.material = new Blotter.FliesMaterial();
      this.material.uniforms.uPointCellWidth.value = 0.035;
      this.material.uniforms.uSpeed.value = 2.0;

      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);
    }
  }
})());
