const express=require("express");
const router=express.Router();
const pool=require("../../pool.js");
router.get("/list",(req,res)=>{
    var sql="SELECT * FROM xfn_table";
    pool.query(sql,[$aname,$apwd],(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})
router.get("/detail",(req,res)=>{
    var $tid=req.body.tid;
    var sql="SELECT * FROM xfn_table_detail WHERE tid=?";
    pool.query(sql,[$tid],(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})
router.post("/update",(req,res)=>{
    var $tid=req.body.tid;
    var $status=req.body.status;
    var sql="UPDATE xfn_table SET status=? WHERE tid=?";
    pool.query(sql,[$status,$tid],(err,result)=>{
        if(err){
            throw err;
        }
        if(result.affectedRows>0){
            res.send({code:200,msg:"修改成功"});
        }else{
            res.send({code:301,msg:"修改失败"});
        }
    })
})
