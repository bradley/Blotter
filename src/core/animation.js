import "vendor";


var blotter_requestAnimationFrame,
    blotter_cancelAnimationFrame;

for(var x = 0; x < blotter_vendors.length && !window.requestAnimationFrame; ++x) {
  blotter_requestAnimationFrame = window[blotter_vendors[x]+"RequestAnimationFrame"];
  blotter_cancelAnimationFrame = window[blotter_vendors[x]+"CancelAnimationFrame"]
                             || window[blotter_vendors[x]+"CancelRequestAnimationFrame"];
}

if (!blotter_requestAnimationFrame) {
  var lastTime = 0;
  blotter_requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
      timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!blotter_cancelAnimationFrame) {
  blotter_cancelAnimationFrame = function(id) {
     clearTimeout(id);
  };
}