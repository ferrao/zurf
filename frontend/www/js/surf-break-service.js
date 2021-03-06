var app = angular.module('zurf');

app.factory('SurfBreakService', ['$http', function($http) {

    var urlBase = 'http://localhost:8090';
    var spotsRoute = 'spots';
    var regionsRoute = 'regions';

    return {

        surfBreaks: function(region) {

            var url = urlBase + '/' + spotsRoute + (region ? '/region/' + region : '');

            return $http.get(url).then(function(resp) {
                return resp.data;
            }, function(err) {
                console.error('Error in SurfBreakService.surfBreaks() :', err.data);
                throw err;
            });
        },

        getSurfBreak: function(id) {

            var url = urlBase + '/' + spotsRoute + '/' + id;

            return $http.get(url).then(function(resp) {
                return resp.data;
            }, function(err) {
                console.error('Error in SurfBreakService.surfBreaks() : ', err.data);
                throw err;
            });
        },

        getRegions: function() {

            var url = urlBase + '/' + regionsRoute;

            return $http.get(url).then(function(resp) {
                return resp.data;
            }, function(err) {
                console.error('Error in SurfBreakService.getRegions() : ', err.data);
                throw err;
            });
        }
    };
}]);