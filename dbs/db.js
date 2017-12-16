/**
 *链接数据库
 * Created by 独钓江雪 on 2017/10/06
 */


const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/students", {
    useMongoClient: true
}, err => {
    if (err) {
        console.log("数据连接失败");
    } else {
        console.log("数据连接成功");
    }
})

mongoose.Promise = Promise;

module.exports = mongoose;