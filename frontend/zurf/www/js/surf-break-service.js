var app = angular.module('zurf');

app.factory('surfBreakService', ['$http', function($http) {

    var urlBase = 'http://localhost:8000/breaks';

    return {
      surfBreaks: function(callback) {
        $http.get(urlBase).then(function(resp) {
          return callback(resp.data);
        }, function(err) {
          console.error('ERR', err);
        });
      },
      getSurfBreak: function(id, callback) {
        $http.get(urlBase + '/' + id).then(function(resp) {
          return callback(resp.data);
        }, function(err) {
          console.error('ERR', err);
        });
      }
    };
}]);