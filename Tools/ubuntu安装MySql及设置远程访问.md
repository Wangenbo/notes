### 一、安装
```
　1. sudo apt-get install mysql-server
```
```
　2. apt-get isntall mysql-client
```
```
　3.  sudo apt-get install libmysqlclient-dev
```
安装过程中会提示设置密码什么的，注意设置了不要忘了，安装完成之后可以使用如下命令来检查是否安装成功：
```
sudo netstat -tap | grep mysql
```
通过上述命令检查之后，如果看到有mysql 的socket处于 listen 状态则表示安装成功。
```
　mysql -u root -p      //登陆mysql数据库

  //-u 表示选择登陆的用户名， -p 表示登陆的用户密码，上面命令输入之后会提示输入密码，此时输入密码就可以登录到mysql。
```

### 二、设置远程访问
通常情况下，MySQL安装完毕之后，是不能进行远程访问的。比如使用Navcat进行远程连接。
```
1. mysql -u root -p
```
```
2. GRANT ALL PRIVILEGES ON *.* TO '用户名'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
```
```
3. flush privileges;
```

```
4. sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

```
5. #bind-address = 127.0.0.1  //注释掉
```

```
6. service mysql restart //重启服务
```

```
7. 有的需要打开端口sudo ufw allow 3306 //打开端口
```
