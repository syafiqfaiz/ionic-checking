angular.module('app.services', [])

.factory('LocalStorage', function(){
  return {
    get: function(key, defaults){
      var data = localStorage.getItem(key);
      if(data){
        return JSON.parse(data);
      }
      return defaults;
    },
    set: function(key, data){
      localStorage.setItem(key, JSON.stringify(data))
    }
  }
})

.factory('ReverseGeocoder', function($http, $q){
  return {
    get: function(latitude, longitude) {
      var deferred = $q.defer();
      $http.get('http://www.mapquestapi.com/geocoding/v1/reverse?key=glZYY2d2Nb7H8aGz2ggDsf7DIKXckzbM&location=' + latitude + ',' + longitude)
        .then(function(response){
          var addressObject = response.data.results[0].locations[0];
          var addressString = 
            addressObject.street + ', ' +
            addressObject.adminArea6 + ', ' +
            addressObject.adminArea5 + ', ' +
            addressObject.adminArea3 + ', ' +
            addressObject.postalCode + ', ' +
            addressObject.adminArea1;
          var mapString = addressObject.mapUrl;
          deferred.resolve({
            address: addressString,
            map: mapString
          });
        }, function(err){
          deferred.reject();
        });
      return deferred.promise;
    }
  }
})

.service('BlankService', [function(){

}]);