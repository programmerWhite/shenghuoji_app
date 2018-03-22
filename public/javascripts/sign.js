/**
 * Created by Raintree on 2018/3/19.
 */

app.factory('getAuthorCode', function ($http,$q) {
    var server = {};
    server.authorCodeF = function(emailV){
        var q = $q.defer();
        $http.post('/sign/getAuthorCode',{email:emailV},function(data){
            console.log(data);
            q.resolve(data);
        },function(){
            q.reject();
        });

        return q.promise;

    };
    return server;
});

app.controller('signPageController', function ($scope,getAuthorCode) {
    $scope.sendAuthCode = function () {
        var emailV = $scope.userEmail;
        getAuthorCode.authorCodeF(emailV).then(function (data) {
            console.log(data)
        });
    }
});