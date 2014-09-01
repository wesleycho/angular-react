'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        'Gruntfile.js',
        'src/angular-react.js',
        'tests/angular-react.spec.js',
        'demo/demo.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true,
        logLevel: 'ERROR'
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'karma:unit']);
};