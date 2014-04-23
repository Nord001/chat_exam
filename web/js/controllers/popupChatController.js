define(['jquery',
	'../services/socket',
	'../views/popupChatView',
	'../views/chatListView',
	'./popupChatDraggable',
	'../services/checkKeyCode',
	'text!templates/smileContainer.html',
	'bacon'
], function($, socket, pcView, chatLV, drag, chkKC, smileContainer) {
	var openedPChats      = {};
	var openedPChatsCount = 0;

	$(document).on('click', "#chat_list .list-group:last-child a", function() {
		var user = $(this).data("user");

		if (!openedPChats[user]) {
			openedPChats[user] = true;
			openedPChatsCount += 1;
			pcView.addChat(user);
			chatLV.setUnreadMessages(user, 0);
			$(".popup_chat[data-user='" + user + "'] .chat_control button").popover({
				html: true,
				content: smileContainer
			});
			drag($(".popup_chat[data-user='" + user + "']").css({
				top: 350+openedPChatsCount*10,
				left: 20+openedPChatsCount*100
			}));
		} else {
			openedPChats[user] = false;
			pcView.removeChat(user);
			openedPChatsCount -= 1;
		}
	});

	function inputVal(ev) {
		var mes  = $(ev.currentTarget).text();
		var user = $(ev.currentTarget).data('username');
		$(ev.currentTarget).text("");
		return {mes : mes,
				user: user}
	};

	var pInputStream = $(document)
			.asEventStream('keyup', ".popup_chat .chat_control div")
			.filter(chkKC(13))
			.filter(function(ev) { return $(ev.currentTarget).text()})
			.map(inputVal);

	var pDisEnterStream = $(document).asEventStream('keydown', ".popup_chat .chat_control div").filter(chkKC(13));

	pDisEnterStream.onValue(function(e) {
		e.preventDefault();
	});

	pInputStream.onValue(function(val) {
		socket.emit('pm', val.user, val.mes);
	});

	socket.on('pm', function(user, message) {
		if (openedPChats[user]) {
			pcView.addMessage(user, user, message);
		} else {
			chatLV.setUnreadMessages(user, 1);
		}
	});

	socket.on('pmme', function(user, message) {
		pcView.addMessage(user, "me", message);
	});

});