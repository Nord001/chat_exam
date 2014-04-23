define(['jquery',
	'../services/socket',
	'../views/chatView',
	'text!templates/smileContainer.html',
	'../services/checkKeyCode',
	'bacon'
], function($, socket, chatView, smileContainer, chkKC) {
	

	var $input     = $(".chat_txt_area");
	var $send_btn  = $('#chat_send');
	var $smile_btn = $('#chat_smile');
	var $clear_btn = $('#chat_clear');

	var sendStream = $send_btn.asEventStream('click');
	var inputStream = $input.asEventStream('keyup').filter(chkKC(13));
	var disEnterStream = $input.asEventStream('keydown').filter(chkKC(13));

	disEnterStream.onValue(function(e) {
		e.preventDefault();
	});

	var messagesStream = inputStream.merge(sendStream).filter(function() { return $input.val()});

	messagesStream.onValue(function() {
		socket.emit('chat', $input.val());
		$input.val('');
		$input.focus();
		return false;
	});

	socket.on('chat', function(msg) {
		chatView.addMsg(msg);
	});

	$smile_btn.popover({
		html: true,
		content: smileContainer
	});

	$clear_btn.on('click', function() {
		$input.val('');
		$input.focus();
	});

});

	