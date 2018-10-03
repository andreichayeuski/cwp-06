const log = require("../log.js");
let articles = require("../articles.json");
const defaultValues = {
	"sortField": "date",
	"sortOrder": "desc",
	"page": "1",
	"limit": "10",
	"includeDeps": false
};
let compareField = defaultValues.sortField;
let compareOrder = defaultValues.sortOrder;
let viewPages = defaultValues.page;
let viewLimit = defaultValues.limit;
let includeDeps = defaultValues.includeDeps;

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
	}
	// end sort validation
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
	for (let i = viewLimit * (viewPages - 1); i < viewLimit * viewPages; i++)
	{
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

	// begin with/without comments
	if (payload.includeDeps === true || payload.includeDeps === false)
	{
		includeDeps = payload.includeDeps;
	}
	if (!includeDeps)
	{
		resultArticles.forEach((element) =>
		{
			element.comments = [];
		});
	}
	// end with/without comments

	let answer = { "items" : resultArticles,
		"page": viewPages,
		"pages": articles.length % viewLimit > 0 ? Math.floor(articles.length / viewLimit) + 1 : articles.length / viewLimit,
		"count": resultArticles.length,
		"limit": viewLimit
	};
	log.log(req.url, JSON.stringify(answer));
	cb(null, answer);
};