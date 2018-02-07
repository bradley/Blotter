(function(Blotter, _, THREE, EventEmitter) {

  Blotter.Text = function (value, properties) {
    this.id = Blotter.Math.generateUUID();
    this.value = value;
    this.properties = properties;
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
      this._properties = Blotter.TextUtils.ensurePropertyValues(properties);
    }
  };

  Blotter._extendWithGettersSetters(Blotter.Text.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.EventEmitter
);
