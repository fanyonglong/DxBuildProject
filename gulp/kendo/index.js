const gulp=require('gulp');
const gulpPlumber=require('gulp-plumber');
const path=require('path');
const runSequence=require('run-sequence');
const smap=require('convert-source-map');
const through2=require('through2');
const del=require('del');
const buffer=require('buffer');
const shuji=require('shuji');
const gulpMap=require('gulp-sourcemaps');
gulp.task('clean',(cb)=>{
    del(['./dist/kendo/**','!./dist/kendo']).then((paths)=>{
        cb();
    });
});
gulp.task('default',['clean'],()=>{
        gulp.src('./assets/kendo/*.js',{base:"assets"}).pipe(gulpPlumber()).pipe(gulp.dest('./dist'));
});
module.exports=function(cb)
{
    runSequence('default',cb);
}