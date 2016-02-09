/******************************************************************************

This class provides an interface for describing the styling of texts as they should appear
in the DOM.

Inputs:
------

	options object describing various text styling settings:
		fontFamily: same value you would pass to `font-family` in CSS, passed as string.
		fontSize: same value you would pass to `font-size` in CSS, passed as string.
		padding: same value you would pass to `padding` in CSS, passed as string.
		paddingTop: same value you would pass to `padding-top` in CSS, passed as string.
		paddingRight: same value you would pass to `padding-right` in CSS, passed as string.
		paddingBottom: same value you would pass to `padding-bottom` in CSS, passed as string.
		paddingLeft: same value you would pass to `padding-left` in CSS, passed as string.
		lineHeight: same value you would pass to `line-height` in CSS, passed as string.
		color: same value you would pass to `color` in CSS, passed as string.

Outputs:
-------

  Object containing descriptors for styling of texts.

Example:
-------

  var stylingOptions = {
    fontFamily: "Charcoal,sans-serif",
	  fontSize: "12px",
	  padding: "12px 17px",
	  lineHeight: 1.5,
	  fillStyle: "#0d0f17"
  };

  var textDescriptor = new BLOTTER.TextDescription(stylingOptions);

******************************************************************************/
BLOTTER.TextDescription = function(options) {
  this.init.apply(this, arguments);
}
BLOTTER.TextDescription.prototype = (function() {
	function extractPaddingValues(paddingStr) {
		var extractedPaddingValues = [0, 0, 0, 0];
		var paddingSettings = (paddingStr || "").match(/\d+\w*/);

		if (paddingSettings) {
			paddingSettings = paddingSettings.slice(0, 4);

			switch (paddingSettings.length) {
			  case 1:
			  	var trbl = paddingSettings[0];
			    extractedPaddingValues = [trbl, trbl, trbl, trbl];
			    break;
			  case 2:
			    var tb = paddingSettings[0],
			    		rl = paddingSettings[1];
			    extractedPaddingValues = [tb, rl, tb, rl];
			    break;
			  case 3:
			    var t = paddingSettings[0],
			    		rl = paddingSettings[1],
			    		b = paddingSettings[2];
			    extractedPaddingValues = [t, rl, b, rl];
			    break;
			  default:
			    var t = paddingSettings[0],
			    		r = paddingSettings[1],
			    		b = paddingSettings[2],
			    		l = paddingSettings[3];
			    extractedPaddingValues = [t, r, b, l];
			    break;
			}
		}

		return extractedPaddingValues;
	}

	function extractFloatValue(s) {
		var v = 0;
		if (s) {
			if (typeof s === 'string' || s instanceof String) {
				var match = s.match(/\d+/);
				if (match) {
					s = match[0];
				}
			}
			v = parseFloat(s);
		}
		return v;
	}

  return {

  	init : function(options) {

			var paddings = extractPaddingValues(options.padding),
					lineHeight = extractFloatValue(options.lineHeight);

		  this.fontFamily    = options.fontFamily;
		  this.fontSize      = options.fontSize;
		  this.paddingTop    = extractFloatValue(options.paddingTop || paddings[0]);
		  this.paddingRight  = extractFloatValue(options.paddingRight || paddings[1]);
		  this.paddingBottom = extractFloatValue(options.paddingBottom || paddings[2]);
		  this.paddingLeft   = extractFloatValue(options.paddingLeft || paddings[3]);
		  this.lineHeight    = extractFloatValue(options.lineHeight);
		  this.fillStyle     = options.color;
		}
	}
})();