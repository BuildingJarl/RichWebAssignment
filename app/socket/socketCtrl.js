module.exports = function (io) {

	var objects = [];
	var playerId= 1;

	io.sockets.on('connection', function(socket) {

		console.log("New Player has connected");
		socket.emit('initialise', {x:2});

		socket.on('playerDis', function() {
			socket.disconnect();
		})
	});
}