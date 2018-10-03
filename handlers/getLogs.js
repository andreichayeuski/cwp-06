const log = require("../log.js");
const fs = require("fs");

module.exports.getLogs = function(req, res, payload, cb) {
	log.log(req.url, JSON.stringify(payload));
	fs.readFile("logs.json", 'utf8', (err, data) =>
	{
		if (err)
		{
			log.log(req.url, JSON.stringify(err));
		}
		cb(null, JSON.parse(data));
	});
};