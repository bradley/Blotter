(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.ShaderMaterial = function(mainImage, options) {
    Blotter.Material.apply(this, arguments);

    _.defaults(this, options, {
      uniforms : {}
    });

    this.mainImage = mainImage;
  };

  Blotter.ShaderMaterial.prototype = Object.create(Blotter.Material.prototype);
  Blotter.ShaderMaterial.prototype.constructor = Blotter.ShaderMaterial;

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
