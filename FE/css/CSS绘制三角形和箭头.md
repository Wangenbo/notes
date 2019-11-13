## CSS 绘制三角形

### 原理：通过控制元素的边框大小及颜色，显示不同的三角形

### 效果：如下图

![trangle](http://cdn.zsdx.cn/wangenbo/trangle.png)

### 实现代码

```
--html

<div class="box box6"></div>

--css

.box{
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    display: inline-block;
}

.box3{
    border-color: red transparent transparent transparent;
}
```

### 说明
可以通过CSS3中的旋转实现不同角度的三角形`transform:rotate(90deg);`

## 绘制箭头

### 原理：同三角形，箭头就是通过两个三角形叠加，白色三角形覆盖底层三角形，错开1px(或者更多)，形成箭头。

### 效果：如下图
![arrow-green](http://cdn.zsdx.cn/wangenbo/arrow-green.png)

将绿色替换为白色即可实现箭头效果

![arrow](http://cdn.zsdx.cn/wangenbo/arrow.png)

### 代码

```
--html
<div class="arrow"></div>

--css

.arrow{
    position: relative;
}
.arrow:before, .arrow:after{
    position: absolute;
    content: "";
    border-top: 100px transparent solid;
    border-left: 100px transparent solid;
    border-bottom: 100px transparent solid;
    border-right: 100px #fff solid;
}
.arrow:before{
    border-right: 100px red solid;
}
.arrow:after{
    left: 10px;
    border-right: 100px #fff solid;
}
```

### 源码地址
[css 绘制三角形和箭头](https://github.com/Wangenbo/notes/blob/master/FE/demo/css-triangle.html)

