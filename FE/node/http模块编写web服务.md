## http模块编写web服务

### 基础服务搭建

```
const http = require('http');

let server = http.createServer(function(request, response){
    console.log(request.method, request.url);

    response.write('aaaa');

    response.end();
});

server.listen(1234);
```

### 根据用户请求，读取相应文件，并返回给前台(fs 模块处理请求)


```
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
```