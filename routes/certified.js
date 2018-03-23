/**
 * Created by Raintree on 2018/3/22.
 */
var regularExpress = require("./tool/regularExpress.js");
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


        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            dataStatus:1,
            dataType:{
                emailType:emailType,
                passwordType:passwordType,
                againUserPasswordType:againUserPasswordType,
                authCodeType:authCodeType
            }
        }));

    });

    app.post('/login/login',function(req,res,next){
        var userName = req.body.userName;
        var userPassword = req.body.userPassword;

        userName = !!userName?userName:"";
        userPassword = !!userPassword?userPassword:"";

        /*userType
        * 1:用户名没有问题
        * 2：用户名不存在*/
        var userType = 1;
        //userType == 2;
        if(userName == "" || userName == " "){
            userType = 3;
        }


        /*passswordType
         * 1:用户名没有问题
         * 2:密码不正确*/
        var passwordType = 1;


        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            dataStatus:1,
            dataType:{
                userType:userType,
                passwordType:passwordType
            }
        }));
    });
};


