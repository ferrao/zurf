var app = angular.module('zurf');

app.controller('LoginCtrl', function($scope, $state, OpenFB) {

    $scope.login = function(user) {
        console.log('Login', user.username);
        $scope.user = user.username;
        $state.go('tab.break-list-fav');
    };

    $scope.fbLogin = function() {

        OpenFB.login('email').then(function() {

            var result = OpenFB.get('/me');
            return result;

        }).then(function(result) {

            console.log('Login', result.data.name);
            $scope.user = result.data.name;
            $state.go('tab.break-list-fav');

        }).then(null, function(err) {

            console.error('Error in LoginCtrl : ', err);
            $state.go('error');

        });

    };

});