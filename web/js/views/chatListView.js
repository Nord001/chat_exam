define(['jquery',
		'underscore',
		'text!templates/chatListItem.html',
		'bacon',
], function($, _, listItem) {

	function addChatItem(user, id) {
		$("#chat_list div:last-child").append(_.template(listItem, {
			user_name: user,
			user_id: id
		}));
	};

	function removeChatItem(id) {
		$("#chat_list div:last-child a[data-id=" + id + "]").remove();
	};

	function setUnreadMessages(id, count) {
		$("#chat_list div:last-child a[data-id=" + id + "] span").text(count);
	};

	return {
		addChatItem: addChatItem,
		removeChatItem: removeChatItem,
		setUnreadMessages: setUnreadMessages
	};
	
});
