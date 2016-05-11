(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._RendererScope = function (text, renderer) {
    this.text;
    this.renderer;
    this.ratio;
    this.material;

    this.playing = false;
    this.timeDelta = 0;
    this.lastDrawTime;
    this.frameCount = 0;

    this.domElement;
    this.context;

    this.init.apply(this, arguments);
  };

  Blotter._RendererScope.prototype = (function () {

    function _setMouseEventListeners () {
      var eventNames = ["mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave"];
      for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        (function (self, name) {
          self.domElement.addEventListener(name, function(e) {
            var position = Blotter._CanvasUtils.normalizedMousePosition(self.domElement, e);
            self.emit(name, position);
          }, false);
        })(this, eventName);
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
      var mappedBounds = this.renderer.material.boundsFor(this.text);

      if (mappedBounds) {
        // ### - x and y and all of this should be set directly in material. this should not have to scope into _mapper
        this.bounds = {
          w : mappedBounds.w,
          h : mappedBounds.h,
          x : -1 * Math.floor(mappedBounds.fit.x * this.ratio),
          y : -1 * Math.floor((this.renderer.material._mapper.height - (mappedBounds.fit.y + mappedBounds.h)) * this.ratio)
        };

        this.domElement.width = this.bounds.w * this.ratio;
        this.domElement.height = this.bounds.h * this.ratio;
        this.domElement.style.width = this.bounds.w + "px";
        this.domElement.style.height = this.bounds.h + "px";
      }
    }

    function _updateMaterial () {
      this.material.material = this.renderer.material;
      this.material.needsMaterialUpdate = true;

      _updateBounds.call(this);
    }

    return {

      constructor : Blotter._RendererScope,

      set needsMaterialUpdate (value) {
        if (value === true) {
          _updateMaterial.call(this);
        }
      },

      init : function (text, renderer) {
        this.text = text;
        this.renderer = renderer;
        this.ratio = this.renderer.ratio;

        this.material = new Blotter._MaterialScope(this.text, this.renderer.material);

        this.domElement = Blotter._CanvasUtils.hiDpiCanvas(0, 0, this.ratio);
        this.context = this.domElement.getContext("2d");

        _.extendOwn(this, EventEmitter.prototype);
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
        element.appendChild(this.domElement);
        _setEventListeners.call(this);

        return this;
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
