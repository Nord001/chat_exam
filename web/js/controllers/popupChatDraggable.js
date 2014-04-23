define(['jquery',
		'draggable'
], function($, draggable) {
	return function (element) {
		var el     = element.get(0);
		var handle = el.getElementsByClassName('panel-title')[0];
		
		draggable(el, handle);
	};
});
