var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var cssMin = require("gulp-clean-css");
var imgMin = require("gulp-imagemin");


/**==========
=============文件拷贝开始----------*/

gulp.task("copy-index", function() {
	return gulp.src("./src/index.html")
		.pipe(gulp.dest("./www"))
		.pipe(connect.reload())
});

gulp.task("copy-html", function() {
	return gulp.src("./src/*.html")
		.pipe(gulp.dest("./www"))
		.pipe(connect.reload())
});

gulp.task("copy-css", function() {
	return gulp.src("./src/css/*.css")
		.pipe(cssMin())
		.pipe(gulp.dest("./www/css"))
});

/*----sass 转换成css 并放到指定目录开始--------*/
gulp.task("sassTo", function() {
	return gulp.src("./src/css/sass/*.*")
		.pipe(sass())
		.pipe(gulp.dest("./www/css"))
});
//sass转换结束

gulp.task("copy-js", function() {
	return gulp.src("./src/js/**/*")
		.pipe(uglify())
		.pipe(gulp.dest("./www/js"))
});

gulp.task("copy-img", function() {
	return gulp.src("./src/img/**/*")
		.pipe(imgMin())
		.pipe(gulp.dest("./www/img"))
});

gulp.task("copy-font", function() {
	return gulp.src("./src/font/**/*")
		.pipe(gulp.dest("./www/font"))
});
//文件拷贝结束

/*---------后台管理部分------------*/
gulp.task("copy-adminIndex", function() {
	return gulp.src("./src/Admin/adminLogin.html")
		.pipe(gulp.dest("./www/Admin"))
		.pipe(connect.reload())
});

gulp.task("copy-adminHtml", function() {
	return gulp.src("./src/Admin/pages/*.html")
		.pipe(gulp.dest("./www/Admin/pages"))
		.pipe(connect.reload())
});

gulp.task("copy-adminCss", function() {
	return gulp.src("./src/Admin/css/*.css")
		.pipe(cssMin())
		.pipe(gulp.dest("./www/Admin/css"))
});

gulp.task("copy-adminJs", function() {
	return gulp.src("./src/Admin/js/**/*")
		.pipe(uglify())
		.pipe(gulp.dest("./www/Admin/js"))
});

gulp.task("copy-adminImg", function() {
	return gulp.src("./src/Admin/images/**/*")
		.pipe(imgMin())
		.pipe(gulp.dest("./www/Admin/images"))
});

gulp.task("copy-easyui", function() {
	return gulp.src("./src/Admin/easyui/**/*")
		.pipe(gulp.dest("./www/Admin/easyui"))
});
//文件拷贝结束





/*----------搭建本地服务开始--------*/
gulp.task("server", function() {
		connect.server({
			//设置服务打开的根路径
			root: "www",
			port: 8000,
			livereload: true
		});
	})
	//本地服务开启结束


/*--------监控开始----------*/
gulp.task("watch", function() {
	gulp.watch("./src/index.html", ["copy-index"]);
	gulp.watch("./src/css/sass/*.*",["copy-index","copy-html","sassTo"]);
	gulp.watch("./src/css/*.css", ["copy-css", "copy-index", "copy-html"]);
	gulp.watch("./src/js/*.js", ["copy-js", "copy-index", "copy-html"]);
	gulp.watch("./src/font/**/*", ["copy-font", "copy-index", "copy-html"]);
	gulp.watch("./src/*.html", ["copy-html", "copy-index"]);

});
//监控结束

/*---------默认任务-----------*/
gulp.task("default", ["server", "watch","copy-img"]);