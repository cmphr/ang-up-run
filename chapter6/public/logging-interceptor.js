angular.module('notesApp', [])
  .controller('MainCtrl', ['$http', function($http) {
    var self = this;
    self.items = [];
    self.newTodo = {};
    var fetchTodos = function() {
      return $http.get('/api/note').then(function(response) {
        self.items = response.data;
      }, function(errResponse) {
        console.log('Error while fetching notes');
      });
    };

    fetchTodos();

    self.add = function() {
      $http.post('/api/note', self.newTodo)
        .then(fetchTodos)
        .then(function(response) {
          self.newTodo = {};
        });
    };
  }])
  .factory('MyLoggingInterceptor', ['$q', function($q) {
    return {
      request: function(config) {
        console.log('Request made with ', config);
        //error/not allowed
        return $q.reject('Not allowed');
        //return config;
      },
      requestError: function(rejection) {
        console.log('Request error due to ', rejection);
        return $q.reject(rejection);
        //ok/no error - return someValue;
      },
      response: function(response) {
        console.log('Response from server ', response);
        // return a promise
        return response || $q.when(response);
      },
      responseError: function(rejection) {
        console.log('Error in response ', rejection);
        // can check auth status code
        if (rejection.status === 403) {
          // show login
          // return value to tell controllers this has been handled
        }
        // or return rejection to continue promise failure chain
        return $q.reject(rejection);
      }
    };
  }])
  .config(['$httpProvider', function($httpProvider) {
    console.log('The interceptors: ', $httpProvider.interceptors);
    $httpProvider.interceptors.push('MyLoggingInterceptor');
  }]);