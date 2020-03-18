const http = require('http');
const fs = require('fs');

let server = http.createServer(function(request, response){
    console.log(request.method, request.url);

    let filepath = 'public' + request.url;

    fs.readFile(filepath, function(err, buffer) {
        if(err) {
            response.writeHead(404);
        }else{
            response.write(buffer)
        }
        response.end();
    });
});

server.listen(1234);