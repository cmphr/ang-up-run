angular.module('googleChartApp', [])
  controller('MainCtrl', [function() {
    var vm = this;

    vm.pieChartData = [
      {label: 'First', value: 25},
      {label: 'Second', value: 54},
      {label: 'Third', value: 75},
    ];

    vm.pieChartConfig = {
      title: 'One Two Three Chart',
      firstColumnHeader: 'Counter',
      secondColumnHeader: 'Actual Value'
    };

    vm.changeData = function() {
      vm.pieChartData[1].value = 25;
    };
  }]);