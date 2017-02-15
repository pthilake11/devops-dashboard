// public/js/controllers/LoginCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', function($scope, $location) {

    $scope.copyright = '© Copyright 2017. AutoBots Team'; 
    
    $scope.submit=function() {
       //@todo: integrate with proper authentication mechanism before redirect
       $location.path( "/portfolio" ); 
    }
   
});