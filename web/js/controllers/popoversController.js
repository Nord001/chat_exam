define(['jquery'
], function($) {
	//closing popovers when clicked anywhere on the page
	$('body').on('click', function (e) {
		$('[data-toggle="popover"]').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});
});
