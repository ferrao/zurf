var app = angular.module('zurf');

app.controller('breakListCtrl', function($scope, $stateParams, surfBreakService) {

  surfBreakService.surfBreaks(function(data) {
    $scope.breaks = data;
  });

});

app.controller('breakDetailCtrl', function($scope, $stateParams, surfBreakService) {

  surfBreakService.getSurfBreak($stateParams.id, function(data) {
    $scope.break = data;
  });

});