## ES6异步操作

- 异步操作：同时进行多个操作，代码比较混乱
- 同步操作：一次只能进行一个操作，用户体验不好

例子：
异步操作：(伪代码)
```
ajax('http://taoba.com/api/user', function() {
    ajax('http://taoba.com/api/items', function() {
        ajax('http://taoba.com/api/ad', function() {

        }, function() {
            alert('error');
        })
    }, function() {
        alert('error');
    })
}, function() {
    alert('error');
})
```

例子：
同步操作(伪代码)

```
let data1 = ajax('http://taoba.com/api/user');
let data2 = ajax('http://taoba.com/api/items');
let data3 = ajax('http://taoba.com/api/ad');
```

### Promise

- 基本用法
```
    <script>
        let p = new Promise(function(resolve, reject) {
            //resolve 解决-成功
            //reject 拒绝-失败

            $.ajax({
                url: 'data/test.txt',
                dataType: 'json',
                success(arr) {
                    resolve(arr);
                },
                error(res) {
                    reject(res);
                }
            })
        });

        p.then(function(arr) {
            console.log('成功');
        }, function(res) {
            console.log(res);
        });
    </script>
```

- Promise.all()

```
Promise.all([
    p1,
    p2,
    p3
]).then(arr=>{
    console.log(arr); // array
}, res=>{
    alert('失败');
});
```

- Promise.race 竞速（谁先完成-用谁）

### async/await

- 基本用法

```
async function show() {
    xxx;
    xxx;
    await $.ajax();
    xxx;
}

show();
```

- 了解
    - 普通函数：一直执行，直到结束
    - async函数：能够“暂停”

- 例子

```
<script>
async function show() {
    let a = 1;
    let b = 10;

    try{
        let c = await $.ajax({url: '1.txt', dataType: 'json'});

        alert(a+b+c[0]);
    }catch(e) {
        console.log(e);
    }

}

show();

</script>
```