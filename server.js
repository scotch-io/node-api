// BASE SETUP
// =============================================================================

// call the packages we need
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();

var port     = process.env.PORT || 8080; // set our port
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

// ROUTES FOR OUR API
// =============================================================================
// create our router
var router = express.Router();

router.use(function(req, res, next) {
	console.log('whatwhat');
	next();
});

router.get('/', function(req, res) {
	res.json({ what: 'yes' });
});

// CRUD ROUTES --------------------------------------
// create

// read

// update

// destroy

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);