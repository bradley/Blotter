import "../extras/";

Blotter.Text = function (value, properties) {
  this.init(value, properties);
}

Blotter.Text.prototype = (function () {

  return {

    constructor : Blotter.Text,

    init : function (value, properties) {
      this.id = THREE.Math.generateUUID();
      this.value = value;
      this.properties = blotter_TextUtils.ensurePropertyValues(properties);
    }

  }
})();

