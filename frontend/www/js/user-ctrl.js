var app = angular.module('zurf');

app.controller('UserListCtrl', function($scope, $state, UserService) {

    UserService.users().then(function(data) {
        $scope.users = data;
    }, function(error) {
        console.error('Error in UserListCtrl : ', error);
        $state.go('error');
    });

});

app.controller('UserDetailCtrl', function($scope, $state, $stateParams, UserService) {

    UserService.getUser($stateParams.id).then(function(data) {
        $scope.user = data;
    }, function(error) {
        console.error('Error in UserDetailCtrl : ', error);
        $state.go('error');
    });

});