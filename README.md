### 目录

|--src （开发目录）
|&emsp;&emsp;|-------common（公共文件，例如css,工具代码等)
|&emsp;&emsp;|-------components (组件目录)
|&emsp;&emsp;|-------pages （页面目录,例如可以存放首页，分类页，个人中心等页面）
|&emsp;&emsp;|-------static （存放静态文件，图片等）
|&emsp;&emsp;|-------build (打包输出目录)
|&emsp;&emsp;|-------index.tmpl.html (html模板文件)
|&emsp;&emsp;|-------index.js （入口文件，可以在webpack.config.js中配置）
|&emsp;&emsp;|-------store (state状态管理)
|
|-------|-server （服务器目录）
|
|-------|-index.html
|-------|-node_module （nodejs模块）
|-------|-package.json （npm 配置文件）
|-------|-webpack.config.js （webpack 配置文件）