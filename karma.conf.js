//jshint strict: false
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'angular.min.js',
      'angular-mocks.js',
      'chapter12/*.js'
    ],
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    reporters: ['spec'],
    colors: true
  });
};
