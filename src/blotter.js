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
    if (!Detector.webgl) {
    // ### - messaging
      Blotter._Messaging.throwError("Blotter", "device does not support webgl");
    }

    this.Version = "v0.1.0";

    this._texts = {};

    this._scopes = {};

    this._renderer = new Blotter._Renderer();

    this.init.apply(this, arguments);
  };

  Blotter.prototype = (function () {

    function _rendererUpdated () {
      this.imageData = this._renderer.imageData;

      _.each(this._scopes, _.bind(function (scope) {
        if (scope.playing) {
          scope.update();
        }
      }, this));
    }

    function _materialBuilt () {
      this._renderer.width = this.material.width;
      this._renderer.height = this.material.height;
      this._renderer.material = this.material.shaderMaterial;

      _updateScopes.call(this);
      this.trigger("build");
    },

    function _setMaterial (material) {
      if (!material || !(material instanceof Blotter.Material)) {
  // ### - messaging
        Blotter._Messaging.throwError("Blotter.Renderer", "a material must be provided");
      }
      else {
        this.material = material;
        this.material.on("build", _.bind(this._materialBuilt, this));
// ### - see if we can inline this like above. think that works anyway.
        this.material.on("update", _.bind(function () {
          _update.call(this);
        }, this));
      }
    }

    function _updateScopes () {
      _.each(this._scopes, _.bind(function (scope, textId) {
        scope.needsUpdate = true;
      }, this));
    }

    function _update () {
      Blotter._MappingBuilder.build(this._texts, _.bind(function (mapping) {
        this._mapping = mapping;
        this._mapping.ratio = this.ratio;

        Blotter._MappingMaterialBuilder.build(this._mapping, this.material, _.bind(function (mappingMaterial) {
          this._mappingMaterial = mappingMaterial;
          this._renderer.width = this._mapping.width;
          this._renderer.height = this._mapping.height;
          this._renderer.material = this._mappingMaterial.threeMaterial;

          _updateScopes.call(this);
          this.trigger("build");
        }, this));
      }, this));
    }

    return {

      constructor : Blotter,

      //set texts (v) {
  // ### - messaging
        //Blotter._Messaging.logError("Blotter", "Please use #addTexts or #removeTexts to manipulate Blotter.Text objects in your Blotter instance.");
      //},

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get texts () {
        return this._texts;
      },

      get imageData () {
        return this._renderer.imageData;
      },

      init : function (material, options) {
        _.defaults(this, options, {
          ratio  : Blotter._CanvasUtils.pixelRatio,
          autobuild : true,
          autostart : true,
          autoplay : true
        });

        _setMaterial.call(this, material);

        this.addTexts(options.texts);

        this._renderer.on("update", _.bind(_rendererUpdated, this));

        if (this.autobuild) {
          this.needsUpdate = true;
        }

        if (this.autostart) {
          this.start();
        }
      },

      start : function () {

        this._renderer.start();
      },

      stop : function () {

        this._renderer.stop();
      },

      teardown : function () {

        this._renderer.teardown();
      },

      addText : function (text) {

        this.addTexts(text);
      },

      addTexts : function (texts) {
        var filteredTexts = Blotter._TextUtils.filterTexts(texts),
            currentPrivateTextIds = _.keys(this._texts),
            filteredTextIds = _.pluck(filteredTexts, "id"),
            newTextIds = _.difference(filteredTextIds, currentPrivateTextIds),
            newTexts = _.filter(filteredTexts, function(text) {
              return _.indexOf(newTextIds, text.id) > -1;
            });

        _.each(newTexts, _.bind(function (text) {

          // ### - still dont really like these. wonder if we can bind directly to the text somehow and still be able to unbind. maybe texts need a reference to renderer?
          this._texts[text.id] = new RendererTextItem(text, {
            update : _.bind(function () {
              _update.call(this);
            }, this)
          });
          text.on("update", this._texts[text.id].eventCallbacks.update);

          this._scopes[text.id] = new Blotter._RenderScope(text, this);
        }, this));
      },

      removeText : function (text) {

        this.removeTexts(text);
      },

      removeTexts : function (texts) {
        var filteredTexts = Blotter._TextUtils.filterTexts(texts),
            currentPrivateTextIds = _.keys(this._texts),
            filteredTextIds = _.pluck(filteredTexts, "id"),
            removedTextIds = _.difference(currentPrivateTextIds, filteredTextIds),
            removedTexts = _.filter(filteredTexts, function(text) {
              return _.indexOf(removedTextIds, text.id) > -1;
            });

        _.each(removedTexts, _.bind(function (text) {
          text.unsetEventCallbacks();

          delete this._texts[text.id];
          delete this._scopes[text.id];
        }, this));
      },

      forText : function (text) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Renderer");

        if (!(this._scopes[text.id])) {
  // ### - messaging
          Blotter._Messaging.logError("Blotter.Renderer", "Blotter.Text object not found in blotter. Set needsUpdate to true.");
          return;
        }

        return this._scopes[text.id];
      },

      boundsForText : function (text) {
        Blotter._Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");
        return this._mapping.boundsForText(text);
      }
    };
  })();

  EventEmitter.prototype.apply(Blotter.prototype);

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
