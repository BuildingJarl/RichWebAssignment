module.exports.controller = function(app){

	app.get('/partials/login', function (request, response) {
		response.render("partials/login");
	});
};