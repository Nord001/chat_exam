define(['jquery'
], function($) {
	$(document).on('mouseover', "#chat_list .list-group-item", function() {
		$(this).children(".badge").hide();
		$(this).children("button").show();
	});

	$(document).on('mouseout', "#chat_list .list-group-item", function() {
		$(this).children(".badge").show();
		$(this).children("button").hide();
	});

});
