/**
 * Created by Raintree on 2018/3/22.
 */
var regularExpress = require("./tool/regularExpress.js");

/*数据库*/
var db_connection = require('./tool/DBconnection');

var Regex = new regularExpress();

module.exports = function(app){
    app.post('/sign/getAuthorCode',function(req,res,next){

        /*emailType
        * 1:邮箱可用
        * 2：邮箱格式有问题*/
        var emailType = 1;
        if(Regex.email(req.body.email)){
            var randomNum = parseInt(Math.random()*10000);
            req.session.signEmail = {
                emailCode:randomNum,
                email:req.body.email
            };
            console.log(randomNum);
        }else{
            emailType = 2
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            dataStatus:1,
            dataType:{
                emailType:emailType
            }
        }));
    });

    app.post('/sign/signUp',function(req,res,next){

        var email = req.body.email;
        var userPassword = req.body.userPassword;
        var againUserPassword = req.body.againUserPassword;
        var authCode = req.body.authCode;

        var sessionCode = null;
        var sessionEmail = null;
        if(!!req.session.signEmail){
            sessionCode = req.session.signEmail.emailCode;
            sessionEmail = req.session.signEmail.email;
        }

        /*emailType
         * 1:数据格式没有问题
         * 2：邮箱格式不对
         * 3：邮箱和验证码邮箱不一样
         */
        var emailType = 1;
        if(!Regex.email(email)){
            emailType = 2;
        }else{
            if(email != sessionEmail){
                emailType = 3;
            }
        }
        /*passwordType
         * 1:数据格式没有问题
         * 2:密码长度不对
         */
        var passwordType = 1;
        if(typeof userPassword == "undefined"){
            passwordType = 2;
        }else{
            if(userPassword.length < 8 || userPassword.length > 20){
                passwordType = 2;
            }
        }

        /*againUserPassword
        * 1:数据没有问题
        * 2:两次密码不一样
        * */
        var againUserPasswordType = 1;
        if(againUserPassword != userPassword){
            againUserPasswordType = 2
        }

        /*authCodeType
        * 1:验证码没有问题
        * 2:验证码正确
        * */
        var authCodeType = 1;
        if(authCode != sessionCode){
            authCodeType = 2;
        }


        var resData = {
            emailType:emailType,
                passwordType:passwordType,
                againUserPasswordType:againUserPasswordType,
                authCodeType:authCodeType
        };

        if(emailType == 1 &&
            passwordType == 1 &&
            againUserPasswordType == 1 &&
            authCodeType == 1
        ){
            var sqlString = "insert into userInfo (email,userPassword,signUpTime) values (?,?,?)";
            var signUpTime = new Date().valueOf();
            var parameter = [email,userPassword,signUpTime];
            db_connection.query(sqlString,parameter,function(err,vals,files){
                if(err){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        dataStatus:0,
                        dataType:resData,
                        signStatus:false
                    }));
                }else{
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        dataStatus:1,
                        dataType:resData,
                        signStatus:true
                    }));
                }
            });
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                dataStatus:1,
                dataType:resData,
                signStatus:false
            }));
        }


    });

    app.post('/login/login',function(req,res,next){
        var userName = req.body.userName;
        var userPassword = req.body.userPassword;

        userName = !!userName?userName:"";
        userPassword = !!userPassword?userPassword:"";

        /*userType
        * 1:用户名没有问题
        * 2：用户名不存在
        * 3:密码不能为空*/
        var userType = 1;
        //userType == 2;
        if(userName == "" || userName == " "){
            userType = 3;
        }


        /*passswordType
         * 1:用户名没有问题
         * 2:密码不正确*/
        var passwordType = 1;

        if(userName.indexOf("@") != -1){
            var sqlString = "select count(*) as dataNum from userInfo where email = ? and userPassword = ?";
        }else{
            var sqlString = "select count(*) as dataNum from userInfo where loginName = ? and userPassword = ?";
        }
        var sqlParameter = [userName,userPassword];

        if(userType == 1 && passwordType == 1){
            db_connection.query(sqlString,sqlParameter,function(err,vals,files){
                if(err){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        dataStatus:1,
                        dataType:{
                            userType:userType,
                            passwordType:passwordType
                        },
                        loginStatus:false
                    }));
                }else{
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    if(vals[0].dataNum == 1){
                        res.end(JSON.stringify({
                            dataStatus:1,
                            dataType:{
                                userType:userType,
                                passwordType:passwordType
                            },
                            loginStatus:true
                        }));
                    }else{
                        res.end(JSON.stringify({
                            dataStatus:1,
                            dataType:{
                                userType:userType,
                                passwordType:2
                            },
                            loginStatus:false
                        }));
                    }
                }
            })
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                dataStatus:1,
                dataType:{
                    userType:userType,
                    passwordType:passwordType
                },
                loginStatus:false
            }));
        }
    });

    app.post('/findPassword/findPassword',function(req,req,next){
        var email = req.body.email;
        var authCode = req.body.authCode;
        var newPassword = req.body.authCode;

        /*emailType
        * 1:email 没有问题
        * 2：验证码邮箱和这个邮箱不一样*/
        var emailType = 1;
        if(email != req.session.email){
            emailType = 2;
        }

        /*passwordType
        * 1:password 没有问题
        * 2:password 长度不对
        * */
        var  passwordType = 1;
        if(newPassword.length < 6 || newPassword.length > 20){
            passwordType = 2;
        }

        /*authCodeType
        * 1:验证码没有问题
        * 2：验证码不正确
        * */
        var emailCodeType = 1;
        if(authCode != req.session.emailCode){
            emailCodeType = 2;
        }

    });
};


