
let path = require('path');
let fs = require("fs");
let app = require('koa')();
var serve = require('koa-static');
let co = require('co');
//路由
var router = require('koa-router')();
let mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'test',
    port: 3306
});
conn.connect();

app.use(require('koa-bodyparser')());

/*****************************分割线***********************************/

router.get('/test',function* (ctx, next) {
    this.body = 'Hello Koa2.0!';
});

//登录
router.post('/login',function *(next,cb) {
    let request = this.request.body;
    // this.returnData='test';
    this.queryMsg = `SELECT uid FROM user WHERE name = '${request.userName}' AND password=${request.password}`;
    var returnData =yield queryUser.call(this);//
    console.log(returnData);
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
                // that.returnData = JSON.stringify($return);
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

/*****************************分割线***********************************/

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
        //向除去建立该连接的客户端的所有客户端广播,试了下，这个就像qq一样，我发消息了，其他人也能看到
        //感觉发现了新大陆。。。
        // socket.broadcast.emit('newMsg', msg);
        // io.sockets.in('room1').emit('newMsg', msg);//这个连自己也会通知
        socket.broadcast.to('room1').emit('newMsg',msg);//通知自己以外得人
        console.log(msg);
    });
});

// Routing
app.use(serve('../../../../dist'));//路径怎么是这样的。。再改改,顺序有啥影响？？
// 为啥改了一下顺序就好了哈哈哈哈哈，本来index.js找的路径不对，好像是相同文件名会找第一个地址的文件
app.use(serve('../../app'));//这个是不是失效了啊，没有失效啊
app.use(serve('../../../../src'));//这个是不是失效了啊，没有失效啊
// middleware for koa
app.use(function*() {
});

app.use(function*() {
    this.body = fs.createReadStream(path.join(__dirname, '../../app/index.html'));
    this.type = 'html';
});



