// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var app        = express();

// configure app
app.use(bodyParser());

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
	.get(function(req, res) {
		res.json({ what: 'get' });
	})
	// create a bear
	.post(function(req, res, next) {
		
		var bear = new Bear();
		bear.name = req.body.name;

		bear.save(function(err) {
			if (err)
				throw err;

			console.log('bear is safe!');
			next();
		});

		console.log('success');
		res.send('bear did it!');
	});

// on routes where we pass in a specific bear
router.route('/bears/:bear_id')
	// get the bear with that id
	.get(function(req, res) {
		res.json({ what: req.id });
	})
	// update the bear with this id
	.put(function(req, res) {
		res.json({ what: 'put' });
	})
	// delete the bear with this id
	.delete(function(req, res) {
		res.json({ what: 'delete' });
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);