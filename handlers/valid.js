module.exports.valid = function(url, payload) {
	let res = false;
	switch (url) {
		case '/api/articles/delete':
			if (payload.id !== undefined)
				res = true;
			break;
		case '/api/articles/create':
			if (payload.title !== undefined && payload.text !== undefined && payload.date !== undefined &&
				payload.author !== undefined && payload.comments !== undefined) {
			}
				res = true;
			break;
		case '/api/comments/create':
			if (payload.articleId !== undefined && payload.text !== undefined && payload.date !== undefined &&
				payload.author !== undefined)
				res = true;
			break;
		case '/api/comments/delete':
			if (payload.articleId !== undefined && payload.id !== undefined)
				res = true;
			break;
		case '/api/articles/read':
			if (payload.id !== undefined)
				res = true;
			break;
		case '/api/articles/update':
			if (payload.id !== undefined && payload.text !== undefined && payload.date !== undefined &&
				payload.author !== undefined && payload.title !== undefined)
				res = true;
			break;
	}
	return res;
};