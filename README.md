### 目录

|--src （开发目录）<br/>
|&emsp;&emsp;|-------api（存放请求)<br/>
|&emsp;&emsp;|-------common（公共文件，例如css,工具代码等)<br/>
|&emsp;&emsp;|-------components (组件目录)<br/>
|&emsp;&emsp;|-------pages （页面目录,例如可以存放首页，分类页，个人中心等页面）<br/>
|&emsp;&emsp;|-------static （存放静态文件，图片等）<br/>
|&emsp;&emsp;|-------build (打包输出目录)<br/>
|&emsp;&emsp;|-------index.tmpl.html (html模板文件)<br/>
|&emsp;&emsp;|-------index.js （入口文件，可以在webpack.config.js中配置）<br/>
|&emsp;&emsp;|-------store (state状态管理)<br/>
|&emsp;&emsp;|-------utils (存放一些封装的功能)<br/>
|<br/>
|-------|-server （服务器目录）<br/>
|<br/>
|-------|-index.html<br/>
|-------|-node_module （nodejs模块）<br/>
|-------|-package.json （npm 配置文件）<br/>
|-------|-webpack.config.js （webpack 配置文件）<br/>

### 问题
- swiper4  没有提供自定义按钮type:custom 点击的效果
- div可编辑问题 contentEditable  在react会报一个警告，使用react-contenteditable解决
`Warning: A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.`


### 如何运行
> - 下载项目   **git clone https://github.com/wxxfe/chicken.git**
> - 打开一个终端，进入到**chicken目录** 安装依赖包
>  `npm install`
>  如果失败，尝试用`yarn install`
> - 启动后台服务  `node server/index`
> - 启动前端开发服务 `npm run dev`
> 启动后会自动打开网址 http://localhost:8080/#/


