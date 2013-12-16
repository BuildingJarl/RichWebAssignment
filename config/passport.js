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

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use(new FacebookStrategy ({
		clientID: FACEBOOK_APP_ID,
		clientSecret: FACEBOOK_APP_SECRET,
		callbackURL:"http://richwebassignment.jit.su/auth/facebook/callback" //must be on same host
		},
		function(accessToken, refreshToken, profile, done) {
			db.collection('Users').findOne({ facebookId:profile.id }, function(err,user)	{
				if(err) {
					return done(err);
				}
				if(!user) {
					user = new User(profile.id, profile.username);
					db.collection('Users').insert(user,function(err) {
						if(err) {
							throw err
						};
						return done(err, user);
					});
				} else {
					return done(err,user)
				}
			});
		}
	));
};
