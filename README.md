<h1>简易购物车</h1>
目前完成的功能点：展示商品列表，添加商品到购物车，从购物车删除商品</br>
<h4>相关配置</h4>
<p>首先需要安装node_modules,配置写在package.json文件中。</p>
<p>安装webpack，最好全局和项目根目录下都装一遍，不然容易报错。</p>
<p>安装babel以及相关插件。安装vue及相关插件</p>
<p>安装好环境后，运行npm run build 就可以进行babel转码，生成commonJs规范的代码，生成的代码放在lib文件夹下。由于浏览器上没法直接跑CommonJs规范的代码，所以还需要webpack打包;</p>
<p>在命令行直接输入webpack即可进行打包</p>
<p>个人练手项目，用vue展示页面和发送请求到node，node接收请求和返回数据。</p>
<h4>注意事项</h4>
1.在node里配置express时注意配置静态文件路径，要挂在本地服务器上，通过localhost访问，这样才能接受和发送http请求。</br>
2.之前.babelrc文件格式没写对，js文件没有babel成功，只是单纯复制了一个文件夹过去。</br>

