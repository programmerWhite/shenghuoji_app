/**
 * Created by Raintree on 2018/3/19.
 */
app.controller('loginController',function($scope,login){
    $scope.loginSystem = function(){
        var userName = $scope.userName;
        var userPassword = $scope.userPassword;

        login.loginF(userName,userPassword).then(function (data) {
            if(data.dataStatus == 1){
                if(data.dataType.userType == 2){
                    $scope.userNameText = "用户名不存在";
                }else if(data.dataType.userType == 3){
                    $scope.userNameText = "用户名不能为空";
                }

                if(data.dataType.passwordType == 2){
                    $scope.userPasswordText = "密码不正确";
                }

                if(data.dataType.userType == 1 &&
                    data.dataType.passwordType == 1
                ){
                    location.href = "#/myHome";
                }
            }
        });
    }

    $scope.loginFocus = function(loginType){
        if(loginType == "userName"){
            $scope.userNameText = null;
        }

        if(loginType == "password"){
            $scope.userPasswordText = null;
        }
    }
});

app.factory("login",function($http,$q){
    var server = {};
    
    server.loginF = function(userName,userPassword){
        var q = $q.defer();
        $http({
            method:"POST",
            url:"/login/login",
            data:{
                userName:userName,
                userPassword:userPassword
            },
            dataType:"json"
        }).then(function (data) {
            q.resolve(data.data);
        }, function () {
            q.reject();
        });
        return q.promise;
    };
    
    return server;
});
