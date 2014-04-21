define(['jquery'
], function($) {
	var $activeInput;

	$(document).on('click', ".smiles_container button", function(e) {
		$activeInput.focus();
		$activeInput.val($activeInput.val() + $(this).data("regexp"));
	});

	$(document).on("show.bs.popover", "#chat_smile", function() {
		$activeInput = $($(this).data("input"));

	});

});
