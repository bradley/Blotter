(function(Blotter) {

  Blotter.Messaging = (function () {

    function _formattedMessage (domain, method, message) {
      return domain + (method ? ("#" + method) : "") + ": " + message;
    }

    return {

      ensureInstanceOf : function (object, constructor, constructorStr, domain, method) {
        if (!(object instanceof constructor)) {
          this.logError(domain, method, "argument must be instanceof " + constructorStr);
          return;
        }
      },

      logError : function (domain, method, message) {
        var formatted = _formattedMessage(domain, method, message);

        console.error(formatted);
      },

      logWarning : function (domain, method, message) {
        var formatted = _formattedMessage(domain, method, message);

        console.warn(formatted);
      },

      throwError : function (domain, method, message) {
        var formatted = _formattedMessage(domain, method, message);

        throw formatted;
      }
    };
  })();

})(
  this.Blotter
);
