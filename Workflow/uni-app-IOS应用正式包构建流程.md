# uni-app-IOS应用正式包构建流程

## 步骤一、更改接口版本号
1. 打开APP.vue - appInfo - zsdx-version
2. 将zsdx-version 更改为当前版本号

![app.vue](http://images.wangenbo.com/Snipaste_2020-05-20_08-39-15.png)

## 步骤二、更改应用版本名称和应用版本号
1. 打开manifest.json - 基础配置
2. 找到应用版本名称及应用版本号
3. 更改至当前版本

> 注意：
> 1. 应用版本名称与应用版本号必须高于上一次设置的值。
> 2. 应用版本名称与应用版本号规则一致。
> 3. 应用版本名称与APP.vue 中的接口版本号一致。

![app.vue](http://images.wangenbo.com/Snipaste_2020-05-20_08-38-51.png)

## 步骤三、更改推送设置
1. 打开 manifest.json - 源码视图
2. 找到 push 模块
3. 将推送设置改为正式环境所需配置

![app.vue](http://images.wangenbo.com/push_screen_shoot.png)

## 步骤四、提交云打包配置
1. HBuilder - 发行 - 原生APP云打包
2. 勾选打包应用
3. 填写证书密码
4. 选择对应的证书文件
5. 点击打包

> 注意：正式包云打包需选择 apple_store_cn_zsdx_student.mobileprovision 证书文件

![app.vue](http://images.wangenbo.com/Snipaste_2020-05-20_08-36-14.png)

## 步骤五、下载应用包

1. 云打包完毕后，会在HBuilder控制台输出下载地址
2. 点击下载即可

![download](http://images.wangenbo.com/Snipaste_2020-05-20_08-40-28.png)

## 步骤六、上传应用包至testflight进行构建（多种上传方式可参考 [点击跳转](https://github.com/Wangenbo/notes/blob/master/Tools/ipa%E4%B8%8A%E4%BC%A0%E8%87%B3appstore%20%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E5%BC%8F.md)）
1. 打开 Transporter 应用
2. 添加APP
3. 等待上传成功
4. 稍作等待后，testflight 会收到最新的应用包测试通知

![upload-app](http://images.wangenbo.com/Snipaste_2020-05-20_08-43-12.png)

## 步骤七、在 Testflight 中进行发布验收
1. 测试工程师验收
2. UI设计师验收
3. 产品经理验收

## 步骤八、苹果开发者后台构建提交版本

1. 登录苹果开发者后台 https://developer.apple.com/
2. 选择APP Stroe Connect - 进入APP Stroe Connect - 选择"我的APP"
3. 找到对应的应用进入
4. 添加版本和平台
    ![upload-app](http://images.wangenbo.com/Snipaste_2020-05-20_08-45-18.png)
5. 添加版本
    > 添加版本 应与APP内应用版本号一致


6. 上传构建的版本包

    ![upload-app](http://images.wangenbo.com/Snipaste_2020-05-20_08-48-23.png)
7. 完善其他信息

    ![upload-app](http://images.wangenbo.com/Snipaste_2020-05-20_08-49-43.png)
8. 点击存储
     ![upload-app](http://images.wangenbo.com/save_image.png)
9. 点击提交以供审核
     ![upload-app](http://images.wangenbo.com/commit_image.png)
10. 勾选广告标识符（IDFA）
     ![upload-app](http://images.wangenbo.com/Snipaste_2020-06-07_15-55-05.png)

