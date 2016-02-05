var vows = require("vows"),
    assert = require("assert"),
    expandFile = require("../lib/smash/expand-file");

var suite = vows.describe("smash.expandFile");

suite.addBatch({
  "expandFile": {
    "adds the specified file extension if necessary": function() {
      assert.equal("foo.js", expandFile("foo", ".js"));
      assert.equal("foo.coffee", expandFile("foo", ".coffee"));
    },
    "adds index.extension if the file has a trailing slash": function() {
      assert.equal("foo/index.js", expandFile("foo/", ".js"));
      assert.equal("foo/index.coffee", expandFile("foo/", ".coffee"));
    },
    "does nothing if the file already has an extension": function() {
      assert.equal("foo.js", expandFile("foo.js"));
      assert.equal("foo.js", expandFile("foo.js", ".coffee"));
    },
    "uses the specified extension, even if it is the empty string": function() {
      assert.equal("foo", expandFile("foo", ""));
      assert.equal("foo/index", expandFile("foo/", ""));
    },
    "coerces the specified extension to a string": function() {
      assert.equal("foo.1", expandFile("foo", {toString: function() { return ".1"; }}));
      assert.equal("foo/index1", expandFile("foo/", 1));
    },
    "does not require a \".\" in the file extension": function() {
      assert.equal("foo_bar", expandFile("foo", "_bar"));
      assert.equal("foo/index_bar", expandFile("foo/", "_bar"));
    },
    "uses the specified extension, even if it is falsey": function() {
      assert.equal("foofalse", expandFile("foo", false));
      assert.equal("foo/indexfalse", expandFile("foo/", false));
      assert.equal("foo0", expandFile("foo", 0));
      assert.equal("foo/index0", expandFile("foo/", 0));
    },
    "uses the default extension (.js), if not specified": function() {
      assert.equal("foo.js", expandFile("foo"));
      assert.equal("foo/index.js", expandFile("foo/"));
    },
    "uses the default extension (.js), if null or undefined": function() {
      assert.equal("foo.js", expandFile("foo", null));
      assert.equal("foo/index.js", expandFile("foo/", null));
      assert.equal("foo.js", expandFile("foo", undefined));
      assert.equal("foo/index.js", expandFile("foo/", undefined));
    }
  }
});

suite.export(module);
