#### ES6基础知识

##### 什么是ES6
- ECMAScript是JavaScript的标准，JS是ES的实现
- 正式名称ES2015 是ESMA标准的第六版
- 最新版是ECMA2019

##### 优点
- 语言都在更新换代
- 支持更多语法，使用更方便
- 增强的工程性

##### 简述
- var 重复声明、不能限制修改、函数级
- 解构赋值
    ```
    json = {a: 1, b: 2};
    let {a, b} = json;
    ```
- 箭头函数和this
- 参数扩展、数组展开（...）
- 原生对象扩展
    - map (50, 60, 80, 100) => ['不及格', '及格', '优秀', '满分']

        ```
        let arr = [50, 60, 80, 100];

        let arr2 = arr.map(item=> {
            if(item < 60) {
                return '不及格';
            }else{
                return '及格';
            }
        })

        或者
        ```
    - reduce n=>1
        例子：求和
        ```
        let arr = [50, 60, 80, 100];

        let result = arr.reduce(function(tmp, item, index){
            return temp + item;
        })
        ```

        例子：平均数
         ```
        let arr = [50, 60, 80, 100];

        let result = arr.reduce(function(tmp, item, index){
            if(index == arr.length -1) {
                return (temp + item) / arr.length;
            }else{
                return temp + item;
            }
        })
        ```

    - filter 过滤
        ```
            let arr = [1,3,4,5,7,8];

            let arr2 = arr.filter(item => {
                if(item%2 == 1) {
                    return false;
                }else{
                    return true;
                }
            })

            简写
            let arr2 = arr.filter(item => item%2==0);
        ```

    - forEach 遍历  没有返回值
        ```
        let arr = [1,3,4,5,7,8];

        arr.forEach((item, index) => {
            alert(`第${index}个，值为${item}`);  //字符串模板 返单引号+${}
        })

        ```
- JSON
    - JSON.stringify({a: 12}) => '{a: 12}'
    - JSON.parse('{"a": 12}') => {a: 12}
