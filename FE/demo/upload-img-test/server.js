const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const body = require('koa-better-body');
const convert = require('koa-convert');
const ejs = require('koa-ejs');
let qiniu = require("qiniu");


let bucket = 'wilbur';

let accessKey = 'z5JUd1wzTllFVKOLT7t9aQMbmctc2xher3qXcQ_X';
let secretKey = 'DEO-TVeNqnOeghFkientnoZFW7fJ1lnI_3sPHtho';

let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

let options = {
    scope: bucket
};

let app = new Koa();
let router = new Router();

let putPolicy = new qiniu.rs.PutPolicy(options);

let uploadToken = putPolicy.uploadToken(mac);
let config = new qiniu.conf.Config();

let formUploader = new qiniu.form_up.FormUploader(config);
let putExtra = new qiniu.form_up.PutExtra();

app.use(convert(body()));

ejs(app, {
    root: './template',
    layout: false,
    viewExt: 'ejs'
});

router.get('/', ctx => {
    ctx.body = 'welcome';
})

router.post('/upload', async ctx => {
    let file = ctx.request.fields.file;

    //调用uploadFile上传
    upload(file[0].name, file[0].path, (res)=> {
    });

    await ctx.render('upload', {name: 'res'});

});



app.use(router.routes());
app.use(static('./static'));

function upload (fname, localFile, callback) {
    putExtra.fname = fname;

    formUploader.putFile(uploadToken, fname, localFile, putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }

        if (respInfo.statusCode == 200) {
            callback(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
}

app.listen(1234, () => {
    console.log('server starting');
})