/**还原map文件***/
const fs=require('fs');
const gulp=require('gulp');
const gulpPlumber=require('gulp-plumber');
const path=require('path');
const runSequence=require('run-sequence');
const through2=require('through2');
const del=require('del');
const buffer=require('buffer');
const sourceMap = require('source-map');
var strip = require('gulp-strip-comments');
gulp.task('clean',(cb)=>{
    del(['./dist/react/**','!./dist/react']).then((paths)=>{
        cb();
    });
});
gulp.task('default',['clean'],()=>{
    return gulp.src([
        './temp/react/packages/**/src/**/*.@(js|vert|frag)','!./temp/react/packages/**/@(__tests__|test-utils)/**/*'],{

        }).pipe(through2.obj(function(file, _, cb) {
        //console.log(file.basename);
        //console.log(file.path)
      //  console.log(file.base);
       // console.log(file.dirname)
        //console.log(file.relative)
        file.path=file.path.replace('\\src\\','\\');
       // console.log(file.path)
        //file.path=path.resolve(file.path,'../../',path.basename(file.path));
        cb(null, file);
      })).pipe(gulp.dest('./dist/react'))
})
module.exports=function(cb)
{
    runSequence('default',cb);
}