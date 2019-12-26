## 认识node.js

### 一、什么是node.js

1. javascript 的服务器版本
2. 比其他语言好在哪？
    - 便于前端人员入手
    - 性能高
    - 利于和前端代码整合
3. 工作中的用途
    - 很少用于主力服务器开发
    - 中间层语言
        - 充分利用已有代码、增强主服务器代码的独立性
        - 安全性
        - 性能
        - 丰富接口功能
    - 开发工具

### 环境搭建

node.js 版本
- 稳定版
- 最新版

node.js安装
https://nodejs.org/en/

npm 更换源
`npm install -g cnpm --registry=https://registry.npm.taobao.org`


### 二、模块系统
因为Node.js 早于ES6出现，所以并没有采用ES6的模块化系统

#### 使用模块

一个文件就是一个模块

```
//定义模块
exports.a = 12;
exports.b = function() {
    return 5;
}

//或者

module.exports = {
    a: 12,
    b() {
        return 5;
    }
}
```

```
//引入模块
let a = require('mod'); //错误
let a = require('./mod'); //正确
```
#### node_modules 目录
引入自定义模块会出错，必须加上路径，因为node.js寻找模块的顺序

- 如果只有名字(mod)
    - $HOME/node_modules
    - ./node_modules
- 如果带有路径(./mod.js)
    - 按照路径寻找
#### packjson
相当于node.js的工程文件

##### 文件内容
- name 名称
- version 版本 -- npm 自带简单的版本控制系统，用于发布和依赖
- description 描述
- main 入口文件
- scripts 自定义脚本
- keywords 关键字-- 用于发布后搜索
- author 作者

- 初始化 `npm init -y`
- -D devDependencies 开发依赖
- -S dependencies 生产依赖

##### 版本前缀
- ^ 可兼容的最高版本
- X.x 指定版本
- X.* 大版本之下的所有版本
- latest 最新版本

##### 用途

- 快速安装
- 添加各种脚本、配置文件
- 发布包

