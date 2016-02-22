import "../extras/";

Blotter.Text = function (value, properties) {
  this.init(value, properties);
}

Blotter.Text.prototype = (function () {

  function _generateId () {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  return {

    constructor : Blotter.Text,

    init : function (value, properties) {
      this.id = _generateId.call(this);
      this.value = value;
      this.properties = blotter_TextUtils.ensurePropertyValues(properties);
    }

  }
})();

