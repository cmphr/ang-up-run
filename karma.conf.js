//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      'angular.min.js',
      'angular-mocks.js',
      'controller.js',
      'simpleSpec.js',
      'controllerSpec.js'
    ],

    exclude: [],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]

  });
};
