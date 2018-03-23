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

function noticeDiv(text,time,callBack){
    if($('.animate-notice-div').length == 0){
        $('body').append('<div class="animate-notice-div"></div>');
    }
    $('.animate-notice-div').css({
        'width':'300px',
        'background-color':'black',
        'color':'white',
        'padding':'20px',
        'box-sizing':'border-box',
        'text-align':'center',
        'border-radius':'6px',
        'line-height':'30px',
        'position':'fixed',
        'left':'50%',
        'top':'50%',
        'margin-left':'-150px',
        'margin-top':'-100px',
        'z-index':100
    })
    $('.animate-notice-div').animate().stop();
    $('.animate-notice-div').text(text);
    $('.animate-notice-div').show();
    $('.animate-notice-div').css('opacity','1');
    $('.animate-notice-div').animate({'opacity':'0'},time,function(){
        $('.animate-notice-div').remove();
        $('.animate-notice-div').css('opacity','1');
        if(!!callBack){
            callBack();
        }
    });
}
