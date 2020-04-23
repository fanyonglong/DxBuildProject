const fs=require('fs');
const stream=require('stream');
const nodePath=require('path');
//node scripts/tests/stream/test.js
test();
function test(){
 // console.log(nodePath.resolve(__dirname,'./tmp.txt'))
   // writeFile();
   //writeFilePipe();
   readFile();
}
function readFile(){
    let filePath=nodePath.resolve(__dirname,'./tmp.txt');
    let readStream=fs.createReadStream(filePath,{
        encoding:"utf8",
        highWaterMark:41
    });
    let i=1;
    readStream.on('readable',function(){
        let chunk,data='';
        // 每次读取两个字节大小
        while(chunk=this.read(2)){
            console.log('readable',chunk+'')
        }
      
    })

}
function writeFilePipe(){
    let filePath=nodePath.resolve(__dirname,'./tmp.txt');
    let writeStream=fs.createWriteStream(filePath,{
        encoding:"utf8",
        highWaterMark:41
    });
    let i=0;
    let readStream=new stream.Readable({
        encoding:"utf8",
        read(){
            this.push(i+++'\n','utf8');
            if(i>10){
                this.push(null);
            }
        }
    });
    readStream.on('readable',function(){
        console.log('readStream-readable');
        let data;
        while((data=this.read())){

        }
    })
    readStream.on('data',function(chunk){
        console.log('readStream-data',chunk+'');
    })
    stream.pipeline(readStream,writeStream,(error)=>{
        if(error){
            console.error('error',error)
            return;
        }
    })
}
function writeFile(){
    let filePath=nodePath.resolve(__dirname,'./tmp.txt');
    let writeStream=fs.createWriteStream(filePath,{
        encoding:"utf8",
        highWaterMark:41
    });
    //如果调用 stream.write(chunk) 返回 false，则当可以继续写入数据到流时会触发 'drain' 事件。
    writeStream.on('drain',function(){
        console.log('drain')
    });
    //如果使用 emitClose 选项创建可写流，则它将会始终发出 'close' 事件。
    writeStream.on('close',function(){
        console.log('close')
    })
    /*
    如果在写入或管道数据时发生错误，则会触发 'error' 事件。 当调用时，监听器回调会传入一个 Error 参数。
    除非在创建流时将 autoDestroy 选项设置为 false，否则在触发 'error' 事件时流会被关闭。
    在 'error' 之后，除 'close' 事件外，不应再触发其他事件（包括 'error' 事件）。
    */
    writeStream.on('error',function(){
        console.log('error')
    });
    //调用 stream.end() 且缓冲数据都已传给底层系统之后触发。
    writeStream.on('finish', () => {
        console.log('finish',writeStream.writableFinished);
    });
    for(var i=0;i<10;i++){
       if(writeStream.write(i+'\n')===false){
         console.log('write false',i);
         break;
       }
    }
    writeStream.end('完成');
    console.log(writeStream.writableFinished);

   // writeStream.close();
}