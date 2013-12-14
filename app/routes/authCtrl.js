module.exports.controller = function(app,passport) {
	//https://github.com/jaredhanson/passport-facebook
	
	// Redirect the user to Facebook for authentication.  When complete,
	// Facebook will redirect the user back to the application at /auth/facebook/callback
	app.get('/auth/facebook',passport.authenticate('facebook'));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/success' ,failureRedirect: '/auth/failure' }));

	app.get('/auth/failure', function(req,res) {
		res.render('afterAuth', { layout: false, state:'failure', user:null });
	});

	app.get('/auth/success', function(req,res) {
		console.log("req success " + req.user);
		res.render('afterAuth', { layout: false, state:'success', user: req.user ? req.user : null });
	});

	app.delete('/auth', function(req,res) {
		req.logout();
		res.writeHead(200);
		res.end();
	});
};