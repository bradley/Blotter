var vows = require("vows"),
    assert = require("assert"),
    smash = require("../");

var suite = vows.describe("smash.readImports");

suite.addBatch({
  "readImports": {
    "on a file with no imports": {
      topic: function() {
        smash.readImports("test/data/foo.js", this.callback);
      },
      "returns the empty array": function(imports) {
        assert.deepEqual(imports, []);
      }
    },
    "on a file with imports with trailing comments": {
      topic: function() {
        smash.readImports("test/data/trailing-comment-import.js", this.callback);
      },
      "returns the empty array": function(imports) {
        assert.deepEqual(imports, ["test/data/foo.js", "test/data/bar.js"]);
      }
    },
    "on a file with invalid import syntax": {
      topic: function() {
        var callback = this.callback;
        smash.readImports("test/data/invalid-import-syntax.js", function(error) {
          callback(null, error);
        });
      },
      "throws an error with the expected message": function(error) {
        assert.deepEqual(error.message, "invalid import: test/data/invalid-import-syntax.js:0: import foo;");
      }
    },
    "on a file with that imports a file that does not exist": {
      topic: function() {
        smash.readImports("test/data/imports-not-found.js", this.callback);
      },
      "returns the expected import": function(imports) {
        assert.deepEqual(imports, ["test/data/not-found.js"]);
      }
    },
    "on a file with a commented-out import": {
      topic: function() {
        smash.readImports("test/data/commented-import.js", this.callback);
      },
      "ignores the commented-out input": function(imports) {
        assert.deepEqual(imports, []);
      }
    },
    "on a file with a not-commented-out import": {
      topic: function() {
        smash.readImports("test/data/not-commented-import.js", this.callback);
      },
      "does not ignore the not-commented-out import": function(imports) {
        assert.deepEqual(imports, ["test/data/foo.js"]);
      }
    },
    "on a file with one import": {
      topic: function() {
        smash.readImports("test/data/imports-foo.js", this.callback);
      },
      "returns the expected import": function(imports) {
        assert.deepEqual(imports, ["test/data/foo.js"]);
      }
    },
    "on a file with multiple imports": {
      topic: function() {
        smash.readImports("test/data/imports-foo-bar-baz.js", this.callback);
      },
      "returns the expected imports, in order": function(imports) {
        assert.deepEqual(imports, ["test/data/foo.js", "test/data/bar.js", "test/data/baz.js"]);
      }
    },
    "on a file with multiple redundant imports": {
      topic: function() {
        smash.readImports("test/data/imports-foo-foo-bar-foo.js", this.callback);
      },
      "returns all imports, in order": function(imports) {
        assert.deepEqual(imports, ["test/data/foo.js", "test/data/foo.js", "test/data/bar.js", "test/data/foo.js"]);
      }
    },
    "on a file with nested imports": {
      topic: function() {
        smash.readImports("test/data/imports-imports-foo.js", this.callback);
      },
      "returns the expected imports, in order": function(imports) {
        assert.deepEqual(imports, ["test/data/imports-foo.js"]);
      }
    },
    "on a file that imports itself": {
      topic: function() {
        smash.readImports("test/data/imports-self.js", this.callback);
      },
      "returns the expected import": function(imports) {
        assert.deepEqual(imports, ["test/data/imports-self.js"]);
      }
    }
  }
});

suite.export(module);
