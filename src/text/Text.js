import "../utils/";

Blotter.Text = function (value, properties) {
  this.id = THREE.Math.generateUUID();
  this.value;
  this.properties;

  this.init.apply(this, arguments);
}

Blotter.Text.prototype = (function () {
  function _setupEventEmission () {
    _.extendOwn(this, EventEmitter.prototype);
  }

  function _update () {
    this.trigger("update");
  }

  return {

    constructor : Blotter.Text,

    set needsUpdate (value) {
      if (value === true) {
        _update.call(this);
      }
    },

    init : function (value, properties) {
      this.value = value;
      this.properties = blotter_TextUtils.ensurePropertyValues(properties);

      _setupEventEmission.call(this);
    }
  }
})();

