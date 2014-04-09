require.config({
	paths: {
		jquery   : 'bower_components/jquery/dist/jquery',
		text     : 'bower_components/requirejs-text/text',
		bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
		bacon    : 'bower_components/bacon/dist/Bacon',
		draggable: 'bower_components/draggable/draggable'
	},
	shim: {
		'bootstrap': ["jquery"],
		'bacon'    : ['jquery'],
	}
});

require([
	'bootstrap',
	'controllers/mainController',
	'controllers/popupChatsController'
]);