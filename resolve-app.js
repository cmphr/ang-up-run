angular.module('resolveApp', ['ngRoute'])
  .value('Constant', {MAGIC_NUMBER: 42})
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      template: '<h3>Main Page, no resolves</h3>'
    })
    .when('/detail/:detId', {
      template: '<h2>Loaded {{myCtrl.detailId}}' +
        ' and query string is {{myCtrl.qStr}}</h2>',
      controller: ['$routeParams', function($routeParams) {
        this.detailId = $routeParams.detId;
        this.qStr = $routeParams.q;
      }],
      controllerAs: 'myCtrl'
    })
    .when('/protected', {
      template: '<h3>Protected Page</h3>',
      resolve: {
        immediate: ['Constant', function(Constant) {
          return Constant.MAGIC_NUMBER * 4;
        }],
        async: ['$http', function($http) {
          return $http.get('/api/hasAccess');
        }]
      },
      controller: ['$log', 'immediate', 'async', function($log, immediate, async) {
        $log.log('Immediate is ', immediate);
        $log.log('Server returned for async', async);
      }]
    })
  }]);