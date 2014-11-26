var app = angular.module('zurf');

app.factory('MswService', ['$http', function($http) {

  var apiKey = "U2LljDYhRF01T50f9ip52Ou6G5mQhzez";
  var urlBase = "http://magicseaweed.com/api/" + apiKey + "/forecast/";

  return {

    getLastForecast: function(id) {

      return $http.get(urlBase + "?spot_id=" + id)
        .then(function(resp) {

          var i;

          for (i = 0; i < resp.data.length - 1; i++) {
            if (resp.data[i].timestamp * 1000 > Date.now()) {
              break;
            }
          }

          return resp.data[i];
        }, function(err) {
          console.error('ERR', err);
        });

    }
  };

}]);