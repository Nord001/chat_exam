module.exports = function (io) {
	var onlineUsersCount = 0;
	var onlineUsers = {};

	io.sockets.on('connection', function (socket) {
		var user = socket.handshake.user.local.email || socket.handshake.user.twitter.username;
		onlineUsersCount += 1;
		onlineUsers[user] = socket.id;

		socket.broadcast.emit('online', {online: onlineUsersCount});
		socket.broadcast.emit('users', onlineUsers);
		socket.emit('online', {online: onlineUsersCount});
		socket.emit('users', onlineUsers);

		socket.on('chat', function(message) {
			socket.broadcast.emit('chat', {user: user, message: message});
			socket.emit('chat', {user: user, message: message});
		});

		socket.on('pm', function(to, message) {
			var id = onlineUsers[to];
			io.sockets.socket(id).emit('pm', user, message);
			socket.emit('pmme', to, message);
		});

		socket.on('disconnect', function () {
			onlineUsersCount -= 1;
			onlineUsers.user = undefined;
			socket.broadcast.emit('online', {online: onlineUsersCount});
			socket.broadcast.emit('users', onlineUsers);
		});
	});	
}; 
