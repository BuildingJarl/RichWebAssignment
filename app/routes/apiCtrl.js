var BSON = require('mongoskin').BSONPure;

module.exports.controller = function(app,dependencies){

	app.get('/api/getUser' ,isAuthenticated,function (request, response) {
		dependencies.database.collection('data').findOne({ _id: new BSON.ObjectID(request.user)}, function(err,user) {
			if(err) {
				console.log("error retriveing user from database");
			}
			delete user.facebookId;
			delete user._id;
			response.json(user);
		});
	});

	// Simple route middleware to ensure user is authenticated.
	function isAuthenticated(req, res, next) {
	  if (req.user) { 
	  	return next(); 
	  }
	  res.redirect('/partials/login');
	}
};