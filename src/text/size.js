blotter_getTextSize = function(textStr, fontFamily, fontSize) {
	var tempText = document.createElement('p'),
  		size;

  tempText.innerHTML = textStr;
  tempText.style.fontFamily = fontFamily;
  tempText.style.fontSize = fontSize;
  tempText.style.visibility = "hidden";
  tempText.style.display = "inline-block";

  document.body.appendChild(tempText);

  size = {
  	w: $(tempText).width(),
    h: $(tempText).height()
  }

  document.body.removeChild(tempText);

  return size;
}
