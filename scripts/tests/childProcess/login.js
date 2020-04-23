let {fork,spawn}=require('../../utils/process');
let child_process=require('child_process')

//node scripts/tests/childProcess/login.js


fork(require.resolve('./logincmd'),[],{
    stdio:"pipe"
},function(subProcess){

    // subProcess.stdout.on('readable', function() {
    //     // 有数据可读取。
    //     let data;
      
    //     while (data = this.read()) {
    //       console.log(data.toString());
    //     }
    //     console.log('ff')
    //   });
    subProcess.stdout.on('data',chunk=>{
        let msg=chunk.toString();
        process.stdout.write(chunk+'\n');
        if(msg.indexOf('请输入用户名')!=-1){
            //console.log('正在输入用户名');
            subProcess.stdin.write('lisha\n','utf8');

        }

    })

});
// spawn(process.platform === "win32" ? "npm.cmd" : "npm",['login'],{
//     //stdio:['pipe','pipe','ignore']
// });
// console.log('哈哈')