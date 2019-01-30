const express=require("express");
const router=express.Router();
const pool=require("../../pool.js");
module.exports = router;


router.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_settings LIMIT 1',(err,result)=>{
        if (err) throw err;
        res.send(result[0])
    })
})

router.put('/',(req,res)=>{
    pool.query('UPDATE  xfn_settings SET ?', req.body,(err,result)=>{
        if (err) throw err;
        res.send({code:200, msg:'settings updated succ'})
    })
})