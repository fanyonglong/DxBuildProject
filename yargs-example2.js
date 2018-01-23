// args 共享
var argv=require('yargs').boolean('ug').
command('$0 <input> <out>').options({
    outType:{
        type:'string',
        choices: ['xs', 's', 'm', 'l', 'xl'],
        default:"s"
    }
}).argv;

console.log(argv);

process.chdir('src');
console.log(`New directory: ${process.cwd()}`);