(function(Blotter, _, EventEmitter) {

  Blotter.EmitterObject = function (settings) {
    this.init.call(this, arguments);
  };

  Blotter.EmitterObject.prototype = {

    constructor : Blotter.ModelEventBinding,

    init : function (settings) {
      _.defaults(this, settings);
    }
  };

  _.extend(Blotter.EmitterObject.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.EventEmitter
);
