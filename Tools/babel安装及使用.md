## babel安装及使用

- 方法1：引入js 文件（降低性能，不推荐）
    ```
    <script src="browser.min.js" charset="utf-8"></script>

    <script type="text/babel">
        let a = 1;

        alert(a);
    </script>
    ```

- 方法2：编译js 文件（推荐）
    1. 安装Node.js 、初始化项目
        >npm init -y
    2. 安装babel-cli
        >npm i @babel/core @babel/cli @babel/preset-env -D

        >npm i @babel/polyfill -S
    3. 添加执行脚本

    ```
    "scripts": {
        "build": "babel src -d dist"
    }
    ```
    4. 添加.babelrc配置文件
    ```
    {
        "presets": ["@babel/preset-env"]
    }
    ```
    5. 执行编译
    >npm run build
