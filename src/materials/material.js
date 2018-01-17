import { extend, reduce, bind } from "underscore";
import EventEmitter from "wolfy87-eventemitter";
import { Messaging } from "../extras/core/messaging";
import { UniformUtils } from "../extras/uniformUtils";
import { extendWithGettersSetters } from "../helpers";


var Material = function () {
  this.init.apply(this, arguments);
};

Material.prototype = (function() {

  function _defaultMainImageSrc () {
    var mainImage = [

      "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

        "mainImage = textTexture(fragCoord / uResolution);",

      "}"

    ];

    return mainImage.join("\n");
  }

  function _getUniformInterfaceForUniformDescription (uniformDescription) {
    var uniformInterface = {
      _type : uniformDescription.type,
      _value : uniformDescription.value,

      get type () {
        return this._type;
      },

      set type (v) {
        this._type = v;
      },

      get value () {
        return this._value;
      },

      set value (v) {
        if (!UniformUtils.validValueForUniformType(this._type, v)) {
          Messaging.logError("Blotter.Material", false, "uniform value not valid for uniform type: " + this._type);
          return;
        }
        this._value = v;

        this.trigger("update");
      }
    };

    extend(uniformInterface, EventEmitter.prototype);

    return uniformInterface;
  }

  function _getUniformInterface (uniforms) {
    return reduce(uniforms, bind(function (memo, uniformDescription, uniformName) {
      memo[uniformName] = _getUniformInterfaceForUniformDescription(uniformDescription);
      memo[uniformName].on("update", bind(function () {
        this.trigger("update:uniform", [uniformName]);
      }, this));

      return memo;
    }, this), {});
  }

  return {

    constructor : Material,

    get needsUpdate () { }, // jshint

    set needsUpdate (value) {
      if (value === true) {
        this.trigger("update");
      }
    },

    get mainImage () {
      return this._mainImage;
    },

    set mainImage (mainImage) {
      this._mainImage = mainImage || _defaultMainImageSrc();
    },

    get uniforms () {
      return this._uniforms;
    },

    set uniforms (uniforms) {
      this._uniforms = _getUniformInterface.call(this, UniformUtils.extractValidUniforms(
        extend(uniforms, UniformUtils.defaultUniforms)
      ));
    },

    init : function () {
      this.mainImage = _defaultMainImageSrc();
      this.uniforms = {};
    }
  };
})();

extendWithGettersSetters(Material.prototype, EventEmitter.prototype);


export { Material };
