//复制SRC下的文件,到dist目录中去

const gulp = require("gulp");
const babel = require("gulp-babel"); //编译JS
const uglify = require("gulp-uglify"); //压缩JS
const webserver =  require('gulp-webserver'); //服务器
const miniCSS = require("gulp-clean-css"); //压缩CSS
const sass = require("gulp-sass"); //编译sass

gulp.task("refreshJS", function(){
	gulp.src("./src/js/libs/*.js")
        .pipe(gulp.dest("./dist/js/libs"));
    gulp.src("./src/js/myjs/**/*.js")
        .pipe( babel({
            presets: ["@babel/env"]
        }) )
        .pipe( uglify() )
        .pipe( gulp.dest("./dist/js/myjs") )
});

gulp.task("refreshCSS", ()=>{
	gulp.src("./src/css/**/*.css")
		.pipe( miniCSS() ) 
        .pipe( gulp.dest("./dist/css") )
})

gulp.task("refreshSCSS", ()=>{	
	gulp.src("./src/css/**/*.scss")
		.pipe( sass().on("error",sass.logError) )
		.pipe( miniCSS() ) 
		.pipe( gulp.dest("./dist/css") )
})

gulp.task("refreshHTML", function(){
	gulp.src("./src/pages/**/*").pipe( gulp.dest("./dist/pages") );
})

gulp.task("refreshStatic", function(){
	gulp.src("./src/static/**/*.*")
		.pipe( gulp.dest("./dist/static") )
})

gulp.task("refreshData", function(){
	gulp.src("./src/data/**/*.*")
		.pipe( gulp.dest("./dist/data") )
})

//构建项目
gulp.task("refresh", ["refreshJS", "refreshCSS", "refreshSCSS", "refreshHTML", "refreshStatic", "refreshData"]);

gulp.task("watch", ()=>{
	gulp.watch("./src/**/*.html", ["refreshHTML"]);
	gulp.watch("./src/**/*.js", ["refreshJS"]);
	gulp.watch("./src/**/*.scss", ["refreshSCSS"]);
	gulp.watch("./src/**/*.css", ["refreshCSS"]);
	gulp.watch("./src/**/*.*", ["refreshData"]);
})

//本地服务器
gulp.task("webserver", ["watch", "refresh"] , ()=>{
	gulp.src('./dist')
	.pipe(webserver({
		livereload: true,
		port: 9999,
		// proxies: [{
        //     source: '/listmore',
        //     target: 'https://m.lagou.com/listmore.json',
        // }]
	}));
})