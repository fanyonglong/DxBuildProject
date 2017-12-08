
const gulp=require('gulp')
const runSequence=require('run-sequence');

gulp.task('default',()=>{
    console.log('aaaaaaaaaaa');
})
module.exports=function(cb)
{
    runSequence('default',cb);
}