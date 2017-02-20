// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', ['$scope','ApiService','$rootScope',function($scope,ApiService,$rootScope) {


    $scope.portfolios = [];
    $scope.applications = [];
    $scope.showTable = false;

    $scope.getPortfolio = function() {
        ApiService.getPortfolio($rootScope.userid).then(function(response) {
            $scope.portfolios = response.data.portfolios;
        },function(failure){
            console.log('error while retrieving portfolio data' + failure);
            $scope.failure = true;
        });
    };

    $scope.refresh = function(event) {
        var portfolioId = event.target.id;
        //@todo: set portfolio in session for usage on details page
        angular.forEach($scope.portfolios, function(portfolio, key) {
            if (portfolio.id == portfolioId) {
                $rootScope.applications = $scope.applications = portfolio.applications;
                $scope.showTable = true;
            }
        });
    }

}]);