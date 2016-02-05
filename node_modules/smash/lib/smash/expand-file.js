var path = require("path");

module.exports = function(file, extension) {
  if (extension == null) extension = defaultExtension;
  else extension += "";
  if (/\/$/.test(file)) file += "index" + extension;
  else if (!path.extname(file)) file += extension;
  return file;
};

var defaultExtension = ".js";
