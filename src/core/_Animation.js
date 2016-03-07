import "_VendorPrefixes";

var blotter_Animation = (function () {

  var lastTime = 0,
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      vendors = blotter_VendorPrefixes;

  for(var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
    requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                        || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!requestAnimationFrame) {
    requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!cancelAnimationFrame) {
    cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  return {

    // Polyfill requestAnimationFrame without modifying window.requestAnimationFrame

    requestAnimationFrame : function (callback) {
      return requestAnimationFrame.call(window, callback);
    },

    // Polyfill cancelAnimationFrame without modifying window.cancelAnimationFrame

    cancelAnimationFrame : function (id) {
      cancelAnimationFrame.call(window, id);
    }
  }

})();
