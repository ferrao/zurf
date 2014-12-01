var app = angular.module('zurf');

app.factory('UserService', ['$http', function($http) {

  var urlBase = 'http://localhost:8090/users';

  return {

    users: function() {
      return $http.get(urlBase)
        .then(function(resp) {
          return resp.data;
        }, function(err) {
          console.error('ERR', err);
        });
    },

    getUser: function(id) {
      return $http.get(urlBase + '/' + id)
        .then(function(resp) {
          return resp.data;
        }, function(err) {
          console.error('ERR', err);
        });
    }
  };
}]);