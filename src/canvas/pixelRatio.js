var blotter_pixelRatio = function() {
  return this.pixelRatio || (function () {
    // Note: Could possibly do away with `legibilitySharpeningMultiplier`
    //   but it makes out canvas text much sharper... open to discussion.
    var legibilitySharpeningMultiplier = 2;
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

    return (dpr / bsr) * legibilitySharpeningMultiplier;
  })();
}