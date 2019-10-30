## pm2 是什么
    pm2是一个进程管理工具,可以用它来管理你的node进程，并查看node进程的状态，当然也支持性能监控，进程守护，负载均衡等功能
## pm2 安装使用
1. `npm install -g pm2`
2. （可选）`ln -s /home/node-v10.11.0-linux-x64/bin/pm2  /usr/local/bin/`
3. `pm2 -v` 检查安装是否完成
4. `pm2 start ./bin/www`
或者
5. `pm2 start app.js`

## app.js 配置方法

```
    {
        "apps": [
            {
                "name": "my-blog",
                "script": "./blog/bin/www",
                "env": {
                    "NODE_ENV": "development"
                },
                "env_production": {
                    "NODE_ENV": "production"
                },
                "watch": true,
                "ignore_watch": [
                    "node_modules",
                    "logs"
                ],
                "watch_options": {
                    "followSymlinks": false
                },
                "error_file": "./logs/app-err.log",
                "out_file": "./logs/app-out.log"
            }
        ]
    }
```

## 常用pm2 命令
1. 重命名进程/应用 `pm2 start app.js --name xxx`
2. 添加进程/应用 `watch pm2 start bin/www --watch`
3. 结束进程/应用 `pm2 stop www`
4. 结束所有进程/应用 `pm2 stop all`
5. 删除进程/应用 `pm2 delete www`
6. 删除所有进程/应用 `pm2 delete all`
7. 列出所有进程/应用 `pm2 list`
8. 查看某个进程/应用具体情况 `pm2 describe www`
9. 查看进程/应用的资源消耗情况 `pm2 monit`
10. 查看pm2的日志 `pm2 logs`
11. 若要查看某个进程/应用的日志,使用 `pm2 logs www`
12. 重新启动进程/应用 `pm2 restart www`
13. 重新启动所有进程/应用 `pm2 restart all`