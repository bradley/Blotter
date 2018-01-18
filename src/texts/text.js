import { Math as ThreeMath } from "three";
import EventEmitter from "wolfy87-eventemitter";
import { extendWithGettersSetters } from "../helpers";
import { TextUtils } from "../extras/textUtils";


var Text = function (value, properties) {
  this.id = ThreeMath.generateUUID();
  this.value = value;
  this.properties = properties;
};

Text.prototype = {
  constructor : Text,

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
    this._properties = TextUtils.ensurePropertyValues(properties);
  }
};

extendWithGettersSetters(Text.prototype, EventEmitter.prototype);


export { Text };
