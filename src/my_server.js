//require
let app = require('./setting.js');
let mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'test',
    port: 3306
});
conn.connect();
//加入购物车
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

//从购物车删除商品
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

//页面初始化加载，可以把初始化购物车在这查询
app.get('/',function(req,res){//有index默认进index页，我把index名字改了才进入这个页面的
    let list_query_sql = 'select f_id,f_name,f_avatar from t_list limit 10',
        list_search_result,
        cart_search_result;

    conn.query(list_query_sql, function (err2, rows) {
        if (err2) console.log(err2);
        list_search_result = JSON.stringify(rows);
        return new Promise(function(resolve){
            let cart_query_sql = 'SELECT t_list.f_id,t_list.f_name,t_list.f_avatar FROM t_list INNER JOIN t_item_user ON t_list.f_id= t_item_user.f_item_id WHERE t_item_user.f_uid=2333';
            conn.query(cart_query_sql, function (err2, rows) {
                if (err2) console.log(err2);
                resolve(rows);
            });
        }).then(function(rows){
            cart_search_result = JSON.stringify(rows);
            res.render('index',{//pug(jade)是express默认模板
                init_list_data:list_search_result,
                init_cart_data:cart_search_result,
            });
        });
    });
});
var server = app.listen(4444, function () {
    console.log('yes');
});
