## ES6 面向对象及模块系统

### 一、面向对象

#### 语言发展简史
机器语言-汇编语言-低级语言(面向过程)-高级语言(面向对象)-模块系统-框架-系统接口(API)

#### ES5面向对象

- 没有统一的写法
-

```
//没有专门的类声明方法
function Person(name, age) { //1. 既是构造函数，又是类
    this.name = name;
    this.age = age;
}


Person.prototype.show = function() { //2. 方法独立在类之外

}


//------------------------------------------------------


//3. 没有专门的继承方法
function Worker(name, age, job) {
    Person.call(this, name, age);
    this.job = job;
}

Worker.prototype =  new Person(); //没有专门继承父类的方式
Worker.prototype.constructor = Worker;
```

#### ES6面向对象

```
//ES6中的写法
class Person1{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    show() {
        alert(this.name);
    }
}

let person1 = new Person1('zhangsan', 10);

person1.show();

// 继承
class Worker1 extends Person1 {
    constructor(name, age, job) {
        super(name, age);
        this.job = job;
    }

    showJob() {
        alert(this.job);
    }
}
let worker1 = new Worker1('lisi', 10, '老板');

worker1.showJob();
```

### 二、模块系统

#### JS模块系统演化过程

没有模块-CMD(Common Module Definition)-AMD(Asynchronous Module Definition) - 语言提供模块支持

#### 定义模块

1. 使用方式
```
//导出变量
export let a = 12;
export const PI = 3.14;

//导出多个变量
let a,b,c;

export{a, b, c}

//导出函数
export function show() {

}

//导出class

export class Person() {

}
```

2. 默认成员
```
export default 'TEST'


import mod1 from './mod1'
```

#### 使用模块
```
//引入所有成员
import * as mod1 from './mod1';

//引入default 成员
import mod1 from './mod1';

//引入某个成员
import {a, b as b1} from './mod1';

//引入文件-只引入
import 'xxx';

//异步引入
let p = import('./mod1');

console.log(mod1.a);
```

#### wepback 编译
1. 创建webpack.config.js
```
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filenmae: 'bundle.js'
    }
}
```

2. 安装webpack
3. 执行webpack 命令

### 示例代码
[点击查看](https://github.com/Wangenbo/notes/blob/master/FE/demo/ES6%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1.html)
