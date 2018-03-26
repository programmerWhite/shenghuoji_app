/**
 * Created by Raintree on 2018/3/26.
 */
/**
 * Created by wy641 on 2017/8/8.
 */
var mysql = require('mysql');



//
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'wy910823',
    port:'3306',
    database:'shenghuoji'
});

//var pool = mysql.createPool({
//       host:'sqld.duapp.com',
//       user:'2af03865f7192c0b5771bbad2b901dcd',
//       password:'B0eec2977c81116cd955c3b428a15ce4',
//       port:'4050',
//       database:'FoaWbevBQSxdQhylACrl'
//});


var DB_OBJ = {};

DB_OBJ.query = function(sql,parames,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,vals,fileds);
        }else{
            conn.query(sql,parames,function(err,vals,fileds){
                callback(err,vals,fileds);
            });
        }
        conn.release();//释放连接
    });


};


DB_OBJ.checkDBExit = function(){

    /*检查用户表不存在及创建
     * */
    var userInfo_sqlString = "create table if not exists userInfo(" +
            "id int PRIMARY KEY AUTO_INCREMENT," +
            "loginName text," +
            "userPassword text NOT NULL," +
            "nickName char(20)," +
            "sex char(1)," +
            "signUpTime varchar(20)," +
            "email varchar(50)," +
            "loginTime varchar(20)" +
        ")";
    printCreateTable(userInfo_sqlString);



    function printCreateTable(sqlString){
        DB_OBJ.query(sqlString,{},function(err,vals,fileds){
            if(err){
                console.log(err);
            }else{
                if(vals.serverStatus == 2){
                    console.log()
                }
            }
        });
    }
};


module.exports = DB_OBJ;