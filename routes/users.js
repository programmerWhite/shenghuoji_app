var express = require('express');
var router = express.Router();


module.exports = function (app){
  app.get('/',function(req,res,next){
    res.render("index");
  });
  app.get('/login',function(req,res,next){
    res.render("login");
  });
  app.get('/sign',function(req,res,next){
    res.render("sign");
  });
  app.get('/home',function(req,res,next){
    res.render("home");
  });
};
