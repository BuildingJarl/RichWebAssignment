var express = require('express');
var path = require('path');

module.exports = function (passport) {
	var app = express();

	var root = path.normalize(__dirname + '/..');

	app.set('port', process.env.PORT || 3000);
	app.set('views', root + '/app/views');
	app.set('view engine', 'jade');

 	app.use(express.logger('dev'));
 	app.use(express.favicon());
  	app.use(express.cookieParser('your secret here'));
  	app.use(express.bodyParser());
  	app.use(express.methodOverride());
  	app.use(express.session({ secret: 'keyboard cat' }));
  	app.use(passport.initialize());
  	app.use(passport.session());
  	app.use(app.router);
  	app.use(express.static(root + '/public'));

  	/***  Development only ***/
	if ('development' === app.get('env')) {
	    app.use(express.errorHandler());
	}

	return app;
}