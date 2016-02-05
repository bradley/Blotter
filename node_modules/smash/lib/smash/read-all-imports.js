var queue = require("queue-async"),
    expandFile = require("./expand-file"),
    readImports = require("./read-imports");

// Reads all the imports from the specified files, returning an array of files.
// The returned array is in dependency order and only contains unique entries.
// The returned arrays also includes any input files at the end.
module.exports = function(files, options, callback) {
  if (typeof options === "function") callback = options, options = {};

  var fileMap = {},
      allFiles = [];

  function readRecursive(file, callback) {
    if (file in fileMap) return callback(null);
    fileMap[file] = true;
    readImports(file, function(error, files) {
      if (error) {
        if (options["ignore-missing"] && error.code === "ENOENT") files = [];
        else return void callback(error);
      }
      var q = queue(1);
      files.forEach(function(file) {
        q.defer(readRecursive, file);
      });
      q.awaitAll(function(error) {
        if (!error) allFiles.push(file);
        callback(error);
      });
    });
  }

  var q = queue(1);
  files.forEach(function(file) {
    q.defer(readRecursive, expandFile(file));
  });
  q.awaitAll(function(error) {
    callback(error, error ? null : allFiles);
  });
};
