import "../core/"

var blotter_CanvasUtils = {

  // Creates and returns a high a canvas

  canvas : function (w, h) {
    var canvas = document.createElement("canvas");

    canvas.width = w;
    canvas.height = h;

    return canvas;
  },

	// Creates and returns a high DPI canvas based on a device specific pixel ratio

	hiDpiCanvas : function (w, h, pixelRatio) {
	  pixelRatio = pixelRatio || this.pixelRatio;
	  var canvas = document.createElement("canvas");

	  canvas.width = w * pixelRatio;
	  canvas.height = h * pixelRatio;
	  canvas.style.width = w + "px";
	  canvas.style.height = h + "px";
	  canvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

	  return canvas;
	},

	// Returns the device's pixel ratio

	pixelRatio : (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.backingStorePixelRatio;

    for(var x = 0; x < blotter_VendorPrefixes.length && !bsr; ++x) {
      bsr = ctx[blotter_VendorPrefixes[x]+"BackingStorePixelRatio"];
    }

    bsr = bsr || 1;

    return (dpr / bsr);
  })(),

  // Returns the mouse position within a canvas

  mousePosition : function (canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  },

  // Returns the mouse position within a canvas, normalized to a value between 0 and 1

  normalizedMousePosition : function (canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var position = this.mousePosition(canvas, event);

    return {
      x: position.x / rect.width,
      y: position.y / rect.height
    }
  }
}
