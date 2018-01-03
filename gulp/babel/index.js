
const gulp=require('gulp')
const runSequence=require('run-sequence');
const ts=require('gulp-typescript');
const path=require('path');
const del=require('del');
var merge = require('merge2');


gulp.task('clean',(cb)=>{
    del(['./dist/typescript/**','!./dist/typescript']).then((paths)=>{
        cb();
    });
});
gulp.task('default',['clean'],()=>{
    
     
});
      

 module.exports=function(cb)
 {
     runSequence('default',cb);
 }