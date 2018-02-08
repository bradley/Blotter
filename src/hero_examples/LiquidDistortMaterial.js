BlotterSite.HeroExamples.LiquidDistortMaterial = Marionette.ItemView.extend((function () {

  function distanceBetweenPoints(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt((a * a) + (b * b));
  }

  return {
    template : _.template("<div></div>")(),

    initialize : function () {
      this._prepareBlotter();
      this._setListeners();
    },

    onRender : function () {
      this.blotter.on("ready", _.bind(function() {
        this.scope.appendTo(this.el);
      }, this));
    },

    onDestroy : function () {
      this.blotter.stop();
      this.blotter.teardown();
    },

    _setListeners : function () {
      $(document).mousemove(_.bind(this._handleMousemove, this));
    },

    _prepareBlotter : function () {
      this.blotterText = this._blotterText();

      this.material = new Blotter.LiquidDistortMaterial();
      this.material.uniforms.uSpeed.value = 0.25;

      this.blotter = new Blotter(this.material, { texts : this.blotterText });
      this.scope = this.blotter.forText(this.blotterText);
    },

    _blotterText : function () {
      var textProperties = {
        family :  "'AvenirLTStd-Heavy', 'Helvetica Neue', 'Helvetica', Arial, sans-serif",
        leading : 1.0,
        weight : 800,
        size : 104,
        paddingLeft : 60,
        paddingRight : 60,
        paddingTop : 50,
        paddingBottom : 50,
        fill : "#202020"
      };

      return new Blotter.Text("3", textProperties);
    },

    _handleMousemove : function (e) {
      var parentWidth = $(document).width(),
          parentHeight = $(document).height();

      var posX = e.pageX / parentWidth;
      var posY = e.pageY / parentHeight;

      this._handleNewCenter(posX, posY);
    },

    _handleNewCenter : function (posX, posY) {
      var parentWidth = $(document).width(),
          parentHeight = $(document).height();

      var element = $(this.scope.domElement),
          position = element.offset(),
          x = (position.left + (element.width() / 2.0)) / parentWidth,
          y = (position.top + (element.height() / 2.0)) / parentHeight;

      this.scope.material.uniforms.uVolatility.value = Math.min(0.15, distanceBetweenPoints(x, y, posX, posY));
    }
  }
})());

