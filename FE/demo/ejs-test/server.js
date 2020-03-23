const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const ejs = require('koa-ejs');

let app = new Koa();
let router = new Router();

ejs(app, {
    root: './template',
    layout: false,
    viewExt: 'ejs'
});

router.get('/', async ctx=> {
    await ctx.render('1', {name: '李四'});
});

app.use(router.routes());
app.use(static('./static'));


app.listen(1234);