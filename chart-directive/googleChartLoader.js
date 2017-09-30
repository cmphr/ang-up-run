angular.module('googleChartApp')
  .factory('googleChartLoaderPromise',
    ['$q', '$rootScope', '$window', function($q, $rootScope, $window) {
      var deferred = $q.defer(); // a deferred object

      // load google charts asynchronously
      $window.google.load('visualization', '1', {
        packages: ['corechart'],
        callback: function() {
          // when loaded, trigger the resolve inside an $apply
          // as the event happens outside of angular life cycle
          $rootScope.$apply(function() {
            deferred.resolve();
          });
        }
      });

      // return promise object to be used by directive
      return deferred.promise;
  }]);