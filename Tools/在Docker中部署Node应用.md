# 在Docker中部署Node应用

## 1. 创建应用

> 这里用最简单的例子进行说明

1. 创建package.json文件 `vi package.json`

    ```javascript
    {
        "name": "webtest",
        "version": "1.0.0",
        "description": "Node.js on Docker",
        "author": "lpxxn",
        "main": "server.js",
        "scripts": {
            "start": "node server.js"
        },
        "dependencies": {
            "express": "^4.13.3"
        }
    }
    ```

2. 创建 server.js 文件 `vi server.js`

    ```javascript
    'use strict';

    var express = require('express');

    var PORT = 8888;

    var app = express();
        app.get('/', function (req, res) {
        res.send('Hello world\n');
    });

    app.listen(PORT);

    console.log('Running on http://localhost:' + PORT);

    ```

## 2. 创建Dockerfile 文件

> 创建镜像所必须的文件

1. `vi Dockerfile`
2. 文件内容如下

    ```bash
    # FROM是构建镜像的基础源镜像，hub.c.163.com/nce2/nodejs:0.12.2 这个是镜像的名称
    FROM hub.c.163.com/nce2/nodejs:0.12.2

    # Create app directory
    # RUN 用于在Image里创建一个文件夹，将来用于保存我们的代码。
    RUN mkdir -p /home/Service

    # WORKDIR是将我们创建的文件夹做为工作目录。
    WORKDIR /home/Service

    # Bundle app source
    # COPY是把本机当前目录下的所有文件拷贝到Image的/home/Service文件夹下
    COPY . /home/Service
    # RUN 使用npm 安装我们的app据需要的所有依赖。
    RUN npm install

    #web app监听的是8888端口，我们把这个端口暴露给主机，这样我就能从外部访问web了
    EXPOSE 8888

    # 运行npm start命令，这个命令会运行 node service.js启动应用
    CMD [ "npm", "start" ]
    ```

## 构建Image

> 在你Dockerfile文件所在的目录下运行下面的命令来构建一个Image.

1. 构建镜像 `docker build -t [NAME] .`

2. 查看镜像 `docker images`

## 运行镜像

1. 运行镜像 `docker run -d -p 8888:8888 [IMAGE ID]`

> -d 表明容器会在后台运行，-p 表示端口映射，把本机的8888端口映射到container的8888端口这样外网就能通过本机的8888端口访问我们的web了。

2. 查看容器 `docker ps` 或者 `docker container ls -a`

## 测试

- 通过curl 访问

    `curl -i localhost:8888`

- 或者通过浏览器访问 IP + 端口号

## 常用命令

- docker logs [Container ID] 查看容器日志
- docker rm [Container ID] 删除容器
- docker stop [Container ID] 停止运行
- docker rmi [Image ID] 删除镜像
