var app = angular.module('zurf');

app.controller('UserListCtrl', function($scope, UserService) {
  UserService.users().then(function(data) {
    $scope.users = data;
  });
});

app.controller('UserDetailCtrl', function($scope, $stateParams, UserService) {
  UserService.getUser($stateParams.id)
    .then(function(data) {
      $scope.user = data;
    });
});