// public/js/controllers/LoginCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', function($scope, $location,$http) {

    $scope.copyright = '© Copyright 2017. AutoBots Team';
    
    $scope.login = function() {
       //@todo: integrate with proper authentication mechanism before redirect
      // $location.path( "/portfolio" );
        console.log($scope.username,$scope.password);
        $http.post('/api/login', $scope.user).success(function(data) {
            //$rootScope.authenticated = $localStorage.authenticated = true;
        });
    };
   
});