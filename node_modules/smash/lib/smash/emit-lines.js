var fs = require("fs"),
    events = require("events");

// Returns an emitter for the specified file. The returned emitter emits "line"
// events for each line in the file, in addition to the standard "error" and
// "end" events.
module.exports = function(file) {
  var emitter = new events.EventEmitter(),
      lineFragments = [],
      lineNumber = -1;

  fs.createReadStream(file)
      .on("data", data)
      .on("end", end)
      .on("error", error);

  function data(chunk) {
    var i = 0, n = chunk.length;

    // Join queued line fragments, if any, with first line in new chunk.
    if (lineFragments.length) {
      var k = 0;
      while (i < n) {
        var c = chunk[i++];
        if (c === 10) { ++k; break; } // \n
        if (c === 13) { ++k; if (chunk[i] === 10) ++i, ++k; break; } // \r or \r\n
      }
      lineFragments.push(chunk.slice(0, i - k));
      if (k) emitter.emit("line", Buffer.concat(lineFragments), ++lineNumber), lineFragments = [];
      else return;
    }

    // Find subsequent lines in new chunk.
    while (true) {
      var i0 = i, k = 0;
      while (i < n) {
        var c = chunk[i++];
        if (c === 10) { ++k; break; } // \n
        if (c === 13) { ++k; if (chunk[i] === 10) ++i, ++k; break; } // \r or \r\n
      }
      var line = chunk.slice(i0, i - k);
      if (k) emitter.emit("line", line, ++lineNumber);
      else { if (i0 !== i) lineFragments.push(line); break; }
    }
  }

  function end() {
    if (lineFragments.length) emitter.emit("line", Buffer.concat(lineFragments), ++lineNumber);
    emitter.emit("end");
  }

  function error(e) {
    emitter.emit("error", e);
  }

  return emitter;
};
