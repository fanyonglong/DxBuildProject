

var yargs=require('yargs');


// var argv = yargs
//   .usage('$0 <mss> <f>', 'the default command', (yargs) => {
//     yargs.options({
//       mss:{
//         type:"string",
//         describe:"信息"
//       }
//     });
//     console.log('1111111');
//   }, (argv) => {
//     console.log('this command will be run by default')
//   }).argv;

// 默认命令
// var argv =yargs
//   .command('$0 <port>', 'start the application server', (yargs) => {
//     yargs.positional('port', {
//       describe: 'the port that your application should bind to',
//       type: 'number'
//     })
//   }).argv

// var argv = yargs
//   .command('run <port> <guid>', 'run the server').help().argv

var argv=yargs.help('info').version('2.0.1').boolean('prod').options({
  size:{
    type:'string',
    describe: '请选择符合尺寸',
    choices: ['xs', 's', 'm', 'l', 'xl'],
    default:"s"
  },
  name:{
   // config:true, 将JSON文件转换为argv
 //   type:'string',
    describe: '请输入名称'
  },
  "x-age":{
    type:'number',
    describe: '请输入年龄'
  },
  age:{
    type:'number',
    skipValidation:true,
    
    describe: '请输入年龄'
  },
  "progress": {
		type: "boolean",
		describe: "编译进度",
		group: 'start options'
  },
  "debug": {
		type: "boolean",
		describe: "调试",
		group: 'start options'
  },
  "http-only":{
    type: "boolean"
  }
}).usage("$0 -operand1 number -operand2 number -operation [add|subtract]").usage("test 4.3.2\n" +
"Usage: https://webpack.js.org/api/cli/\n" +
"Usage without config file: test <entry> [<entry>] <output>\n" +
"Usage with config file: test")
.usage('webpack 2.0.1\n使用：webpack <file> [<file>]').command('$0 <task>','任务',{},argv=>{
    console.log('任务'+argv.task);
}) .command(['start [app]', 'run', 'up'], 'Start up an app', {}, (argv) => {
  console.log('starting up the', argv.app || 'default', 'app')
})
.command({
  command: 'configure <key> [value]',
  aliases: ['config', 'cfg'],
  desc: 'Set a config variable',
  builder: (yargs) => yargs.default('value', 'true'),
  handler: (argv) => {
    console.log(`setting ${argv.key} to ${argv.value}`)
  }
}).command('build <port | po> [host] [file..]','编译服务',(yargs)=>{
  yargs.positional('port', {
    describe: '端口号',
    type: 'number',
    default: 0
  }).positional('host', {
    describe: '主机'
  })

}).completion('completion', function(current, argv, done) {
  setTimeout(function() {
    done([
      'apple',
      'banana'
    ]);
  }, 500);
}).example('start','请输start').demandCommand(1,'请运行一个服务').global('age',false).wrap(null).argv;


console.log(argv);

/**
 * demandCommand 至少要运行一个命令 
// command
//默认命令
//要指定默认命令，请使用字符串*或$0。如果提供的位置参数不匹配已知命令，则将运行默认命令。tldr; 默认命令允许您使用类似于子命令的API来定义应用程序的入口点。
//命令可以接受可选和必需的位置参数。所需的位置参数采取形式<foo>，可选参数采取形式[bar]。解析后的位置参数将填充在 argv：
//最后一个位置参数可以通过使用..运算符来选择性地接受一个值的数组：
**/


/***
 * positional:
alias：字符串或字符串数​​组，请参阅 alias()
choices：值或值数组，请将有效的选项参数限制到预定义的集合，请参阅 choices()
coerce：函数，强制或将解析的命令行值转换为另一个值，请参阅 coerce()
conflicts：字符串或对象，需要某些键不被设置，请参阅 conflicts()
default：值，为该选项设置一个默认值，参见 default()
desc/ describe/ description：字符串，该选项描述的帮助内容，请参阅describe()
implies：字符串或对象，需要设置某些键，请参阅 implies()
normalize：布尔型，应用于path.normalize()该选项，请参阅normalize()
type：以下字符串之一
'boolean'：代名词boolean: true，见boolean()
'number'：代名词number: true，见number()
'string'：代名词string: true，见string()
 * 
*/

