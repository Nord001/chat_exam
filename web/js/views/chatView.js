define(['jquery',
		'underscore',
		'text!templates/chatMessage.html',
		'services/smiley'
], function($, _, chatMsg, smile) {

	var $chat = $("#chat .chat_messages");	

	function addMsg(msg) {
		$chat.append(_.template(chatMsg, {
			user_name: msg.user,
			user_msg: smile(msg.message)
		}));
		$chat.animate({
			scrollTop: $chat.get(0).scrollHeight
		}, 300);
	};

	return {
		addMsg: addMsg
	};
	
});
