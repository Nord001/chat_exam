define(['jquery',
		'underscore',
		'text!templates/popupChat.html',
		'services/smiley'
], function($, _, pChat, smile) {

	function addChat(user) {
		$("body").append(_.template(pChat, {user_name: user}));
	};

	function removeChat(user) {
		$(".popup_chat[data-user='" + user + "']").remove();
	}

	function addMessage(user, username, message) {
		var $pChatDiv = $(".popup_chat[data-user='" + user + "'] div");
		var $pChat = $(".popup_chat[data-user='" + user + "'] ul.list-unstyled");

		$pChat.append("<li><b>" + username + "</b>: " + smile(message) + "</li>");

		$pChatDiv.animate({
			scrollTop: $pChat.get(0).scrollHeight
		}, 300);
	}

	return {
		addChat   : addChat,
		removeChat: removeChat,
		addMessage: addMessage
	};
	
});
