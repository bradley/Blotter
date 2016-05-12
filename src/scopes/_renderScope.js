(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._RenderScope = function (text, renderer) {
    this.text = text;
    this.renderer = renderer;

    this.material = new Blotter._MaterialScope(this.text, this.renderer.material);

    this.playing = false;
    this.timeDelta = 0;
    this.lastDrawTime = false;
    this.frameCount = 0;

    this.domElement = Blotter._CanvasUtils.hiDpiCanvas(0, 0, this.renderer.ratio);
    this.context = this.domElement.getContext("2d");

    _.extendOwn(this, EventEmitter.prototype);
  };

  Blotter._RenderScope.prototype = (function () {

    function _setMouseEventListeners () {
      var self = this,
          eventNames = ["mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave"];

      function setMouseListener (eventName) {
        self.domElement.addEventListener(eventName, function(e) {
          var position = Blotter._CanvasUtils.normalizedMousePosition(self.domElement, e);
          self.emit(eventName, position);
        }, false);
      }

      for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        setMouseListener(eventName);
      }
    }

    function _setEventListeners () {
      _setMouseEventListeners.call(this);
    }

    function _render () {
      if (this.domElement && this.bounds) {
        this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);

        this.context.putImageData(
          this.renderer.imageData,
          this.bounds.x,
          this.bounds.y
        );

        this.trigger("update", [this.frameCount]);
      }
    }

    function _updateBounds () {
      var bounds = this.renderer.material.boundsFor(this.text);

      if (bounds) {
        // ### - x and y and all of this should be set directly in material. this should not have to scope into _mapper
        this.bounds = {
          w : bounds.w,
          h : bounds.h,
          x : -1 * Math.floor(bounds.x),
          y : -1 * Math.floor(this.renderer.material.height - (bounds.y + bounds.h))
        };

        Blotter._CanvasUtils.updateCanvasSize(
          this.domElement,
          this.bounds.w / this.renderer.ratio,
          this.bounds.h / this.renderer.ratio,
          this.renderer.ratio
        );
      }
    }

    function _updateMaterial () {
      this.material.material = this.renderer.material;
      this.material.needsMaterialUpdate = true;

      _updateBounds.call(this);
    }

    return {

      constructor : Blotter._RenderScope,

      set needsMaterialUpdate (value) {
        if (value === true) {
          _updateMaterial.call(this);
        }
      },

      get needsMaterialUpdate () { }, // jshint

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
        element.appendChild(this.domElement);
        _setEventListeners.call(this);

        return this;
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
