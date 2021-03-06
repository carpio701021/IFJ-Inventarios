var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//libreria de manejo de sessiones
var sessions = require('client-sessions');

var routes = require('./routes/index');
var users = require('./routes/users');
var userlogin = require('./routes/userlogin');
var userlogout = require('./routes/userlogout');

var administracion = require('./routes/administracion/index');
	var admin_grupos = require('./routes/administracion/grupos');
	var admin_unidades = require('./routes/administracion/unidades');
	var admin_items = require('./routes/administracion/items');
var transacciones = require('./routes/transacciones_inventarios/index');
var reportes = require('./routes/reportes/index');
    var rep_catalogos = require('./routes/reportes/catalogos');
    var rep_inventarios = require('./routes/reportes/inventarios');


var app = express();

//session de usuarios
app.use(sessions({
	cookieName: 'user_session',
	secret: 'aT4023=DIj0230ij=S_jFeHf-fwe', //contraseña de encriptamiento de la cookie
	duration: 1 * 60 * 60 * 1000, //duracion de la cookie 1 hora (sesion)
	activeDuration: 30 * 60 * 1000 //re activacion de la duracion cookie 30 minutos
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', userlogin);
app.use('/logout', userlogout);

app.use('/administracion', administracion);
    app.use('/administracion/grupos', admin_grupos);
    app.use('/administracion/unidades', admin_unidades);
    app.use('/administracion/items', admin_items);
app.use('/transacciones_inventarios', transacciones);
app.use('/reportes', reportes);
    app.use('/reportes/catalogos', rep_catalogos);
    app.use('/reportes/inventarios', rep_inventarios);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	console.log('Error '+err.status+': \n'+err.stack);
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		console.log('Error '+err.status+': \n'+err.stack);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.log('Error '+err.status+': \n'+err.stack);
	res.render('error', {
		message: err.message,
		error: {}
	});
});



module.exports = app;