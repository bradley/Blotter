(function () {

  /*  Initialization
    ------------------------------------- */

  _.extend(window.BlotterSite, {
    Views : {},
    Models : {},
    Collections : {},
    Helpers : {},
    Components : {},
    Extensions : {},
    Router : null,

    init : function () {
      this.instance = new BlotterSite.Views.App();
      Backbone.history.start();
    }
  });

  $(function() {
    window.BlotterSite.init();
  });


  /*  Router
    ------------------------------------- */

  BlotterSite.Router = Backbone.Router.extend({
    routes : {
      "overview" : "overview",
      "basics" : "basics",
      "packs" : "packs",
      "" : "home"
    },

    home : function () {
      var view = new BlotterSite.Views.Home();

      BlotterSite.instance.goto(view);
    },

    overview : function () {
      var view = new BlotterSite.Views.Overview();

      BlotterSite.instance.goto(view);
    },

    basics : function () {
      var view = new BlotterSite.Views.Basics();

      BlotterSite.instance.goto(view);
    },

    packs : function () {
      var view = new BlotterSite.Views.Packs();

      BlotterSite.instance.goto(view);
    }
  });


  /*  Helpers
    ------------------------------------- */

  BlotterSite.Helpers.DropdownSelect = function (el) {
    this.init.apply(this, arguments);
  };

  BlotterSite.Helpers.DropdownSelect.prototype = (function () {

    return {
      constructor : BlotterSite.Helpers.DropdownSelect,

      init : function (el) {
        this.el = el;
        this.titleEl = this.el.find(".dropdown-title");
        this.dropdownEl = this.el.find(".dropdown-options");

        this.title = this.titleEl.html();

        this.setupListeners();
      },

      setupListeners : function () {
        this.titleEl.on("click", _.bind(this.handleToggleClick, this));
        this.dropdownEl.find("li").on("mouseover", _.bind(this.handleSelectionHover, this));
        this.dropdownEl.find("li").on("click", _.bind(this.handleSelectionClick, this));
        this.on("selectionMade", _.bind(this.handleSelectionMade, this));
      },

      handleToggleClick : function (e) {
        e.preventDefault();

        var hidden = !this.dropdownEl.is(":visible");

        hidden ? this.showDropdown() : this.hideDropdown();
      },

      showDropdown : function () {
        if (!this.dropdownEl.is(":visible")) {
          this.dropdownEl.velocity('transition.slideDownIn', {
            duration : 150,
            easing : [ 0.645, 0.045, 0.355, 1 ]
          });

          this.boundBodyListener = this.boundBodyListener || _.bind(this.bodyListener, this);
          $("html").on("mousedown", this.boundBodyListener);
        }
      },

      hideDropdown : function () {
        this.dropdownEl.velocity("reverse", {
          display : "none"
        });

        this.boundBodyListener && $("html").off("mousedown", this.boundBodyListener);
        this.boundBodyListener = null;

        this.titleEl.html(this.title);
      },

      handleSelectionHover : function (e) {
        var target = $(e.currentTarget);

        this.titleEl.html(target.data("title"));
      },

      handleSelectionClick : function (e) {
        e.preventDefault;
        var target = $(e.currentTarget);

        this.trigger("selectionMade", [target.data("value"), target.data("title")]);
      },

      handleSelectionMade : function (value, title) {
        this.value = value;
        this.title = title;

        this.hideDropdown();
      },

      bodyListener : function (e) {
        var target = $(e.target);

        if (!target.parents(".dropdown-select").length) {
          this.hideDropdown();
        }
      }
    }
  })();
  _.extend(BlotterSite.Helpers.DropdownSelect.prototype, EventEmitter.prototype);


  /*  Components
    ------------------------------------- */

  BlotterSite.Components.Editor = function (el) {
    this.init.apply(this, arguments);
  };

  BlotterSite.Components.Editor.prototype = (function () {

    function _buildJSMirror (el, code) {
      return CodeMirror(el, {
        value: code,
        mode: "javascript",
        tabSize: 2,
        lineWrapping: true,
        lineNumbers: true
      });
    }

    function _buildHTMLMirror (el, code) {
      return CodeMirror(el, {
        value: code,
        mode: "html",
        tabSize: 2,
        lineWrapping: true,
        lineNumbers: true
      });
    }

    return {

      constructor : BlotterSite.Components.Editor,

      init : function (el) {
        this.el = el;
        this.outputEl = el.find(".output");

        this.jsCode = el.find("script.js-code").html();
        this.htmlCode = this.outputEl.html();
        this.jsContent = el.find(".js-content");
        this.htmlContent = el.find(".html-content");

        this.jsMirror = _buildJSMirror(this.jsContent[0], this.jsCode);
        this.htmlMirror = _buildHTMLMirror(this.htmlContent[0], this.htmlCode);

        this.jsMirror.on("change", _.bind(_.debounce(this.update, 1000), this));
        this.htmlMirror.on("change", _.bind(_.debounce(this.update, 1000), this));

        this.htmlDoc = this.htmlMirror.getDoc();
        this.jsDoc = this.jsMirror.getDoc();

        this.setupListeners();
        this.update();
        this.showJSContent();
      },

      setupListeners : function () {
        this.el.find(".js-tab").on("click", _.bind(this.showJSContent, this));
        this.el.find(".html-tab").on("click", _.bind(this.showHTMLContent, this));
      },

      update : function() {
        this.htmlMirror.setSize("auto", "auto");
        this.htmlCode = this.htmlDoc.getValue();
        try {
          this.outputEl.html(unescape(this.htmlCode));
        } catch (e) {
          console.log(e);
        }

        this.jsMirror.setSize("auto", "auto");
        this.jsCode = this.jsDoc.getValue();
        try {
          eval(this.jsCode); // yikes!
        } catch (e) {
          console.log(e);
        }
      },

      showJSContent : function () {
        this.htmlContent.hide();
        this.jsContent.show();
      },

      showHTMLContent : function () {
        this.jsContent.hide();
        this.htmlContent.show();
      },

      largestSize : function () {
        var htmlMirrorSize = this.htmlMirror.getScrollInfo(),
            jsMirrorSize = this.jsMirror.getScrollInfo(),
            size = {};

        size.width = Math.max(jsMirrorSize.width, htmlMirrorSize.width);
        size.height = Math.max(jsMirrorSize.height, htmlMirrorSize.height);

        return size;
      }
    }
  })();


  /*  Extensions
    ------------------------------------- */

  BlotterSite.Extensions.View = Marionette.ItemView.extend({
    template : _.template("<div></div>")(),

    initialize : function () {
      this.router = new BlotterSite.Router();
    },

    transitionIn : function (callback) {
      var view = this,
          delay;

      var transitionIn = function () {
        view.$el.addClass("is-visible");
        view.$el.on("transitionend", function () {
          if (_.isFunction(callback)) {
            callback();
          }
        })
      };

      _.delay(transitionIn, 20);
    },

    transitionOut : function (callback) {
      var view = this;

      view.$el.removeClass("is-visible");
      view.$el.on("transitionend", function () {
        if (_.isFunction(callback)) {
          callback();
        };
      });
    }
  });


  /*  Models
    ------------------------------------- */

  BlotterSite.Models.PackShader = Backbone.Model.extend({
    defaults : {
      packName : "",
      materialName : ""
    },

    packShader : function () {
      return window["BlotterSite"]["PackShaders"][this.get("materialName")];
    },

    path : function () {
      return "./shaders/" + this.get("materialName") + ".html";
    }
  });


  /*  Collections
    ------------------------------------- */

  BlotterSite.Collections.PackShaders = Backbone.Collection.extend({
    model : BlotterSite.Models.PackShader
  })


  /*  Views
    ------------------------------------- */

  BlotterSite.Views.App = Marionette.LayoutView.extend({
    el : "#layout",

    regions : {
      "contentRegion" : ".content-region"
    },

    initialize : function () {
      this.router = new BlotterSite.Router();
    },

    goto : function (view) {
      var previous = this.currentPage || null,
          next = view;

      if (this.contentRegion.currentView) {
        //previous.transitionOut(function () {
          this.contentRegion.empty();
        //});
      }

      this.contentRegion.show(next);
      //next.transitionIn();
    }
  });


  BlotterSite.Views.Home = BlotterSite.Extensions.View.extend({
    className : "home",
    template : _.template($("template[name=home]").html())(),

    onRender : function () {
      this.dropwdownEl = this.$el.find(".dropdown-select");
      this.dropdownSelect = new BlotterSite.Helpers.DropdownSelect(this.dropwdownEl);

      this.downloadBtn = this.$el.find(".download-btn");

      this.setupListeners();
    },

    setupListeners : function () {
      this.dropdownSelect.on("selectionMade", _.bind(this.handleSelectionMade, this));
    },

    handleSelectionMade : function (value, title) {
      this.downloadBtn.attr("href", value);
    }
  });


  BlotterSite.Views.Overview = BlotterSite.Extensions.View.extend({
    className : "overview",
    template : _.template($("template[name=overview]").html())()
  });


  BlotterSite.Views.Basics = BlotterSite.Extensions.View.extend({
    className : "basics",
    template : _.template($("template[name=basics]").html())(),

    onShow : function () {
      this.setupEditors();
    },

    setupEditors : function () {
      this.editors = _.reduce(this.$el.find(".tabbed-editor"), function (m, el) {
        m.push(new BlotterSite.Components.Editor($(el)));
        return m;
      }, []);
    }
  });


  BlotterSite.Views.PackShaderListItem = Marionette.ItemView.extend({
    tagName : "li",
    events : {
      "click" : "handleClick"
    },

    initialize : function (options) {
      _.extend(this, options);

      var templateHTMLStr = [
        "<div>",
        "  <div class='pack-shader-overlay'>",
        "    <span class='pack-shader-name'><%= materialName %></span>",
        "    <span class='pack-name'><%= packName %></span>",
        "  </div>",
        "</div>"
      ].join("");

      this.template = _.template(templateHTMLStr)(this.model.toJSON());

      this.text = new Blotter.Text(this.textStr, this.textProperties);
    },

    onRender : function () {
      var PackShader = this.model.packShader();
      this.packShaderInstance = new PackShader(this.$el, this.text);
    },

    handleClick : function (e) {
      e && e.preventDefault();
      window.location.href = this.model.path();
    }
  });


  BlotterSite.Views.PacksList = Marionette.CompositeView.extend({
    childView : BlotterSite.Views.PackShaderListItem,
    childViewContainer : "ul.pack-shaders",
    template : _.template("<div><ul class='pack-shaders'></ul></div>")(),

    childViewOptions : function () {
      return {
        textStr : this.textStr,
        textProperties : this.textProperties
      };
    },

    initialize : function (options) {
      _.extend(this, options);

      this.textStr = "B";
      this.textProperties = {
        family : "'SerapionPro', sans-serif",
        size : 68,
        leading : "123px",
        paddingLeft : 40,
        paddingRight: 40,
        fill : "#1E1A1B"
      };

      this.collection = new BlotterSite.Collections.PackShaders([
        { materialName : "RollDistortMaterial", packName : "glitch_pack_1"},
        { materialName : "RGBSplitMaterial", packName : "glitch_pack_1"},
        { materialName : "BubbleSplitMaterial", packName : "glitch_pack_1"}
      ]);
    }
  });


  BlotterSite.Views.Packs = BlotterSite.Extensions.View.extend({
    className : "packs",
    template : _.template($("template[name=packs]").html())(),

    onRender : function () {
      this.packsList = new BlotterSite.Views.PacksList();
      this.packsList.render();
      this.$el.find(".packs-list-region").html(this.packsList.$el);
    }
  });

}());