define(['jquery',
	'../services/caretEnd'
], function($, caretEnd) {
	var $activeInput;
	var $publicInput = $(".chat_txt_area");

	//set focus to end of contenteditable div in popover chats
	$(document).on('click', ".popup_chat .smiles_container button", function(e) {
		$activeInput.text($activeInput.text() + $(this).data("regexp"));
		caretEnd($activeInput.get(0));
	});

	//set focus to end of textarea when select smile in public chat
	$(document).on('click', "#chat .smiles_container button", function(e) {
		$publicInput.focus();
		$publicInput.val($activeInput.val() + $(this).data("regexp"));
	})

	//set active input for popover chats
	$(document).on("click", "button[data-toggle='popover']", function() {
		$activeInput = $($(this).data("input"));
	});

});
