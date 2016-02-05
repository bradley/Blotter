BLOTTER.TextDescription = function(options) {
	function extractPaddingValues() {
		var extractedPaddingValues = [0, 0, 0, 0];
		var paddingSettings = (options.padding || "").match(/\d+\w*/);

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

	var paddings = extractPaddingValues();
	options.paddingTop = options.paddingTop || paddings[0];
	options.paddingRight = options.paddingRight || paddings[1];
	options.paddingBottom = options.paddingBottom || paddings[2];
	options.paddingLeft = options.paddingLeft || paddings[3];

  return {
    fontFamily    : options.fontFamily,
    fontSize      : options.fontSize,
    paddingTop    : options.paddingTop,
    paddingRight  : options.paddingRight,
    paddingBottom : options.paddingBottom,
    paddingLeft   : options.paddingLeft,
    lineHeight    : options.lineHeight,
    fillStyle     : options.color
  }
}