let a = 12;
let newDate = new Date();
const crypto = require('crypto');

let md5 = crypto.createHash('md5');

md5.update('123456');

console.log(md5.digest('hex'))