import "../core/"

var blotter_CanvasUtils = {

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
    // Note: Could possibly do away with `legibilitySharpeningMultiplier`
    //   but it makes our canvas text much sharper... open to discussion.
    var legibilitySharpeningMultiplier = 2;
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.backingStorePixelRatio;

    for(var x = 0; x < blotter_VendorPrefixes.length && !bsr; ++x) {
      bsr = ctx[blotter_VendorPrefixes[x]+"BackingStorePixelRatio"];
    }

    bsr = bsr || 1;

    return (dpr / bsr) * legibilitySharpeningMultiplier;
  })()

}
