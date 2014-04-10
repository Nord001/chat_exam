var HttpError = require('../error').HttpError;

module.exports = function(app, passport) {
	app.get('/', isLoggedIn, function(req, res, next) {
		res.render('main', {
			title: "Geeks chat",
			player: req.user
		});
	});

	app.get('/login', function(req, res, next) {
		res.render('login', {
			title: "Login"
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
	}));

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/',
		failureRedirect: '/login'
	}))

	app.get('/signup', function(req, res, next) {
		res.render('signup', {
			title: 'Sign up'
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}