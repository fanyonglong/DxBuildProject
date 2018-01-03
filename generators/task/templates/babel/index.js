const gulp=require('gulp')
const runSequence=require('run-sequence');
const path=require('path');
const del=require('del');
const babel=require('gulp-babel');
const concat=require('gulp-concat');
var merge = require('merge2');


gulp.task('clean',()=>{
   return del(['./dist/<%=taskName%>/**','!./dist/<%=taskName%>']);
});
gulp.task('default',['clean'],()=>{  
    return gulp.src('src/<%=taskName%>/**/*.js')
        .pipe(babel()).pipe(concat("index.js"))
        .pipe(gulp.dest('dist/<%=taskName%>'));
});

     
 module.exports=function(cb)
 {
     runSequence('clean','default',cb);
 }