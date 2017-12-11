const gulp=require('gulp');
const argv=require('yargs').default('task','').argv;
const runSequence=require('run-sequence');
const del = require('del');
const {exec}=require('child_process');
var log=require('./ultil')

gulp.task('kendo',(cb)=>{
    let exec=require('./gulp/kendo');
    exec(cb);
});
gulp.task('ts',(cb)=>{
    let exec=require('./gulp/typescript');
    exec(cb);
});

gulp.task('default',()=>{

    if(argv.task=='')
    {
        log.red('请输入你的任务名称');
        return;
    }
    log.green('开始执行构建任务');
    runSequence(argv.task,()=>{
        log.green('构建完成');
    });

})