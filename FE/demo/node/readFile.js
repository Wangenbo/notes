const fs = require('fs');

fs.readFile('./test.js', function(err, buffer) {
    if(err) {
        console.log('error');
    }else{
        console.log(buffer.toString());
        let source = buffer.toString();

        let dist = source.replace(/let/g, 'var');

        fs.writeFile('./bundle.js', dist, function(err){
            if(err) {
                console.log('err');
            }else{
                console.log('done');
            }
        });
    }
});