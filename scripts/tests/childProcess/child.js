let {program}=require('commander');
program.option('-e,--end <number>','结束',(v)=>{
    return parseInt(v);
},1000)
program.parse(process.argv);
let index=0;
console.log('进入child',process.argv)
let id=setInterval(function(){
    console.log(index++);
    if(index>program.end){
        clearInterval(id);
    }
   // process.send(index)
},1000  )
console.log('进入子进程');
process.on('SIGTERM',function(){
    console.log('child','SIGTERM');
    clearInterval(id);
})
process.on('message',function(message){
    console.log('child','message',message);
    //clearInterval(id);
})
//process.stdin.write('进入子进程stdin')
//process.stdout.log('进入子进程2');
//process.send('进入子进程')