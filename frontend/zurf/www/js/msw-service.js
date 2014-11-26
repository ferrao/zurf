var app = angular.module('zurf');

app.factory('MswService', ['$http', function($http) {

  var apiKey = "U2LljDYhRF01T50f9ip52Ou6G5mQhzez";
  var urlBase = "http://magicseaweed.com/api/" + apiKey + "/forecast/";

  return {

    getLastSwellChart: function(id) {

       return $http.get(urlBase + "?spot_id=" + id).then(function(resp) {
          return resp.data[0].charts.swell;
        }, function(err) {
          console.error('ERR', err);
        });

    }
  };

}]);