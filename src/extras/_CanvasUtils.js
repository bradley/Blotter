import "../core/"

var blotter_CanvasUtils = {

  // Creates and returns a high a canvas

  canvas : function (w, h) {
    var canvas = document.createElement("canvas");

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

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
    // Note: `sharpness` is used to increase the legibility of our rendered content.
    //   However I suspect it probably slows things down a bit - I haven't really
    //   checked. I'm open to thoughts.
    var sharpness = 1;//2;
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.backingStorePixelRatio;

    for(var x = 0; x < blotter_VendorPrefixes.length && !bsr; ++x) {
      bsr = ctx[blotter_VendorPrefixes[x]+"BackingStorePixelRatio"];
    }

    bsr = bsr || 1;

    return (dpr / bsr) * sharpness;
  })(),

  mousePosition : function (canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: rect.height - (event.clientY - rect.top)
    };
  },

  normalizedMousePosition : function (canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var position = this.mousePosition(canvas, event);

    return {
      x: position.x / rect.width,
      y: position.y / rect.height
    }
  }
}
