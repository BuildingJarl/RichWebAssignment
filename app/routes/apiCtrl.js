var BSON = require('mongoskin').BSONPure;

module.exports.controller = function(app,db){

	//get initial view (index.jade)
	app.get('/', function (request, response) {
		response.render("index");
	});
	app.get('/partials/index', function (request, response) {
		response.render("partials/index");
	});
	app.get('/partials/signup', function (request, response) {
		response.render("partials/login");
	});
	app.get('/partials/login', function (request, response) {
		response.render("partials/login");
	});
	app.get('/partials/chat' ,function (request, response) {
		response.render("partials/chat");
	});

	app.get('/api/getUser' ,isAuthenticated,function (request, response) {
		db.database.collection('data').findOne({ _id: new BSON.ObjectID(request.user)}, function(err,user) {
			if(err) {
				console.log("error retriveing user from database");
			}
			delete user.facebookId;
			delete user._id;
			response.json(user);
		});
	});


	//get newest questions

	//get single question

	//update data on question


	// Simple route middleware to ensure user is authenticated.
	function isAuthenticated(req, res, next) {
	  if (req.user) { 
	  	return next(); 
	  }
	  res.redirect('/partials/login');
	}
};