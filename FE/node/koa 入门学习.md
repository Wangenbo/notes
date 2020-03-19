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

### 请求参数解析

- get 请求
```
ctx.query
```

- post 请求

```
1. npm i koa-better-body -D

2. npm i koa-convert -D //将v1 中间件转换为v3中间件

3. 获取 ctx.request.fields

4. npm i koa-static -D //处理静态文件
```

```
-html

<form action="http://localhost:1234/a" method="post">
    <input type="text" name="username">

    <button type="submit">提交</button>
</form>


-server.js

const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-better-body');
const convert = require('koa-convert');
const static = require('koa-static');

//创建服务
let app = new Koa();

//路由，根据用户的请求，指定具体的处理函数

//创建路由对象
let router = new Router();

app.use(convert(body()));
//配置路由项
// router.get('/a', async ctx=> {
//     console.log(ctx.query);

//     ctx.body = '请求a';
// });

router.post('/a', async ctx=> {
    console.log(ctx.request.fields);
    console.log('请求a - post');

    ctx.body = '请求a - post';
});

//将路由添加到服务器
app.use(router.routes());

app.use(static('./public'));

app.listen(1234);
```

### 数据请求示例

```
请求地址 http://localhost:1234/get_list&page=1

-server.js

const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const datas = require('./data/data.json');

const PAGE_SIZE = 15;
//1. koa
let app = new Koa();

//2.router
let router = new Router();

router.get('/get_list', async ctx => {
    const {page, channel} = ctx.query;

    let temp = datas;

    if(channel) {
        temp.filter(json=>json.channel == channel)
    }

    let arr = temp.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    let total = Math.ceil(temp.length / PAGE_SIZE);

    ctx.body = {
        data: arr,
        total
    }
})

//3.static

app.use(router.routes());
app.use(static('./public'));

app.listen(1234);

```

