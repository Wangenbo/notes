const mysql = require('mysql');
const Koa = require('koa');
const Router = require('koa-router');
const Convert = require('koa-convert');
const static = require('koa-static');

const PAGE_SIZE = 5;

//1. 连接数据库
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'wangenbo',
    database: 'nodetest'
});

function query(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows)=>{
            if(err) {
                reject(err);
            }else{
                resolve(rows);
            }
        });
    })
}

let app = new Koa();
let router = new Router();

router.get('/', async ctx=> {
    ctx.body = "Hello World";
});

router.get('/get_user', async ctx=> {
    //2. 操作数据库 SQL
    const {page = 1, channel} = ctx.query;

    if(channel) {
        let datas = await query(`SELECT ID FROM api_user WHERE channel='${channel}' LIMIT ${(page - 1) * PAGE_SIZE}, ${PAGE_SIZE}`);
        let rows = await query(`SELECT count(*) AS count FROM api_user WHERE channel='${channel}'`);
        let total = Math.ceil(rows[0].count / PAGE_SIZE);

        ctx.body = {
            datas,
            total
        };
    }else{
        let datas = await query(`SELECT ID FROM api_user LIMIT ${(page - 1) * PAGE_SIZE}, ${PAGE_SIZE}`);
        let rows = await query(`SELECT count(*) AS count FROM api_user`);
        let total = Math.ceil(rows[0].count / PAGE_SIZE);

        ctx.body = {
            datas,
            total
        };
    }


});

app.use(router.routes());
app.use(static('./static'));

app.listen(1234, ()=>{
    console.log('server listening at 1234');
});