import "../core/";
import "../utils/";
import "../text/";
import "../material/";
import "_RendererScope";
import "_BackBufferRenderer";


function blotter_RendererTextItem (textObj, eventCallbacks) {
  this.textObj = textObj;
  this.eventCallbacks = eventCallbacks || {};
}

Blotter.Renderer = function (material) {
  this.init(material);
}

Blotter.Renderer.prototype = (function () {

  function _loop () {
    this._backBuffer.render();
    this.imageData = this._backBuffer.imageData;

    _.each(this._scopes, _.bind(function (scope) {
      if (scope.playing) {
        scope.update();
      }
    }, this));

    this.currentAnimationLoop = blotter_Animation.requestAnimationFrame(_.bind(function () {
      _loop.call(this);
    }, this));
  }

  function _triggerUpdateScopes () {
    _.each(this._scopes, _.bind(function (scope, textId) {
      scope.needsMaterialUpdate = true;
    }, this));
  }

  function _filterTexts (texts) {
    return _.filter(texts, _.bind(function (text) {
      var isText = text instanceof Blotter.Text;

      if (!isText) {
// ### - messaging
        blotter_Messaging.logError("Blotter.Renderer", "object not instance of Blotter.Text");
      }

      return isText;
    }, this));
  }

  function _setMaterial (material) {
    if (!material || !(material instanceof Blotter.Material)) {
// ### - messaging
      blotter_Messaging.throwError("Blotter.Renderer", "a material must be provided")
    }
    else {
      this._material = material;

      this._material.on("build", _.bind(function () {
        this._backBuffer.update(this._material.width, this._material.height, this._material.threeMaterial);
        _triggerUpdateScopes.call(this);
      }, this);

      this._material.on("update", _.bind(function () {
        _update.call(this);
      }, this));
    }
  }

  function _update () {
    var texts = _.pluck(this.texts, "textObj");
    this._material.build(texts, this.ratio, this.sampleAccuracy);
  }

  return {

    constructor : Blotter.Renderer,

    set needsUpdate (value) {
      if (value === true) {
        _update.call(this);
      }
    },

    _material : new blotter_RendererMaterial(),

    _texts : {},

    _scopes : {},

    _backBuffer : new blotter_BackBufferRenderer(),

    init : function (material, options) {
// ### - remove this shit following documentation.
      // There is a negative coorelation between the sampleAccuracy value and
      // the speed at which texture generation happens.
      // However, the lower this value, the less sampleAccuracy you can expect
      // for indexing into uniforms for any given text.
      // Value must be between 0.0 and 1.0, and you are advised to keep it around 0.5.
      _.defaults(this, options, {
        ratio          : blotter_CanvasUtils.pixelRatio,
        autostart      : true,
        autobuild      : true,
        sampleAccuracy : 0.5
      })

      if (!Detector.webgl) {
// ### - messaging
        blotter_Messaging.throwError("Blotter.Renderer", "device does not support webgl");
      }

      _setMaterial.call(material);
      this.addTexts(options.texts);

      if (this.autobuild) {
        this.needsUpdate = true;
      }

      if (this.autostart) {
        this.start();
      }
    },

    start : function () {
      if (!this.currentAnimationLoop) {
        _loop.call(this);
      }
    },

    stop : function () {
      if (this.currentAnimationLoop) {
        blotter_Animation.cancelAnimationFrame(this.currentAnimationLoop);
        this.currentAnimationLoop = undefined;
      }
    },

    teardown : function () {
      this.stop();
      this._backBuffer && this._backBuffer.teardown();
      this.renderer = null;
    },

    addTexts: function(texts) {
      var currentPrivateTextIds,
          recievedTextIds;

      if (!_.isArray(texts)) {
        texts = _.toArray(texts);
      }

      texts = _filterTexts.call(texts);
      currentPrivateTextIds = _.keys(this._texts),
      recievedTextIds = _.pluck(texts, "id");

      _.each(_.difference(recievedTextIds, currentPrivateTextIds), _.bind(function (textId) {
        var text = _.findWhere(this.texts, { id : textId });

        this._texts[textId] = new blotter_RendererTextItem(text, {
          update : _.bind(function () {
            _update.call(this);
          }, this))
        });

        text.on("update", this._texts[textId].eventCallbacks.update);

        this._scopes[textId] = new blotter_RendererScope(text, this);
      }, this));
    },

    removeTexts: function(texts) {
      var recievedTextIds;

      if (!_.isArray(texts)) {
        texts = _.toArray(texts);
      }

      _.each(_.pluck(texts, "id"), _.bind(function (textId) {
        var _text = this._texts[textId],
            scope = this._scopes[textId];

        if (_text) {
          _text.textObj.off("update", _text.eventCallbacks.update);
          delete _text;
        }

        scope && delete scope;
      }, this));
    },

    forText : function (text, options) {
      blotter_Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Renderer");

      if (!(this._texts[text.id])) {
// ### - messaging
        blotter_Messaging.logError("Blotter.Renderer", "Blotter.Text object not found in blotter");
        return;
      }

      _.defaults(options, {
        autoplay : true
      })

      if (options.autoplay) {
        this._scopes[text.id].playing = true;
      }

      return this._scopes[text.id];
    }
  }
})();
