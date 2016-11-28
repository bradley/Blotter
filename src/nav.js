$(document).ready(function () {

  var mainImage = [
    "float when_gt(float x, float y) {",
    "  return max(sign(x - y), 0.0);",
    "}",

    "float when_lt(float x, float y) {",
    "  return max(sign(y - x), 0.0);",
    "}",

    "void mainImage(out vec4 mainImage, in vec2 fragCoord) {",
    "    vec2 uv = fragCoord.xy / uResolution.xy;",
    "    vec2 p = vec2(1.0) / uResolution.xy;",
    
    "    float stepDistance = 6.5 * p.y;",

    "    vec2 thresholdCenter = vec2(0.5);",
    "    float slope = 0.1;",
    "    float threshold = (slope * (uv.x - thresholdCenter.x)) + (thresholdCenter.y);",
    
    "    uv.x += (stepDistance * when_gt(uv.y, threshold) * hovering); // Shift right",
    "    uv.x -= (stepDistance * when_lt(uv.y, threshold) * hovering); // Shift left",
    
    "    mainImage = textTexture(uv);",
    "}"
  ].join("\n");


  var elems = $("#nav li a");

  var properties = {
    family : "'Avenir', sans-serif",
    size : 17,
    weight : 100,
    leading : "52px",
    paddingLeft : 13,
    paddingRight : 13,
    fill : "#1E1A1B"
  };

  var texts = _.reduce(elems, function(m, elem) {
    var text = new Blotter.Text($(elem).data("text"), properties);

    m.push(text);
    return m;
  }, []);

  var material = new Blotter.ShaderMaterial(mainImage, {
    uniforms : {
      hovering : { type : "1f", value : 0.0 }
    }
  });

  var blotter = new Blotter(material, {
    texts : texts
  });
  
  blotter.on("ready", function () {
    var scopes = _.reduce(elems, function (m, elem) {
      var scope = blotter.forText(texts[m.length]);

      scope.appendTo(elem);

      scope.on("mouseenter", (function (scope) {
        return function () {
          scope.material.uniforms.hovering.value = 1.0;
        }
      })(scope));

      scope.on("mouseleave", (function (scope) {
        return function () {
          var el = $(scope.domElement).parent("a");

          if (!el.hasClass("active")) {
            scope.material.uniforms.hovering.value = 0.0;
          }
        }
      })(scope));

      m.push(scope);
      return m;
    }, []);

    $("body").on("pathChange", function (e, dataId) {
      elems.removeClass("active");
      material.uniforms.hovering.value = 0.0;

      if (dataId) {
        var el = $("#nav li a[data-reference-id='" + dataId + "']"),
          li = el.parent("li"),
          i = $("#nav li").index(li);

        el.addClass("active");
        blotter.forText(texts[i]).material.uniforms.hovering.value = 1.0;
      }
    });

    $("body").trigger("navReady")
  });
      
});