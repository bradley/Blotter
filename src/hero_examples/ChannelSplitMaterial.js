BlotterSite.HeroExamples.ChannelSplitMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.HeroExamples.ChannelSplitMaterial.prototype =
  Object.create(BlotterSite.HeroExamples.Material.prototype);

_.extend(BlotterSite.HeroExamples.ChannelSplitMaterial.prototype, (function () {

  return {
    prepare : function () {


      this._prepareBlotter();
      this._setListeners();
    },

    _setListeners : function () {

    },

    render : function () {
      this.blotter.on("ready", _.bind(function() {
        _.each(this.scopes, _.bind(function (scope) {
          scope.appendTo(this.el);
        }, this));

        this.scopeEls = _.pluck(this.scopes, "domElement");

        this._setRandomPositions();
      }, this));
    },

    _prepareBlotter : function () {
      this.blotterTexts = this._blotterTexts();
      this.material = new Blotter.ChannelSplitMaterial();
      this.blotter = new Blotter(this.material, { texts : this.blotterTexts });
      this.scopes =_.map(this.blotterTexts, _.bind(function(blotterText) {
        return this.blotter.forText(blotterText);
      }, this));
    },

    _setRandomPositions : function () {
      // var boxDims = [];

      // var finalPositions = [];

      // _.each(this.scopeEls, _.bind(function (scopeEl) {
      //   var conflict = true,
      //       calcs = 0;

      //   while (conflict) {
      //     calcs += 1;

      //     if (calcs > 1000) {
      //       calcs = false;
      //       break;
      //     }

      //     var fixLeft = Math.floor(Math.random() * ($(this.el).width() - $(scopeEl).width())) + 1,
      //         fixTop = Math.floor(Math.random() * ($(this.el).height() - $(scopeEl).height())) + 1;

      //     $(scopeEl).css({
      //       left : fixLeft,
      //       position : "absolute",
      //       top : fixTop
      //     });

      //     var box = {
      //       top: parseInt(window.getComputedStyle($(scopeEl)[0]).top),
      //       left: parseInt(window.getComputedStyle($(scopeEl)[0]).left),
      //       width: parseInt(window.getComputedStyle($(scopeEl)[0]).width),
      //       height: parseInt(window.getComputedStyle($(scopeEl)[0]).height)
      //     };

      //     conflict = false;

      //     for (var i = 0; i < boxDims.length; i++) {
      //       if (this._doesOverlap(box,boxDims[i])) {
      //         conflict = true;
      //         break;
      //       } else {
      //         conflict = false;
      //       }
      //     }
      //   }

      //   finalPositions.push([fixLeft, fixTop]);
      //   boxDims.push(box);
      // }, this));

      // console.log(JSON.stringify(finalPositions));


      var positions = [
        [[339, 393], [517, 528], [267, 114], [187, 254], [291, 21], [398, 286], [524, 243], [18, 135], [415, 13], [436, 415], [41, 215], [207, 383], [503, 30]],
        [[363, 38], [206, 541], [18, 296], [202, 179], [219, 423], [292, 25], [167, 207], [287, 195], [114, 95], [152, 441], [20, 26], [366, 104], [472, 34]],
        [[88, 254], [493, 377], [152, 537], [365, 5], [166, 120], [34, 209], [195, 506], [638, 463], [49, 86], [368, 43], [70, 311], [429, 107], [317, 239]],
        [[174, 8], [538, 382], [52, 475], [599, 110], [632, 229], [367, 245], [7, 234], [130, 490], [578, 154], [64, 59], [566, 314], [200, 15], [138, 180]],
        [[243, 441], [486, 119], [198, 332], [625, 27], [338, 213], [307, 545], [397, 158], [460, 259], [358, 70], [560, 320], [429, 8], [56, 352], [12, 30]]
      ];

      var selectedPostions = _.sample(positions);

      _.each(this.scopeEls, _.bind(function (scopeEl, i) {

        var position = selectedPostions[i];
        $(scopeEl).css({
          left : position[0],
          position : "absolute",
          top : position[1]
        });
      }, this));
    },

    _doesOverlap : function (box1, box2) {
      var x1 = box1.left,
          y1 = box2.top,
          h1 = box1.height,
          w1 = box1.width,
          b1 = y1 + h1,
          r1 = x1 + w1,
          x2 = box1.left,
          y2 = box1.top,
          h2 = box1.height,
          w2 = box1.width,
          b2 = y2 + h2,
          r2 = x2 + w2;

      var buf = 24;

      if (b1 + buf < y2 || y1 > b2 + buf || r1 + buf < x2 || x1 > r2 + buf) return false;
      return true;
    },

    _blotterTexts : function () {
      var texts = ["A", "B", "C", "D", "E", "F", "G", "I", "J", "K", "L", "M", "N"];
      var textProperties = {
        family :  "'Avenir', sans-serif",
        leading : 1.0,
        weight : 800,
        paddingLeft : 20,
        paddingRight : 20,
        paddingTop : 20,
        paddingBottom : 20,
        fill : "#202020"
      };
      var sizes = [17, 17, 26, 26, 26, 26, 78, 78, 78, 104, 104, 156, 208];

      var chinese = [
        "母", // mother,
        "生", // birth/raw?
      ];

      return _.map(_.shuffle(texts), function(text, i) {
        var properties = _.clone(textProperties);
        properties.size = sizes[i];

        return new Blotter.Text(text, properties);
      });
    }
  }
})());
