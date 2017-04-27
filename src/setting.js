let path = require('path');
let fs = require("fs");

//express设置
let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(express.static(path.join(__dirname, 'public')));//静态文件托管
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, 'components')));

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

//模板支持
app.set('views', path.join(__dirname, './public/view'));
app.set('view engine', 'pug');//jade升级成了pug

module.exports = app;
