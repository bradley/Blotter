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
        'src/extras/core/messaging.js',
        'src/extras/core/vendorPrefixes.js',
        'src/extras/objects/modelEventBinding.js',
        'src/extras/canvasUtils.js',
        'src/extras/textUtils.js',
        'src/extras/uniformUtils.js',
        'src/texts/text.js',
        'src/materials/mapping/mapping.js',
        'src/materials/mapping/mappingMaterial.js',
        'src/materials/material.js',
        'src/materials/shaderMaterial.js',
        'src/materials/effects/bubbleShiftMaterial.js',
        'src/rendering/renderer.js',
        'src/rendering/renderScope.js',
        'src/builders/textures/boundsDataTextureBuilder.js',
        'src/builders/textures/indicesDataTextureBuilder.js',
        'src/builders/textures/textTextureBuilder.js',
        'src/builders/mappingBuilder.js',
        'src/builders/mappingMaterialBuilder.js'
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