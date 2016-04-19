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
        this.bounds.x,
        this.bounds.y
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

      var mappedBounds = this.renderer.material.textsTexture.boundsFor(text);
// ### - SR. move this
      this.bounds = {
        w : mappedBounds.w,
        h : mappedBounds.h,
        x : -1 * Math.floor(mappedBounds.fit.x * this.pixelRatio),
        y : -1 * Math.floor((this.renderer.material.textsTexture.mapper.height - (mappedBounds.fit.y + mappedBounds.h)) * this.pixelRatio)
      };

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

      this.domElement = blotter_CanvasUtils.hiDpiCanvas(this.bounds.w, this.bounds.h);
      this.context = this.domElement.getContext("2d");

      element.appendChild(this.domElement);
      _setEventListeners.call(this);
    }
  }
})();
