var app = angular.module('zurf');

app.factory('SurfBreakService', ['$http', function($http) {

  var urlBase = 'http://localhost:8090';
  var spotsRoute = 'spots';
  var regionsRoute = 'regions';

  return {

    surfBreaks: function() {
      return $http.get(urlBase + '/' + spotsRoute)
        .then(function(resp) {
          return resp.data;
        }, function(err) {
          console.error('ERR', err);
        });
    },

    getSurfBreak: function(id) {
      return $http.get(urlBase + '/' + spotsRoute + '/' + id)
        .then(function(resp) {
          return resp.data;
        }, function(err) {
          console.error('ERR', err);
        });
    },

    getRegions: function() {
      return $http.get(urlBase + '/' + regionsRoute)
        .then(function(resp) {
          return resp.data;
        }, function(err) {
          console.error('ERR', err);
        });
    }
  };
}]);