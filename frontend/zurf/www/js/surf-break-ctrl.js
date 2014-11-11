var app = angular.module('zurf');

app.controller('BreakListCtrl', function($scope, $state, surfBreakService) {

  surfBreakService.surfBreaks(function(data) {

    if ($state.is('tab.favorites')) {

      $scope.breaks = data.filter(function(value) {
        return value.favorite;
      });

    } else {

      $scope.breaks = data;
    }

  });

});

app.controller('BreakDetailCtrl', function($scope, $stateParams, surfBreakService) {

  surfBreakService.getSurfBreak($stateParams.id, function(data) {

    $scope.break = data;

  });

});