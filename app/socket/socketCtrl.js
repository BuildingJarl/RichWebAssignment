module.exports = function (io) {

	var objects = [];
	var playerId= 1;

	io.sockets.on('connection', function(socket,data) {
		console.log("New Player has connected");
		socket.emit('connect', {x:2});

		socket.on("playerDisconnected", function (data) {
			console.log("player Disconnected")
			socket.disconnect('GoodBye');
		});
	});
}