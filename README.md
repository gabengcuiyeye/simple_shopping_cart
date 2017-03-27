目前只有两个功能点：展示图片，添加图片到购物车</br>
首先需要安装node_modules,配置写在package.json文件中。
这里需要安装webpack，最好全局和项目根目录下都装一遍，不然容易报错。
安装babel以及相关插件。安装vue及相关插件</br>
安装好环境后，运行npm run build 就可以进行babel转码，生成commonJs规范的代码，生成的代码放在lib文件夹下。由于浏览器上没法直接跑CommonJs规范的代码，所以还需要webpack打包;</br>
在命令行直接输入webpack即可进行打包</br>
这个小练习主要是用node写后台，用vue写前端展示。</br>  
踩才过的坑：1.在node里配置express时注意配置静态文件路径，要挂在本地服务器上，通过localhost访问，这样才能接受和发送http请求。</br>
2.之前.babelrc文件格式没写对，js文件没有babel成功，只是单纯复制了一个文件夹过去。</br>

