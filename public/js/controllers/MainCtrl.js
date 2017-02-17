// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', ['$scope','ApiService',function($scope,ApiService) {


    $scope.getApplications = function(){
        ApiService.getApplications().then(function(applications){
            $scope.applications = applications.data;

        });
    };

}]);