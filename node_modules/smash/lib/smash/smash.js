var stream = require("stream"),
    queue = require("queue-async"),
    expandFile = require("./expand-file"),
    emitImports = require("./emit-imports");

// Returns a readable stream for the specified files.
// All imports are expanded the first time they are encountered.
// Subsequent redundant imports are ignored.
module.exports = function(files) {
  var s = new stream.PassThrough({encoding: "utf8", decodeStrings: false}),
      q = queue(1),
      fileMap = {};

  // Streams the specified file and any imported files to the output stream. If
  // the specified file has already been streamed, does nothing and immediately
  // invokes the callback. Otherwise, the file is streamed in chunks, with
  // imports expanded and resolved as necessary.
  function streamRecursive(file, callback) {
    if (file in fileMap) return void callback(null);
    fileMap[file] = true;

    // Create a serialized queue with an initial guarding callback. This guard
    // ensures that the queue does not end prematurely; it only ends when the
    // entirety of the input file has been streamed, including all imports.
    var c, q = queue(1).defer(function(callback) { c = callback; });

    // The "error" and "end" events can be sent immediately to the guard
    // callback, so that streaming terminates immediately on error or end.
    // Otherwise, imports are streamed recursively and chunks are sent serially.
    emitImports(file)
        .on("error", c)
        .on("import", function(file) { q.defer(streamRecursive, file); })
        .on("data", function(data) { q.defer(function(callback) { s.write(data, callback); }); })
        .on("end", c);

    // This last callback is only invoked when the file is fully streamed.
    q.awaitAll(callback);
  }

  // Stream each file serially.
  files.forEach(function(file) {
    q.defer(streamRecursive, expandFile(file));
  });

  // When all files are streamed, or an error occurs, we're done!
  q.awaitAll(function(error) {
    if (error) s.emit("error", error);
    else s.end();
  });

  return s;
};
