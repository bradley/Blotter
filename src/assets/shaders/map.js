// See License comments in shader string

var Map = [
  "//",
  "// Author : Reza Ali",
  "// License : Distributed under the MIT License.",
  "//",
  "",
  "float map( float value, float inMin, float inMax, float outMin, float outMax )",
  "{",
  "    return ( (value - inMin) / ( inMax - inMin ) * ( outMax - outMin ) ) + outMin;",
  "}"
].join("\n");


export { Map };
