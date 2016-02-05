var queue = require("queue-async"),
    expandFile = require("./expand-file"),
    readImports = require("./read-imports");

// Returns the network of imports, starting with the specified input files.
// For each file in the returned map, an array specifies the set of files
// immediately imported by that file. This array is in order of import, and may
// contain duplicate entries.
module.exports = function(files, options, callback) {
  if (typeof options === "function") callback = options, options = {};

  var fileMap = {};

  function readRecursive(file, callback) {
    if (file in fileMap) return callback(null);
    readImports(file, function(error, files) {
      if (error) {
        if (options["ignore-missing"] && error.code === "ENOENT") files = [];
        else return void callback(error);
      }
      var q = queue(1);
      fileMap[file] = files;
      files.forEach(function(file) {
        q.defer(readRecursive, file);
      });
      q.awaitAll(callback);
    });
  }

  var q = queue(1);
  files.forEach(function(file) {
    q.defer(readRecursive, expandFile(file));
  });
  q.awaitAll(function(error) {
    callback(error, error ? null : fileMap);
  });
};
