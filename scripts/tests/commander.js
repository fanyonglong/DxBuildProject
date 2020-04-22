//node scripts/tests/commander
const {program}=require('commander');
testcommand4()
//testcommand3()
//console.log(process.argv.slice(2))
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