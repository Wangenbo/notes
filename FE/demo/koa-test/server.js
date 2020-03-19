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

// app.use(async function(ctx) {
//     console.log(ctx);
// });

app.listen(1234);