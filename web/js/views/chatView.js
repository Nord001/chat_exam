define(['jquery',
		'underscore',
		'text!templates/chatMessage.html',
], function($, _, chatMsg) {

	var $chat = $("#chat .chat_messages");	

	function addMsg(msg) {
		$chat.append(_.template(chatMsg, {
			user_name: msg.user,
			user_msg: msg.message
		}));
		$chat.animate({
			scrollTop: $chat.get(0).scrollHeight
		}, 300);
	};

	return {
		addMsg: addMsg
	};
	
});
