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
var server = http.createServer(app)
var io = require('socket.io').listen(server);

/** Refactor This **/
//put into seperate config files
//setup mongoDB
var db = require('mongoskin').db('localhost:27017/WikiInvaders', {safe:true});
var BSON = require('mongoskin').BSONPure;
// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session.
passport.serializeUser(function(user, done) {
  console.log("serialize " + user._id);
  done(null, user._id);
});

/** Refactor This **/
passport.deserializeUser(function(id, done) {
	/* //If session is stored in a database
	db.collection('data').findOne({ _id:id }, function(err,user) {
		if(err) {
			done(err);
		}
	*/
	console.log("Deserialize " + id);
		//console.log(user);
		//done(err,user);
	done(null, id);
	//});
});

/** Refactor This **/
function User(fbid,uname,pid) {
	this.facebookId = fbid;
	this.createdAt = Date.now();
	this.model = {name:"testModel"};
	this.username = uname;
	//insert stats
};

/** Refactor This **/
passport.use(new FacebookStrategy ({
	clientID: FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	callbackURL:"http://localhost:3000/auth/facebook/callback" //must be on same host
	},
	function(accessToken, refreshToken, profile, done) {
		db.collection('data').findOne({ facebookId:profile.id }, function(err,user)	{
			if(err) {
				return done(err);
			}
			if(!user) {
				user = new User(profile.id, profile.username);
				db.collection('data').insert(user,function(err) {
					if(err) {
						throw err
					};

					console.log("User Added to MongoDB");
					return done(err, user);
				});
			} else {
				console.log("Users exists");
				return done(err,user)
			}
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
		route.controller(app,{ passport:passport, database:db, BSON:BSON }); // dont know if this is good??
	}
});

io.sockets.on('connection', function(socket) {
	socket.emit('init', {hello: 'world'});
})


server.listen(app.get('port'), function() {
	console.log("Server started on port " + app.get('port'));	
});
