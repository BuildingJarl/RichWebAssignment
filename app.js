/***  Module Dependancies  ***/
var express = require('express');
var http = require('http');
var path = require('path');
var jade = require('jade');
var fs = require('fs');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = '370961736374758';
var FACEBOOK_APP_SECRET = 'e18e2c6c81206afe6273890c99682747';
var app = express();

//setup mongoDB
var db = require('mongoskin').db('localhost:27017/WikiInvaders', {safe:true});

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy ({
	clientID: FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	callbackURL:"http://localhost:3000/auth/facebook/callback" //must be on same host
	},
	function(accessToken, refreshToken, profile, done) {

		var user = {};
		user.authID = profile.id;

		//Refactor this
		db.collection('data').findOne({authID:profile.id}, function(err,result)	{
			if(err) throw err;
			if(result) {
				console.log("Users exists");
			} else {
				db.collection('data').insert(user,function(err,res) {
					if(err) throw err;
					if(res) {
						console.log("User Added to MongoDB");
					} 
				});
			}
			return done(null,user);
		});
	}
));

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
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
  	app.use(express.static(__dirname + '/public'));
})


/***  Development only ***/
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

/***  Include all routes (controllers) ***/
fs.readdirSync('./routes').forEach(function (file) {
	if(file.substr(-3) === '.js') {
		route = require('./routes/' + file);
		route.controller(app,passport); // dont know if this is good??
	}
});


/***  Start Server on port: xxxx ***/
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listending on port ' + app.get('port'));
});