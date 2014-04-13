module.exports = function (io) {
	io.sockets.on('connection', function (socket) {
		var user = socket.handshake.user.local.email || socket.handshake.user.twitter.username;
		socket.on('chat', function(message) {
			socket.broadcast.emit('chat', {user: user, message: message});
			socket.emit('chat', {user: user, message: message});
		});
	});	
}; 
