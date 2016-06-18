const express = require('express');
const request = require('request')
const router = express.Router();

// REQUEST GITHUB COMMIT COUNT THIS YEAR
router.get('/github/commits', function(req, res, next){
	const username = "andyrichardson";
	const url = "http://github.com/" + username;

	const opts = {
		url: url,
		timeout: 100000
	}

	request(opts, function (err, response, body) {
		if (err) {
			res.writeHead(500);
			return res.end();
		}

		var split = body.split(" ");

		// Get contribution count
		const index = split.indexOf('contributions') - 1;
		const result = split[index];

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ result: result }));
	});
})

module.exports = router;
