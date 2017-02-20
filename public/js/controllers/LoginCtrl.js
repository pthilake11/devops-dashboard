// public/js/controllers/LoginCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$location','$http','$rootScope',function($scope, $location,$http, $rootScope) {

    $scope.login = function() {
        $scope.user = { 'userName' : $scope.username, 'password' : $scope.password };
        $http.post('/auth/login', $scope.user).then(function(auth) {
        console.log(auth);
            if( 'success' === auth.data.state) {
               $rootScope.authenticated = true;
               $rootScope.userid = 'usr1001';
               $location.path( "/application/portfolio" );
            };            
        },function(failure) {
            console.log('fail');
        });
     
    };
   
}]);