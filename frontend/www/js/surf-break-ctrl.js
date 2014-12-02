var app = angular.module('zurf');

app.controller('RegionsCtrl', function($scope, SurfBreakService) {
  SurfBreakService.getRegions()
    .then(function(data) {
      $scope.regions = data;
    });
});

app.controller('BreakListCtrl', function($scope, $state, SurfBreakService) {
  SurfBreakService.surfBreaks()
    .then(function(data) {
      if ($state.is('tab.regions.break-list')) {
        $scope.breaks = data;
      } else if ($state.is('tab.break-list-fav')) {
        $scope.breaks = data.filter(function(value) {
          return (value.id % 2) === 0;
        });
      }
    });
});

app.controller('BreakDetailCtrl', function($scope, $stateParams, SurfBreakService, MswService) {

  $scope.fav = false;

  SurfBreakService.getSurfBreak($stateParams.id)
    .then(function(data) {
      $scope.break = data;
      return MswService.getLastForecast($scope.break.mswid);
    })
    .then(function(data) {

      var d = new Date(data.localTimestamp * 1000);

      $scope.break.forecast = data;
      $scope.break.date = d.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });

    });

  $scope.clickFav = function() {
    $scope.fav = $scope.fav ? false : true;
  };
});