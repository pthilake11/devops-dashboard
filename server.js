var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverider = require('method-override');

var port = 1111;
// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverider('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our backend routes

// start app ===============================================
// startup our app at http://localhost:1111
app.listen(port);               

// startup of dashboard application
console.log('Starting dashboard on port ' + port);

// expose app           
exports = module.exports = app;      
