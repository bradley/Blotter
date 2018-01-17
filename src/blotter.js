import { bind, each, wrap, intersection, without, defaults, difference, extend, reduceRight } from "underscore";
import { WebGLRenderer } from "three";
import isWebGLEnabled from "detector-webgl";
import EventEmitter from "wolfy87-eventemitter";
import { Messaging } from "./extras/core/messaging";
import { VendorPrefixes } from "./extras/core/vendorPrefixes";
import { EmitterObject } from "./extras/objects/emitterObject";
import { ModelEventBinding } from "./extras/objects/modelEventBinding";
import { CanvasUtils } from "./extras/canvasUtils";
import { TextUtils } from "./extras/textUtils";
import { UniformUtils } from "./extras/uniformUtils";
import * as Helpers from "./helpers";
import { Text } from "./texts/text";
import { Assets } from "./assets";
import { Mapping } from "./mapping/mapping";
import { MappingMaterial } from "./mapping/mappingMaterial";
import { Material } from "./materials/material";
import { ShaderMaterial } from "./materials/shaderMaterial";
import { Renderer } from "./rendering/renderer";
import { RenderScope } from "./rendering/renderScope";
import { BoundsDataTextureBuilder } from "./builders/textures/boundsDataTextureBuilder";
import { IndicesDataTextureBuilder } from "./builders/textures/indicesDataTextureBuilder";
import { TextTextureBuilder } from "./builders/textures/textTextureBuilder";
import { MappingBuilder } from "./builders/mappingBuilder";
import { MappingMaterialBuilder } from "./builders/mappingMaterialBuilder";


var Blotter = function (material, options) {
  if (!isWebGLEnabled) {
    Messaging.throwError("Blotter", false, "device does not support webgl");
  }

  this._texts = [];
  this._textEventBindings = {};

  this._scopes = {};
  this._scopeEventBindings = {};

  this._renderer = new Renderer();

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

    each(this._scopes, bind(function (scope) {
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

    buildMapping = bind(function () {
      return bind(function (next) {
        MappingBuilder.build(this._texts, bind(function (newMapping) {
          this._mapping = newMapping;
          this._mapping.ratio = this.ratio;

          next();
        }, this));
      }, this);
    }, this);

    buildMappingMaterial = bind(function () {
      return bind(function (next) {
        MappingMaterialBuilder.build(this._mapping, this._material, bind(function (newMappingMaterial) {
          this.mappingMaterial = newMappingMaterial;

          next();
        }, this));
      }, this);
    }, this);

    buildStages = [
      buildMapping(),
      buildMappingMaterial()
    ];

    reduceRight(buildStages, wrap, bind(function () {
      this._renderer.stop();

      each(this._scopes, bind(function (scope, textId) {
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
      defaults(this, options, {
        ratio : CanvasUtils.pixelRatio,
        autobuild : true,
        autostart : true,
        autoplay : true
      });

      this.setMaterial(material);
      this.addTexts(options.texts);

      this._renderer.on("render", bind(_rendererRendered, this));

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
      Messaging.ensureInstanceOf(material, Material, "Blotter.Material", "Blotter", "setMaterial");

      this._material = material;

      if (this._materialEventBinding) {
        this._materialEventBinding.unsetEventCallbacks();
      }

      this._materialEventBinding = new ModelEventBinding(material, {
        update : bind(function () {
          _update.call(this);
        }, this),

        updateUniform : bind(function (uniformName) {
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
      var filteredTexts = TextUtils.filterTexts(texts),
          newTexts = difference(filteredTexts, this._texts);

      each(newTexts, bind(function (text) {
        this._texts.push(text);

        this._textEventBindings[text.id] = new ModelEventBinding(text, {
          update : bind(function () {
            _update.call(this);
          }, this)
        });
        text.on("update", this._textEventBindings[text.id].eventCallbacks.update);

        this._scopes[text.id] = new RenderScope(text, this);

        this._scopeEventBindings[text.id] = new ModelEventBinding(this._scopes[text.id], {
          updateUniform : bind(function (uniformName) {
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
      var filteredTexts = TextUtils.filterTexts(texts),
          removedTexts = intersection(this._texts, filteredTexts);

      each(removedTexts, bind(function (text) {
        this._texts = without(this._texts, text);

        this._textEventBindings[text.id].unsetEventCallbacks();
        this._scopeEventBindings[text.id].unsetEventCallbacks();

        delete this._textEventBindings[text.id];
        delete this._scopeEventBindings[text.id];
        delete this._scopes[text.id];
      }, this));
    },

    forText : function (text) {
      Messaging.ensureInstanceOf(text, Text, "Blotter.Text", "Blotter", "forText");

      if (!(this._scopes[text.id])) {
        Messaging.logError("Blotter", "forText", "Blotter.Text object not found in blotter");
        return;
      }

      return this._scopes[text.id];
    },

    boundsForText : function (text) {
      Messaging.ensureInstanceOf(text, Text, "Blotter.Text", "Blotter", "boundsForText");

      if (!(this._scopes[text.id])) {
        Messaging.logError("Blotter", "boundsForText", "Blotter.Text object not found in blotter");
        return;
      }

      if (this._mapping) {
        return this.mappingMaterial.boundsForText(text);
      }
    }
  };
})();

extend(Blotter.prototype, EventEmitter.prototype);


Blotter.Version = "v0.1.0";

// Use a single webgl context regardless of number of blotter instances.
Blotter.WEBGL_RENDERER = new WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });

Blotter.Messaging = Messaging;
Blotter.VendorPrefixes = VendorPrefixes;
Blotter.EmitterObject = EmitterObject;
Blotter.ModelEventBinding = ModelEventBinding;
Blotter.CanvasUtils = CanvasUtils;
Blotter.TextUtils = TextUtils;
Blotter.UniformUtils = UniformUtils;
Blotter.Helpers = Helpers;
Blotter.Text = Text;
Blotter.Assets = Assets;
Blotter.Mapping = Mapping;
Blotter.MappingMaterial = MappingMaterial;
Blotter.Material = Material;
Blotter.ShaderMaterial = ShaderMaterial;
Blotter.Renderer = Renderer;
Blotter.RenderScope = RenderScope;
Blotter.BoundsDataTextureBuilder = BoundsDataTextureBuilder;
Blotter.IndicesDataTextureBuilder = IndicesDataTextureBuilder;
Blotter.TextTextureBuilder = TextTextureBuilder;
Blotter.MappingBuilder = MappingBuilder;
Blotter.MappingMaterialBuilder = MappingMaterialBuilder;


export default Blotter;
