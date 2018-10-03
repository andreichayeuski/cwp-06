const log = require("../../log.js");
let articles = require("../../articles.json");
const valid = require("../valid.js");
const fs = require("fs");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.deleteArticle = function deleteArticle(req, res, payload, cb) {
	if (valid.valid(req.url, payload) === true) {
		let ind = articles.findIndex(i => i.id === payload.id);
		if (ind !== -1) {
			let delArt = articles[ind];
			articles.splice(ind, 1);
			fs.writeFile("articles.json", JSON.stringify(articles), "utf8", function () { });
			log.log(req.url, payload);
			cb(null, delArt);
		}
		else {
			cb(ErrorObject);
		}
	} else {
		cb(ErrorObject);
	}
};