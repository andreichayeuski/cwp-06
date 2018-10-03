const log = require("../../log.js");
const fs = require("fs");
const valid = require("../valid.js");
let articles = require("../../articles.json");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.createArticle = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload) === true) {
		payload.id = articles[articles.length - 1].id + 1;
		articles.push(payload);
		console.log(articles);
		fs.writeFile("articles.json", JSON.stringify(articles), "utf8", function () { });
		log.log(req.url, payload);
		cb(null, payload);
	} else {
		cb(ErrorObject);
	}
};