// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', ['$scope','ApiService',function($scope,ApiService) {

    //$scope.copyright = '© Copyright 2017. AutoBots Team';// @todo: move this to header may be

    $scope.getApplications = function(){
        ApiService.getApplications().then(function(applications){
            $scope.applications = applications.data;
        });
    };

}]);