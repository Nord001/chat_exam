define(['jquery',
		'draggable'
], function($, draggable) {
	function drag(element) {
			var el = element.get(0);
			var handle = el.getElementsByClassName('chat_header')[0];
			draggable(el, handle);
		};
	return drag;

});
