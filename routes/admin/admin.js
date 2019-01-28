const express=require("express");
const router=express.Router();
const pool=require("../../pool.js");
router.post("/signin",(req,res)=>{
    var $aname=req.body.uname;
    var $apwd=req.body.upwd;
    var sql="SELECT * FROM xfn_admin WHERE aname=? AND apwd=?";
    pool.query(sql,[$aname,$apwd],(err,result)=>{
        if(err){
            throw err;
        }
        if(result.length>0){
            res.send({code:200,msg:"登录成功"});
        }else{
            res.send({code:301,msg:"登录失败"});
        }
    })
})
