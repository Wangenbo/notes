const ejs = require('ejs');

ejs.renderFile('./template/upload.ejs', {name: '张三'}, (err, result)=> {
    if(err) {
        console.log('渲染失败');
    }else{
        console.log(result);
    }
});

