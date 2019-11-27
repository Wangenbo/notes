## 单向数据绑定

### MVVM原理

#### 概念
MVVM（Model-View-ViewModel）是一种用于吧数据和UI分离的设计模式。
MVVM中的Model标识应用程序使用的数据。Model保存信息，但通常不处理行为，不会对信息进行再次加工。数据的格式化是由View处理的。行为一般认为是业务逻辑，封装在ViewModel中。

View 是与用户进行交互的桥梁。

ViewModel 充当数据转换器，将Model信息转换为View信息，将命令从View传递到Model。

#### 思考

假设有如下代码，data里面的name 会和视图中{{name}}一一映射，修改data里的值，会直接引起视图中对应的数据变化。

```
<body>
    <div id="app">{{name}}</div>

    <script>
        function mvvm() {
            //todo
        }

        var vm = new mvvm({
            el: '#app',
            data: {
                name: 'Wilbur'
            }
        })
    </script>
</body>
```

如何实现上述的MVVM？


```
<div id="app"><h1>{{name}}-{{age}}</h1></div>

    <script>
    function observe(data) {
        if(!data || typeof data !== 'object') return;

        for(var key in data) {
            let val = data[key];
            let subject = new Subject();

            Object.defineProperty(data, key, {
                enumerable: true,
                configurable: true,
                get: function() {
                    // console.log(val);
                    if(currentObserver) {
                        currentObserver.subscribeTo(subject);
                    }
                    return val;
                },
                set: function(newVal) {
                    val = newVal;
                    subject.notify();
                }
            })
            if(typeof val === 'object') {
                observe(val);
            }
        }
    }

    let id = 0;
    let currentObserver = null;

    class Subject {
        constructor() {
            this.id = id++;
            this.observers = [];
        }

        addObserver(observer) {
            this.observers.push(observer);
        }
        removeObserver(observer) {
            var index = this.observers.indexOf(observer);

            if(index > -1) {
                this.observers.splice(index, 1);
            }
        }
        notify() {
            this.observers.forEach(observer=> {
                observer.update();
            })
        }
    }

    class Observer{
        constructor(vm, key, cb) {
            this.subjects = {};
            this.vm = vm;
            this.key = key;
            this.cb = cb;
            this.value = this.getValue();
        }

        update() {
            let oldVal = this.value;
            let value = this.getValue();

            console.log(value, oldVal)

            if(value !== oldVal) {
                this.value = value;
                this.cb.bind(this.vm)(value, oldVal);
            }
        }

        subscribeTo(subject) {
            if(!this.subjects[subject.id]) {
                console.log('subscribeTo...', subject);
                subject.addObserver(this);
                this.subjects[subject.id] = subject;
            }
        }

        getValue() {
            currentObserver = this;
            let value = this.vm.$data[this.key];
            currentObserver = null;
            return value;
        }
    }

    class mvvm {
        constructor(opts) {
            this.init(opts);
            observe(this.$data);
            this.compile();
        }

        init(opts) {
            this.$el = document.querySelector(opts.el);
            this.$data = opts.data;
            this.observers = [];
        }

        compile() {
            this.traverse(this.$el);
        }

        traverse(node) {
            console.log(node)
            if(node.nodeType === 1) {
                node.childNodes.forEach(childNode=>{
                    this.traverse(childNode);
                })
            }else if(node.nodeType === 3) {
                //文本
                this.renderText(node);
            }
        }

        renderText(node) {
            let reg = /{{(.+?)}}/g
            let match;

            while(match = reg.exec(node.nodeValue)) {

                let raw = match[0];
                let key = match[1].trim();

                node.nodeValue = node.nodeValue.replace(raw, this.$data[key]);

                new Observer(this, key, function(val, oldVal) {
                    node.nodeValue = node.nodeValue.replace(oldVal, val);
                })
            }
        }
    }

    let vm = new mvvm({
        el: '#app',
        data: {
            name: 'zhangsan',
            age: 23
        }
    })

    setInterval(function() {
        vm.$data.age++
    }, 1000);
    </script>

```
