var express          = require('express');
var http             = require('http');
var path             = require('path');
var mongoose         = require('./libs/mongoose');
var passport         = require('passport');
var passportSocketIo = require('passport.socketio');
var config           = require('./config');
var log              = require('./libs/log')(module);
var HttpError        = require('./error').HttpError;
var MongoStore       = require("connect-mongo")(express);

var store = new MongoStore({db: mongoose.connection.db})

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
	log.info('dev');
} else {
	app.use(express.logger('default'));
	app.use(express.static(path.join(__dirname, 'web'), { maxAge: 86400000 }));
	log.info('def');
}

app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(express.session({
	secret: config.get('session:secret'),
	store: store
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

var io = require('./libs/socket')(server);

io.set('authorization', passportSocketIo.authorize({
	cookieParser: express.cookieParser,
	secret: config.get('session:secret'),
	store: store,
	success: onAuthorizeSuccess,
	fail: onAuthorizeFail
}));

if (app.get('env') !== 'development') {
	io.set('log level', 1);
}

function onAuthorizeSuccess(data, accept){
  console.log('successful connection to socket.io');

  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept){
  if(error)
    throw new Error(message);
  console.log('failed connection to socket.io:', message);

  accept(null, false);
}

require('./libs/chat')(io);

server.listen(config.get('port'), function() {
	log.info('Express server listening on port ' + config.get('port'));
});