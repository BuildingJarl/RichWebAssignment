module.exports = function (io) {

	var objects = [];
	var playerId= 1;

	io.sockets.on('connection', function(client) {

		console.log("New Client has connected");

		client.on('message', function(data) {
			console.log(data);
		})
	});
}