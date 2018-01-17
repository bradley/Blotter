import { reduce } from "underscore";
import immediate from "immediate";
import GrowingPacker from "jakes-gordon-growing-packer";
import { TextUtils } from "../extras/textUtils";
import { Mapping } from "../mapping/mapping";


var MappingBuilder = (function () {

  // Sort texts based on area of space required for any given text, descending

  function _sortTexts (textA, textB) {
    var areaA = textA.w * textA.h,
        areaB = textB.w * textB.h;

    return areaB - areaA;
  }

  function _getTextSizes (texts) {
    return reduce(texts, function (textSizes, text) {
      var size = TextUtils.sizeForText(text.value, text.properties);
      textSizes[text.id] = size;
      return textSizes;
    }, []);
  }

  return {

    build : function (texts, completion) {
      immediate(function() {
        var filteredTexts = TextUtils.filterTexts(texts),
            textSizes = _getTextSizes(filteredTexts),
            packer = new GrowingPacker(),
            pack,
            tempTextBounds = [],
            textBounds = {},
            packedRectangles,
            mapping;

        // Build array of objects holding a Text object's id, width, and height for sorting.
        for (var textId in textSizes) {
          if (textSizes.hasOwnProperty(textId)) {
            var tempSizesObject = textSizes[textId];
            tempSizesObject.referenceId = textId;
            tempTextBounds.push(tempSizesObject);
          }
        }

        // Add fit object to all objects in tempTextBounds.
        pack = packer.pack(tempTextBounds.sort(_sortTexts));
        packedRectangles = pack.rectangles();

        // Add fit objects back into this._textBounds for each Text id.
        for (var i = 0; i < tempTextBounds.length; i++) {
          var packedSizesObject = packedRectangles[i];
          textBounds[packedSizesObject.referenceId] = {
            w : packedSizesObject.w,
            h : packedSizesObject.h,
            x : packedSizesObject.x,
            y : pack.height - (packedSizesObject.y + packedSizesObject.h)
          };
        }

        completion(new Mapping(filteredTexts, textBounds, pack.width, pack.height));
      });
    }
  };
})();


export { MappingBuilder }
