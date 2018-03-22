/**
 * Created by Raintree on 2018/3/22.
 */
var express = require('express');
var router = express.Router();

module.exports = function(app){
    app.post('/sign/getAuthorCode',function(req,res,next){
        //var email = req.body.email;
        console.log( req.body)
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({a:"bbb"}));
    });
};


