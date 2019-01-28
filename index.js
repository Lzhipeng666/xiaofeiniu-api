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
