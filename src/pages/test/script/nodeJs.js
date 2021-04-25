// 导入express
var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var path = require("path");

// 加载hbs模块 用于渲染动态模板html
var hbs = require('hbs');

// 加载数据模块
var user = require("./public/scripts/user");

// 加载数据模块
var blogEngine = require('./public/scripts/blog');

// 生产express 实例
var app = express();

// app.use("/home", function(request, response, next) {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("Welcome to the homepage!\n");
//   });
// app.use("/about", function(request, response, next) {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("Welcome to the about page!\n");
// });
// app.use(function(request, response) {
//     response.writeHead(404, { "Content-Type": "text/plain" });
//     response.end("404 error!\n");
// });

// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 8080);

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设定view engine变量，意为网页模板引擎
app.set('view engine', 'jade');

// 运行hbs模块
app.engine('html', hbs.__express);

// 使用body-parser中间件对post请求体进行解析
app.use(bodyParser.urlencoded({extended : false}));

// app.use(express.favicon()); //用来设置网站的图标，参数为图标的路径。如果不指明，则用默认的express图标
// app.use(express.logger('dev'));
// app.use(express.bodyParser()); // 对请求内容进行解析，支持json、 application/x-www-form-urlencoded、multipart/form-data 格式数据的解析。也就是说ajax和form发送请求时，都会经过它的处理，方便在req中获取相应的请求值
// app.use(express.methodOverride()); //为了支持put、delete等HTTP方法，不过要客户端配合，包含相应的_method参数
// app.use(app.router);

app.all("*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

app.get("/", function(req , res){
    res.send("Hello world");
})

// 配置跟路由
app.get("/list" , function(req , res) {
    // res.send("Hello World");

    // var body = 'Hello World';
    // res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Content-Length', body.length);
    // res.end(body);

    // res.sendFile(path.join(__dirname , "views/index.html")) 

    // res.render('index');

    res.render('index.html',{title:"最近文章", entries:blogEngine.getBlogEntries()});
})

app.get('/about', function(req, res) {
    res.render('about.html', {title:"自我介绍" , user:user.getUserInfo()});
});

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article.html',{title:entry.title, blog:entry});
});


// router的use方法使用中间件 , 注意顺序,
// router就像一个小型的express
// router.use(function(req, res, next) {
// 	console.log(req.method, req.url);
// 	next();
// });

router.route('/api') //      /route/api
	.post(function(req, res) {

	})
	.get(function(req, res) {
		res.send("api");
	});

app.use("/" , router);

try{
    app.listen(app.get("port"));   
    console.log("服务已启动");
}catch(e){
    console.log("服务启动失败：",e);
}

module.exports = {
    app
}