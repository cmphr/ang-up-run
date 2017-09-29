angular.module('stockMarketApp')
  .directive('validZip', [function() {
    var zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/g;
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, $element, $attrs, ngModelCtrl) {
        // also, $asyncValidators is available, the function would return a promise, successfully resolved is valid
        ngModelCtrl.$validators.zip = function(value) {
          return zipCodeRegex.test(value);
        };
      }
    };
  }]);