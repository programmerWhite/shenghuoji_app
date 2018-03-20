/**
 * Created by Raintree on 2018/3/19.
 */
var app = angular.module('app',['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/',{templateUrl:'login'})
            .when('/login',{
                templateUrl:'login',
                controller:"loginController"
            })
            .when('/sign',{templateUrl:'sign'})
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
});

// contact page controller
app.controller('myAppController', function($scope) {

});

