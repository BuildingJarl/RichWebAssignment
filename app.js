/***  Module Dependancies  ***/
var http = require('http');
var jade = require('jade');
var fs = require('fs');
var passport = require('passport');
var db = require('mongoskin').db('ds057548.mongolab.com:57548/heroku_app20284039', {safe:true});
var app = require('./config/express') (passport);
var server = http.createServer(app)
var io = require('socket.io').listen(server);

require('./config/passport') (passport,db,'370961736374758','e18e2c6c81206afe6273890c99682747');
require('./app/socket/socketCtrl')(io);

//include route controllers
require('./app/routes/apiCtrl').controller(app,db);
require('./app/routes/authCtrl').controller(app,passport);

server.listen(app.get('port'), function() {
	console.log("Server started on port " + app.get('port'));	
});