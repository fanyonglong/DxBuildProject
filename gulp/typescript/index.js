
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
    
      return gulp.src('./src/typescript/**/*.ts').pipe(ts({
          //  declaration:true, // 生成相应的d.ts 生文
            target:'es5',
            noImplicitAny:true,
          //  outFile:"main.js",
          module:"amd",
          outFile: "main.js"
         })).pipe(gulp.dest('./dist/typescript'));
});
      
gulp.task('default2',()=>{
    
       var tsResult= gulp.src('./src/typescript/**/*.ts').pipe(ts({
            declaration:true, // 生成相应的d.ts 生文
            target:'es5',
            noImplicitAny:true,
          //  outFile:"main.js",
          // out: "main.js",
            module:"umd"
         }));
         return merge([tsResult.dts.pipe(gulp.dest('./dist')),tsResult.js.pipe(gulp.dest('./dist'))]);
 })
 module.exports=function(cb)
 {
     runSequence('default',cb);
 }