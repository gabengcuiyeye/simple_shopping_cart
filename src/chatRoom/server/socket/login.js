
let path = require('path'),
    fs = require("fs"),
    app = require('koa')(),
    serve = require('koa-static');

//路由
let router = require('koa-router')(),
   mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'test',
    port: 3306
});
conn.connect();

app.use(require('koa-bodyparser')());

router.get('/test',function* (ctx, next) {
    this.body = 'Hello Koa2.0!';
});

//登录
router.post('/login',function *(next,cb) {
    let request = this.request.body;
    this.queryMsg = `SELECT uid FROM user WHERE name = '${request.userName}' AND password=${request.password}`;
    var returnData =yield queryUser.call(this);
    this.body = returnData;
});

function* queryUser(){
    return new Promise((resolve,reject) => {//返回promise对象
        conn.query(this.queryMsg, function (err2, rows) {
            if (err2) console.log(err2);
            if(rows.length>0) {
                let $return = {
                    errcode: 1,
                    errmsg: '登录成功'
                };
                resolve(JSON.stringify($return));
            }else{
                let $return={
                    errcode:2,
                    errmsg:'没登录上',
                };
                resolve(JSON.stringify($return));
            }
        })
    })
}



app.use(router.routes());

var server = app.listen(3333, function () {
    console.log("app listening on 3333" );
});


var io = require('socket.io')(server);


/****************发消息************/
io.on('connection',socket=>{
    console.log('connection');
    //房间分组
    socket.on('room1', function (data) {
        socket.join('room1');
    });

    socket.on('postMsg', function(msg) {
        //消息通知
        socket.broadcast.to('room1').emit('newMsg',msg);//通知自己以外得人
        console.log(msg);
    });

    /**************发图片******************/
    socket.on('img', function(imgData){
        //通过一个newImg事件分发到除自己外的每个用户
        console.log('node后台接收图片数据成功');

        //把传的图片存入数据库

        //消息通知
        socket.broadcast.emit('newImg', imgData);
    });

});

app.use(serve('../../../../../my_test_project'));

app.use(function*() {
});

app.use(function*() {
    this.body = fs.createReadStream(path.join(__dirname, '../../app/index.html'));
    this.type = 'html';
});



