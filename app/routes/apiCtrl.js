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
	app.get('/partials/chat', function (request, response) {
		response.render("partials/chat");
	});




	app.get('/api/getUser' ,isAuthenticated,function (request, response) {

		console.log(request.user);

		db.collection('Users').findOne({ _id: new BSON.ObjectID(request.user)}, function(err,userDetails) {
			if(err) {
				console.log("error retriveing user from database");
			}
			response.json(userDetails);
		});
	});

	//Create a poll
	app.post('/api/createPoll', function (request,response) {

		var answers = {};
		for(an in request.body.answers) {
			answers[request.body.answers[an].answer] = 0;
		}
		//to do creat model for this
		var poll = {
			title: request.body.title,
			info: request.body.info,
			answers: answers,
			views: 0,
			votes: 0,
			dateCreated: Date.now()
		} 

		db.collection('polls').insert(poll, function (err, result) {
			if(err){
				throw err;
			}
			if(result) {

				response.send({ pollid: result[0]._id });
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

	app.get('/api/getPolls', function (request,response) {

		db.collection('polls').find().limit(10).toArray(function(err, result) {
			if(err){
				throw err;
			}
			if(result) {
				response.send(result);
			}
		});
	});

	app.post('/api/getSinglePoll', function (request, response) {

		db.collection('polls').findOne({ _id: new BSON.ObjectID(request.body.pollid)}, function(err,poll) {
			if(err) {
				console.log("error retriveing poll from database");
			}
			response.json(poll);
		});
	});

	app.put('/api/voteOnPoll/:pollid',isAuthenticated, function (request, response) {

		var action = {};
		action['answers.' + request.body.vote] = 1;
		var id = new BSON.ObjectID(request.params.pollid);
		var userID = request.user
		var pollID = request.params.pollid;

		db.collection('Users').findOne({ _id: new BSON.ObjectID(userID)}, function(err,userDetails) {
			
			if(userDetails.votesCast.indexOf(pollID) === -1) {
				console.log("User has not voted on this poll yet");

				//update total votes on poll
				db.collection('polls').update({_id: id}, {$inc:{votes: 1}}, function(err, result) {
				});

				// update votes on selected answer
				db.collection('polls').update({_id: id}, {$inc: action },function(err, result) {
				});

				//Add poll to users voted list
				db.collection('Users').update({_id:  new BSON.ObjectID(userID)}, {$push: {votesCast: pollID}}, function(err, result) {
					if(err) {
						console.log(err);
					}
				});

				response.send({status:"Thank you for voting"});
			} else {
				console.log("User has already voted on this poll");
				response.send({status:"Sorry you have already voted on this poll"});
			}
		});
	});

	app.put('/api/viewPoll/:pollid', function (request, response) {
		var id = new BSON.ObjectID(request.params.pollid);

		//update total views on poll
		db.collection('polls').update({_id: id}, {$inc:{views: 1}},
			function(err, result) {
				if(err) {
					console.log(err);
				}
				if(result) {
					response.send(result);
				}
			});
	});

	app.post('/api/getComments', function (request, response) {

		db.collection('comments').find({pollid:request.body.pollid }).limit(10).toArray(function(err, result) {
			if(err){
				throw err;
			}
			if(result) {
				response.send(result);
			}
		});

	});

	app.post('/api/addComment', function (request, response) {
		var comment = {
			pollid: request.body.pollid,
			comment: request.body.comment,
			username: request.body.username
		};

		db.collection('comments').insert(comment, function(err,result){

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