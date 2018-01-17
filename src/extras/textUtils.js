import { keys, defaults, toArray, filter, bind } from "underscore";
import { Messaging } from "./core/messaging";
import { Text } from "../texts/text";

var PropertyDefaults = {
  family       : 'sans-serif',
  size         : 12,
  leading      : 1.5,
  fill         : '#000',
  style        : 'normal',
  weight       : 400,
  padding      : 0,
  paddingTop   : 0,
  paddingRight : 0,
  paddingBottom: 0,
  paddingLeft  : 0
};

var TextUtils = {

  Properties : keys(PropertyDefaults),

  // Recieves property values (optional) and fills in any missing values with default values

  ensurePropertyValues : function(properties) {
    properties = defaults(properties || {}, PropertyDefaults);
    return properties;
  },

  filterTexts : function(texts) {
    if (texts instanceof Text) {
      texts = [texts];
    } else {
      texts = toArray(texts);
    }

    return filter(texts, bind(function (text) {
      var isText = text instanceof Text;

      if (!isText) {
        Messaging.logWarning("Blotter.TextUtils", "filterTexts", "object must be instance of Blotter.Text");
      }

      return isText;
    }, this));
  },

  // Format padding values from style properties for passing to document

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
    // Using a <span> here may not be the best approach. In theory a user's stylesheet
    //   could override the necessary styling for determining sizes below. With growing
    //   support for custom tags in html, we may consider using them if this raises problems.
    var el = document.createElement("span"),
        size;

    properties = this.ensurePropertyValues(properties);

    el.innerHTML = textValue;
    el.style.display = "inline-block";
    el.style.fontFamily = properties.family;
    el.style.fontSize = properties.size + "px";
    el.style.fontWeight = properties.weight;
    el.style.fontStyle = properties.style;
    el.style.lineHeight = properties.leading;
    el.style.maxWidth = "none";
    el.style.padding = this.stringifiedPadding(properties);
    el.style.position = "absolute";
    el.style.width = "auto";
    el.style.visibility = "hidden";


    document.body.appendChild(el);

    size = {
      w: el.offsetWidth,
      h: el.offsetHeight
    };

    document.body.removeChild(el);

    return size;
  }
};

export { PropertyDefaults };
export { TextUtils };
