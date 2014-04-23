define(['jquery',
		'underscore',
		'text!templates/chatListItem.html',
		'bacon',
], function($, _, listItem) {

	function setChatItems(user, id) {
		$("#chat_list div:last-child").append(_.template(listItem, {
			user_name: user,
			user_id  : id
		}));
	};

	function clear() {
		$("#chat_list div:last-child").html('');
	};

	function setUnreadMessages(id, count) {
		$("#chat_list div:last-child a[data-id=" + id + "] span").text(count);
	};

	return {
		setChatItems     : setChatItems,
		clear            : clear,
		setUnreadMessages: setUnreadMessages
	};
	
});
