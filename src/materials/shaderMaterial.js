import { defaults } from "underscore";
import { Material } from "./material";
import { extendWithGettersSetters } from "../helpers";


var ShaderMaterial = function(mainImage, options) {
  Material.apply(this, arguments);
};

ShaderMaterial.prototype = Object.create(Material.prototype);

extendWithGettersSetters(ShaderMaterial.prototype, (function () {

  return {

    constructor : ShaderMaterial,

    init : function (mainImage, options) {
      defaults(this, options);

      this.mainImage = mainImage;
    }
  };

})());


export { ShaderMaterial };
