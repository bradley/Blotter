module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    meta: {
      srcFiles : [
        "third_party/codemirror.min.js",
        "third_party/javascript.js",
        "third_party/EventEmitter.js",
        "third_party/velocity.min.js",
        "third_party/velocity.ui.min.js",
        "third_party/blotter.min.js",
        "third_party/backbone-min.js",
        "third_party/backbone.marionette.min.js",
        "third_party/requestAnimationFrame.js",
        "third_party/dat.gui.js",
        "third_party/materials/channelSplitMaterial.js",
        "third_party/materials/fliesMaterial.js",
        "third_party/materials/liquidDistortMaterial.js",
        "third_party/materials/rollingDistortMaterial.js",
        "third_party/materials/slidingDoorMaterial.js",
        "src/materials/Material.js",
        "src/materials/ChannelSplitMaterial.js",
        "src/materials/FliesMaterial.js",
        "src/materials/LiquidDistortMaterial.js",
        "src/materials/RollingDistortMaterial.js",
        "src/materials/SlidingDoorMaterial.js",
        "src/hero_examples/Material.js",
        "src/hero_examples/ChannelSplitMaterial.js",
        "src/hero_examples/LiquidDistortMaterial.js",
        "src/app.js"
      ]
    },

    concat: {
      options: {
        separator: "\n"
      },
      dist: {
        src: [
          "<%= meta.srcFiles %>"
        ],
        dest: "dist/<%= pkg.name %>.js"
      }
    },

    uglify: {
      options: {
        preserveComments: "some"
      },
      release: {
        src: ["dist/<%= pkg.name %>.js"],
        dest: "dist/<%= pkg.name %>.min.js"
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-closure-tools");

  // Default task
  grunt.registerTask("default", ["concat", "uglify"]);
};
