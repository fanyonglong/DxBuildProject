var program = require('commander');
 
// program
// .usage('<command> [options]')
//   .version('0.1.0')
//   .option('-p, --peppers', 'Add peppers')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq-sauce', 'Add bbq sauce')
//   .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble');

//   program.command('setup')
//   .description('run remote setup commands')
//   .action(function() {
//     console.log('setup');
//   });
//   program.command('exec <cmd>')
//   .description('run the given remote command')
//   .action(function(cmd) {
//     console.log('exec "%s"', cmd);
//   });
//   program.command('*')
//   .description('run the given remote command')
//   .action(function(cmd) {
//     console.log('exec "%s"', cmd);
//   });
//   program.parse(process.argv);

//Cannot find module 'E:\fanyonglong2016\project\DxBuildProject\commander.example-build'
program
.usage('<command> [options]')
.option('-c --config <configfile>', 'config file', val => val.split(','))
.command('product','llll')
.command('watch', 'Development mode')
.command('build', 'Production mode')
.parse(process.argv)

console.log(program);