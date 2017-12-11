
const gulp=require('gulp');
const path=require('path');
const runSequence=require('run-sequence');
const smap=require('convert-source-map');
const through2=require('through2')
gulp.task('default',()=>{
   
   // console.log(process.cwd());
        gulp.src('./assets/kendo/*.js').pipe(through2.obj(function(chunk, enc, callback){
            console.log(chunk.name);
            callback();
        }));
})
module.exports=function(cb)
{
    runSequence('default',cb);
}