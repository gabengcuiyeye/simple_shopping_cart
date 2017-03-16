这是自己写的练习项目。</br>
fisrt step：npm install 安装node_modules;</br>
second step:npm run build 进行babel转码，生成common js规范;</br>
third step:webpack webpack打包生成可运行的js。</br>
打算用node写后台，用vue写前端。</br>  
注意事项：配置express时注意把静态文件配上，一并放在本地服务器，这样才能接受和发送请求。</br>  
之前.babelrc文件格式没写对，js文件没有babel成功，只是单纯复制了一个文件夹过去。</br>
lib是babel生成的文件dist是webpack生成的文件夹。
