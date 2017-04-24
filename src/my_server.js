//require
let mysql = require('mysql');
var express = require('express');
var path = require('path');
var fs = require("fs");
const pug = require('pug');

//express设置
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);
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

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'test',
    port: 3306
});
conn.connect();

app.post('/add_to_cart', function (req, res) {
    let request = req.body;
    let query = 'SELECT f_uid,f_item_id FROM t_item_user WHERE f_item_id  = ?';
    let query_param = request.item_id;

    conn.query(query,query_param, function (err2, rows) {
        if (err2) console.log(err2);
        if(rows.length===0){
            //insert
            let sql = 'insert into t_item_user(f_uid,f_item_id) values(?,?)';
            let param = [req.body.id,req.body.item_id];
            conn.query(sql,param, function (err1, res1) {
                if(res1.affectedRows==1){
                    let $return={
                        errcode:1,
                        errmsg:'插入成功',
                    };
                    res.end(JSON.stringify($return));
                }else{
                    console.log('what');
                }
            })
        }else{
            let $return={
                errcode:2,
                errmsg:'该商品已经存在',
            };
            res.end(JSON.stringify($return));//返回
        }
    })
});


app.post('/search_cart', function (req, res) {
        return new Promise(function(resolve){
            let return_data = {
                req :req
            };
            resolve(return_data);
        })
        .then(function(return_data){
            let user_id=return_data.req.body.user_id;
            let query = 'SELECT * FROM t_item_user WHERE f_uid  = ?';
            let query_param = user_id;
            return new Promise(function(resolve){
                conn.query(query,query_param, function (err2, rows) {
                    resolve(rows);
                });
            });
        }).then(function(rows){
            if(rows.length>0){

                let query_item = 'SELECT * FROM t_list WHERE f_id  in (?)';
                let whereIn = [];
                for(let i=0,len=rows.length;i<len;i++){
                    whereIn.push(rows[i].f_item_id);
                }
                conn.query(query_item,[whereIn], function (err2, rowss) {//异步分两次查。。。。
                    if (err2){
                        console.log(err2);
                    }
                    let $return={
                        errcode:0,
                        errmsg:'',
                        data:rowss,
                    };
                    res.end(JSON.stringify($return));//返回
                });
            }else if(rows.length==0){
                let $return={
                    errcode:0,
                    errmsg:'',
                    data:''
                };
                res.end(JSON.stringify($return));//返回
            }
        });

    });

app.post('/delete_item', function (req, res) {
    let request = req.body;
    console.log('********************');
    console.log(request);
        return new Promise(function(resolve){
            resolve(request);
        })
        .then(function (request) {
            let query = 'SELECT f_item_id FROM t_item_user WHERE f_item_id  = ' + request.item_id + ' limit 1';
            return new Promise(function (resolve) {
                conn.query(query, function (err2, rows) {
                    if (err2) console.log(err2);
                    var obj = {
                        id: request.item_id,
                        row: rows
                    };
                    resolve(obj);

                })
            })
        })
        .then(function(obj){
            console.log(obj.row);
            if(obj.row.length>0){
                let query = 'delete  FROM t_item_user WHERE f_item_id  = '+obj.id;
                conn.query(query, function (err2, rows) {
                    if(rows.affectedRows==1){
                        let $return={
                            errcode:0,
                            errmsg:'',
                            data:'删除成功',
                        };
                        res.end(JSON.stringify($return));//返回
                    }
                })
            }
        })
        .catch(function () {
            console.log('error');
            let $return={
                errcode:1,
                errmsg:'',
                data:'删除失败',
            };
            res.end(JSON.stringify($return));//返回
        })
});

app.get('/',function(req,res){//有index默认进index页，我把index名字改了才进入这个页面的
    console.log(9999);
    var selectSQL = 'select * from t_list limit 4';
    conn.query(selectSQL, function (err2, rows) {
        if (err2) console.log(err2);
        var seach_result = JSON.stringify(rows);
        /**********************pug tpl,首屏直出********************/
        res.render('index',{//pug(jade)是express默认模板
            init_data:seach_result,
        });
    });
});

var server = app.listen(4444, function () {
    console.log('yes');

});


module.exports = router;
module.exports = app;
