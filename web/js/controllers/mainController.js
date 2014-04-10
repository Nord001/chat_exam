define(['jquery',
		'underscore',
		'controllers/popupChatDraggable',
		'views/chatListView',
		'bacon',
], function($, _, drag, chatLV) {
	$(function() {
		var $chat_messages = $("#chat .chat_messages");

		$chat_messages.height($(window).height() - 330);

		var w = $(window).asEventStream('resize').debounce(300);

		w.onValue(function() {
			$chat_messages.height($(window).height() - 330);
		});
	});

	$('#chat_send').on('click', function() {
		chatLV.addChatItem('James Bond', 007);
	});

	$(document).on('click', '#chat_close', function() {
		chatLV.removeChatItem(007);
	});

	$("#findContact").on('click', function() {
		chatLV.setUnreadMessages(007, 5);
	});

	drag($('#id'));

});
