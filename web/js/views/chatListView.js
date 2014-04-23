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

	function setUnreadMessages(user, count) {
		var span = $("#chat_list div:last-child a[data-user='" + user + "'] span");

		if (count == 0) {
			span.text('');
		} else{
			if (span.text()) {
				var unread = parseInt(span.text()) + count;
				span.text(unread);
			} else {
				span.text(count);
			}
		};
	};

	return {
		setChatItems     : setChatItems,
		clear            : clear,
		setUnreadMessages: setUnreadMessages
	};
	
});
