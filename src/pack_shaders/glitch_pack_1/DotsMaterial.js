BlotterSite.PackShaders.DotsMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.PackShaders.DotsMaterial.prototype =
  Object.create(BlotterSite.PackShaders.PackShaderBase.prototype);

_.extend(BlotterSite.PackShaders.DotsMaterial.prototype, (function () {
  return {

    prepare : function () {
      this.material = new Blotter.DotsMaterial();
      //this.material.uniforms.uLenseWeight.value = 0.65;

      this.blotter = new Blotter(this.material, { texts : this.text });

      this.textScope = this.blotter.forText(this.text);
      this.textScope.appendTo(this.el);

      this.setListeners();
    },

    setListeners : function () {
      this.el.on("mousemove", _.bind(this.handleMouseover, this));
    },

    handleMouseover : function (e) {
      var parentOffset = this.el.offset(),
          x = e.pageX - parentOffset.left,
          y = e.pageY - parentOffset.top,
          normalizedX = x / this.el.width(),
          normalizedY = y / this.el.height();

      //this.material.uniforms.uCenterPoint.value = [normalizedX, normalizedY];
    }
  }
})());
