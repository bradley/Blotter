  (function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._ModelEventBinding = function (model, eventCallbacks) {
    this.model = model;
    this.eventCallbacks = eventCallbacks || {};
  }

  Blotter._ModelEventBinding.prototype = {
    
    constructor : Blotter._ModelEventBinding,

    unsetEventCallbacks : function () {
      _.each(this.eventCallbacks, _.bind(function (callback, eventKey) {
        this.model.off(eventKey, callback);
      }, this));
    }
  };

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
