import "pixelRatio";


var blotter_hiDpiCanvas = function(w, h, pixelRatio) {
  pixelRatio = pixelRatio || blotter_pixelRatio();
  var can = document.createElement("canvas");
  can.width = w * pixelRatio;
  can.height = h * pixelRatio;
  can.style.width = w + "px";
  can.style.height = h + "px";
  can.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  return can;
}