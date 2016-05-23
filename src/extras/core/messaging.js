(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.Messaging = (function () {

    function _formattedMessage (domain, message) {
      return domain + ": " + message;
    }

    return {

  // ### - messaging. is this really necessary?
      ensureInstanceOf : function (object, constructor, constructorStr, domain) {
        if (!(object instanceof constructor)) {
          this.logError(domain, "argument must be instanceof " + constructorStr);
          return;
        }
      },

      logError : function (domain, message) {
        var formatted = _formattedMessage(domain, message);
        console.error(formatted);
      },

// ### - use this more
      logWarning : function (domain, message) {
        var formatted = _formattedMessage(domain, message);
        console.warn(formatted);
      },

      throwError : function (domain, message) {
        var formatted = _formattedMessage(domain, message);
        throw formatted;
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
