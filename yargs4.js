
var yargs=require('yargs');

var argv=yargs.options({
    "task":{
        alias:"t",
        type:['string','boolean'],
        default:'commonjs',
        describe:"执行的任务名称",
        //skipValidation:true,
        requiresArg:true, // 可以不用设置，但是设置就必须指定值
        demandOption:true // 必项选
    },
    "build":{
        alias:"b",
        describe:"构建工具",
        choices: ['gulp','rollup'],
        default:'gulp',
        demandOption:true
    },
}).coerce('task',function(v){
    if(v=='false'){
        return false;
    }else if(v=='true'){
        return true
    }
    return v;
}).argv
console.log(argv)