var a = 12;
var newDate = new Date();
const crypto = require('crypto');

var md5 = crypto.createHash('md5');

md5.update('123456');

console.log(md5.digest('hex'))