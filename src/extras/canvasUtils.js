(function(Blotter) {

  Blotter.CanvasUtils = {

    // Creates and returns a high a canvas

    canvas : function (w, h, options) {
      options = options || {};
      var canvas = document.createElement("canvas");

      canvas.className = options.class;
      canvas.innerHTML = options.html;

      canvas.width = w;
      canvas.height = h;

      return canvas;
    },

    // Creates and returns a high DPI canvas based on a device specific pixel ratio

    hiDpiCanvas : function (w, h, ratio, options) {
      ratio = ratio || this.pixelRatio;
      options = options || {};
      var canvas = document.createElement("canvas");

      canvas.className = options.class;
      canvas.innerHTML = options.html;

      this.updateCanvasSize(canvas, w, h, ratio);

      return canvas;
    },

    updateCanvasSize : function (canvas, w, h, ratio) {
      ratio = ratio || 1;

      canvas.width = w * ratio;
      canvas.height = h * ratio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    },

    // Returns the device's pixel ratio

    pixelRatio : (function () {
      var ctx = document.createElement("canvas").getContext("2d"),
          dpr = window.devicePixelRatio || 1,
          bsr = ctx.backingStorePixelRatio;

      for(var x = 0; x < Blotter.VendorPrefixes.length && !bsr; ++x) {
        bsr = ctx[Blotter.VendorPrefixes[x]+"BackingStorePixelRatio"];
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
      var rect = canvas.getBoundingClientRect(),
          position = this.mousePosition(canvas, event);

      return {
        x: position.x / rect.width,
        y: position.y / rect.height
      };
    }
  };

})(
  this.Blotter
);
