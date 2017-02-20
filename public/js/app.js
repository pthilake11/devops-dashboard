// public/js/app.js
angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'LoginCtrl','DetailsCtrl','ApiService','nvd3']).run(function($rootScope){

    $rootScope.copyright = '© Copyright 2017. AutoBots Team';
    $rootScope.failure = false;
    //$rootScope.authenticated = false;
    //$rootScope.applications = [];

});