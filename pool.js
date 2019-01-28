<<<<<<< HEAD
/**
 * MySQL数据库连接池
 */
const mysql =require('mysql');
var pool =mysql.createPool({
    host:'127.0.0.1',       //数据库地址
    port:3306,              //数据库端口
    user:'root',            //数据库管理员    
    password:'',            //数据库管理员密码
    database:'xiaofeiniu',  //默认连接的数据库
    connectionLimit:10      //连接池中连接数量
});
module.exports=pool;
=======
const mysql=require("mysql");
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"",
    database:"xiaofeiniu",
    connectionLimit:10
})
module.exports=pool;
>>>>>>> ee43a279c6f3b1399b3df329afdb52a27da6ec96
