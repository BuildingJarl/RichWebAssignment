module.exports.controller = function(app){

	app.get('/', function (request, response) {

		response.render("index");
	});

	//Used by angular to get partial views
	app.get('/partials/:name', function (request, response) {

		var name = request.params.name;
		response.render('partials/' + name);
	});

};