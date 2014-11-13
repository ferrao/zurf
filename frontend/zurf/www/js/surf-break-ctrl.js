var app = angular.module('zurf');

app.controller('BreakListCtrl', function($scope, $state, surfBreakService) {

  surfBreakService.surfBreaks(function(data) {

    if ($state.is('tab.break-list')) {
      $scope.breaks = data;
    } else {
      $scope.breaks = data.filter(function(value) {
        return value.favorite;
      });
    }

  });

});

app.controller('BreakDetailCtrl', function($scope, $stateParams, surfBreakService) {

  $scope.fav = false;

  surfBreakService.getSurfBreak($stateParams.id, function(data) {

    $scope.break = data;

  });

  $scope.clickFav = function() {
    $scope.fav = $scope.fav ? false : true ;
  };

});