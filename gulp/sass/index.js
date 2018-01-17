const gulp=require('gulp')
const runSequence=require('run-sequence');
const path=require('path');
const del=require('del');
const concat=require('gulp-concat');
const sass=require('gulp-sass');
const plumber=require('gulp-plumber');
const argv=require('yargs').argv;

gulp.task('clean',()=>{
   return del(['./dist/sass/**','!./dist/sass']);
});

gulp.task('sass',()=>{  
    return gulp.src('src/sass/**/*.scss').pipe(plumber())
        .pipe(sass({
            outputStyle:"expanded",
        })) .pipe(gulp.dest('dist/sass'));
});
gulp.task('watch',()=>{
    return gulp.watch('src/sass/**/*.scss',['sass']);
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