/**options(value):
 * 
alias：字符串或字符串数​​组，规范选项键的别名，请参阅 alias()
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
demandOption：布尔或字符串，要求给出的选项，可选的错误消息，请参阅 demandOption() 必项选
desc/ describe/ description：字符串，该选项描述的帮助内容，请参阅describe()
global：布尔型，表示在调用命令时不应该重置该键global()
group：字符串，当显示使用说明时，将该选项置于另一个组标题下，请参阅 group()
hidden：不要在帮助输出中显示选项。
implies：字符串或对象，需要设置某些键，请参阅 implies()
nargs：number，指定该选项应该消耗多少个参数，请参阅 nargs()
normalize：布尔型，应用于path.normalize()该选项，请参阅normalize()
number：布尔值，解释选项作为一个数字， number()
requiresArg：布尔值，要求用值指定选项，参见 requiresArg()可以不用设置，但是设置就必须指定值
skipValidation：布尔型，如果选项存在，则跳过验证，请参阅 skipValidation()
string：布尔型，将选项解释为字符串，请参阅 string()
type：以下字符串之一, 转换值类型
  'array'：代名词array: true，见array()
  'boolean'：代名词boolean: true，见boolean()
  'count'：代名词count: true，见count()
  'number'：代名词number: true，见number()
  'string'：代名词string: true，见string()
 * 
*/

return;
var argv_y=yargs.argv;// or var argv_y=yargs.parse(); 调用.parse()不带参数等效于调用yargs.argv：
// 解析普通参数
console.log(argv_y.name);
console.log(argv_y.age);

// 转换process.argv ,重置yargs.argv
var argv=yargs(process.argv).argv; //or var argv=yargs.parse(process.argv)
console.log(argv.x);
//console.log(process.argv);
// 别名设置,可以传递key和别名
yargs.alias("name","yname");
console.log(yargs.argv.yname);

//node yargs-example.js --name 432432 --age 34 --x 444 --list 432 1 12
//告诉解析器解释key为一个数组。如果.array('foo')被设置，
// --foo foo bar将被解析为['foo', 'bar']而不是'foo'。另外，如果多次使用该选项，则所有值都将在一个数组中平展，因此--foo foo --foo bar将被解析为['foo', 'bar']
yargs.array('list');
console.log(yargs.argv.list);

//将有效值限制为key预定义的一组值，以choices数组或单个值的形式给出。
var argv =yargs
  .alias('i', 'ingredient')
  .describe('i', 'choose your sandwich ingredients')
  .choices('i', ['peanut-butter', 'jelly', 'banana', 'pickles'])
  .argv;

  console.log(argv.ingredient);
  var argv =yargs
  .option('size', {
    alias: 's',
    describe: 'choose a size',
    choices: ['xs', 's', 'm', 'l', 'xl'],
    default:'xs'
  }). //['src','dist',path.resolve],{json:JSON.parse,data:Date.parse}
  coerce('size',function(a){
      return 's';// 提供一个同步函数来强制或转换命令行给定的值key。
  })
  .argv;

  console.log(argv.s);
// 计算参数数量
  var argv=yargs.count('count').describe('count','543543543534').argv
  console.log(argv);

//   var argv = yargs.command('$0', 'the default command',{test:{
//   type:String,
//   default:"44"
// }}).help().argv;

// // // 当执行了get ,然后才会执行第三个个参数
// var argv=yargs
//   .command('get', 'make a get HTTP request', {
//     url: {
//       alias: 'u',
//       default: 'http://yargs.js.org/'
//     }
//   })
//   .help()
//   .argv


  // var argv=yargs.command('get <username|email> [password]', 'fetch a user by username or email.')
  // .help()
  // .argv

  //console.log(argv);
// yargs.usage('$0 <cmd> [args]')
// .command('hello [name]', 'welcome ter yargs!', () => {
//   yargs.positional('name', {
//     type: 'string',
//     default: 'Cambi',
//     describe: 'the name to say hello to'
//   })
// }, function (argv) {
//   console.log('hello', argv.name, 'welcome to yargs!')
// })
// .help()
// .argv
/**
 * 创建:npm 插件
 * myapp/
├─ cli.js
└─ cmds/
   ├─ init.js
   ├─ remote.js
   └─ remote_cmds/
      ├─ add.js
      └─ prune.js
cli.js:

#!/usr/bin/env node
require('yargs')
  .commandDir('cmds')
  .demandCommand()
  .help()
  .argv
cmds/init.js:

exports.command = 'init [dir]'
exports.desc = 'Create an empty repo'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  console.log('init called for dir', argv.dir)
}
cmds/remote.js:

exports.command = 'remote <command>'
exports.desc = 'Manage set of tracked repos'
exports.builder = function (yargs) {
  return yargs.commandDir('remote_cmds')
}
exports.handler = function (argv) {}
cmds/remote_cmds/add.js:

exports.command = 'add <name> <url>'
exports.desc = 'Add remote named <name> for repo at url <url>'
exports.builder = {}
exports.handler = function (argv) {
  console.log('adding remote %s at url %s', argv.name, argv.url)
}
cmds/remote_cmds/prune.js:

exports.command = 'prune <name> [names..]'
exports.desc = 'Delete tracked branches gone stale for remotes'
exports.builder = {}
exports.handler = function (argv) {
  console.log('pruning remotes %s', [].concat(argv.name).concat(argv.names).join(', '))
}
 * 
*/