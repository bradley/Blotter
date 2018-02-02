BlotterSite.HeroExamples.ChannelSplitMaterial = function(el, text) {
  this.init.apply(this, arguments);
}

BlotterSite.HeroExamples.ChannelSplitMaterial.prototype =
  Object.create(BlotterSite.HeroExamples.Material.prototype);

_.extend(BlotterSite.HeroExamples.ChannelSplitMaterial.prototype, (function () {

  function angleBetweenPointsInDegrees(x1, y1, x2, y2) {
    var angle = Math.atan2(y2 - y1, x2 - x1) * 180.0 / Math.PI;

    angle = 180 + angle;

    return angle;
  }

  function distanceBetweenPoints(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt((a * a) + (b * b));
  }

  return {
    prepare : function () {
      this._prepareBlotter();
    },

    _setListeners : function () {
      $(document).mousemove(_.bind(this._handleMousemove, this));
    },

    render : function () {
      this.blotter.on("ready", _.bind(function() {
        this._setListeners();

        _.each(this.scopes, _.bind(function (scope) {
          scope.appendTo(this.el);
        }, this));

        this._setRandomPositions(_.pluck(this.scopes, "domElement"));
        this._setInitialCenter();
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

    _blotterTexts : function () {
      var texts = ["A", "B", "C", "D", "E", "F", "G", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; // Note: I dont like 'Q' with this typeface, so it's absent.
      var textProperties = {
        family :  "'AvenirLTStd-Black', 'Helvetica Neue', 'Helvetica', Arial, sans-serif",
        leading : 1.0,
        weight : 800,
        paddingLeft : 60,
        paddingRight : 60,
        paddingTop : 50,
        paddingBottom : 50,
        fill : "#202020"
      };
      var sizes = [17, 17, 26, 26, 26, 26, 78, 78, 78, 104, 104, 156, 208];

      return _.map(_.shuffle(texts).slice(0, 13), function(text, i) {
        var properties = _.clone(textProperties);
        properties.size = sizes[i];

        return new Blotter.Text(text, properties);
      });
    },

    _setRandomPositions : function (elements) {
      var positions = [
        [["41.9943820225618%","54.967948717769225%"],["66.99438202256181%","76.60256410238462%"],["31.882022472%","10.256410256230767%"],["20.646067415820223%","32.6923076921282%"],["35.252808988853936%","0%"],["50.28089887649438%","37.82051282033333%"],["67.97752808997754%","30.929487179307692%"],["0%","13.621794871615387%"],["52.668539325932585%","0%"],["55.617977528179786%","58.49358974341025%"],["0.1404494382921353%","26.442307692128203%"],["23.45505617986517%","53.36538461520513%"],["65.02808988773035%","0%"]],
        [["45.365168539415734%","0%"],["23.314606741662917%","78.68589743571796%"],["0%","39.42307692289743%"],["22.752808988853936%","20.673076922897437%"],["25.140449438292134%","59.775641025461546%"],["35.39325842705618%","0%"],["17.83707865177528%","25.16025641007692%"],["34.69101123604495%","23.237179487%"],["10.393258427056178%","7.211538461358973%"],["15.73033707874157%","62.66025641007693%"],["0%","0%"],["45.78651685402247%","8.653846153666665%"],["69.6742%","34%"]],
        [["6.741573033797752%","32.6923076921282%"],["63.62359550570787%","52.40384615366666%"],["15.73033707874157%","78.04487179469231%"],["45.64606741582022%","0%"],["17.696629213573033%","11.217948717769234%"],["0%","25.480769230589743%"],["21.7696629214382%","73.0769230767436%"],["83.98876404503372%","66.18589743571796%"],["1.264044943910113%","5.769230769051283%"],["46.06741573042697%","0%"],["4.213483146157304%","41.82692307674359%"],["70.6348%","9.134615384435898%"],["38.90449438211236%","30.28846153828205%"]],
        [["18.82022471919101%","0%"],["69.94382022480899%","53.20512820494872%"],["1.6853932585168536%","68.10897435879487%"],["78.51123595514608%","9.615384615205128%"],["83.14606741582023%","28.685897435717948%"],["45.92696629222472%","31.24999999982051%"],["0%","29.487179487%"],["12.640449438292134%","70.51282051264103%"],["75.56179775289888%","16.66666666648718%"],["3.370786516943821%","1.442307692128205%"],["73.87640449447191%","42.307692307512816%"],["22.47191011244944%","0%"],["13.764044943910111%","20.833333333153846%"]],
        [["28.511235955146066%","62.66025641007693%"],["62.64044943829214%","11.057692307512818%"],["22.191011236044943%","45.1923076921282%"],["82.1629213484045%","0%"],["41.853932584359555%","26.121794871615386%"],["37.50000000008989%","79.3269230767436%"],["50.14044943829213%","17.307692307512816%"],["58.98876404503372%","33.493589743410254%"],["44.662921348404495%","3.2051282049487195%"],["73.03370786525844%","43.269230769051276%"],["54.63483146076404%","0%"],["2.2471910113258424%","48.39743589725641%"],["0%","0%"]]
      ];

      var selectedPostions = _.sample(positions);

      _.each(elements, _.bind(function (el, i) {

        var position = selectedPostions[i];
        $(el).css({
          left : position[0],
          position : "absolute",
          top : position[1]
        });
      }, this));
    },

    _setInitialCenter : function () {
      var parentWidth = $(document).width(),
          parentHeight = $(document).height(),
          exampleWidth = this.$el.width(),
          exampleHeight = this.$el.height();
          examplePosition = this.$el.offset();

      this._handleNewCenter(
        (examplePosition.left + (exampleWidth / 2.0)) / parentWidth,
        (examplePosition.top + (exampleHeight / 2.0)) / parentHeight
      )
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

      _.each(this.scopes, _.bind(function (scope) {
        var element = $(scope.domElement),
            position = element.offset(),
            x = (position.left + (element.width() / 2.0)) / parentWidth,
            y = (position.top + (element.height() / 2.0)) / parentHeight;

        var angle = angleBetweenPointsInDegrees(x, y, posX, posY);
        var blur = Math.min(0.2, distanceBetweenPoints(x, y, posX, posY));

        scope.material.uniforms.uRotation.value = angle;
        scope.material.uniforms.uOffset.value = blur;

      }, this));
    }
  }
})());
