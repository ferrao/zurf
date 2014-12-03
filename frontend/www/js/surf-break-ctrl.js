var app = angular.module('zurf');

app.controller('RegionsCtrl', function($scope, $state, SurfBreakService) {
  SurfBreakService.getRegions()
    .then(function(data) {
      $scope.regions = data;
    }, function(error) {
     console.error('Error in RegionsCtrl : ', error);
     $state.go('error');
    });
});

app.controller('BreakListCtrl', function($scope, $state, $stateParams, SurfBreakService) {

  SurfBreakService.surfBreaks($stateParams.region)
    .then(function(data) {

      if ($state.is('tab.break-list-fav')) {
        $scope.breaks = data.filter(function(value) {
          return (value.id % 2) === 0;
        });
      } else {
        $scope.breaks = data;
      }
    }, function(error) {
      console.error('Error in BreakListCtrl : ', error);
      $state.go('error');
    });
});

app.controller('BreakDetailCtrl', function($scope, $state, $stateParams, SurfBreakService, MswService) {

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

    })
    .then(null, function(err) {
      console.error('Error in BreakDetailCtrl : ', err);
      $state.go('error');
    });

  $scope.clickFav = function() {
    $scope.fav = $scope.fav ? false : true;
  };
});