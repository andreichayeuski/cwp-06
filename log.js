const fs = require("fs");
module.exports.log = function(url, data) {
	const curDate = new Date();
	fs.appendFileSync("log.txt", `Date: ${curDate.getDay()}.${curDate.getMonth() + 1}.${curDate.getFullYear()} ${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}
    \r\n\tUrl: ${url}
    \r\n\tData: ${data}\r\n`);
};