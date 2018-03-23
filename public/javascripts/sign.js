/**
 * Created by Raintree on 2018/3/19.
 */

app.factory('signPageF', function ($http,$q) {
    var server = {};
    server.authorCodeF = function(emailV){
        var q = $q.defer();

        $http({
            method:"POST",
            url:"/sign/getAuthorCode",
            data:{email:emailV},
            dataType:"json"
        }).then(function successCallback(response) {
            q.resolve(response.data);
        },function errorCallback(){
            q.reject();
        });

        return q.promise;

    };

    server.signUserF = function(email,userPassword,againUserPassword,authCode){
        var q = $q.defer();
        $http({
            method:"POST",
            url:"/sign/signUp",
            data:{
                email:email,
                userPassword:userPassword,
                againUserPassword:againUserPassword,
                authCode:authCode
            },
            dataType:"json"
        }).then(function successCallback(response) {
            q.resolve(response.data);
        },function errorCallback(){
            q.reject();
        });
        return q.promise;
    };

    return server;
});

app.controller('signPageController', function ($scope,$interval,signPageF) {
    $scope.sendButtonText = "发送";

    /*发送验证码 点击方法*/
    $scope.sendAuthCode = function () {
        if(!$scope.emailCodeClick){
            $scope.emailCodeClick = true;
            var emailV = $scope.userEmail;
            signPageF.authorCodeF(emailV).then(function (data) {
                if(data.dataType.emailType == 1){
                    $scope.emailCodeSend = true;
                    $scope.emailStatusText = "验证码已发送，注意查收";
                    var timeSecond = 60;
                    var timer = $interval(function () {
                        $scope.sendButtonText = (timeSecond--)+" s";
                        if(timeSecond == 0){
                            $interval.cancel(timer);
                            $scope.sendButtonText = "发送";
                            $scope.emailCodeClick = false;
                        }
                    },1000);
                }else if(data.dataType.emailType == 2){
                    $scope.emailCodeClick = false;
                    $scope.emailStatusText = "邮箱格式错误";
                }
            });
        }
    };

    /*注册用户点击方法*/
    $scope.signUser = function(){

        var email = $scope.userEmail;
        var userPassword = $scope.userPassword;
        var againUserPassword = $scope.againUserPassword;
        var authCode = $scope.authCode;

        signPageF.signUserF(email,userPassword,againUserPassword,authCode).then(function(data){
            console.log(data);
            $scope.emailCodeClick = false;
            if(data.dataType.emailType == 2){
                $scope.emailStatusText = "邮箱格式不正确";
            }else if(data.dataType.emailType == 3){
                $scope.emailStatusText = "邮箱和验证码邮箱不一样";
            }else{
                $scope.emailStatusText = null;
            }

            if(data.dataType.passwordType == 2){
                $scope.passwordErrorText = "密码长度8-20位";
            }else{
                $scope.passwordErrorText = null;
            }

            if(data.dataType.againUserPasswordType == 2){
                $scope.angilPasswordErrorText = "两次密码不一样";
            }else{
                $scope.angilPasswordErrorText = null;
            }

            if(data.dataType.authCodeType == 2){
                $scope.authCodeTypeText = "验证码不正确";
            }else{
                $scope.authCodeTypeText = null;
            }

            if(data.dataType.emailType == 1 &&
                data.dataType.passwordType == 1 &&
                data.dataType.againUserPasswordType == 1 &&
                data.dataType.authCodeType == 1
            ){
                noticeDiv("注册成功",2000,function(){
                    location.href = "#/login";
                });
            }
        });
    }

    $scope.signFocus = function(focusType){
        if(focusType == "email"){
            $scope.emailStatusText = null;
        }else if(focusType == "password"){
            $scope.passwordErrorText = "";
        }else if(focusType == "angilPassword"){
            $scope.angilPasswordErrorText = null;
        }else if(focusType == "authCode"){
            $scope.authCodeTypeText = null;
        }
    };

    $scope.signBlur = function(focusType){
        if(focusType == "email"){        }else if(focusType == "angilPassword"){
            //$scope.emailStatusText = null;
        }else if(focusType == "password"){
            //$scope.passwordErrorText = null;
        }else if(focusType == "angilPassword"){
            //$scope.angilPasswordErrorText = null;
        }else if(focusType == "authCode"){
            //$scope.authCodeTypeText = null;
        }
    };
});