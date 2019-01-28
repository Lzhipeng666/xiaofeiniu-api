const express=require("express");
const router=express.Router();
const pool=require("../../pool.js");
router.post("/update",(req,res)=>{
    var $aid=req.body.aid;
    var $appName=req.body.appName;
    var $apiUrl=req.body.apiUrl;
    var $addminUrl=req.body.addminUrl;
    var $appUrl=req.body.appUrl;
    var $icp=req.body.icp;
    var $copyright=req.body.copyright;

    var sql="UPDATE xfn_settings SET aid=?,appName=?,apiUrl=?,addminUrl=?,appUrl=?,icp=?,copyright=? WHERE aid=?";
    pool.query(sql,[$appName,$apiUrl,$addminUrl,$appUrl,$icp,$copyright,$aid],(err,result)=>{
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
