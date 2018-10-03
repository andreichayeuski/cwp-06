const log = require("../log.js");
let articles = require("../articles.json");
const defaultSortValues = {
	"sortField": "date",
	"sortOrder": "desc"
};
let compareField = defaultSortValues.sortField;
let compareOrder = defaultSortValues.sortOrder;

const defaultViewValues = {
	"page": "1",
	"limit": "10"
};
let viewPages = defaultViewValues.page;
let viewLimit = defaultViewValues.limit;

function compareCustom(a, b) {
	if (a[compareField] > b[compareField])
	{
		return compareOrder === "asc" ? 1 : -1;
	}
	if (a[compareField] < b[compareField])
	{
		return compareOrder === "asc" ? -1 : 1;
	}
}

let isValidOrderField = false;

module.exports.readAll = function(req, res, payload, cb) {
	// begin sort validation
	if (payload.sortField !== undefined)
	{
		articles.forEach((element) =>
		{
			if (element[payload.sortField] !== undefined)
			{
				isValidOrderField = true;
			}
		});
		if (isValidOrderField)
		{
			compareField = payload.sortField;
		}
		else
		{
			log.log(req.url, JSON.stringify("invalid data field name"));
		}
	}
	if (payload.sortOrder !== undefined)
	{
		if (payload.sortOrder === "asc" || payload.sortOrder === "desc")
		{
			compareOrder = payload.sortOrder;
		}
		else
		{
			log.log(req.url, JSON.stringify("invalid order field name"));
		}
	}	// end sort validation
	articles.sort(compareCustom);

	// begin page-limit validation
	if (payload.page !== undefined)
	{
		if (parseInt(payload.page, 10) > 0)
		{
			viewPages = payload.page;
		}
		else
		{
			log.log(req.url, JSON.stringify("invalid page parameter"));
		}
	}

	if (payload.limit !== undefined)
	{
		if (parseInt(payload.limit, 10) > 0)
		{
			viewLimit = payload.limit;
		}
		else
		{
			log.log(req.url, JSON.stringify("invalid page limit parameter"));
		}
	}
	let resultArticles = [];
	console.log(Math.floor(1.7));
	for (let i = viewLimit * (viewPages - 1); i < viewLimit * viewPages; i++)
	{

		console.log(i + "     " + articles[i]);
		if (articles[i] !== undefined)
		{
			resultArticles.push(articles[i]);
		}
		else
		{
			log.log(req.url, JSON.stringify("nothing to show"));
			break;
		}
	}
	// end page-limit validation
	let answer = { "items" : resultArticles,
		"page": viewPages,
		"pages": articles.length % viewLimit > 0 ? Math.floor(articles.length / viewLimit) + 1 : articles.length / viewLimit,
		"count": resultArticles.length,
		"limit": viewLimit
	};
	log.log(req.url, JSON.stringify(answer));
	cb(null, answer);
};