angular.module('stockMarketApp')
  .directive('simpleStockRepeat', [function () {
    return {
      restrict: 'A',
      transclude: 'element', // replace entire element, not just content
      link: function ($scope, $element, $attrs, ctrl, $transclude) {
        var myArray = $scope.$eval($attrs.simpleStockRepeat);

        var container = angular.element('<div class="container"></div>');

        for (var i = 0; i < myArray.length; i++) {
          // $transclude is a constructor that allows
          // create an element instance with a new child
          // scope using the clone linking function
          var instance = $transclude($scope.$new(), function(clonedElement, newScope) {
            // expose custom variables for the instance
            newScope.currentIndex = i;
            newScope.stock = myArray[i];
          });
          container.append(instance);
        }

        // original element is replaced with a comment
        // so add the new container after it
        $element.after(container);
      }
    };
  }]);