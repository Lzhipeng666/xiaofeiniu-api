/*
*桌台相关的路由器
*/
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

/*
*GET  /admin/table
*获取所有的桌台信息
*返回数据：
*   [
*     {tid:xxx, tname:'xxx', status:''},
*     ...
*   ]
*/
router.get('/', (req, res)=>{
  pool.query('SELECT * FROM xfn_table ORDER BY tid', (err, result)=>{
    if(err)throw err;
    res.send(result);
  })
})

/*
*post  /admin/table
*添加桌台
 */

router.post('/', (req, res)=>{
  pool.query('INSERT INTO xfn_table SET ?', req.body, (err, result)=>{
    if(err)throw err;
    res.send({code:200, msg:'table added succ', tableId:result.insertId}) //将INSERT语句产生的自增编号输出给客户端
  })
})
