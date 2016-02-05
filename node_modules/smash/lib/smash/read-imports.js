var emitImports = require("./emit-imports");

// Reads the import statements from the specified file, returning an array of
// files. Unlike readAllImports, this does not recursively traverse import
// statements; it only returns import statements in the specified input file.
// Also unlike readAllImports, this method returns every import statement,
// including redundant imports and self-imports.
module.exports = function(file, callback) {
  var files = [];

  emitImports(file)
      .on("import", function(file) { files.push(file); })
      .on("error", callback)
      .on("end", function() { callback(null, files); });
};
