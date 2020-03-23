## 服务端渲染工具ejs基本使用

### 什么是ejs

>EJS 是一套简单的模板语言，利用普通的 JavaScript 代码生成 HTML 页面。

### 安装

```
npm install ejs -D

或者

npm install koa-ejs -D
```

### 基本语法

```
<% if (user) { %>
  <h2><%= name %></h2>
<% } %>
```

```
let template = ejs.compile(str, options);
template(data);
// => 输出渲染后的 HTML 字符串

ejs.render(str, data, options);
// => 输出渲染后的 HTML 字符串

ejs.renderFile(filename, data, options, function(err, str){
    // str => 输出渲染后的 HTML 字符串
});
```

### 标签含义
- `<%` '脚本' 标签，用于流程控制，无输出。
- `<%_` 删除其前面的空格符
- `<%=` 输出数据到模板（输出是转义 HTML 标签）
- `<%-` 输出非转义的数据到模板
- `<%#` 注释标签，不执行、不输出内容
- `<%%` 输出字符串 '<%'
- `%>` 一般结束标签
- `-%>` 删除紧随其后的换行符
- `_%>` 将结束标签后面的空格符删除


### 基本使用示例

```
const ejs = require('ejs');

ejs.renderFile('./template/1.ejs', {name: '张三'}, (err, result)=> {
    if(err) {
        console.log('渲染失败');
    }else{
        console.log(result);
    }
});


```

### 配合koa 使用ejs

```
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
```