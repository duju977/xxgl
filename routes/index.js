
//导入express
const express = require("express");
var router = express.Router();
//学生模型
const Student = require("../dbs/student.js")


//首页
router.get("/", function (req, res) {
    // 分页  传参： ?page=1
    // 搜索  传参:  ?name=张三&isMale=0&phone=157
    // 当前页
    var page = req.query.page || 1;
    // 总页数
    var pageCount;
    // 每页显示多少个
    var pageSize = 5;
    // 搜索参数
    var filters = {};
    var name = req.query.name 


    var phone = req.query.phone
    var sex = req.query.sex
    if (name) {
        filters.name = new RegExp(name)
    }
    if (phone) { filters.phone = new RegExp(phone) }

    if (sex) {filters.sex = sex}
    
    // 搜索条件字符串
    var urlParams = "";
    for (var key in filters) {
        var value = filters[key]
        // 正则和字符串分别处理
        if(value instanceof RegExp){
            // value.source 正则  模式匹配符
            //value.flags 正则  模式修饰符
         urlParams += `${key}=${value.source}&`
        }else{
            urlParams += `${key}=${value}&`
        }
       
    }
    // urlParams = urlParams.length > 0 ? urlParams : ""
    // 查找符合条件的数据的个数
    Student.count(filters)
        .then(function (count) {
            // console.log(count);
            // 计算出来总页数
            pageCount = Math.ceil(count / pageSize)
            var pageArray = new Array(pageCount).fill(1).map((e, i) => i + 1);
            // 处理当前页
            page = page > pageCount ? pageCount : page;
            page = page < 1 ? 1 : page;
            // 查找数据
            Student.find(filters)
                // 排序
                .sort({ updateTime: 1 })
                // 跳过
                .skip((page - 1) * pageSize)
                // 查询条数
                .limit(pageSize)
                .then(function (data) {
                    // 倒序 输入的信息从下往上
                    // data.reverse()
                    var students = JSON.parse(JSON.stringify(data))
                    // console.log(students);
                    res.render("index.html", {
                        title: "首页",
                        src: "js/index.js",
                        page: parseInt(page),
                        pageCount,
                        pageArray,
                        pageSize,
                        students,
                        urlParams
                    })
                })
                .catch(function () {
                    console.log(err);
                })
        })
});



//添加学生信息
router.get("/add", (req, res) => {
    res.render("add.html", {
        title: "添加信息",

    })
})
//修改学生
router.get("/edit/:id", function (req, res) {
    var id = req.params.id 

    // 查找
    Student.findById(id)
        .then(function (data) {
            var student = JSON.parse(JSON.stringify(data))
            res.render("edit.html", {
                title: "修改信息",
                src: "js/edit.js",
                student
            })
        })
        .catch(function (err) {
            console.log(err);
        })

});

// 导出路由
module.exports = router;
