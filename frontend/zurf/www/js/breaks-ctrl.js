var app = angular.module('zurf');

app.controller('breaksCtrl', function($scope, $http) {

  $http.get('http://localhost:8000/breaks').then(function(resp) {

    $scope.breaks = resp.data;

  }, function(err) {

    console.error('ERR', err);

  });
});