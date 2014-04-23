define(['jquery'], function($) {
	return function(online) {
		$("#online span").text(online.online);
	};
});
