var blotter_Messaging = (function () {

	function _formattedMessage(domain, message) {
		return domain + ": " + message;
	}

	return {

		logError : function(domain, message) {
			var formatted = _formattedMessage(domain, message);
			console.error(formatted);
		},

		throwError : function(domain, message) {
			var formatted = _formattedMessage(domain, message);
			throw formatted;
		}

	}

})();
