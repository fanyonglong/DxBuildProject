const gulp=require('gulp');
let rename=require('gulp-rename')
const argv=require('yargs').help().version().options({
    "task":{
        alias:"t",
        type:"string",
        describe:"执行的任务名称",
        default:'',
        requiresArg:true,
        demandOption:true
    },
    "build":{
        alias:"b",
        describe:"构建工具",
        choices: ['gulp','rollup'],
        default:'gulp',
        demandOption:true
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





gulp.task('dist',()=>{
    gulp.src(['./node_modules/d3-*/@(dist|build)/d3-*.js','!./node_modules/d3-*/@(dist|build)/d3-*.min.js'],{
    }).pipe(rename(function (path) {
        path.dirname = "";
      })).pipe(gulp.dest('./dist'))

})
const rollup=require('rollup');
async function buildRollup(input,output){
     const bundle = await rollup.rollup(input);  
    await bundle.write(output);
}

gulp.task('default',()=>{
    if(argv.task=='')
    {
        log.red('请输入你的任务名称');
        return;
    }
    if(argv.build=='rollup'){
        try{
            console.log(argv.task);
            let exec=require('./rollup/'+argv.task);
            if(typeof exec=='function'){
                log.green('开始执行构建任务');
                exec(argv,(r)=>{
                    buildRollup(r.input,r.output).then(()=>{
                        log.green('构建完成');
                        })
                });
            }
        }catch(e){
            log.red('构建异常:'+e);
        }
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

