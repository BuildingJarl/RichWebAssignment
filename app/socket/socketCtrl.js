module.exports = function (io) {

	io.sockets.on('connection', function(client) {
		client.emit('message', { username: 'Server' , message:' Welcome to the chat!'});

		client.on('sendmessage', function(data) {
			io.sockets.emit('message',data);
		});
	});
}