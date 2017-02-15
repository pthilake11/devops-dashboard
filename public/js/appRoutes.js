// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        
        .when('/portfolio', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        
        .when('/details', {
            templateUrl: 'views/details.html',
            controller: 'DetailsController'
        });
        
    $locationProvider.html5Mode(true);

}]);