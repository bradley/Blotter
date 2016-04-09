import "../core/";
import "../utils/";
import "../text/";
import "../material/";


var blotter_RendererScope = function (text, renderer, options) {
  this.init(text, renderer, options);
}

blotter_RendererScope.prototype = (function () {

  function _setupEventEmission () {
    var emitter = EventEmitter.prototype;

    for (var prop in emitter) {
      if (emitter.hasOwnProperty(prop)) {
        this[prop] = emitter[prop];
      }
    }
  }

  function _setMouseEventListeners () {
    var self = this,
        eventNames = ["mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave"];
    for (var i = 0; i < eventNames.length; i++) {
      var eventName = eventNames[i];
      (function (self, name) {
        self.domElement.addEventListener(name, function(e) {
          var position = blotter_CanvasUtils.normalizedMousePosition(self.domElement, e);
          self.emit(name, position)
        }, false);
      })(self, eventName);
    }
  }

  function _setEventListeners () {
    _setMouseEventListeners.call(this);
  }

  function _render () {

    if (this.domElement) {
      this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);

      this.context.putImageData(
        this.renderer.imageData,
        this.fit.x,
        this.fit.y
      );

      this.emit("update", this.frameCount);
    }
  }

  return {

    constructor : blotter_RendererScope,

    init : function (text, renderer, options) {
      options = options || {};
      if (typeof options.autostart === "undefined") {
        options.autostart = true;
      }

      this.text = text;
      this.renderer = renderer;

      this.pixelRatio = options.pixelRatio || blotter_CanvasUtils.pixelRatio;

      var mappedSize = this.renderer.material.mapper.sizeForText(text);
      this.fit = {
        w : mappedSize.w,
        h : mappedSize.h,
        x : -1 * ~~(mappedSize.fit.x * this.pixelRatio),
        y : -1 * ~~((this.renderer.material.mapper.height - (mappedSize.fit.y + mappedSize.h)) * this.pixelRatio)
      }

      this.playing = options.autostart;
      this.timeDelta = 0;
      this.lastDrawTime;
      this.frameCount = 0;

      this.domElement;
      this.context;

      _setupEventEmission.call(this);
    },

    play : function () {
      this.playing = true;
    },

    pause : function () {
      this.playing = false;
    },

    update : function () {
      var now = Date.now();
      this.frameCount += 1;
      this.timeDelta = (now - (this.lastDrawTime || now)) / 1000;
      this.lastDrawTime = now;
      _render.call(this);
    },

    appendTo : function (element) {
      if (this.domElement) {
        this.domElement.remove();
        this.context = null;
      }

      this.domElement = blotter_CanvasUtils.hiDpiCanvas(this.fit.w, this.fit.h);
      this.context = this.domElement.getContext("2d");

      element.appendChild(this.domElement);
      _setEventListeners.call(this);
    }
  }
})();
