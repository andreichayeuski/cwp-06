const fs = require("fs");
const logs = require("./logs.json");
module.exports.log = function(url, data) {
	const curDate = new Date();
	logs.push({
		"date": `${curDate.getDay()}.${curDate.getMonth() + 1}.${curDate.getFullYear()} ${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}`,
		"url": `${url}`,
		"data": `${data}`
	});
	fs.writeFileSync("logs.json", JSON.stringify(logs));
};