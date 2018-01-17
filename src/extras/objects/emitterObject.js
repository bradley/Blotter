import { defaults, extend } from "underscore";
import EventEmitter from "wolfy87-eventemitter";
import { ModelEventBinding } from "./modelEventBinding";


var EmitterObject = function (settings) {
  this.init.call(this, arguments);
};

EmitterObject.prototype = {

  constructor : ModelEventBinding,

  init : function (settings) {
    defaults(this, settings);
  }
};

extend(EmitterObject.prototype, EventEmitter.prototype);


export { EmitterObject };
