var smash = module.exports = require("./lib/smash/smash");
smash.version = require("./package").version;
smash.load = require("./lib/smash/load");
smash.readGraph = require("./lib/smash/read-graph");
smash.readAllImports = require("./lib/smash/read-all-imports");
smash.readImports = require("./lib/smash/read-imports");
