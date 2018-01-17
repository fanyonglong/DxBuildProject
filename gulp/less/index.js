const gulp=require('gulp')
const runSequence=require('run-sequence');
const path=require('path');
const del=require('del');
const babel=require('gulp-babel');
const concat=require('gulp-concat');
const less=require('gulp-less');
const lesshint=require('gulp-lesshint');
const merge = require('merge2');
const argv=require('yargs').argv;
const plumber=require('gulp-plumber');

gulp.task('clean',()=>{
   return del(['./dist/less/**','!./dist/less']);
});
gulp.task('lesslint', () => {
    
    return gulp.src('./src/less/**/*.less')
        .pipe(lesshint({
            // Options
           // configPath:'',  //将路径传递给有效的配置文件，并停止查找.lesshintrc文件。
           // maxWarnings:'' //在任务失败之前，允许的最大警告数量。省略此选项始终允许任务通过。
        }))
        .pipe(lesshint.reporter()) // Leave empty to use the default, "stylish"
        .pipe(lesshint.failOnError()); // Use this to fail the task on lint errors
});
gulp.task('less',()=>{  
    return gulp.src('src/less/**/*.less').pipe(plumber())
        .pipe(less()).pipe(gulp.dest('dist/less'));
});
gulp.task('watch',()=>{
    return gulp.watch('src/less/**/*.less',()=>{
        runSequence('lesslint','less');
    });
})
     
 module.exports=function(cb)
 {
     if(argv.watch)
     {
        runSequence('clean','less','watch',cb);
     }else{
        runSequence('clean','lesslint','less',cb);
     }
 }