const mongoose = require('mongoose');
const Todo = require('../Models/Users');

module.exports = function(app){
    app.get('/', function(req, res){
        res.render('Home');
    })

    app.get('/Articles', function(req, res){
        res.render('Articles')
    })

    app.get('/Members', function(req, res){
        res.render('Members')
    })

    app.get('/Contact', function(req, res){
        res.render('Contact')
    })

    app.get('/About', function(req, res){
        res.render('About')
    })

    app.get('/Article', function(req, res){
        res.render('Article')
    })

    app.get('/MemberArticles', function(req, res){
        res.render('MemberArticles')
    })
}