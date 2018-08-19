# vue组件化开发-示例  vue2.5+webpack4.16

>  * 使用知识点：
>  * vue.js        2.5.17
>  * webpack       4.16.5
>  * vue-router    3.0.1
>  * vue-loader    15.3.0
>  * vuex          3.0.1
>  * axios 		   0.18.0


## 构建说明
>  * DllPlugin和DllReferencePlugin  		配置 优化构建速度
>  * happypack 							          编译多线程
>  * webpack-parallel-uglify-plugin  	编译优化支持es6语法
>  * vue-loader v15 					        配置更简洁

## 项目步骤

1.安装node.js

2.安装项目依赖包

```
npm install
```

3.运行开发环境

```
npm run dev 
```

4.打包生产文件   打生产包需要构建一次 dll 命令：即经常不会改动的文件

```

测试包：

npm run test:dll

npm run rest

正式包：

npm run build:dll   

npm run build  

``` 

5.图片
![输入图片说明](https://github.com/wangweianger/vue2.5-webpack4.16-onepage-base-h5/blob/master/demo/demo01.png "在这里输入图片标题")

