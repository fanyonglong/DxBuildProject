const gulp=require('gulp')
const runSequence=require('run-sequence');
const path=require('path');
const del=require('del');
const concat=require('gulp-concat');
const sass=require('gulp-sass');
const plumber=require('gulp-plumber');
const argv=require('yargs').argv;

gulp.task('clean',()=>{
   return del(['./dist/<%=taskName%>/**','!./dist/<%=taskName%>']);
});

gulp.task('sass',()=>{  
    return gulp.src('src/<%=taskName%>/**/*.scss').pipe(plumber())
        .pipe(sass()) .pipe(gulp.dest('dist/<%=taskName%>'));
});
gulp.task('watch',()=>{
    return gulp.watch('src/<%=taskName%>/**/*.scss',['sass']);
})
        
 module.exports=function(cb)
 {
    if(argv.watch)
    {
       runSequence('clean','sass','watch',cb);
    }else{
       runSequence('clean','sass',cb);
    }
 }