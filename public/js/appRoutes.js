// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/application', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        
        .when('/application/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        
        .when('/application/portfolio', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        
        .when('/application/details/:applicationId', {
            templateUrl: 'views/details.html',
            controller: 'DetailsController'
        });
        
    $locationProvider.html5Mode(true);

}]);