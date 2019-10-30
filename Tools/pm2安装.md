## pm2 安装使用
1. `npm install -g pm2`
2. （可选）`ln -s /home/node-v10.11.0-linux-x64/bin/pm2  /usr/local/bin/`
3. `pm2 -v` 检查安装是否完成
4. `pm2 start ./bin/www`
或者
5. `pm2 start app.js`


**`app.js`**

---

(```)
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
(```)