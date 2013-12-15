var BSON = require('mongoskin').BSONPure;

module.exports.controller = function (app,db) {

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
	app.get('/partials/chat' , function (request, response) {
		response.render("partials/chat");
	});
	app.get('/partials/create', function (request, response) {
		response.render("partials/create");
	});
	app.get('/partials/polls', function (request, response) {
		response.render("partials/polls");
	});
	app.get('/partials/poll', function (request, response) {
		response.render("partials/poll");
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

	//Create a poll
	app.post('/api/createPoll', function (request,response) {

		var options = {};
		for(op in request.body.options) {
			options[request.body.options[op]] = 0;
		}
		//to do creat model for this
		var poll = {
			title: request.body.title,
			info: request.body.info,
			options: options,
			views: 0,
			votes: 0,
			dateCreated = Date.now();
		} 

		db.collection('polls').insert(poll, function (err, result) {
			if(err){
				throw err;
			}
			if(result) {
				response.send(result[0]._id);
			}
		});
	});

	//get newest 10 polls -> currently only gets first 10 in DB
	app.get('/api/getIndexPolls', function (request,response) {

		db.collection('polls').find().limit(10).toArray(function(err, result) {
			if(err){
				throw err;
			}
			if(result) {
				response.send(result);
			}
		});
	});

	// Simple route middleware to ensure user is authenticated.
	function isAuthenticated(req, res, next) {
	  if (req.user) { 
	  	return next(); 
	  }
	  res.json({status:"you are not logged in"});
	}
};