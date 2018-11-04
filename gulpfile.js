//引入
var gulp = require("gulp");
var gulpSass = require("gulp-sass");
var gulpServer = require("gulp-webserver");
var url = require("url");
var path = require("path");
var fs = require("fs");
var bodyparser = require("body-parser");
var data = require("./src/js/data.json");
//编译sass
gulp.task("sass", function() {
    gulp.src("./src/scss/*.scss").pipe(gulpSass()).pipe(gulp.dest("./src/css/"));
});
//起服务
gulp.task("server", function() {
    gulp.src("./src").pipe(gulpServer({
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
                }
            } else {
                pathname = pathname === "/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
            }

        }]
    }));
});