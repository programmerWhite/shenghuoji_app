/**
 * Created by Raintree on 2018/3/19.
 */
var app = angular.module('app',['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/',{templateUrl:'home'})
            .when('/login',{templateUrl:'login'})
            .when('/sign',{templateUrl:'sign'})
            .when('/home',{templateUrl:'home'})
            .otherwise({redirectTo:'home'});
});

// contact page controller
app.controller('myAppController', function($scope) {
    $scope.indexName = "index";
});