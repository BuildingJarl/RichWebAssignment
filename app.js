/***  Module Dependancies  ***/
var http = require('http');
var jade = require('jade');
var fs = require('fs');
var passport = require('passport');
var db = require('mongoskin').db('localhost:27017/WikiInvaders', {safe:true});
require('./config/passport') (passport,db,'370961736374758','e18e2c6c81206afe6273890c99682747');
var app = require('./config/express') (passport);
var server = http.createServer(app)
var io = require('socket.io').listen(server);

/***  Include all routes (controllers) ***/
fs.readdirSync('./app/routes').forEach(function (file) {
	if(file.substr(-3) === '.js') {
		route = require('./app/routes/' + file);
		route.controller(app, { passport:passport, database:db }); // dont know if this is good??
	}
});

var objects = [];
var playerId= 1;
io.sockets.on('connection', function(socket,data) {
	console.log("New Player has connected with id: " + playerId);
	var newPlayer = {id:playerId, position: { x:0 ,y:0, z:0}}
	objects.push(newPlayer);
	socket.emit('init', newPlayer);
	playerId ++;
});


server.listen(app.get('port'), function() {
	console.log("Server started on port " + app.get('port'));	
});