var app = angular.module('zurf');

app.controller('LoginCtrl', function($scope, $state, OpenFB) {

    $scope.login = function(user) {
        console.log('Login', user);
        $state.go('tab.break-list-fav');
    };

    $scope.fbLogin = function() {

        OpenFB.login(fbLoginCallback, {
            scope: 'email'
        });

    };

    var fbLoginCallback = function(response) {

        if (response.status === 'connected') {
            console.log('Facebook login succeeded');
        } else {
            console.log('Facebook login failed');
        }
    };

});