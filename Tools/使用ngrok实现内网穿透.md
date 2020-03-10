## 使用ngrok实现内网穿透

### 一、注册账号

- 登录`https://ngrok.com/`
- 没有账号注册账号
- 找到auth、找到自己账号的authtoken.具体位置如下图
![](https://ae01.alicdn.com/kf/H705b6e23a52d4163ae31da2c05a4c51as.png)

### 二、下载ngrok

- 使用下列命令在你的树莓派上下载Ngrok：
 ```
 sudo wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip

 ```
 
 - 解压文件 `unzip ngrok-stable-linux-amd64.zip `
 - 执行`./ngrok help` 测试是否安装成功
 ![](http://pic.wxhand.com/phaadmin_image/ca8b558364820f4f5d0b1e8b95bf7797.png)
 
 ### 三、创建账号
 
 - 执行 `./ngrok authtoken xxxxxxxxx`
 ![](http://pic.wxhand.com/phaadmin_image/6122bd08f7aaaea16e9b865e4ae8705d.png)
 
 
 ### 四、执行ngrok
 
 - `./ngrok tcp 22` 
 
 ![](http://pic.wxhand.com/phaadmin_image/eaca817658c80b7ade13ddb1a3d9715f.png)
 
 ### 五、远程ssh访问
 
 ```
 ssh user@0.tcp.ngrok.io -p 10408
 ```
 
 
