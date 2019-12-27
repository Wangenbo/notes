## 详细介绍webpack

## 一、webpack

### 认识webpack
自动化开发工具，能完成所有常用的功能：
- 压缩
- 打包
- 多种文件的编译
- 脚手架(项目框架)
- 生成生产用版本

#### 安装方式
`npm i webpack-cli -g`

## 二、常用功能

### 基本使用

index.js

```
//jquery 放在本地
import $ from './libs/jquery';

//放在node_modules
import $ from 'jquery';

$(function() {
    alert('a');
})
```

webpack.config.js
```
const path = require('path');

module.exports = {
    //模式
    mode: 'development',

    //入口
    entry: './src/js/index.js',

    //输出
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
}
```

mode：
- development  开发，输出调试信息，设置process.env.NODE_ENV
- production 生产，最高优化，启用压缩，自动忽略错误
- none 无，不优化

entry:入口
- 单入口：SPA
- 多入口：MPA
```
const path = require('path');

module.exports = {
    //模式
    mode: 'development',

    //入口
    entry: {
        index: './src/index',
        news: './src/news'
    },

    //输出
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    }
}
```

output: 输出
- path 输出路径-绝对路径
- filename 文件名称


### 三、loader
能让webpack 处理js 和JSON以外的数据


#### style-loader和css-loader

- css-loader 读取解析css 文件，保证编译不出错
- style-loader 输出style
```
const path = require('path');

module.exports = {
    //模式
    mode: 'development',

    //入口
    entry: {
        index: './src/index',
        news: './src/news'
    },

    //输出
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },

    //模块
    module: {
        rules: [
            {
                test: '/\.css$/i',
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}

```

#### postcss-loader、autoprefixer

自动补全浏览器前缀
`npm i autoprefixer postcss-loader`

- postcss-loader 让webpack解析处理css文件的loader
- autoprefixer 自动根据浏览器支持情况，补全前缀（>5%支持原则）

注意
>autoprefixer 不是loader，是插件，用于增强webpack 功能，而非直接参与文件处理

webpack.config.js
```
const path = require('path');

module.exports = {
    //模式
    mode: 'development',

    //入口
    entry: {
        index: './src/index',
        news: './src/news'
    },

    //输出
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },

    //模块
    module: {
        rules: [
            {
                test: '/\.css$/i',
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            }
        ]
    }
}

```

也可以单独增加：postcss.config.js文件（不推荐）

```
module.exports = {
    plugins: [
        require('autoprefixer');
    ]
}
```

定制支持浏览器：.browerslist.lrc
```
last 5 version //支持每个浏览器最新版本
> 1%
```

定制支持浏览器：或者在packjson.js 中增加
```
"browserslist": [
    "last 5 version",
    "> 1%"
]
```

#### file-loader和url-loader

- file-loader 将文件也编译到JS中（包括直接引入的、也包括CSS中引入的）
- url-loader 包含file-loader的功能，而且可以把文件转换为base64(dataurl)形式

```
npm i file-loader url-loader -D
```

webpack.config.js
```
const path = require('path');

module.exports = {
    mode: 'development',
    entry: ...,
    output: ...,
    module: {
        rules: [
            //处理css
            {
                test: '/\.css$/i',
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            },
            //处理图片
            {
                test: /\.(png|jpg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'imgs/', //相对于output.path
                        publicPath: 'dist/imgs/', //输出到css 的路径
                        limit: 8*1024 //file-loader 没有
                    }
                }
            },
            //字体文件
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'fonts',
                        publicPath: 'dist/fonts/',
                        limit: 8*1024
                    }
                }
            }
        ]
    }
}

```

注意：
url-loader可以单独使用，但是必须下载file-loader,否则无法正常使用。

#### less-loader 与 babel-loader

- less-loader
- babel-loader

```
npm install less-loader less

webpack.config.js

{
    test: /\.less$/i,
    use: ['style-loader', 'css-loader', 'less-loader']
}
```

```
npm i babel-loader @babel/core @babel/preset-env

webpack.config.js

{
    test: /\.jsx?$/i,
    exclude: /node_modules|bower_components/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }
}
```

#### source-map
开发调试更加方便，它能帮助我们链接到断点对应的源代码的位置进行调试
```
webpack.config.js

devtool: 'source-map'
```

### 四、dev-server

#### 认识dev-server
#### dev-server的安装和配置
#### webpack集成dev-server

### 五、代码测试和代码质量

#### eslint的使用、eslint-loader
#### jest库的使用

### 六、实战案例

#### 用webpack构建Vue.js项目框架
#### vue-cli