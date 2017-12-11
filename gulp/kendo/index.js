
const gulp=require('gulp');
const gulpPlumber=require('gulp-plumber');
const path=require('path');
const runSequence=require('run-sequence');
const smap=require('convert-source-map');
const through2=require('through2');
const del=require('del');
const buffer=require('buffer');
const shuji=require('shuji');
const sourceMap = require('source-map');
gulp.task('clean',(cb)=>{
    del(['./dist/kendo/**','!./dist/kendo']).then((paths)=>{
        cb();
    });
});
gulp.task('default',['clean'],()=>{
   
   // console.log(process.cwd());
        gulp.src('./assets/kendo/*.js',{base:"assets"}).pipe(gulpPlumber()).pipe(through2.obj(function(chunk, enc, callback){
          console.log(path.dirname(chunk.path));
           var base4=  shuji(chunk.contents.toString(enc));
           console.log(base4);
           // chunk.contents=Buffer.from(base4,'base64');
            callback(null,chunk);
        })).pipe(gulp.dest('./dist'));
})
module.exports=function(cb)
{
    runSequence('default',cb);
}