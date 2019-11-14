## 通过Object.defineProperty实现数据监听

### 废话不多说，直接上代码

```
var data = {
    name: 'zhangsan',
    friends: [1,2,3]
}

observer(data);

console.log(data.name);
data.name = 'lisi';
data.friends[0] = 4;

function observer(data) {
    if(!data || typeof data !== 'object') return;

    for(var key in data) {
        let val = data[key]; //知识点1

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                console.log(`get ${val}`); //知识点2
                return val;
            },
            set: function(newVal) {
                console.log(`changes happen: ${val} => ${newVal}`);
                val = newVal;
            }
        })

        // console.log(val, typeof val);
        if(typeof val === 'object') {
            observer(val);
        }
    }
}
```
```
<!-- 输出结果 -->
get zhangsan
zhangsan
changes happen: zhangsan => lisi
get 1
get 2
get 3
get 1,2,3
changes happen: 1 => 4
```

### 思考

- 知识点1：let 能否改为var?
- 知识点2：val 能否改为 data[key]?

### 源代码

[点击查看]()