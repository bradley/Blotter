module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    meta: {

      licenseFile : "license.txt",

      depFiles : [
        "third_party/underscore/underscore.js",
        "third_party/three/three.custom.js",
        "third_party/three/Detector.js",
        "third_party/set_immediate/setimmediate.js",
        "third_party/event_emitter/EventEmitter.js",
        "third_party/bin-packing/packer.growing.js",
        "third_party/request_animation_frame/requestAnimationFrame.js"
      ],

      srcFiles : [
        "src/blotter.js",
        "src/extras/*/*.js",
        "src/extras/*.js",
        "src/texts/*.js",
        "src/assets/*/*/*.js",
        "src/assets/*/*.js",
        "src/mapping/*.js",
        "src/materials/*.js",
        "src/rendering/*.js",
        "src/builders/*/*.js",
        "src/builders/*.js",
      ]
    },

    watch: {
      scripts: {
        files: ["src/**/*.js"],
        tasks: ["jshint", "concat"]
      }
    },

    jshint: {
      options: {
        jshintrc: true,
        reporterOutput: ""
      },
      all: ["Gruntfile.js", "src/**/*.js"]
    },

    concat: {
      options: {
        separator: "\n"
      },
      dist: {
        src: [
          "<%= meta.licenseFile %>",
          "<%= meta.depFiles %>",
          "<%= meta.srcFiles %>"
        ],
        dest: "build/<%= pkg.name %>.js"
      }
    },

    uglify: {
      options: {
        preserveComments: "some"
      },
      release: {
        src: ["build/<%= pkg.name %>.js"],
        dest: "build/<%= pkg.name %>.min.js"
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-closure-tools");

  // Default task
  grunt.registerTask("default", ["jshint" , "concat", "uglify"]);
};
