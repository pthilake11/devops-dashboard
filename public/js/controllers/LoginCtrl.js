// public/js/controllers/LoginCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$location','$http','$rootScope',function($scope, $location,$http, $rootScope) {

    $scope.login = function() {
       //@todo: integrate with proper authentication mechanism before redirect
        $rootScope.authenticated = true;
        $rootScope.userid = 'usr1001';// @todo: set this based on authenitcation response
        $location.path( "/portfolio" );
        /*console.log($scope.username,$scope.password);
        $http.post('/api/login', $scope.user).success(function(data) {
            //$rootScope.authenticated = $localStorage.authenticated = true;
        });*/
    };
   
}]);