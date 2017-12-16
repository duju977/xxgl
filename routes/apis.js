//导入express
const express = require("express");
var router = express.Router();

//学生模型
const Student = require("../dbs/student.js")


// 添加学生
//实际接口地址  /api/add
router.post("/add", (req, res) => {
    var student = req.body;
    //创建时间
    student.createTime = new Date()
    //更新时间
    student.updateTime = new Date()


    //插入数据库
    //这种写法嵌套比较深
    //    new Student(student).save(function(err){
    //        if(!err){
    //            var message = `添加${student.name}信息成功`
    //            res.json({
    //                err:0,
    //                message
    //            })
    //        }
    //    })
    //mongoose的数据库操作  大部分返回的都是promise对象
    var p1 = new Student(student).save()
    p1.then(function () {
        var message = `添加${student.name}信息成功`
        res.json({
            err: 0,
            message
        })
    })
        .catch(function (err) {

        })
});
//修改学生
router.post("/edit", function (req, res) {
     var student = req.body;
     var id = req.body.id;
     delete student.id;
     //更新时间
    student.updateTime = new Date()
     Student.findByIdAndUpdate(id,student)
     .then(function(){
         res.json({
             err:0,
             message:`更新${student.name}信息成功`
         })
     })
     .catch(function(err){
console.log(err);
     })
});
//删除学生-接口
router.post("/del", function (req, res) {
    // 请求体
    var id = req.body.id;
    var name = req.body.name;
     Student.findByIdAndRemove(id)
     .then(function(){
      res.json({
          err:0,
          message:`删除${name}信息成功!`
      })
     })
    .catch(function(err){
      console.log(err);
    })
});


// 导出路由
module.exports = router;