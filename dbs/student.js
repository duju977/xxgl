/**
 * 学生表   模型
 * Created by 小丑 on 2017/10/06
 */

var mongoose = require("./db.js");

const Schema = mongoose.Schema;

// 创建Schema
var studentSchema = Schema({
    //姓名
    name:String,
    //性别
    sex:String,
    // 年龄
    age:Number,
    //手机
    phone:String,
    //邮箱
    email:String,
    //描述
    description:String,
    //创建日期
    createTime:Date,
    //更新时间
    updateTime:Date
})

// 创建模型
var Student = mongoose.model("student",studentSchema)

module.exports = Student;