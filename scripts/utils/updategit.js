const fs=require('fs');
const child_process=require("child_process");
//node scripts/utils/updategit

async function run(){
    var child=child_process.exec('cd ../ && ls',[],{
         windowsHide:true
        //stdio:"inherit"
    });
    child.on('close',function(){
        console.log('child-close');
    })
    child.on('exit', (code) => {
        console.log(`子进程退出，退出码 ${code}`);
      });
    child.on('error',function(){
        console.log('child-error');
    })
    child.stdout.on('data',(data)=>{
        console.log('data',data.toString());
    })
    child.stderr.on('data',(data)=>{
        console.log('error',data.toString());
    });

}
run();