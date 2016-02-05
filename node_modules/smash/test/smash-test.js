var vows = require("vows"),
    assert = require("assert"),
    fs = require("fs"),
    stream = require("stream"),
    smash = require("../");

var suite = vows.describe("smash");

suite.addBatch({
  "smash": {
    "on a file with no imports": testCase(["test/data/foo.js"], "test/data/foo.js"),
    "on a file with imports with trailing comments": testCase(["test/data/trailing-comment-import.js"], "test/data/trailing-comment-import-expected.js"),
    "on a file with single-quote import syntax": testCase(["test/data/single-quote-import.js"], "test/data/single-quote-import-expected.js"),
    "on a file with mismatched quote delimiters": testFailureCase(["test/data/mismatched-quotes.js"], {message: "invalid import: test/data/mismatched-quotes.js:0: import 'foo\";"}),
    "on a file with invalid import syntax": testFailureCase(["test/data/invalid-import-syntax.js"], {message: "invalid import: test/data/invalid-import-syntax.js:0: import foo;"}),
    "on a file with that imports a file that does not exist": testFailureCase(["test/data/imports-not-found.js"], {code: "ENOENT", path: "test/data/not-found.js"}),
    "on a file with a commented-out import": testCase(["test/data/commented-import.js"], "test/data/commented-import.js"),
    "on a file with a not-commented-out import": testCase(["test/data/not-commented-import.js"], "test/data/not-commented-import-expected.js"),
    "on a file with one import": testCase(["test/data/imports-foo.js"], "test/data/imports-foo-expected.js"),
    "on a file with multiple imports": testCase(["test/data/imports-foo-bar-baz.js"], "test/data/imports-foo-bar-baz-expected.js"),
    "on a file with nested imports": testCase(["test/data/imports-imports-foo.js"], "test/data/imports-imports-foo-expected.js"),
    "on a file with empty lines": testCase(["test/data/empty-lines.js"], "test/data/empty-lines.js"),
    "on a file which imports a file with empty lines": testCase(["test/data/import-empty-lines.js"], "test/data/empty-lines.js"),
    "on multiple input files": testCase(["test/data/foo.js", "test/data/bar.js", "test/data/baz.js"], "test/data/imports-foo-bar-baz-expected.js"),
    "with redundant input files": testCase(["test/data/foo.js", "test/data/foo.js"], "test/data/foo.js"),
    "on a file with multiple redundant imports": testCase(["test/data/imports-foo-foo-bar-foo.js"], "test/data/imports-foo-foo-bar-foo-expected.js"),
    "when a file imports itself": testCase(["test/data/imports-self.js"], "test/data/foo.js"),
    "when circular imports are encountered": testCase(["test/data/imports-circular-foo.js"], "test/data/imports-circular-foo-expected.js"),
    "when the input is a directory": testCase(["test/data/"], "test/data/index.js"),
    "when the input is missing a file extension": testCase(["test/data/imports-index"], "test/data/index.js")
  }
});

suite.export(module);

function testCase(inputs, expected) {
  return {
    topic: function() {
      smash(inputs).pipe(testStream(this.callback));
    },
    "produces the expected output": function(actual) {
      assert.deepEqual(actual, fs.readFileSync(expected, "utf8"));
    }
  };
}

function testFailureCase(inputs, expected) {
  return {
    topic: function() {
      var callback = this.callback;
      smash(inputs).on("error", function(error) {
        callback(null, error);
      });
    },
    "produces the expected error message": function(error) {
      for (var key in expected) {
        assert.equal(error[key], expected[key]);
      }
    }
  };
}

function testStream(callback) {
  var s = new stream.Writable, chunks = [];

  s._write = function(chunk, encoding, callback) {
    chunks.push(chunk);
    callback();
  };

  s.on("error", callback);
  s.on("finish", function() { callback(null, Buffer.concat(chunks).toString("utf8")); });
  return s;
}
