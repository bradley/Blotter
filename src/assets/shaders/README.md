# Overview
Files within this folder allow you to import useful glsl helper functions into your glsl source strings.

In order to access methods within these files, strings exposed by the files in this folder should be inserted directly into shader source strings.

Example:

```
var myFragmentSrc = [
  Blotter.Assets.Shaders.PI, // Includes constants defined in pi.js

  "// Do something with PI",
  "float myFunction(float f) {",
  "    return f / PI;",
  "}",

  "..."
].join("\n");
```

# Licensing
The majority of files within this folder (all but those within `./core`) were supplied by third party developers. Please see license information at the top of each file's source.
