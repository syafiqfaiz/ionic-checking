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

.service('BlankService', [function(){

}]);