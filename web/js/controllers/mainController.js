define(['jquery',
		'bacon'
], function($) {
	$(function() {
		var $chat_messages = $("#chat .chat_messages");

		$chat_messages.height($(window).height() - 330);

		var w = $(window).asEventStream('resize').debounce(300);

		w.onValue(function() {
			$chat_messages.height($(window).height() - 330);
		});
	});
});
