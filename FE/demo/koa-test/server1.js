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
