//引入
var gulp = require("gulp");
console.log(gulp)
var gulpSass = require("gulp-sass");
var gulpServer = require("gulp-webserver");
var gulpUglify = require("gulp-uglify");
var url = require("url");
var path = require("path");
var fs = require("fs");
var bodyparser = require("body-parser");
var data = require("./src/js/data.json");
//编译sass
gulp.task("sass", function() {
    return gulp.src("./src/scss/style.scss")
        .pipe(gulpSass())
        .pipe(gulp.dest("./src/css/"));
});
//监听变化
gulp.task("change", function() {
    gulp.watch("./src/scss/style.scss", gulp.series("sass"));
});

//起服务
gulp.task("server", function() {
    return gulp.src("src").pipe(gulpServer({
        port: 8585,
        host: 'localhost',
        liverload: true, //监听
        middleware: [bodyparser.urlencoded({ extended: false }), function(req, res, next) {
            var pathname = url.parse(req.url, true).pathname;
            if (req.url === "/favicon.ico") {
                return res.end();
            }
            if (/^\/api/.test(pathname)) {
                if (pathname === "/api/register") {
                    var user1 = req.body.user;
                    var pass1 = req.body.pass;
                    console.log(user1);
                    /*  var query = url.parse(req.url, true).query;*/
                    for (var i in data) {
                        if (data[i].user === user1) {
                            res.end(JSON.stringify({ code: 0, masagge: "已存在，请重新注册" }));
                        }
                    }
                    data.push({
                        user: user1,
                        pass: pass1
                    });
                    res.end(JSON.stringify({ code: 1, masagge: "注册成功" }));
                } else if (pathname === "/api/login") {
                    var user1 = req.body.user;
                    var pass1 = req.body.pass;
                    for (var i in data) {
                        if (data[i].user === user1 && data[i].pass === pass1) {
                            res.end(JSON.stringify({ code: 1, masagge: "登录成功" }));
                        }
                    }
                    res.end(JSON.stringify({ code: 0, masagge: "用户名或密码不正确" }));
                }
            } else {
                pathname = pathname === "/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
            }

        }]
    }));
});
//压缩
gulp.task("uglify", function() {
    return gulp.src("./src/js/*.js")
        .pipe(gulpUglify())
        .pipe(gulp.dest("./src/dist/"));
});
gulp.task("default", gulp.series("sass", "server", "uglify", "change"));