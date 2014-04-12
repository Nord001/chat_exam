define(['socket.io'], function(io) {
	socket = io.connect();

	return socket;
});