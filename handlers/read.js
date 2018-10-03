const log = require("../log.js");
const valid = require("./valid.js");
let articles = require("../articles.json");
const ErrorObject = { code: 400, message: 'Request invalid' };

module.exports.read = function(req, res, payload, cb) {
	log.log(req.url, JSON.stringify(payload));
	if (valid.valid(req.url, payload) === true) {
		let id = payload.id;
		let article = {};
		articles.forEach(element => {
			if (element.id === id) {
				article = element;
			}
		});
		cb(null, article);
	} else {
		cb(ErrorObject);
	}
};