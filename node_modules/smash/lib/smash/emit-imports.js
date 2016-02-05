var path = require("path"),
    events = require("events"),
    emitLines = require("./emit-lines"),
    expandFile = require("./expand-file");

// Returns an emitter for the specified file. The returned emitter emits
// "import" events whenever an import statement is encountered, and "data"
// events whenever normal text is encountered, in addition to the standard
// "error" and "end" events.
module.exports = function(file) {
  var emitter = new events.EventEmitter(),
      directory = path.dirname(file),
      extension = path.extname(file),
      lines = [];

  file = expandFile(file, extension);

  var lineEmitter = emitLines(file)
      .on("line", line)
      .on("end", end)
      .on("error", error);

  function line(line, number) {
    if (/^import\b/.test(line)) {
      flush();
      var match = /^import\s+(["'])([^"']+)(\1)\s*;?\s*(?:\/\/.*)?$/.exec(line);
      if (match) {
        emitter.emit("import", path.join(directory, expandFile(match[2], extension)));
      } else {
        lineEmitter.removeAllListeners(); // ignore subsequent lines
        error(new Error("invalid import: " + file + ":" + number + ": " + line));
      }
    } else {
      lines.push(line, newline);
    }
  }

  function flush() {
    if (lines.length) emitter.emit("data", Buffer.concat(lines)), lines = [];
  }

  function end() {
    flush();
    emitter.emit("end");
  }

  function error(e) {
    emitter.emit("error", e);
  }

  return emitter;
};

var newline = new Buffer("\n");
