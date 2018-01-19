// args 共享
var argv=require('yargs').boolean('ug').command('$0 <input> <out>').argv;

console.log(argv);

process.chdir('src');
console.log(`New directory: ${process.cwd()}`);