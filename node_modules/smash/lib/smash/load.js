var vm = require("vm"),
    smash = require("./smash");

// Loads the specified files and their imports, then evaluates the specified
// expression in the context of the concatenated code.
module.exports = function(files, expression, sandbox, callback) {
  if (arguments.length < 4) callback = sandbox, sandbox = undefined;
  var chunks = [];
  smash(files)
      .on("error", callback)
      .on("data", function(chunk) { chunks.push(chunk); })
      .on("end", function() {
        var error, result;
        try { result = vm.runInNewContext(chunks.join("") + ";(" + expression + ")", sandbox); }
        catch (e) { error = e; }
        callback(error, result);
      });
};
