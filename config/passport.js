var User = require("../app/models/user");
var FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function (passport, db, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET) {
	
	/*
		Passport session setup
		To support persistent login sessions, Passport needs to be able to
		serialize users into and deserialize users out of the session.
	*/

	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		done(null, id);
	});

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
};
