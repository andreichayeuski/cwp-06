const log = require("../../log.js");
let articles = require("../../articles.json");
const valid = require("../valid.js");
const fs = require("fs");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.updateArticle = function updateArticle(req, res, payload, cb) {
	if (valid.valid(req.url, payload) === true)
	{
		for (i = 0; i < articles.length; i++) {
			if (articles[i].id === payload.id) {
				if (payload.title !== undefined)
					articles[i].title = payload.title;
				if (payload.text !== undefined)
					articles[i].text = payload.text;
				if (payload.author !== undefined)
					articles[i].author = payload.author;
				if (payload.date !== undefined)
					articles[i].date = payload.date;
				log.log(req.url, payload);
				fs.writeFile("articles.json", JSON.stringify(articles), "utf8", function () { });
				cb(null, articles);
			}
		}
	}
	else {
		cb(null, ErrorObject);
	}
};