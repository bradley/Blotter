(function(Blotter, _) {

  Blotter.ShaderMaterial = function(mainImage, options) {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.ShaderMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.ShaderMaterial.prototype, (function () {

    return {

      constructor : Blotter.ShaderMaterial,

      init : function (mainImage, options) {
        _.defaults(this, options);

        this.mainImage = mainImage;
      }
    };

  })());

})(
  this.Blotter, this._
);
