## 详解vue的diff 算法

### 1.当数据发生变化时，vue 是怎么更新节点的？
渲染真实DOM的开销是很大的，比如修改某个数据时候，如果直接渲染到真实DOM上会引起整个DOM树的重绘和重排，这个时候diff 算法就发挥作用。首先根据真实DOM生成 virtual DOM ，当virtual DOM某个节点的数据改变后会生成一个新的Vnode ,然后vnode 和oldVnode 作对比，发现不一样的地方直接修改在真实DOM上，然后使oldVnode的值为Vnode。
diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实DOM打补丁。

### 2.virtual DOM和真实DOM的区别
virtual DOM是将真实的DOM的数据抽取，以对象的形式模拟树形结构

DOM结构
```
<div>
    <p>DOM</p>
</div>
```

virtual DOM (伪代码)

```
var Vnode = {
    tag: 'div',
    children: [
        {
            tag: 'p',
            text: 'DOM'
        }
    ]
}
```

### diff 的比较方式
在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。

```
<div>
    <p>123</p>
</div>

<div>
    <span>456</span>
</div>
```

示例图：
![diff](http://cdn.zsdx.cn/test/diff.png)

### diff 流程
当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图。

流程图
![diff](http://cdn.zsdx.cn/test/diff2.png)