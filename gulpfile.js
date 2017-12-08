const gulp=require('gulp');
const argv=require('yargs').default('task','').argv;
const runSequence=require('run-sequence');
const del = require('del');
const {exec}=require('child_process');
const chalk=require('chalk');

gulp.task('kendo',(cb)=>{
    let exec=require('./gulp/kendo');
    exec(cb);
});

gulp.task('default',()=>{

    if(argv.task=='')
    {
        console.log(chalk.red('请输入你的任务名称'));
        return;
    }
    console.log('开始执行构建任务');
    runSequence(argv.task,()=>{
        console.log('构建完成');
    });

})