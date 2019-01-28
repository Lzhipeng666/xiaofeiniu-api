const express = require("express");
const router = express.Router();
const pool = require("../../pool");
module.exports = router;
/**
 * API: GET/admin/login/:aname/:apwd
 * 完成用户登录验证(提示：有的公司会选择POST请求)
 * 返回数据：
 * {code:200,msg:'login succ'}
 * {code:400,msg:'aname or apwd err'}
 */
router.get("/login/:aname/:apwd", (req, res) => {
    var aname = req.params.aname;
    var apwd = req.params.apwd;
    //需要对用户输入密码执行加密函数
    var sql = "SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)";
    pool.query(sql, [aname, apwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 200, msg: "login succ" });
        } else {
            res.send({ code: 400, msg: "aname or apwd err" });
        }
    });
})
/**
* API: PATCH/admin
* 请求数据：{aname:'xxx',newpwd:'xxx',oldpwd:'xxx'}
* 根据管理员名和密码修改管理员密码
* 返回数据：
* {code:200,msg:'modified succ'}
* {code:400,msg:'aname or apwd err'}
* {code:401,msg:'apwd not modified'}
*/
router.patch("/", (req, res) => {
    var data = req.body;
    var sql='SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)'
    //首先根据aname/oldPwd查询该用户是否存在
    pool.query(sql,[data.aname,data.oldPwd],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({code:400,msg:'password err'});
            return;
        }
        //如果查询到了用户，再修改其密码
        pool.query('UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?',[data.newPwd,data.aname],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                res.send({code:200,msg:'modift succ'})
            }else {
                res.send({code:401,msg:'pwd not modified'})
            }
        })
    })
    //如果查询到了用户，在修改其密码
})
