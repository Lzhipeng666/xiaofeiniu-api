/**
 * 菜品相关路由
 */
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;
/**
 * API：GET/admin/dish
 * 获取所有的菜品（按类别进行分类）
 * 返回数据：
 * [
 * {cid:1,cname:'肉类',dishList:[{},{},...]}
 * {cid:2,cname:'菜类',dishList:[{},{},...]}
 * ...
 * ]
 */
router.get('/', (req, res) => {
    //查询所有的菜品
    pool.query('SELECT cid,cname FROM xfn_category ORDER BY cid', (err, result) => {
        if (err) throw err;
        //循环遍历每个菜品类别，查询该类别下有哪些菜品
        var categoryList = result; //类别列表
        var finishCount = 0       //已经查询完菜品的类别的数量

        for (let c of categoryList) {
            //循环查询每个类别下有哪些菜品
            pool.query('SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC', c.cid,
                (err, result) => {
                    if (err) throw err;
                    c.dishList = result;
                    finishCount++;
                    if (finishCount == categoryList.length) {
                        res.send(categoryList);
                    }
                })
        }
    })
})

/**
 * API:post/admin/dish/image
 * 请求参数：
 * 接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名 
 * 返回数据：
 * {code:200,msg:'upload succ',flieName}
 */
//引入multer中间件
const multer = require('multer')
const fs =require('fs')
var upload = multer({
    dest: 'tmp/' //指定客户端上传的文件临时存储路径
})
//指定路由，使用文件上传中间件 
router.post('./image', upload.single('dishImg'), (req,res) => {
    //console.log(req.file);      //客户端上传的图片
    //console.log(req.body);      //客户端随同图片提交的字符数据
    //把客户端上传的文件从临时的目录转移到永久的图片路径下
    var temFile=req.file.path;      //临时文件名
    var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));//原始文件名中的后缀部分
    var newFile=randFileName(suffix);//目标文件名
    fs.rename(temFile,'img/dish/'+newFile,()=>{  //rename 相当于复制粘贴
        res.send({code:200,msg:'upload succ',fileName:newFile})     //把临时文件转移
    })
})
//生成一个随机文件名
//参数：suffix表示要生成的文件名中的后缀
//形如：1351452-1821.jpg
function randFileName(suffix) {
    var time = new Date().getTime();
    var num = Math.floor(Math.random() * (10000 - 1000) + 1000);
    return time + '-' + num + suffix
}
 /**
 * API:post/admin/dish
 * 请求参数：{title:'xx',imgUrl:'..jpg',price:xx,detail:'xx',categoryId:xx}
 * 添加一个新的菜品
 * 输出消息：
 *  {code:200,msg:'dish added succ',dishId:46}
 */
router.post('/',(req,res)=>{
    pool.query('INSERT INTO xfn_dish SET ?',req.body,(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'dish added succ',dishId:result.insertId})//将insert语句产生的自增编号输出给客户端
    })
})

 /**
  * DELETE /admin/dish/:did
  * 根据指定的菜品编号删除该菜品
  * 输出数据：
  *     {code:200,msg:'dish added succ'}
  *     {code:400,msg:'dish not exists'}
  *     
  */

  /**
   * PUT admin/dish
   * 请求参数：{did:xx,title:'xx',imgUrl:'..jpg',price:xx,detail:'xx',}
   */














