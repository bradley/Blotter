(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Text = function (value, properties) {
    this.id = THREE.Math.generateUUID();
    this.value = value;
    this.properties = properties;

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter.Text.prototype = {
    constructor : Blotter.Text,

    get needsUpdate () { }, // jshint

    set needsUpdate (value) {
      if (value === true) {
        this.trigger("update");
      }
    },

    get properties () {
      return this._properties;
    },

    set properties (properties) {
      this._properties = Blotter._TextUtils.ensurePropertyValues(properties);
    }
  };

  //EventEmitter.prototype.apply(Blotter.Text.prototype);
  //_.extend(Blotter.Text.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
