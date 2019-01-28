/*
 * 菜品类别相关的路由
 */
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

/*
 * API:GET/admin/category
 * 含义:客户端获取所有的菜品类别，按编号升序排列
 * 返回值型如：
 * [{cid:1,cname:'..'},{...}]
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM xfn_category ORDER BY cid', (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
/*
* API:DELETE/admin/category/:cid
* 含义:根据表示菜品编号的路由参数，删除该菜品
* 返回值型如：
* {code:200,msg:'1 category deleted'}
* {code:400,msg:'0 category deleted'}
*/
router.delete('/:cid', (req, res) => {
    //有外键约束
    //注意删除菜品类别之前必须先把属于该类别的菜品的类别编号设置为null
    pool.query('UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?',
        [req.params.cid], (err, result) => {
            if (err) throw err;
            //至此指定类别的菜品已经修改完毕
            pool.query('DELETE FROM xfn_category WHERE cid=?', [req.params.cid], (err, result) => {
                if (err) throw err;
                //获取delete语句在数据库中影响的行数
                if (result.affectedRows > 0) {
                    res.send({ code: 200, msg: '1 category deleted' })
                } else {
                    res.send({ code: 400, msg: '0 category deleted' })
                }
            })
        })

})
/*
* API:POST/admin/category
* 请求主体参数：{cname:'xxx'}
* 含义:添加新的菜品类别
* 返回值型如：
* {code:200,msg:'1 category added',cid:x}
*/
router.post('/', (req, res) => {
    var data = req.body; //形如{cname:'xxx'}
    pool.query('INSERT INTO xfn_category SET ?', [data],
        (err, result) => {
            if (err) throw err;
            res.send({ code: 200, msg: '1 category added' })
        })
})
/*
* API:PUT/admin/category
* 请求主体参数：{cid:xx,cname:'xxx'}
* 含义:根据菜品类别的编号修改该类别
* 返回值型如：
* {code:200,msg:'1 category modified'}
* {code:400,msg:'0 category modified,not exists'} 
* {code:401,msg:'0 category modified,no modification'}
*/
router.put('/', (req, res) => {
    var data = req.body;//请求数据{cid:xxx,cname:'xxx'}
    //TODO:此处可以对数据进行验证
    pool.query('UPDATE xfn_category SET ? WHERE cid=?', [data, data.cid],
        (err, result) => {
            if (err) throw err;
            if (result.changedRows > 0) {   //实际更新了一行
                res.send({ code: 200, msg: '1 category modified' })
            } else if (result.affectedRows == 0) {  //影响到0行
                res.send({ code: 400, msg: 'category not exits' })
            } else if (result.affectedRows == 1 && result.changedRows == 0) {   //影响到1行，但修改了0行——新值与旧值完全一样
                res.send({ code: 401, msg: '0 category modified' })
            }
        })
})










