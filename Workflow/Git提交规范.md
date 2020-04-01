

### 添加提交规范检查步骤

1. npm install -y

2. npm i husky -D

.git 文件夹下出现可执行文件commit-msg

3. npm i @commitlint/cli @commitlint/config-conventional -D

4. 创建配置文件commitlint.config.js

```
module.exports = {
    extends: [
        '@commitlint/config-conventional'
    ]
}
```
5. 更改package.json

```
"hooks": {
  "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
}
```