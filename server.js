var express = require('express');
var bodyParser = require('body-parser');
var methodOverider = require('method-override');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
// require('./app/models/model.js');
require('./app/data/dashboard.js');
var dashboardModel = require('./app/models/dashboard.js');
console.log(1);
var dashboard = require('./app/routes/dashboard')(dashboardModel)
console.log(2);
var initPassport = require('./passportInit');
initPassport(passport);
// console.log(1);
var authenticate = require('./app/models/authenticate.js');
authenticate(passport);
// var loginctrl = require('./app/controllers/login');
// loginctrl(authenticate);
// // routes ==================================================
var authRoutes = require('./app/routes/routes')(passport);
var port = 1111;
var app = express();
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverider('X-HTTP-Method-Override'));

mongoose.connect("mongodb://localhost:27017/dashboard");

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/application', dashboard);
app.use('/api', authRoutes);


// start app ===============================================
// startup our app at http://localhost:1111
app.listen(port);

// startup of dashboard application
console.log('Starting dashboard on port ' + port);

// expose app
module.exports = app;
