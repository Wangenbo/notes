const fs = require('fs');

fs.readFile('./file/animate.css', function (err, buffer) {
    if (err) {
        console.log('error');
    } else {
        console.log(buffer.toString());
        let source = buffer.toString();

        // let dist = source.replace(/let/g, 'var');

        let dist = source.split('@keyframes')[1].trim();

        fs.writeFile('./bundle.txt', dist, function (err) {
            if (err) {
                console.log('err');
            } else {
                console.log('done');
            }
        });
    }
});