/* globals module */

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {

      licenseFile : 'license.txt',

      depFiles : [
        'third_party/underscore/underscore.js',
        'third_party/three/three.js',
        'third_party/three/Detector.js',
        'third_party/set_immediate/setimmediate.js',
        'third_party/event_emitter/EventEmitter.js',
        'third_party/packer/packer.growing.js',
        'third_party/request_animation_frame/requestAnimationFrame.js'
      ],

      srcFiles : [
        'src/blotter.js',
        'src/core/_messaging.js',
        'src/core/_vendorPrefixes.js',
        'src/utils/_canvasUtils.js',
        'src/utils/_textUtils.js',
        'src/utils/_uniformUtils.js',
        'src/mapper/_mapper.js',
        'src/mapper/texture_providers/_textsTextureProvider.js',
        'src/mapper/texture_providers/_indicesDataTextureProvider.js',
        'src/mapper/texture_providers/_boundsDataTextureProvider.js',
        'src/scopes/_materialScope.js',
        'src/scopes/_renderScope.js',
        'src/renderer/_renderer.js',
        'src/text.js',
        'src/material.js'
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