var app = angular.module('zurf');

app.controller('BreakListCtrl', function($scope, $state, surfBreakService) {
  surfBreakService.surfBreaks().then(function(data) {
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
  surfBreakService.getSurfBreak($stateParams.id).then(function(data) {
      $scope.break = data;
  });
  $scope.clickFav = function() {
    $scope.fav = $scope.fav ? false : true;
  };
});