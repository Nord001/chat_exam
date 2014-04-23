define(['jquery',
		'underscore',
		'text!templates/popupChat.html',
		'services/smiley'
], function($, _, pChat, smile) {

	function addChat(id, user) {
		$("body").append(_.template(pChat, {
			user_id  : id,
			user_name: user
		}));
	};

	function removeChat(id) {
		$(".popup_chat[data-id='" + id + "']").remove();
	}

	return {
		addChat   : addChat,
		removeChat: removeChat
	};
	
});
