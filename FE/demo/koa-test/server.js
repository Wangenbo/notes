const Koa = require('koa');
const Router = require('koa-router');

//创建服务
let app = new Koa();

//路由，根据用户的请求，指定具体的处理函数

//创建路由对象
let router = new Router();


//配置路由项
router.get('/a', async ctx=> {
    console.log('请求a ');

    ctx.body = '请求a';
});

//将路由添加到服务器
app.use(router.routes());


// app.use(async function(ctx) {
//     console.log(ctx);
// });

app.listen(1234);