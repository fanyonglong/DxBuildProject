
const gulp=require('gulp')
const runSequence=require('run-sequence');
const smap=require('convert-source-map')
gulp.task('default',()=>{
   

})
module.exports=function(cb)
{
    runSequence('default',cb);
}