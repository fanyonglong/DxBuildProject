const fs=require('fs');
const child_process=require("child_process");
//node scripts/utils/updategit

async function run(){
    try{
    var child=child_process.execSync('cd ./g && git pull');
    console.log('pull成功')
    }catch(e){
        console.log('失败')
    }
}
run();