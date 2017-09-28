angular.module('sliderApp')
  .directive('noUiSlider', [function() {
    return {
      restrict: 'E',
      require: 'ngModel',
      link: function($scope, $element, $attr, ngModelCtrl) {
        $element.noUiSlider({
          start: 0, // might not have the initial value in ngModelCtrl yet
          range: {
            // $attrs gives us string values by default
            // noUiSlider expects numbers so we need to convert
            min: Number($attr.rangeMin),
            max: Number($attr.rangeMax)
          }
        });

        // when data within angular changes, notify third party directive
        ngModelCtrl.$render = function() {
          $element.val(ngModelCtrl.$viewValue);
        };

        // when data changes outside of angular
        $element.on('set', function(args) {
          // tell angular that it needs to update the UI
          $scope.$apply(function() {
            // set the data within angular
            ngModelCtrl.$setViewValue($element.val());
          });
        });
      }
    };
  }]);