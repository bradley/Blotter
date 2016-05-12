(function(previousBlotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  var root = this;

  var RendererTextItem = function (textObject, eventCallbacks) {

    return {
      textObject : textObject,

      eventCallbacks : eventCallbacks || {},

      unsetEventCallbacks : function () {
        _.each(this.eventCallbacks, _.bind(function (callback, eventKey) {
          this.textObject.off(eventKey, callback);
        }, this));
      }
    };
  };


  var Blotter = root.Blotter = previousBlotter = function (material, options) {
// ### - remove this shit following documentation.
    // There is a negative coorelation between the sampleAccuracy value and
    // the speed at which texture generation happens.
    // However, the lower this value, the less sampleAccuracy you can expect
    // for indexing into uniforms for any given text.
    // Value must be between 0.0 and 1.0, and you are advised to keep it around 0.5.
    _.defaults(this, options, {
      ratio          : Blotter._CanvasUtils.pixelRatio,
      autostart      : true,
      autobuild      : true,
      sampleAccuracy : 0.5
    });

    if (!Detector.webgl) {
  // ### - messaging
      Blotter._Messaging.throwError("Blotter", "device does not support webgl");
    }

    this.Version = "v0.1.0";

    this._texts = {};
    this._scopes = {};

    this._renderer = new Blotter._Renderer();

    this._currentAnimationLoop = false;

    this.imageData = false;

    _.extendOwn(this, EventEmitter.prototype);
    this.init.apply(this, arguments);
  };

  Blotter.prototype = (function () {

    function _loop () {
      this._renderer.render();
      this.imageData = this._renderer.imageData;

      _.each(this._scopes, _.bind(function (scope) {
        if (scope.playing) {
          scope.update();
        }
      }, this));

      this._currentAnimationLoop = root.requestAnimationFrame(_.bind(function () {
        _loop.call(this);
      }, this));
    }

    function _setMaterial (material) {
      if (!material || !(material instanceof Blotter.Material)) {
  // ### - messaging
        Blotter._Messaging.throwError("Blotter.Renderer", "a material must be provided");
      }
      else {
        this.material = material;
        this.material.on("build", _.bind(function () {
          this._renderer.width = this.material.width;
          this._renderer.height = this.material.height;
          this._renderer.material = this.material.threeMaterial;

          _updateScopes.call(this);
          this.trigger("build");
        }, this));

        this.material.on("update", _.bind(function () {
          _update.call(this);
        }, this));
      }
    }

    function _updateScopes () {
      _.each(this._scopes, _.bind(function (scope, textId) {
        scope.needsMaterialUpdate = true;
      }, this));
    }

    function _filterTexts (texts) {
      if (texts instanceof Blotter.Text) {
        texts = [texts];
      }
      else {
        texts = _.toArray(texts);
      }

      return _.filter(texts, _.bind(function (text) {
        var isText = text instanceof Blotter.Text;

        if (!isText) {
  // ### - messaging
          Blotter._Messaging.logError("Blotter.Renderer", "object not instance of Blotter.Text");
        }

        return isText;
      }, this));
    }

    function _addTexts (texts) {
      _.each(texts, _.bind(function (text) {

  // ### - still dont really like these. wonder if we can bind directly to the text somehow and still be able to unbind. maybe texts need a reference to renderer?
        this._texts[text.id] = new RendererTextItem(text, {
          update : _.bind(function () {
            _update.call(this);
          }, this)
        });
        text.on("update", this._texts[text.id].eventCallbacks.update);

        this._scopes[text.id] = new Blotter._RenderScope(text, this);
      }, this));
    }

    function _removeTexts (texts) {
      _.each(texts, _.bind(function (text) {
        text.unsetEventCallbacks();

        delete this._texts[text.id];
        delete this._scopes[text.id];
      }, this));
    }

    function _update () {
      this.material.build(_.pluck(this._texts, "textObject"), this.ratio, this.sampleAccuracy);
    }

    return {

      constructor : Blotter,

      //set texts (v) {
  // ### - messaging
        //Blotter._Messaging.logError("Blotter", "Please use #addTexts or #removeTexts to manipulate Blotter.Text objects in your Blotter instance.");
      //},

      get texts () {
        return this._texts;
      },

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get needsUpdate () { }, // jshint

      init : function (material, options) {
        _setMaterial.call(this, material);

        this.addTexts(options.texts);

        if (this.autobuild) {
          this.needsUpdate = true;
        }

        if (this.autostart) {
          this.start();
        }
      },

      start : function () {
        if (!this._currentAnimationLoop) {
          _loop.call(this);
        }
      },

      stop : function () {
        if (this._currentAnimationLoop) {
          root.cancelAnimationFrame(this._currentAnimationLoop);
          this._currentAnimationLoop = undefined;
        }
      },

      teardown : function () {
        this.stop();
        if (this._renderer) this._renderer.teardown();
        this.renderer = null;
      },

      addText : function (text) {
        this.addTexts(text);
      },

      addTexts : function (texts) {
        var filteredTexts = _filterTexts.call(this, texts),
            currentPrivateTextIds = _.keys(this._texts),
            filteredTextIds = _.pluck(filteredTexts, "id"),
            newTextIds = _.difference(filteredTextIds, currentPrivateTextIds),
            newTexts = _.filter(filteredTexts, function(text) {
              return _.indexOf(newTextIds, text.id) > -1;
            });

        _addTexts.call(this, newTexts);
      },

      removeText : function (text) {
        this.removeTexts(text);
      },

      removeTexts : function (texts) {
        var filteredTexts = _filterTexts.call(this, texts),
            currentPrivateTextIds = _.keys(this._texts),
            filteredTextIds = _.pluck(filteredTexts, "id"),
            removedTextIds = _.difference(currentPrivateTextIds, filteredTextIds),
            removedTexts = _.filter(filteredTexts, function(text) {
              return _.indexOf(removedTextIds, text.id) > -1;
            });

        _removeTexts.call(this, removedTexts);
      },

      forText : function (text, options) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Renderer");

        if (!(this._scopes[text.id])) {
  // ### - messaging
          Blotter._Messaging.logError("Blotter.Renderer", "Blotter.Text object not found in blotter. Set needsUpdate to true.");
          return;
        }
  // ### - this is dumb. what if user calls this multiple times (autoplay config..)?
        options = _.defaults(options, {
          autoplay : true
        });

        if (options.autoplay) {
          this._scopes[text.id].playing = true;
        }

        return this._scopes[text.id];
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
