/* globals module */

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {

      licenseFile : 'license.txt',

      depFiles : [
        'third-party/underscore/underscore.js',
        'third-party/three/three.js',
        'third-party/three/Detector.js',
        'third-party/set_immediate/setimmediate.js',
        'third-party/event_emitter/EventEmitter.js',
        'third-party/packer/packer.growing.js',
        'third-party/request_animation_frame/requestAnimationFrame.js'
      ],

      srcFiles : [
        'src/blotter.js',
        'src/core/_messaging.js',
        'src/core/_vendorPrefixes.js',
        'src/utils/_canvasUtils.js',
        'src/utils/_textUtils.js',
        'src/utils/_uniformUtils.js',
        'src/text/_textsMapper.js',
        'src/text/text.js',
        'src/texture/_textsTexture.js',
        'src/texture/_textsIndicesTexture.js',
        'src/texture/_textsBoundsTexture.js',
        'src/material/_materialScope.js',
        'src/material/material.js',
        'src/renderer/_backBufferRenderer.js',
        'src/renderer/_rendererScope.js'
      ]
    },

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'concat']
      }
    },

    jshint: {
      options: {
        jshintrc: true,
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    concat: {
      options: {
        separator: '\n'
      },
      clean : {
        src: [
          "<%= meta.licenseFile %>",
          "<%= meta.srcFiles %>"
        ],
        dest: 'build/blotter.clean.js'
      },
      dist: {
        src: [
          '<%= meta.licenseFile %>',
          '<%= meta.depFiles %>',
          '<%= meta.srcFiles %>'
        ],
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    uglify: {
       release: {
         src: ['build/blotter.js'],
        dest: 'build/blotter.min.js'
       }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-closure-tools');

  // Default task
  grunt.registerTask('default', ['jshint' , 'concat', 'uglify']);
};