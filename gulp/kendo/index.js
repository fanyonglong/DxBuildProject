/**还原map文件***/
const fs=require('fs');
const gulp=require('gulp');
const gulpPlumber=require('gulp-plumber');
const path=require('path');
const runSequence=require('run-sequence');
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
   

        gulp.src('./assets/kendo/*.map',{base:"assets"}).pipe(gulpPlumber()).pipe(through2.obj(function(chunk, enc, callback){
   
           var content=  chunk.contents.toString(enc); //base64 utf-8 buffer
 
           const consumer = new sourceMap.SourceMapConsumer(content);

           if (consumer.hasContentsOfAllSources()) {
  
            if(consumer.sources.length>0)
            {
                var fileName=consumer.sources[0];
                const fileSource = consumer.sourceContentFor(fileName);
                chunk.path=path.join(path.dirname(chunk.path),fileName);
                chunk.contents= Buffer.from(fileSource,enc);
     
            }
          }
            callback(null,chunk);
        })).pipe(gulp.dest('./dist'));
})
module.exports=function(cb)
{
    runSequence('default',cb);
}