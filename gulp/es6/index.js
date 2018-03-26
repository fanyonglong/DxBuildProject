const gulp=require('gulp')
const runSequence=require('run-sequence');
const path=require('path');
const del=require('del');
const babel=require('gulp-babel');
const concat=require('gulp-concat');
var merge = require('merge2');
const eslint=require('gulp-eslint');
var browserify = require('gulp-browserify');
var glob=require('glob');
gulp.task('clean',()=>{
   return del(['./dist/babelruntime/**','!./dist/babelruntime']);
});
gulp.task('eslint',()=>{  
    return gulp.src('temp/async-validator/src/index.js')
        //  ESLint忽略带有“node_modules”路径的文件。 
        //  所以，最好还是不要忽略目录。 
        //  另外，确保从任务中返回流; 
        //  否则，任务可能会在流完成之前结束。 
        .pipe(eslint())
        // .pipe(eslint.result(result=>{

        //     console.log(`ESLint result: ${result.filePath}`);
        //     console.log(`# Messages: ${result.messages.length}`);
        //     console.log(`# Warnings: ${result.warningCount}`);
        //     console.log(`# Errors: ${result.errorCount}`);
        // }))
        //  eslint.format（）将lint结果输出到控制台。 
        //  或者使用eslint.formatEach（）（请参阅文档）
         .pipe(eslint.format())
        //  让进程退出并显示错误代码（1） 
        // lint错误，最后返回流和管道failAfterError。 
       .pipe(eslint.failAfterError());
});
gulp.task('core-js',()=>{  
    return gulp.src('node_modules/core-js/fn/**/*.js',{base:'node_modules/core-js'})
        .pipe(babel({
            presets: [['env',{
                targets:{
                    browsers:['last 3 versions']
                },
                modules:false,
               // modules:"amd"
            }]],
            babelrc:false,
        })).pipe(gulp.dest('dist/core-js'));
});
gulp.task('core-js2',()=>{

    return glob.src('node_modules/core-js/fn/**/*.js',{base:'node_modules/core-js'})
    .pipe(babel({
        presets: [['env',{
            targets:{
                browsers:['last 3 versions']
            },
            modules:false,
           // modules:"amd"
        }]],
        babelrc:false,
    })).pipe(gulp.dest('dist/core-js'));
})
     
 module.exports=function(cb)
 {
     runSequence('clean','core-js',cb);
 }