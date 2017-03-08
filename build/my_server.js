'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysql = require('mysql');

var express = require('express');
var app = express();
var fs = require("fs");

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: 3306
});
conn.connect();
//
//
var insertSQL = 'insert into t_list(f_name) values("conan"),("fens.me")';
var selectSQL = 'select * from t_list limit 2';

var search_result;
// var deleteSQL = 'delete from t_user';
// var updateSQL = 'update t_user set name="conan update"  where name="conan"';

//delete
// conn.query(deleteSQL, function (err0, res0) {
//     if (err0) console.log(err0);
//     console.log("DELETE Return ==> ");
//     console.log(res0);

//insert
// conn.query(insertSQL, function (err1, res1) {
//     if (err1) console.log(err1);
//     console.log("INSERT Return ==> ");
//     console.log(res1);

//query
conn.query(selectSQL, function (err2, rows) {
    if (err2) console.log(err2);

    console.log("SELECT ==> ");
    for (var i in rows) {
        console.log(rows[i]);
    }
    seach_result = (0, _stringify2.default)(rows);
    console.log(seach_result);

    app.get('/listUsers', function (req, res) {
        // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        //     console.log( data );
        //     res.end( data );
        // });
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
});
// });
// });

//
// conn.end();


var server = app.listen(4444, function () {

  
});

// var http = require('http'),
// 	//创建一个服务器
// 	server = http.createServer(function(req, res) {
// 		res.writeHead(200, {
// 			'Content-Type': 'text/plain'
// 		});
// 		res.write('hello world!');
// 		res.end();
// 	});
// //监听80端口
// server.listen(4444);
// console.log('server started');
