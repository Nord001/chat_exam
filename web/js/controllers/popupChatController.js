define(['jquery',
	'../services/socket',
	'../views/popupChatView',
	'./popupChatDraggable',
	'../services/checkKeyCode',
	'bacon'
], function($, socket, pcView, drag, chkKC) {
	var openedPChats      = {};
	var openedPChatsCount = 0;

	$(document).on('click', "#chat_list .list-group:last-child a", function() {
		var $id = $(this).data("id");

		if (!openedPChats[$id]) {
			openedPChats[$id] = openedPChatsCount+1;
			openedPChatsCount += 1;
			pcView.addChat($id, $(this).data('user'));
			drag($(".popup_chat[data-id='" + $id + "']").css({top: 350+openedPChats[$id]*10, left: 20+openedPChats[$id]*100}));
		} else {
			openedPChats[$id] = undefined;
			pcView.removeChat($id);
			openedPChatsCount -= 1;
		}
	});

	function inputVal(ev) {
		var mes  = $(ev.currentTarget).text();
		var user = $(ev.currentTarget).data('username');
		$(ev.currentTarget).text("");
		return {mes : mes,
				user: user}
	}

	var pInputStream    = $(document).asEventStream('keyup', ".popup_chat .chat_control div").filter(chkKC(13)).map(inputVal);
	var pDisEnterStream = $(document).asEventStream('keydown', ".popup_chat .chat_control div").filter(chkKC(13));

	pDisEnterStream.onValue(function(e) {
		e.preventDefault();
	});

	pInputStream.onValue(function(val) {
		socket.emit('pm', val.user, val.mes);
	});

	socket.on('pm', function(user, message) {
		console.log(user, message);
	})

});