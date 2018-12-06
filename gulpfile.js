//复制SRC下的文件,到dist目录中去

let gulp = require("gulp");
let babel = require("gulp-babel"); //编译JS
let uglify = require("gulp-uglify"); //压缩JS
let webserver =  require('gulp-webserver'); //服务器
let miniCSS = require("gulp-clean-css"); //压缩CSS
let sass = require("gulp-sass"); //编译sass


gulp.task("refreshJS", function(){
    gulp.src("./src/js/**/*.js")
        .pipe(gulp.dest("./dist/js"));
    gulp.src("./src/pages/**/*.js")
        .pipe( babel({
            presets: ["@babel/env"]
        }) )
        .pipe( uglify() )
        .pipe( gulp.dest("./dist/pages") )
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

//构建项目
gulp.task("refresh", ["refreshJS", "refreshCSS", "refreshSCSS", "refreshHTML", "refreshStatic"]);

gulp.task("watch", ()=>{
	gulp.watch("./src/**/*.html", ["refreshHTML"]);
	gulp.watch("./src/**/*.js", ["refreshJS"]);
	gulp.watch("./src/**/*.scss", ["refreshSCSS"]);
	gulp.watch("./src/**/*.css", ["refreshCSS"]);
})

//本地服务器
gulp.task("webserver", ["watch", "refresh"] , ()=>{
	gulp.src('./dist')
	.pipe(webserver({
        livereload: true,
        // https: true ,
        port: 9999,
        proxies: [{
            source: '/listmore',
            target: 'https://m.lagou.com/listmore.json',
        }]
	}));
})
