define(['../services/socket',
		'../views/onlineView'
], function(socket, onlineView) {
	socket.on('online', function(online) {
		onlineView(online);
	});
});

	