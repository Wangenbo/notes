# ubuntu 安装node
### 一、安装
```
1. wget https://nodejs.org/dist/v10.11.0/node-v10.11.0-linux-x64.tar.xz
2. tar xf  node-v10.11.0-linux-x64.tar.xz       // 解压
3. cd node-v10.11.0-linux-x64/                  // 进入解压目录
4. ./bin/node -v                               // 执行node命令 查看版本
5. // bin目录下有执行文件npm和node 做软链接
  //（创建软连接 可以在任意路径下执行npm node）
```

### 二、创建软连接
```
ln -s  /home/node-v10.11.0-linux-x64/bin/node  /usr/local/bin/

ln -s /home/node-v10.11.0-linux-x64/bin/node  /usr/local/bin/

// 注意要写文件的绝对路径
//如果你在创建软连的时候，出现npm已经存在,node 已经存在
//删除 /usr/local/bin/目录下的node，npm
```

### 三、检测是否安装成功
```
node -v
npm -v
```