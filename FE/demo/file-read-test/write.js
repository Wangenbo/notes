const fs = require('fs');
let list = [1, 2, 3];

for(let i = 0; i < list.length; i++) {
    fs.appendFile('./write.txt', list[i], function (err) {
        if (err) {
            console.log('err');
        } else {
            console.log('done');
        }
    });
}


