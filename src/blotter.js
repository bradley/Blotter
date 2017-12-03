(function(previousBlotter, _, THREE, Detector, EventEmitter) {

  var root = this;

  var Blotter = root.Blotter = previousBlotter = function (material, options) {
    if (!Detector.webgl) {
      Blotter.Messaging.throwError("Blotter", false, "device does not support webgl");
    }

    this._texts = [];
    this._textEventBindings = {};

    this._scopes = {};
    this._scopeEventBindings = {};

    this._renderer = new Blotter.Renderer();

    this._startTime = 0;
    this._lastDrawTime = 0;

    this.init.apply(this, arguments);
  };

  Blotter.prototype = (function () {

    function _updateMaterialUniforms () {
      var now = Date.now();

      this._material.uniforms.uTimeDelta.value = (now - (this._lastDrawTime || now)) / 1000;
      this._material.uniforms.uGlobalTime.value = (now - this._startTime) / 1000;

      this._lastDrawTime = now;
    }

    function _rendererRendered () {
      _updateMaterialUniforms.call(this);

      _.each(this._scopes, _.bind(function (scope) {
        if (scope.playing) {
          scope.render();
        }
        this.trigger("render");
      }, this));
    }

    function _updateUniformValue (uniformName) {
      if (this.mappingMaterial) {
        var value = this._material.uniforms[uniformName].value;

        this.mappingMaterial.uniformInterface[uniformName].value = value;
      }
    }

    function _updateTextUniformValue (textId, uniformName) {
      if (this.mappingMaterial) {
        var scope = this._scopes[textId],
            value = scope.material.uniforms[uniformName].value;

        this.mappingMaterial.textUniformInterface[textId][uniformName].value = value;
      }
    }

    function _update () {
      var buildMapping,
          buildMappingMaterial,
          mappingMaterial,
          buildStages;

      buildMapping = _.bind(function () {
        return _.bind(function (next) {
          Blotter.MappingBuilder.build(this._texts, _.bind(function (newMapping) {
            this._mapping = newMapping;
            this._mapping.ratio = this.ratio;

            next();
          }, this));
        }, this);
      }, this);

      buildMappingMaterial = _.bind(function () {
        return _.bind(function (next) {
          Blotter.MappingMaterialBuilder.build(this._mapping, this._material, _.bind(function (newMappingMaterial) {
            this.mappingMaterial = newMappingMaterial;

            next();
          }, this));
        }, this);
      }, this);

      buildStages = [
        buildMapping(),
        buildMappingMaterial()
      ];

      _(buildStages).reduceRight(_.wrap, _.bind(function () {
        this._renderer.stop();

        _.each(this._scopes, _.bind(function (scope, textId) {
          scope.mappingMaterial = this.mappingMaterial;
          scope.needsUpdate = true;
        }, this));

        this._renderer.material = this.mappingMaterial.shaderMaterial;
        this._renderer.width = this._mapping.width;
        this._renderer.height = this._mapping.height;

        if (this.autostart) {
          this.start();
        }

        this.trigger(this.lastUpdated ? "update" : "ready");
        this.lastUpdated = Date.now();
      }, this))();
    }

    return {

      constructor : Blotter,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get material () {
        return this._material;
      },

      set material (material) {
        this.setMaterial(material);
      },

      get texts () {
        return this._texts;
      },

      set texts (texts) {
        this.removeTexts(this._texts);
        this.addTexts(texts);
      },

      get imageData () {
        return this._renderer.imageData;
      },

      init : function (material, options) {
        options = options || {};
        _.defaults(this, options, {
          ratio : Blotter.CanvasUtils.pixelRatio,
          autobuild : true,
          autostart : true,
          autoplay : true
        });

        this.setMaterial(material);
        this.addTexts(options.texts);

        this._renderer.on("render", _.bind(_rendererRendered, this));

        if (this.autobuild) {
          this.needsUpdate = true;
        }

        if (this.autostart) {
          this.start();
        }
      },

      start : function () {
        this.autostart = true;
        this._startTime = Date.now();
        this._renderer.start();
      },

      stop : function () {
        this.autostart = false;
        this._renderer.stop();
      },

      teardown : function () {
        this._renderer.teardown();
      },

      setMaterial : function (material) {
        Blotter.Messaging.ensureInstanceOf(material, Blotter.Material, "Blotter.Material", "Blotter", "setMaterial");

        this._material = material;

        if (this._materialEventBinding) {
          this._materialEventBinding.unsetEventCallbacks();
        }

        this._materialEventBinding = new Blotter.ModelEventBinding(material, {
          update : _.bind(function () {
            _update.call(this);
          }, this),

          updateUniform : _.bind(function (uniformName) {
            _updateUniformValue.call(this, uniformName);
          }, this),
        });
        material.on("update", this._materialEventBinding.eventCallbacks.update);
        material.on("update:uniform", this._materialEventBinding.eventCallbacks.updateUniform);
      },

      addText : function (text) {
        this.addTexts(text);
      },

      addTexts : function (texts) {
        var filteredTexts = Blotter.TextUtils.filterTexts(texts),
            newTexts = _.difference(filteredTexts, this._texts);

        _.each(newTexts, _.bind(function (text) {
          this._texts.push(text);

          this._textEventBindings[text.id] = new Blotter.ModelEventBinding(text, {
            update : _.bind(function () {
              _update.call(this);
            }, this)
          });
          text.on("update", this._textEventBindings[text.id].eventCallbacks.update);

          this._scopes[text.id] = new Blotter.RenderScope(text, this);

          this._scopeEventBindings[text.id] = new Blotter.ModelEventBinding(this._scopes[text.id], {
            updateUniform : _.bind(function (uniformName) {
              _updateTextUniformValue.call(this, text.id, uniformName);
            }, this),
          });
          this._scopes[text.id].on("update:uniform", this._scopeEventBindings[text.id].eventCallbacks.updateUniform);
        }, this));
      },

      removeText : function (text) {
        this.removeTexts(text);
      },

      removeTexts : function (texts) {
        var filteredTexts = Blotter.TextUtils.filterTexts(texts),
            removedTexts = _.intersection(this._texts, filteredTexts);

        _.each(removedTexts, _.bind(function (text) {
          this._texts = _.without(this._texts, text);

          this._textEventBindings[text.id].unsetEventCallbacks();
          this._scopeEventBindings[text.id].unsetEventCallbacks();

          delete this._textEventBindings[text.id];
          delete this._scopeEventBindings[text.id];
          delete this._scopes[text.id];
        }, this));
      },

      forText : function (text) {
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter", "forText");

        if (!(this._scopes[text.id])) {
          Blotter.Messaging.logError("Blotter", "forText", "Blotter.Text object not found in blotter");
          return;
        }

        return this._scopes[text.id];
      },

      boundsForText : function (text) {
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter", "boundsForText");

        if (!(this._scopes[text.id])) {
          Blotter.Messaging.logError("Blotter", "boundsForText", "Blotter.Text object not found in blotter");
          return;
        }

        if (this._mapping) {
          return this.mappingMaterial.boundsForText(text);
        }
      }
    };
  })();

  _.extend(Blotter.prototype, EventEmitter.prototype);

  Blotter.Version = "v0.1.0";

  // Use a single webgl context regardless of number of blotter instances.
  Blotter.webglRenderer = Blotter.webglRenderer || new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });

  Blotter.Assets = Blotter.Assets || {};
  Blotter.Assets.Shaders = Blotter.Assets.Shaders || {};

})(
  this.Blotter, this._, this.THREE, this.Detector, this.EventEmitter
);
