const log = require("../log.js");
let articles = require("../articles.json");
const defaultSortValues = {
	"sortField": "date",
	"sortOrder": "desc"
};

let compareField = defaultSortValues.sortField;
let compareOrder = defaultSortValues.sortOrder;

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

let isValid = false;

module.exports.readAll = function(req, res, payload, cb) {
	if (payload.sortField !== undefined)
	{
		articles.forEach((element) =>
		{
			if (element[payload.sortField] !== undefined)
			{
				isValid = true;
			}
		});
		if (isValid)
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

	articles.sort(compareCustom);
	log.log(req.url, JSON.stringify(payload));
	cb(null, articles);
};