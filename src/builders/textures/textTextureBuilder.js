import { bind } from "underscore";
import { TextureLoader, LinearFilter } from "three";


var TextTextureBuilder = (function() {

  return {

    build : function (mapping, completion) {
      var loader = new TextureLoader(),
          url;

      mapping.toCanvas(bind(function(canvas) {
        url = canvas.toDataURL();

        loader.load(url, bind(function(texture) {
          texture.generateMipmaps = true; // TODO: Make optional.
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.needsUpdate = true;

          completion(texture);
        }, this));
      }, this));
    }
  };
})();


export { TextTextureBuilder };
