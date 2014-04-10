var express   = require('express');
var http      = require('http');
var path      = require('path');
var mongoose  = require('./libs/mongoose');
var passport  = require('passport');
var config    = require('./config');
var log       = require('./libs/log')(module);
var HttpError = require('./error').HttpError;

var app = express();

var swig = require('swig');

require('./config/passport')(passport);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

app.use(express.favicon());

if (app.get('env') == 'development') {
	app.use(express.logger('dev'));
	app.use(express.static(path.join(__dirname, 'web')));
} else {
	app.use(express.logger('default'));
	app.use(express.static(path.join(__dirname, 'web')));
}

app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(express.session({
	secret: config.get('session:secret')
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./middleware/sendHttpError'));

app.use(app.router);

require('./routes')(app, passport);

app.use(function(err, req, res, next) {
	if (typeof err == 'number') {
		err = new HttpError(err);
	}

	if (err instanceof HttpError) {
		res.sendHttpError(err);
	} else {
		if (app.get('env') == 'development') {
			express.errorHandler()(err, req, res, next);
		} else {
			log.error(err);
			err = new HttpError(500);
			res.sendHttpError(err);
		}
	}
});

server = http.createServer(app);

server.listen(config.get('port'), function() {
	log.info('Express server listening on port ' + config.get('port'));
});