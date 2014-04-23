define([''], function() {
	return function(keyCode) {
		return function(event) { return event.keyCode == keyCode && !event.shiftKey}
	};
});