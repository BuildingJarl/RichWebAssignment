

module.exports.controller = function(app,dependencies){

	app.get('/api/getUser' ,isAuthenticated,function (request, response) {
		
		console.log(request.user);
		dependencies.database.collection('data').findOne({ _id: new dependencies.BSON.ObjectID(request.user)}, function(err,user) {
			if(err) {
				console.log("error retriveing user from database");
			}
			delete user.facebookId;
			delete user._id;
			response.json(user);
		})
		
	});

	// Simple route middleware to ensure user is authenticated.
	// Use this route middleware on any resource that needs to be protected. If
	// the request is authenticated (typically via a persistent login session),
	// the request will proceed. Otherwise, the user will be redirected to the
	// login page.
	function isAuthenticated(req, res, next) {
	  if (req.user) { 
	  	return next(); 
	  }
	  res.redirect('/partials/login');
	}
};