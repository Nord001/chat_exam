var LocalStrategy   = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var User            = require('../models/user');

var config          = require('../config');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	//local registration
	passport.use('local-signup', new LocalStrategy({
		usernameField    : 'email',
		passwordField    : 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({'local.email': email}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, false, req.flash('signupMessage', "That email is already taken."));
				} else {
					var newUser            = new User();
					newUser.local.email    = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));

	//local authentication
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		User.findOne({'local.email': email}, function(err, user) {
			if (err) {
				return done(err);
			};
			if (!user) {
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			};
			if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'wrong passwoed'));
			};
			return done(null, user);
		});
	}));

	//twitter authentication
	passport.use(new TwitterStrategy({
		consumerKey   : config.get("twitterAuth:consumerKey"),
		consumerSecret: config.get("twitterAuth:consumerSecret"),
		callbackURL   : config.get("twitterAuth:callbackURL")
	},
	function(token, tokenSecret, profile, done) {
		process.nextTick(function() {
			User.findOne({'twitter.id' : profile.id}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.twitter.id = profile.id;
					newUser.twitter.token = token;
					newUser.twitter.username = profile.username;
					newUser.twitter.displayName = profile;

					newUser.save(function(err) {
						if (err) {
							throw err;
						}
						return done(null, newUser)
					});
				}
			});
		});
	}));
};