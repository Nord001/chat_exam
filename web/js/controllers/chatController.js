define(['jquery',
	'../services/socket',
	'../views/chatView',
	'bacon'
], function($, socket, chatView) {
	function keyCodeIs(keyCode) { 
		return function(event) { return event.keyCode == keyCode && !event.shiftKey}
	};

	var $input    = $(".chat_txt_area");
	var $send_btn = $('#chat_send');

	var sendStream = $send_btn.asEventStream('click');
	var inputStream = $input.asEventStream('keyup').filter(keyCodeIs(13));
	var disEnterStream = $input.asEventStream('keydown').filter(keyCodeIs(13));

	disEnterStream.onValue(function(e) {
		e.preventDefault();
	});

	var messagesStream = inputStream.merge(sendStream).filter(function() { return $input.val()});

	messagesStream.onValue(function() {
		socket.emit('chat', $input.val());
		$input.val('');
		return false;
	});

	socket.on('chat', function(msg) {
		chatView.addMsg(msg);
	});

	$("#findContact").on('click', function() {
		chatView.addMsg("sdfsd", "sdfsd");
	});
});

	