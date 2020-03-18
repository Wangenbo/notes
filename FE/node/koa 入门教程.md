## Koa

### 介绍

>Koa 是一个新的 web 框架，Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，快速编写服务端应用程序。

### 安装

`npm i koa koa-router -D`

### 引入

```
const Koa = require('koa');
const Router = require('koa-router');

//创建服务
let app = new Koa();

//路由，根据用户的请求，指定具体的处理函数

//创建路由对象
let router = new Router();


//配置路由项
router.get('/a', async ctx=> {
    ctx.body = '请求a';
});

//将路由添加到服务器
app.use(router.routes());

app.listen(1234);
```

