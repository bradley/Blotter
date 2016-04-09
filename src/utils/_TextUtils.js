var blotter_PropertyDefaults = {
	family       : 'sans-serif',
	size         : 12,
	leading      : 1.5,
	fill         : '#000',
	style        : 'normal',
	weight       : 500,
	padding      : 0,
	paddingTop   : 0,
	paddingRight : 0,
	paddingBottom: 0,
	paddingLeft  : 0
};

var blotter_TextUtils = {

	Properties : (function() { return Object.keys(blotter_PropertyDefaults) })(),

	// Recieves property values (optional) and fills in any missing values with default values

	ensurePropertyValues : function(properties) {
		var _properties = properties || {},
				defaultedProperties = blotter_PropertyDefaults;

		for(var i = 0; i < this.Properties.length; i++) {
			var k = this.Properties[i];

			if (k in _properties) {
				defaultedProperties[k] = _properties[k]
			}
		}

		return defaultedProperties;
	},

	// Normalize padding values from style properties for passing to document

	stringifiedPadding : function(properties) {
		var _properties = properties || this.ensurePropertyValues(),
				pTop = properties.paddingTop || _properties.padding,
				pRight = _properties.paddingRight || _properties.padding,
				pBottom = _properties.paddingBottom || _properties.padding,
				pLeft = _properties.paddingLeft || _properties.padding;

		return pTop + "px " + pRight + "px " + pBottom + "px " + pLeft + "px";
	},

	// Determines size of text within the document given certain style properties

	sizeForText : function(textValue, properties) {
		var el = document.createElement('p'),
				properties = this.ensurePropertyValues(properties),
	  		size;

	  el.innerHTML = textValue;
	  el.style.fontFamily = properties.family;
	  el.style.fontSize = properties.size + "px";
	  el.style.fontWeight = properties.weight;
	  el.style.fontStyle = properties.style;
	  el.style.padding = this.stringifiedPadding(properties);
	  el.style.lineHeight = properties.leading;
	  el.style.visibility = "hidden";
	  el.style.display = "inline-block";

	  document.body.appendChild(el);

	  size = {
	  	w: el.offsetWidth,
	    h: el.offsetHeight
	  }

	  document.body.removeChild(el);

	  return size;
	}
}
