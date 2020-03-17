## 原生node.js基本使用
- 原生、系统模块
- 自定义模块
- 第三方模块

### crypto

> crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

```
const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544
```

> update()方法默认字符串编码为UTF-8，也可以传入Buffer。
如果要计算SHA1，只需要把'md5'改成'sha1'，就可以得到SHA1的结果1f32b9c9932c02227819a4151feed43e131aca40。
还可以使用更安全的sha256和sha512。

### File System
>Node.js内置的fs模块就是文件系统模块，负责读写文件。
和所有其它JavaScript模块不同的是，fs模块同时提供了异步和同步的方法。

```
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
```

### HTTP

>要开发HTTP服务器程序，从头处理TCP连接，解析HTTP是不现实的。这些工作实际上已经由Node.js自带的http模块完成了。应用程序并不直接和HTTP协议打交道，而是操作http模块提供的request和response对象。
request对象封装了HTTP请求，我们调用request对象的属性和方法就可以拿到所有HTTP请求的信息；


>response对象封装了HTTP响应，我们操作response对象的方法，就可以把HTTP响应返回给浏览器。

>用Node.js实现一个HTTP服务器程序非常简单。我们来实现一个最简单的Web程序hello.js，它对于所有请求，都返回Hello world!：

```
// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
```


