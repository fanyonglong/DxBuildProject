const gulp=require('gulp');
const argv=require('yargs').help().version().options({
    "task":{
        alias:"t",
        type:"string",
        describe:"执行的任务名称",
        default:'',
        requiresArg:true,
       // demandOption:true
    },
    "start":{
        type:"boolean",
        describe:"启动浏览器",
        default:false
    },
    "watch":{
        alias:"w",
        type:"boolean",
        describe:"监听模式",
        default:false
    }

}).usage('usage:gulp --t|--task <taskname>').argv;
const runSequence=require('run-sequence');
const browserSync=require('browser-sync').create();
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
            if(argv.start)
            {
                browserSync.init({
                    server: {
                        baseDir: "./dist/"+argv.task
                    }
                });
            }
        },()=>{
            browserSync.reload();
        });
    }catch(e)
    {
        log.red(e);
    }

})