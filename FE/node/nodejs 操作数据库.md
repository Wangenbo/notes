## nodejs 操作mysql 数据库


### 1. 基本连接
```
const mysql = require('mysql');

//1. 连接数据库
let db = mysql.createConnection({
    host: 'xxxx',
    user: 'xxxx',
    password: 'xxxxx',
    database: 'xxxxxx'
});


//2. 操作数据库 SQL
db.query('SELECT * FROM xxxx', (err, rows)=>{
    if(err) {
        console.log('查询失败', err);
    }else{
        console.log(rows);
    }
})
```

### 2. 结合koa- 案例
```
const mysql = require('mysql');
const Koa = require('koa');
const Router = require('koa-router');
const Convert = require('koa-convert');
const static = require('koa-static');



//1. 连接数据库
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'wangenbo',
    database: 'nodetest'
});

function query(sql) {
    new Promise((resolve, reject) => {
        db.query(sql, (err, rows)=>{
            console.log(rows);
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

router.get('/get_user', async ctx=> {
    //2. 操作数据库 SQL
    let rows = await query('SELECT * FROM api_user');

    ctx.body = rows;
})


app.use(router.routes());
app.use(static('./static'));

app.listen(1234, ()=>{
    console.log('server listening at 1234');
});
```