// args 共享
var yargs=require('yargs');

//yargs('run --help') 运行命令
// command('$0 <input> <out>').options({
//     outType:{
//         type:'string',
//         choices: ['xs', 's', 'm', 'l', 'xl'],
//         default:"s"
//     }
// }).argv;

// console.log(argv);

// process.chdir('src');
// console.log(`New directory: ${process.cwd()}`);


/// 
// node yargs-example2.js

// 显示版本 --version
yargs.help("help")
.alias("help", "h")
.version()
.alias("version", "v").argv;

/**
 * alias：字符串或字符串数​​组，规范选项键的别名，请参阅 alias()
array：布尔型，解释选项作为数组，请参阅 array()
boolean：布尔型，将选项解释为布尔型标志，请参阅 boolean()
choices：值或值数组，请将有效的选项参数限制到预定义的集合，请参阅 choices()
coerce：函数，强制或将解析的命令行值转换为另一个值，请参阅 coerce()
config：布尔型，将选项解释为JSON配置文件的路径，请参阅 config()
configParser：函数，提供一个自定义配置解析函数，详见 config()
conflicts：字符串或对象，需要某些键不被设置，请参阅 conflicts()
count：布尔型，将选项解释为布尔型标志的计数，请参阅 count()
default：值，为该选项设置一个默认值，参见 default()
defaultDescription：字符串，在帮助内容中使用此描述作为默认值，请参阅 default()
demandOption：布尔或字符串，要求给出的选项，可选的错误消息，请参阅 demandOption()
desc/ describe/ description：字符串，该选项描述的帮助内容，请参阅describe()
global：布尔型，表示在调用命令时不应该重置该键global()
group：字符串，当显示使用说明时，将该选项置于另一个组标题下，请参阅 group()
hidden：不要在帮助输出中显示选项。
implies：字符串或对象，需要设置某些键，请参阅 implies()
nargs：number，指定该选项应该消耗多少个参数，请参阅 nargs()
normalize：布尔型，应用于path.normalize()该选项，请参阅normalize()
number：布尔值，解释选项作为一个数字， number()
requiresArg：布尔值，要求用值指定选项，参见 requiresArg()
skipValidation：布尔型，如果选项存在，则跳过验证，请参阅 skipValidation()
string：布尔型，将选项解释为字符串，请参阅 string()
type：以下字符串之一
'array'：代名词array: true，见array()
'boolean'：代名词boolean: true，见boolean()
'count'：代名词count: true，见count()
'number'：代名词number: true，见number()
'string'：代名词string: true，见string()
*/
//.strict() 不接受未知参数
const CONFIG_GROUP = "Config options:";
var args=yargs.options({
    name:{
        alias:'n',
        requiresArg:false, // true:不能为空值 node exmaple.js --name
        type:"string",
        description:"名称",
       // default:'ff',
        demandOption:false // 必填
    },
	config: {
        type: "string",
        describe: "Path to the config file",
        group: CONFIG_GROUP,
        defaultDescription: "webpack.config.js or webpackfile.js",
        requiresArg: false
    },
    "config-register": {
        type: "array",
        alias: "r",
        describe:
            "Preload one or more modules before loading the webpack configuration",
        group: CONFIG_GROUP,
        defaultDescription: "module id or path",
        requiresArg: true
    },
    "config-name": {
        type: "string",
        describe: "Name of the config to use",
        group: CONFIG_GROUP,
        requiresArg: true
    }
    //强制参数必填
}).demandOption([],'请输入参数').strict().argv;
console.log(args);
// 强制参数必填
//yargs.demandOption(['name'],'请输入参数');

/*
执行默认命令 
command| usage
$0 *
*/
// yargs.usage('$0','默认命令',(yargs)=>{
//     console.log('初始化');
//     yargs.positional('port', {
//         describe: '端口号',
//         type: 'string'
//       }).positional('host', {
//         describe: '主机名',
//         default:'127.0.0.1',
//         type: 'string'
//       }).option('pp',{
//           type:"string"
//       });
// },(argv)=>{
//     console.log('执行：',argv);
// });

// 使用说明
//yargs.usage('$0 --task <taskname>','运行一个任务').argv;

yargs.usage('gulp --t|--task <taskname>').help().argv;
/*
执行默认命令，别名
*/
// yargs.command(['server [port]','$0'],'server命令',(yargs)=>{ 
//     yargs.positional("port",{
//         desc:'端口号',
//         default:'80',
//         type:"number"
//     })
// },(argv)=>{

//     //console.log('执行：');
// }).argv;

// 创建一个命令
// 别名 g
yargs.command(['get <address>','g'],'执行get命令',(yargs)=>{
    yargs.positional("address",{
        desc:'地址',
        default:'80',
        type:"number"
    })

},(argv)=>{

    console.log("地址:"+argv.address);
}).demandCommand(0,'请执行一个命令').argv;//请到至少执行一个命令

//yargs.showHelp();
var argv=yargs.argv;


