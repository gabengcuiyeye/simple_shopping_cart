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


conn.query(selectSQL, function (err2, rows) {
    if (err2) console.log(err2);


    seach_result = JSON.stringify(rows);

    app.get('/item_list', function (req, res) {//app是express实例
        // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        //     console.log( data );
        //     res.end( data );
        // });
        // console.log(666);
        // console.log(seach_result);
        res.header("Access-Control-Allow-Origin", "*");
        res.end(seach_result);
    });
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







app.post('/add_to_cart', function (req, res) {
    let response = req.body;
    //console.log(req.body);
    let query = 'SELECT * FROM t_item_user WHERE f_item_id  = ?';
    let query_param = req.body.item_id;

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
    if(req){
        let user_id=req.body.user_id;
        let query = 'SELECT * FROM t_item_user WHERE f_uid  = ?';
        let query_param = user_id;
        // console.log(res);
        conn.query(query,query_param, function (err2, rows) {
            if (err2) console.log(err2);

            if(rows.length>0){
                console.log('my_cart_item');
                let item_id_arr=[];

                let query_item = 'SELECT * FROM t_list WHERE f_id  = ?';
                let query_item_param = item_id_arr;
                console.log(query_item_param);
                let test_arr = [];

                for(let i=0,len=rows.length;i<len;i++){
                    // item_id_arr.push(rows[i].f_item_id);


                    conn.query(query_item,rows[i].f_item_id, function (err2, rowsss) {//异步分两次查。。。。
                        test_arr.push(rowsss);
                        console.log(rowsss);

                        var $return={
                            errcode:0,
                            errmsg:'',
                            data:test_arr,
                        };
                        setTimeout(function(){
                            res.end(JSON.stringify($return));
                            console.log('pppp');
                        }, 500);
                    });
                }




                // let promise = new Promise(function(resolve){
                //     let query_item = 'SELECT * FROM t_list WHERE f_id  = ?';
                //     let query_item_param = item_id_arr;
                //     let query_uu  = 'SELECT * FROM t_list WHERE f_id  = '+item_id_arr;
                    // let return_data = conn.query(query_uu);
                //     return query;
                // });
                // promise.then(function (data){
                // return_data.on('result',function(rowsooo){
                //         // test_arr.push(rows);
                //         console.log(rowsooo);
                //     });
                // });
                





            }else{

                let $return={
                    errcode:0,
                    errmsg:'',
                    data:''
                };
                res.end(JSON.stringify($return));//返回
            }
        });

    }else{

    }
});






var server = app.listen(4444, function () {

        console.log('yes');
})




