
## Object.defineProperty

#### 定义
```
Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象现有属性，这个方法执行完成后，会返回修改后的这个对象
```

#### 语法
```
Object.defineProperty(obj, prop, descriptor)
```

- obj
    要处理的目标对象
- prop
    要定义或者修改的属性名称
- descriptor
    将被定义或修改的属性描述符

#### 使用方法

```
var obj = {};
obj.name = 'hunger';
obj['age'] = 3;
Object.defineProperty(obj, 'intro', {
    value: 'hello world'
});
```

以上三种方法都可以用来定义/修改一个属性。

数据描述符

---
`configurable`

```
var obj = {};
Object.defineProperty(obj, 'intro', {
    configurable: false,
    value: 'hello world'
});

obj.intro = 'hello';
console.log(obj.intro); //'hello world'

delete obj1.intro;
console.log(obj1.intro); //'hello world'
```

`configurable` 默认值为false
不能通过Object.defineProperty 修改属性，也无法删除该属性。

---

`enumberable`

```
var obj2 = {name: 'zhangsan'};
Object.defineProperty(obj2, 'age', {
    value: 3,
    enumerable: false
});

for(var key in obj2) {
    console.log('obj2', key); //obj2 name
}
```
`enumberable` 遍历对象的时候会忽略当前属性，默认值为false

---
`writable`

```
var obj3 = {name: 'lisi'};
Object.defineProperty(obj3, 'age', {
    value: 3,
    writable: false
})

obj3.age = 4;

console.log(obj3.age); //3
```
`writable` 默认为false 修改对象时，无法对属性进行修改

---
存取描述符

- get:一个给属性提供getter 的方法，如果没有getter 则为undefined，该方法返回值被用作属性值，默认为undefined。
- set:一个给属性提供setter的方法，如果没有setter 则为undefined。该方法将接受唯一参数，并将参数的新值分配给该属性。默认为undefined

```
var obj4 = {};
var age;

Object.defineProperty(obj4, 'age', {
    get: function() {
        console.log('get age');
        return age;
    },
    set: function(val) {
        console.log('set age');
        age = val;
    }
})

obj4.age = 100; // set age

console.log(obj4.age); //get age
```

数据描述符和存取描述符是不能同时存在的。

#### 源码
[点击查看]()

