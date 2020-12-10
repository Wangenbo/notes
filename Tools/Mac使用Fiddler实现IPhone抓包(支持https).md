# 【详细】Mac使用Fiddler实现IPhone抓包(支持https)

> Windows 同理

## 1. 下载 安装 注册具体步骤不过多赘述

下载地址：https://www.telerik.com/fiddler

## 2. 打开Fiddler 设置界面，按照下图设置HTTPS 证书

![](http://images.wangenbo.com/iShot2020-12-10%2009.08.53.png)

> 1. 点击 Trust root certificate 会要求输入电脑密码
> 2. Capture HTTPS traffic 勾选
> 3. Ignore server certificate errors 勾选

## 3. 按照下图设置 Connections，记住端口号
![](http://images.wangenbo.com/iShot2020-12-10%2009.09.35.png)

> 勾选 Act as system proxy on startup
> 勾选 Allow remote computers to connect

## 4. 查看本机IP地址
![](http://images.wangenbo.com/iShot2020-12-10%2009.17.48.png)

## 5. iPhone 与 Mac 连接在同一个局域网

## 6. 在iPhone safari浏览器中 输入IP地址+端口号
![](http://images.wangenbo.com/IMG_1469.PNG)

## 8. 进入手机设置 - 通用 - 描述文件与设备管理 安装描述文件
![](http://images.wangenbo.com/IMG_1470.PNG)

## 9. 进入手机设置 - 通用 - 关于本机 - 证书信任设置 打开 针对根证书启用完全信任
![](http://images.wangenbo.com/IMG_1471.PNG)

## 10. 进入手机设置 - 进入已经连接的无线局域网 - 配置代理 - 手动 配置对应的IP与端口号
![](http://images.wangenbo.com/IMG_1472.PNG)

![](http://images.wangenbo.com/IMG_1475.PNG)
## 11. 在Fiddler 即可查看 HTTP 或 HTTPS 请求

![](http://images.wangenbo.com/iShot2020-12-10%2009.40.49.png)
