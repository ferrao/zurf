var app = angular.module('zurf');

app.controller('LoginCtrl', function($scope, $state) {

    $scope.login = function(user) {
        console.log('Login', user);
        $state.go('tab.break-list-fav');
    };

});