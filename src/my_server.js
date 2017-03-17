//require
let mysql = require('mysql');
var express = require('express');
var path = require('path');

var fs = require("fs");



//express设置
var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();


var app = express();
var server = require('http').createServer(app);
app.use(express.static(path.join(__dirname, 'public')));//静态文件托管
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, 'components')));

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));



var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'test',
    port: 3306
});
conn.connect();

var insertSQL = 'insert into t_list(f_name,f_avatar) values("haha","http://g.mdcdn.cn/h5/img/icon_tool/common_detail_alarm_succ.png")';
var selectSQL = 'select * from t_list limit 4';

var search_result ;
// var deleteSQL = 'delete from t_user';
// var updateSQL = 'update t_user set name="conan update"  where name="conan"';

//delete
// conn.query(deleteSQL, function (err0, res0) {
//     if (err0) console.log(err0);
//     console.log("DELETE Return ==> ");
//     console.log(res0);

//insert
// conn.query(insertSQL, function (err1, res1) {
    // if (err1) console.log(err1);
    // console.log("INSERT Return ==> ");
    // console.log(res1);
//})

//query



    app.get('/listUsers', function (req, res) {//app是express实例
        // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        //     console.log( data );
        //     res.end( data );
        // });

        conn.query(selectSQL, function (err2, rows) {
            if (err2) console.log(err2);

            console.log("SELECT ==> ");
            for (var i in rows) {
                console.log(rows[i]);
            }
            seach_result = JSON.stringify(rows);
            console.log(seach_result);
        });


        console.log(666);
        console.log(seach_result);
        res.header("Access-Control-Allow-Origin", "*");
        res.end(seach_result);
    });



    //
    //     //update
    //     conn.query(updateSQL, function (err3, res3) {
    //         if (err3) console.log(err3);
    //         console.log("UPDATE Return ==> ");
    //         console.log(res3);
    //
    //         //query
    //         conn.query(selectSQL, function (err4, rows2) {
    //             if (err4) console.log(err4);
    //
    //             console.log("SELECT ==> ");
    //             for (var i in rows2) {
    //                 console.log(rows2[i]);
    //             }
    //         });
    //     });
//     });
// });


//
// conn.end();



app.post('/post', function (req, res) {
    var response = req.body;
    //console.log(req.body);
    var test = 'SELECT * FROM t_item_user WHERE f_item_id  = ?';
    var test_param = req.body.item_id;

    conn.query(test,test_param, function (err2, rows) {
        if (err2) console.log(err2);

        if(!rows){
            console.log('yyyy');
            //insert
            var sql = 'insert into t_item_user(f_uid,f_item_id) values(?,?)';
            var param = [req.body.id,req.body.item_id];
            conn.query(sql,param, function (err1, res1) {
                if (err1){
                    console.log('重复插入');
                }
                if(res1.affectedRows==1){
                    var $return={
                        errcode:1,
                        errmsg:'插入成功',
                    }
                    return JSON.parse($return);
                }
            })
        }else{

            var $return={
                errcode:1,
                errmsg:'该商品已经存在',
            }
            res.end(JSON.stringify($return));//返回
        }
    })
});

var server = app.listen(4444, function () {


})

