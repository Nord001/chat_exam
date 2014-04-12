define(['jquery',
	'../services/socket',
	'../views/chatView'
], function($, socket, chatView) {
	var $input    = $(".chat_txt_area");
	var $send_btn = $('#chat_send');


	$send_btn.on('click', function() {
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

	