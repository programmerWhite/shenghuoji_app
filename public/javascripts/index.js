/**
 * Created by Raintree on 2018/3/19.
 */
var app = angular.module('app',['ngRoute'])
    .config(function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'login',
                controller:"loginController"
            })
            .when('/login',{
                templateUrl:'login',
                controller:"loginController"
            })
            .when('/sign',{
                templateUrl:'sign',
                controller:"signPageController"
            })
            .when('/home',{templateUrl:'home'})
            .when('/findPassword',{templateUrl:'findPassword'})
            .when('/myHome',{templateUrl:'myHome'})
            .when('/myLove',{
                templateUrl:'myLove',
                controller:"myLoveController"
            })
            .when('/whisper',{
                templateUrl:'whisper',
                controller:"whisperController"
            })
            .otherwise({redirectTo:'login'});

        $locationProvider.hashPrefix('');
    });

// contact page controller
app.controller('myAppController', function($scope) {

});

