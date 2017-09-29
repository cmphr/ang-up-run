angular.module('dynamicFormApp', [])
  .controller('MainCtrl', [function() {
    var vm = this;
    vm.username = '';
    vm.password = '';
  }]);