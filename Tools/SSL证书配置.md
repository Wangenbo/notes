## 配置ssl 证书
1. 下载证书
2. 在`/etc/nginx/` 下创建cert目录
3. 将证书文件拷贝到cert 目录中，包含pem 和key
4. 配置`nginx ssl`

```
    listen 443 ssl default_server;
    ssl off;
    ssl_certificate /etc/nginx/cert/xxx.pem;
    ssl_certificate_key /etc/nginx/cert/xxx.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
    ssl_prefer_server_ciphers on;
```