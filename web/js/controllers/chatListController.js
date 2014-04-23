//showing online users count

define(['../services/socket',
		'views/chatListView'
], function(socket, chatLV) {
	socket.on('users', function(users) {
		chatLV.clear();
		for (user in users) {
			if (users[user] !== socket.socket.sessionid) {
				chatLV.setChatItems(user, users[user]);
			};
		};
	});

});