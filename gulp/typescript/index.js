
const gulp=require('gulp')
const runSequence=require('run-sequence');
const typescript=require('gulp-typescript');
const path=require('path');
const root=path.resolve(__dirname,'../../');
const srcPath=path.resolve
gulp.task('default',()=>{
    
         gulp.src('./src/typescript/**/*.ts');
 })
 module.exports=function(cb)
 {
     runSequence('default',cb);
 }