<<<<<<< HEAD
/**
 * 小肥牛扫码点餐项目API子系统
 */
const PORT=8090;
const express=require('express');

//创建HTTP应用服务器
var app=express();
//监听
app.listen(PORT,()=>{
    console.log('Server Listening:'+PORT)
});















=======
const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const Port=8090;
app.listen(Port,()=>{
    console.log('server listening'+Port+'...');
});
app.use(express.static(__dirname/public));
app.use(bodyParser.urlencoded({
    extended:false
}));
>>>>>>> ee43a279c6f3b1399b3df329afdb52a27da6ec96
