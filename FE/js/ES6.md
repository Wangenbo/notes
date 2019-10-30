## ES6基础
### 1. 安装
    windows

    1. 安装git
    2. 安装webpack
    3. install
    4. start

    Mac Os

    1. clone
    2. install
    3. start
### 2. 常量

ES5中常量的写法

```
Object.defineProperty(window, "PI", {
    value: 3.1415926,
    writable: false
})
```

ES6写法

```
const PI = 3.1415926
```

### 3. 作用域

```
const callbacks = [];

for(var i = 0; i <= 2; i++) {
    calbacks[i] = function() {
        return i * 2;
    }
}

console.table({
    callbacks[0]();
    callbacks[1]();
    callbacks[2]();
})
```

变量提升

块作用域

```
{
    function foo() {
        return 1;
    }

    console.log(foo() === 1);

    {
        function foo() {
            return 2;
        }
        console.log(foo() === 2);
    }
}
```

### 4. 箭头函数

ES5

```
function a() {

}
```

ES6

```
() => {

}
```

ES5

```
var evens = [1,2,3,4,5];
var odds = evens.map(function(v) {
    return v+1;
})
```

ES6

```
let evens = [1,2,3,4,5];
let odds = evens.map(v => v+1);
```

this 的绑定

ES5

```
var factory = fucntion() {
    this.a = 'a';
    this.b = 'b';
    this.c = function() {
        a: 'a+',
        b: function() {
            return this.a;
        }
    }
}
console.log(new factory().c.b());
```

ES6

```
var factory = function() {
    this.a = 'a';
    this.b = 'b';
    this.c = {
        a: 'a+',
        b: () => {
            return this.a;
        }
    }
}
```

### 5. 默认参数

ES5默认参数

```
function f(x,y,z) {
    if(y === undefined) {
        y = 7;
    }

    if(z === undefined) {
        z = 9;
    }

    return x + y + z;
}
```

ES6

```
function f(x, y = 7, z = 42) {
    return x + y + z;
}
```

检查参数是否为空

```
function check() {
    throw new Error('empty');
}
```

```
function f(x=check(), y = 7, z = 42) {
    return x + y + z;
}
```


```
try{
    f();
}catch (e) {
    console.log(e);
}
```

可变参数

ES5
```
fucntion f() {
    var a = Array.prototype.slice.call(arguments);

    var sum = 0;

    a.forEach(function(item) {
        sum += item*1;
    })

    return sum;
}
```

ES6

```
function f(...a) { //...a可变运算符
    var sum = 0;

    a.forEach(item => {
        sum += item * 1;
    })

    return sum;
}
```

合并数组

ES5

```
var params = ['hello', true, 7];
var other = [1,2].concat(parmas);
```

ES6利用扩展运算符

```
var params = ['hello', true, 7];
var other = [
    1, 2, ...params
]
```

### 6. 对象代理
ES3 数据保护

```
var Person = function()
{
    let data = {
        name: 'zhangsan',
        sex: 'male',
        age: 13
    }

    this.get = function(key) {
        return data[key];
    }
    this.set = function(key, value) {
        if(key !== 'sex') {
            data[key] = value;
        }
    }
}
ver person = new Person();

console.table({
    name: person.get('name'),
    sex: person.get('sex'),
    age: person.get('age')
})
```

ES5

```
var Person = {
    name: 'es5',
    age: 15
}

Object.defineProperty(Person, 'sex', {
    writeable: false,
    value: 'male'
})
```

ES6

```
let Person = {
    name: 'es6',
    sex: 'male',
    age: 15
}

let person = new Proxy(Person, {
    get(target, key){
        return traget[key]
    },

    set(target, key, value) {
        if(key !== 'sex') {
            target[key] = value
        }
    }
})

console.table({
    name: person.name,
    sex: person.sex,
    age: person.age
})
```