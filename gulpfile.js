const gulp=require('gulp');
const argv=require('yargs').option('task',{
    alias:"t",
    type:"string",
    describe:"执行的任务名称",
    default:'',
    requiresArg:true
}).usage('usage:gulp --t|--task <taskname>').help().argv;
const runSequence=require('run-sequence');
const del = require('del');
const {exec}=require('child_process');
var log=require('./ultil')

gulp.task('default',()=>{
    if(argv.task=='')
    {
        log.red('请输入你的任务名称');
        return;
    }
    try{
        let exec=require('./gulp/'+argv.task);
        log.green('开始执行构建任务');
        exec(()=>{
            log.green('构建完成');
        });
    }catch(e)
    {
        log.red('找不到任务');
    }

})