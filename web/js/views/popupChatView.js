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

	function addMessage(user, message) {
		$(".popup_chat[data-user='" + user + "'] ul.list-unstyled").append("<li>" + message + "</li>");
	}

	return {
		addChat   : addChat,
		removeChat: removeChat,
		addMessage: addMessage
	};
	
});
