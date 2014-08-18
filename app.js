
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var MySQLStore = require('connect-mysql')(express);
var options = {
        config: {
            user: 'root',
            password: 'root',
            database: 'blog'
        }
    };
var flash = require('connect-flash');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './public/images' }));
app.use(express.session({ secret: 'uid',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MySQLStore(options)}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);
routes(app);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
