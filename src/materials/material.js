(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Material = function () {
    this.init.apply(this, arguments);
  };

  Blotter.Material.prototype = (function() {

    function _defaultMainImageSrc () {
      var mainImage = [

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

          "mainImage = textTexture(fragCoord / uResolution);",

        "}"

      ];

      return mainImage.join("\n");
    }

    function _getUniformInterfaceForUniformDescription (uniformDescription) {
      var self = this;
      return {
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
          if (!Blotter.UniformUtils.validValueForUniformType(this._type, v)) {
            Blotter.Messaging.logError("Blotter.Material", false, "uniform value not valid for uniform type: " + this._type);
            return;
          }
          this._value = v;
          self.needsUniformValuesUpdate = true;
        }
      };
    }

    function _getUniformInterface (uniforms) {
      return _.reduce(uniforms, _.bind(function (memo, uniformDescription, uniformName) {
        memo[uniformName] = _getUniformInterfaceForUniformDescription.call(this, uniformDescription);
        return memo;
      }, this), {});
    }

    return {

      constructor : Blotter.Material,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          this.trigger("update");
        }
      },

      get needsUniformValuesUpdate () { }, // jshint

      set needsUniformValuesUpdate (value) {
        if (value === true) {
          this.trigger("updateUniformValues");
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
        this._uniforms = _getUniformInterface.call(this, Blotter.UniformUtils.extractValidUniforms(
          _.extend(uniforms, Blotter.UniformUtils.defaultUniforms)
        ));
      },

      init : function () {
        this.mainImage = _defaultMainImageSrc();
        this.uniforms = {};
      }
    };
  })();

  Blotter._extendWithGettersSetters(Blotter.Material.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
