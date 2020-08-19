//node scripts/tests/commander
const {program}=require('commander');
const yargParser=require('yargs-parser');

//testcommand4()
//testcommand3()
//console.log(process.argv.slice(2))
console.log(yargParser(process.argv.slice(2),{
  alias:{
    dist:['d'],
    env:['e'],
    ops:['o']
  },
  coerce:{
    do(arg){
      console.log(typeof arg)
      return Object.assign({age:43,name:"f"},arg) 
    }
  },
  configObjects:[{x:43,y:33}],
  default:{
    dist:'./dist',
    ops:{},
    do:{
      base:"./",
      age:1
    }
  },
  array:['aa'],
 // narg:{do:2}
}));
/*
yargs-parser
expects:

args: a string or array of strings representing the options to parse.
opts: provide a set of hints indicating how args should be parsed:
opts.alias: an object representing the set of aliases for a key: {alias: {foo: ['f']}}.
opts.array: indicate that keys should be parsed as an array: {array: ['foo', 'bar']}.
Indicate that keys should be parsed as an array and coerced to booleans / numbers:
{array: [{ key: 'foo', boolean: true }, {key: 'bar', number: true}]}.
opts.boolean: arguments should be parsed as booleans: {boolean: ['x', 'y']}.
opts.coerce: provide a custom synchronous function that returns a coerced value from the argument provided (or throws an error). For arrays the function is called only once for the entire array:
{coerce: {foo: function (arg) {return modifiedArg}}}.
opts.config: indicate a key that represents a path to a configuration file (this file will be loaded and parsed).
opts.configObjects: configuration objects to parse, their properties will be set as arguments:
{configObjects: [{'x': 5, 'y': 33}, {'z': 44}]}.
opts.configuration: provide configuration options to the yargs-parser (see: configuration).
opts.count: indicate a key that should be used as a counter, e.g., -vvv = {v: 3}.
opts.default: provide default values for keys: {default: {x: 33, y: 'hello world!'}}.
opts.envPrefix: environment variables (process.env) with the prefix provided should be parsed.
opts.narg: specify that a key requires n arguments: {narg: {x: 2}}.
opts.normalize: path.normalize() will be applied to values set to this key.
opts.number: keys should be treated as numbers.
opts.string: keys should be treated as strings (even if they resemble a number -x 33).
*/

//console.log(program.parseOptions(process.argv))
function testcommand(){
    program
    .option('-n,--name <string>','名称')
    .command('show <info> [files...]').action(function(info,files){
        console.log('show',info,files)     
    })
    program.parse(process.argv);
    console.log(program.opts())
}
function testcommand2(){
    program
    .command('rm <dir>')
    .option('-r, --recursive', 'Remove recursively')
    .action(function (dir, cmdObj) {
      console.log('remove ' + dir + (cmdObj.recursive ? ' recursively' : ''))
    })
    program.parse(process.argv);
    console.log(program.opts())
}
function testcommand3(){
    program
    .command('show <dir>')
    .option('-a, --age [boolean]', '名称')
    .action(function (dir, cmdObj) {
      console.log('show',dir,cmdObj.age)
    })
    program.parse(process.argv);
    console.log(program.opts())
}
function testcommand4(){
    program
    .command('show [dir]')
    .option('-a, --age [boolean]', '名称')
    .action(function (dir, cmdObj) {
      console.log('show',dir,cmdObj.age)
    })
    program.parse(process.argv);
    console.log(program.opts())
}
function base(){
    pro
    .option('-b,--boolean <boolean>','布尔',true)
    .option('--no-boolean','输入布尔')
    .option('-d,--def <default>','数字')
    .option('-s,--string [string]','字符串','a')
    .option('-n,--number [number]','数字',(v,previous)=>parseInt(v),'10')
    .option('-c,--cheese <flavour>', 'cheese flavour', 'mozzarella')
    .option('--no-cheese', 'plain with no cheese')
    .requiredOption('-r,--requied [number]','必填');
    program.parse(process.argv);
    console.log(program.opts())

}