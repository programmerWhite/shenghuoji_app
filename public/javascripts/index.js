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
            .when('/findPassword',{templateUrl:'findPassword'})
            .when('/myLove',{
                templateUrl:'myLove',
                controller:"myLoveController"
            })
            .otherwise({redirectTo:'login'});
});

// contact page controller
app.controller('myAppController', function($scope) {

});

