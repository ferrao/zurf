var app = angular.module('zurf');

app.controller('BreakListCtrl', function($scope, $state, SurfBreakService) {
  SurfBreakService.surfBreaks()
    .then(function(data) {
      if ($state.is('tab.break-list')) {
        $scope.breaks = data;
      } else {
        $scope.breaks = data.filter(function(value) {
          return value.favorite;
        });
      }
    });
});

app.controller('BreakDetailCtrl', function($scope, $stateParams, SurfBreakService, MswService) {

  $scope.fav = false;

  SurfBreakService.getSurfBreak($stateParams.id)
    .then(function(data) {
      $scope.break = data;
      return MswService.getLastSwellChart($scope.break.mswid);
    })
    .then(function(data) {
      $scope.break.chart = data;
    });

  $scope.clickFav = function() {
    $scope.fav = $scope.fav ? false : true;
  };
});