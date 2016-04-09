angular.module('app.controllers', [])
.run(function($rootScope, LocalStorage){
  $rootScope.checkings = LocalStorage.get('checkings', []);
})
  
.controller('listingCtrl', function($scope, LocalStorage) {
  $scope.deleteChecking = function(checking){
    if(confirm('Are you sure want to delete?')){
      var index = $scope.checkings.indexOf(checking);
      $scope.checkings.splice(index, 1);
      LocalStorage.set('checkings', $scope.checkings)
    };
  }
})
   
.controller('locationDetailsCtrl', function($scope, $stateParams, $rootScope) {
  $scope.checking = $rootScope.checkings.filter(function(checking){
    return checking.id == $stateParams.id
  }).pop()
})
   
.controller('getLocationCtrl', function($scope, $state, $rootScope, $cordovaGeolocation, LocalStorage, ReverseGeocoder) {
  $cordovaGeolocation.getCurrentPosition({
    timeout: 20000,
    maximumAge: 300000,
    enableHighAccuracy: false,
  }).then(function(results){
    console.log('success');
    console.log(results)
    $scope.latitude = results.coords.latitude;
    $scope.longitude = results.coords.longitude;
    ReverseGeocoder.get(results.coords.latitude, results.coords.longitude)
      .then(function(results){
        $scope.address = results.address;
        $scope.map = results.map;
      }, function(error){
        console.log(error)
      });
  }, function(){
    console.log('error')
  })

  $scope.description = '';
  $scope.address = '';

  $scope.saveLocation = function(){
    $scope.checkings.push({
      id: $rootScope.checkings.length + 1,
      latitude: $scope.latitude,
      longitude: $scope.longitude,
      address: $scope.address,
      description: $scope.description,
      map: $scope.map,
    });
    LocalStorage.set('checkings', $scope.checkings)
    $state.go('listing');
  };
})
 