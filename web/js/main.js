require.config({
	paths: {
		'jquery'    : 'bower_components/jquery/dist/jquery',
		'text'      : 'bower_components/requirejs-text/text',
		'bootstrap' : 'bower_components/bootstrap/dist/js/bootstrap',
		'bacon'     : 'bower_components/bacon/dist/Bacon',
		'draggable' : 'bower_components/draggable/draggable',
		'underscore': 'bower_components/underscore/underscore',
		'socket.io' : 'bower_components/socket.io-client/dist/socket.io'
	},
	shim: {
		'bootstrap' : ["jquery"],
		'bacon'     : ['jquery'],
		'underscore': ['jquery']
	}
});

require([
	'bootstrap',
	'controllers/mainController',
	'controllers/chatListController',
	'controllers/chatController',
	'controllers/smileController',
	'controllers/popoversController',
]);