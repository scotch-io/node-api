// BASE SETUP
// =============================================================================

// call the packages we need
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();

var port     = process.env.PORT || 8080; // set our port
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
var Bear     = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {

	// do logging
	console.log('whatwhat');

	// handle errors

	next();
});

router.param('bear_id', function(req, res, next, id) {

	// do validations here

	// or we can get the bear

	// store the bear for use in the req
	req.id = id;
	next();
});

// on routes that end in /bears
router.route('/bears')
	// get all the bears
	.get(function(req, res, next) {
		res.json({ what: 'get' });
		next();
	})
	// create a bear
	.post(function(req, res, next) {
		res.json({ what: 'post' });
		next();
	});

// on routes where we pass in a specific bear
router.route('/bears/:bear_id')
	// get the bear with that id
	.get(function(req, res, next) {
		res.json({ what: req.id });
	})
	// update the bear with this id
	.put(function(req, res, next) {
		res.json({ what: 'put' });
		next();
	})
	// delete the bear with this id
	.delete(function(req, res, next) {
		res.json({ what: 'delete' });
		next();
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);