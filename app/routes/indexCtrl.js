module.exports.controller = function(app){

	//get initial view (index.jade)
	app.get('/', function (request, response) {
		response.render("index");
	});

};