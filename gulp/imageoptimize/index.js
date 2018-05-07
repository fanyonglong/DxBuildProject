const gulp=require('gulp')
const runSequence=require('run-sequence');
const path=require('path');
const del=require('del');
const babel=require('gulp-babel');
const concat=require('gulp-concat');
var merge = require('merge2');
const eslint=require('gulp-eslint');
const imagemin = require('gulp-imagemin');
gulp.task('clean',()=>{
   return del(['./dist/imageoptimize/**','!./dist/imageoptimize']);
});
gulp.task('eslint',()=>{  
    return gulp.src('src/imageoptimize/**/*.js')
        //  ESLint忽略带有“node_modules”路径的文件。 
        //  所以，最好还是不要忽略目录。 
        //  另外，确保从任务中返回流; 
        //  否则，任务可能会在流完成之前结束。 
        .pipe(eslint())
        // .pipe(eslint.result(result=>{

        //     console.log(`ESLint result: ${result.filePath}`);
        //     console.log(`# Messages: ${result.messages.length}`);
        //     console.log(`# Warnings: ${result.warningCount}`);
        //     console.log(`# Errors: ${result.errorCount}`);
        // }))
        //  eslint.format（）将lint结果输出到控制台。 
        //  或者使用eslint.formatEach（）（请参阅文档）
         .pipe(eslint.format())
        //  让进程退出并显示错误代码（1） 
        // lint错误，最后返回流和管道failAfterError。 
       .pipe(eslint.failAfterError());
});
gulp.task('js',()=>{  
    return gulp.src('temp/canvas动画/*.png').pipe(imagemin([imagemin.optipng()]))
        .pipe(gulp.dest('dist/imageoptimize'));
});

     
 module.exports=function(cb)
 {
     runSequence('clean','js',cb);
 }