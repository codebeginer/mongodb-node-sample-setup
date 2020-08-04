// below code is for debuging purpose
Object.defineProperty(global, '__stack', {
	get: function(){
		var orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack){ return stack; };
		var err = new Error;
		Error.captureStackTrace(err, arguments.callee);
		var stack = err.stack;
		Error.prepareStackTrace = orig;
		return stack;
	}
  });
  
Object.defineProperty(global, '__line', {
	get: function(){
	  	return __stack[1].getLineNumber();
	}
});

// load the configuration file of the server
config = require('./libs/config');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
app = express();

// load the database file
var {mongoose} = require('./libs/database');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// load the logger function to log all the programtic errors.
JLog = require('./libs/logger');

// load language file
lang = require('./libs/language');

// load the helper class
helper = require('./libs/helper');

var AuthController = require('./controllers/auth');
var SiteController = require('./controllers/site');

app.use('/', SiteController);

app.use('/auth', AuthController);

app.use('*',function(req,res){
	if(!res.headersSent)
	{
		res.status(404).send({message : lang('BAD_REQUEST')});
	}
});


process.on('uncaughtException', function (err,res) {
	JLog(err.toString(),__filename,__line);
});

module.exports = app;
