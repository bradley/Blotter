import { each, bind } from "underscore";


var ModelEventBinding = function (model, eventCallbacks) {
  this.model = model;
  this.eventCallbacks = eventCallbacks || {};
};

ModelEventBinding.prototype = {

  constructor : ModelEventBinding,

  unsetEventCallbacks : function () {
    each(this.eventCallbacks, bind(function (callback, eventKey) {
      this.model.off(eventKey, callback);
    }, this));
  }
};


export { ModelEventBinding };
