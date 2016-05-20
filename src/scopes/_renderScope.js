(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter._RenderScope = function (text, blotter) {
    this.text = text;
    this.blotter = blotter;

    this.material = {
      mainImage : this.blotter.material.mainImage
    };

    this._mappingMaterial = blotter.mappingMaterial;

    this.playing = this.blotter.autoplay;
    this.timeDelta = 0;
    this.lastDrawTime = false;
    this.frameCount = 0;

    this.domElement = Blotter._CanvasUtils.hiDpiCanvas(0, 0, this.blotter.ratio);
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

    function _getBoundsForMappingMaterialAndText (mappingMaterial, text) {
      var bounds = mappingMaterial.boundsForText(text);

      if (bounds) {
        return {
          w : bounds.w,
          h : bounds.h,
          x : -1 * Math.floor(bounds.x),
          // ### --- !
          y : -1 * Math.floor(mappingMaterial.height - (bounds.y + bounds.h))
        };
      }
    }

    function _update () {
      var mappingMaterial = this._mappingMaterial,
          bounds = mappingMaterial && _getBoundsForMappingMaterialAndText(mappingMaterial, this.text);

      if (mappingMaterial && bounds) {
        Blotter._CanvasUtils.updateCanvasSize(
          this.domElement,
          bounds.w / this.blotter.ratio,
          bounds.h / this.blotter.ratio,
          this.blotter.ratio
        );

        // TODO: Update uniform values using old mappingMaterial uniform values if it exists.
        this.material.uniforms = mappingMaterial.uniformsInterfaceForText(this.text);
        this.material.mainImage = mappingMaterial.mainImage;

        this.trigger(this.bounds ? "update" : "ready");
        this.bounds = bounds;
      }
    }

    return {

      constructor : Blotter._RenderScope,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get mappingMaterial () { },

      set mappingMaterial (mappingMaterial) {
        this._mappingMaterial = mappingMaterial;
      },

      play : function () {
        this.playing = true;
      },

      pause : function () {
        this.playing = false;
      },

      render : function () {
        if (this.bounds) {
          var now = Date.now();

          this.frameCount += 1;
          this.timeDelta = (now - (this.lastDrawTime || now)) / 1000;
          this.lastDrawTime = now;

          this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);

          this.context.putImageData(
            this.blotter.imageData,
            this.bounds.x,
            this.bounds.y
          );

          this.trigger("render", [this.frameCount]);
        }
      },

      appendTo : function (element) {
        element.appendChild(this.domElement);

        _setMouseEventListeners.call(this);

        return this;
      }
    };
  })();

  //EventEmitter.prototype.apply(Blotter._RenderScope.prototype);
  //_.extend(Blotter._RenderScope.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
