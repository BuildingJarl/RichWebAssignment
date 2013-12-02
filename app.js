/***  Module Dependancies  ***/
var express = require('express');
var http = require('http');
var path = require('path');
var jade = require('jade');
var fs = require('fs');
var app = express();

/***  Set all environment settings ***/
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/***  Development only ***/
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

/***  Include all routes (controllers) ***/
fs.readdirSync('./routes').forEach(function (file) {
	if(file.substr(-3) === '.js') {
		route = require('./routes/' + file);
		route.controller(app);
	}
});

/***  Start Server on port: xxxx ***/
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listending on port ' + app.get('port'));
});