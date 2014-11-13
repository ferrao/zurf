var app = angular.module('zurf');

app.factory('surfBreakService', ['$http', function($http) {

  var urlBase = 'http://localhost:8000/breaks';

  return {
    surfBreaks: function() {
      return $http.get(urlBase).then(function(resp) {
          return resp.data;
        }, function(err) {
          console.error('ERR', err);
        });
    },
    getSurfBreak: function(id) {
      return $http.get(urlBase + '/' + id).then(function(resp) {
          return resp.data;
        }, function(err) {
          console.error('ERR', err);
        });
    }
  };
}]);