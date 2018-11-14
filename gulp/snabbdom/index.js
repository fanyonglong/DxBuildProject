
const gulp=require('gulp')
const runSequence=require('run-sequence');
const ts=require('gulp-typescript');
const path=require('path');
const del=require('del');
var merge = require('merge2');


gulp.task('clean',(cb)=>{
    del(['./dist/snabbdom/**','!./dist/snabbdom']).then((paths)=>{
        cb();
    });
});
gulp.task('default',['clean'],()=>{
    
      return gulp.src('./temp/snabbdom/**/*.ts').pipe(ts({
          //  declaration:true, // 生成相应的d.ts 生文
            target:'es5',
            noImplicitAny:false,
          //  outFile:"main.js",
       //   module:"node",
      //    outFile: "main.js"
         })).pipe(gulp.dest('./dist/snabbdom'));
});
      
gulp.task('default2',()=>{
    
       var tsResult= gulp.src('./src/snabbdom/**/*.ts').pipe(ts({
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