const http = require('http');

let server = http.createServer(function() {
    console.log('请求了一次');
});

server.listen(1234) //监听端口号