const log = require("../../log.js");
const valid = require("../valid.js");
let articles = require("../../articles.json");
const fs = require("fs");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.deleteComment = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload) === true) {
		let index, indexOfComment;
		if ((index = articles.findIndex(i => i.id === payload.articleId)) !== -1 &&
			(indexOfComment = articles[index].comments.findIndex(i => i.id === payload.id)) !== -1) {
			articles[index].comments.splice(indexOfComment, 1);
			fs.writeFile("articles.json", JSON.stringify(articles), "utf8", function () { });
			log.log(req.url, payload);
			cb(null, articles[index]);
		} else {
			cb(ErrorObject);
		}
	} else {
		cb(ErrorObject);
	}
};