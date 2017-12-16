
//导入express
const express = require("express");
const app = express();
// 静态目录
app.use(express.static("public"));
//导入body-parser
const bodyParser = require("body-parser");
// cookie-parser
app.use(bodyParser.urlencoded({ extended: true }));

//express-art-template
const artTemplate = require("express-art-template")
// 模块引擎
app.engine("html",artTemplate)

//渲染页面
const route = require("./routes/index.js");
// 使用路由
app.use(route);

// 接口
const apis = require("./routes/apis.js");
// 使用路由
app.use("/api",apis);


app.listen(3000,()=>{
    console.log("服务器在3000端口正常运行！");
})