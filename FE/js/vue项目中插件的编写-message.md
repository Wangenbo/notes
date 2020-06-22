# vue项目中插件的编写

> 实现一个类似于element-ui 中 message 的功能

## message.vue

> /components/common/message/message.vue

```vue

<template>
    <transition name="fade">
        <div v-if="show" class="ui-message" :class="type">
            {{ text }}
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: 'message context'
        },
        type: {
            type: String,
            default: 'info'
        }
    },
    data() {
        return {
            show: false
        }
    },
    watch: {
        // 自动关闭
        show(val, oldVal) {
            if (val) {
                setTimeout(() => {
                    this.show = false
                }, 3000)
            }
        }
    }
}
</script>

<style scoped lang="less">
.ui-message {
    position: fixed;
    left: 50%;
    top: 0;
    z-index: 999;
    transform: translate(-50%, 0);
    padding: 0.1rem 0.15rem;
    width: 7.5rem;
    text-align: center;
    box-shadow: 0 1px 5px #ddd;
    background-color: white;
    color: #fff;
    &.success {
        background-color: #67c23a;
    }
    &.warning {
        background-color: #e6a23c;
    }
    &.error {
        background-color: #f56c6c;
    }
    &.info {
        background-color: #909399;
    }
}
.fade-enter {
    opacity: 0;
    transform: translate(-50%, -30px);
}
.fade-enter-active {
    transition: all 0.5s;
}
.fade-enter-to {
    opacity: 1;
    transform: translate(-50%, 0);
}
.fade-leave {
    opacity: 1;
    transform: translate(-50%, 0);
}
.fade-leave-active {
    transition: all 0.5s;
}
.fade-leave-to {
    opacity: 0;
    transform: translate(-50%, -30px);
}
</style>

```

## index.js

> /components/common/message/index.js

```javascript
import Message from '@/components/common/message/message.vue'

export default {
    install(Vue, options) {
        Vue.prototype.$message = function(opts) {
            // 继承Message组件
            const MessageConstructor = Vue.extend(Message)

            // 创建一个新元素
            const messageWrap = document.createElement('div')

            messageWrap.className = 'message-wrap'

            // 实例化Message组件，并将组件挂在到新创建的messageWrap元素上
            const messageInstace = new MessageConstructor({
                el: messageWrap
            })

            // 或者使用 messageInstace.$mount(messageWrap)挂载
            document.body.appendChild(messageInstace.$el)

            // 显示组件内容
            if (opts && opts.text) {
                console.log(opts)
                messageInstace.text = opts.text
            }

            // 显示组件类型
            if (opts && opts.type) {
                messageInstace.type = opts.type
            }
            messageInstace.show = true
        }
    }
}

```

## 注册

> 如果你的项目是vue 单页项目的话，在main.js 中直接引入

```javascript

    import Message from '/components/common/message/index.js'

    Vue.use(Message)
```

> 如果是nuxt.js 服务端渲染项目的话

- 在plugin 中创建message.js
- 代码如下

```javascript
    import Vue from 'vue'
import Message from '@/components/common/message/index.js'

export default () => {
    Vue.use(Message)
}
```

- nuxt.config.js 中引入

```javascript
plugins: [
    { src: '@/plugins/message', ssr: true }
]
```

## 使用插件

```javascript
this.$message({
    text: 'xxxxx',
    type: 'info' //info、success、warning、error
})

```
