const log = require("../../log.js");
const valid = require("../valid.js");
const fs = require("fs");
let articles = require("../../articles.json");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.createComment = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload) === true) {
		let ind = articles.findIndex(i => i.id === payload.articleId);
		if (ind !== -1) {
			if (articles[ind].comments.length !== 0) {
				payload.id = articles[ind].comments[articles[ind].comments.length - 1].id + 1
			} else {
				payload.id = 0;
			}
			articles[ind].comments.push(payload);
			fs.writeFile("articles.json", JSON.stringify(articles), "utf8", function () {
			});
			log.log(req.url, payload);
			cb(null, articles[ind]);
		} else {
			cb(ErrorObject);
		}
	} else {
		cb(ErrorObject);
	}
};