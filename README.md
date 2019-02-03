# course-manage

1.考试系统，分为管理员、学生。管理员录入试卷，学生参与考试

2.采用:vue全家桶+less+element-ui (PC)

3.主要页面

* 登录页面

* 试卷录入

4.目录

api:请求地址

common:静态文件(img/js/less)

components:木偶组件 + base(全局封装组件,包括消息提示)

router:目录

store:

* action

* getters

* index.js:引入其他，创建store

* mutation-type:统一管理action type字段,避免重复

* mutation

* state

App.vue:全局样式

main.js:

## 后期优化

1.全局提示

## 遇到问题

1. App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.100:8080/

  上面跨域，下面不跨域，为什末?

2. 按照antd组件，【快速上手-按需引入】，修改babelrc文件。如下。会报错:没有安装babel-plugin-es2015

```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

尝试:看文档，安装@babel/preset-es2015，还是报错。

3.报错:最大栈溢出

解决:组件嵌套时，检查name属性值

Home组件

```
<template>
  <div id="home">
    <Header></Header>
    主页
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Header', // 错了，是Header
  components: {
    Header,
  }
}
</script>
```

