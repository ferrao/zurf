var app = angular.module('zurf');

app.controller('breakCtrl', function($scope, $http, $stateParams) {

  $http.get('http://localhost:8000/break/' + $stateParams.id).then(function(resp) {

    $scope.break = resp.data;

  }, function(err) {

    console.error('ERR', err);

  });
});