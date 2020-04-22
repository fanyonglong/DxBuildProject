/*
初始化包
*/
const fs=require('fs');
const nodePath=require('path');
const stream=require('stream');
const zlib = require('zlib');
const {getDirAllFiles,rename}=require('./utils/util');
const {getPackages}=require('./utils/packages');


/**
 * 生成包初始文件
 */
function buildPackageInitFile(){

}
function init(){
    let pkgs=getPackages();
    pkgs.forEach((pkg)=> {
        let packageJsonPath=nodePath.join(pkg,'package.json');
        let packageJson={

        }
        if(!fs.existsSync(packageJsonPath)){
            fs.writeFileSync(packageJsonPath,JSON.stringify(packageJson,null,2),{
                encoding:"utf8"
            })
        }
    });
}

/*
在 Node.js 中有四种基本的流类型：
Readable（可读流），
Writable（可写流），
Duplex（双向流），
Transform（转换流）。
*/

function readFileStream(){
   return new Promise(function(resolve,reject){
    // 默认暂停模式
    let readStream=fs.createReadStream(nodePath.resolve(__dirname,'../package.json'),{
        encoding:"utf8" // 把数据以字符串返回
    });
    let result='';
    // 切换到流动模式，开始读取数据，,拼接块数据
    readStream.on('data',function(chunk){
        result+=chunk;
    })
    readStream.on('end',function(){
        resolve(result);
    });
    readStream.on('error',function(){
        reject();
    });
   })
}


function writeFileStream(){
    return new Promise(function(resolve,reject){
       
        let writePath=nodePath.resolve(__dirname,'../temp/test.txt');
        if(!fs.existsSync(writePath)){
            fs.mkdirSync(nodePath.dirname(writePath),{recursive:true})
        }
        let writeStream=fs.createWriteStream(writePath,{
            encoding:"utf8"
        });

        writeStream.on('error',function(){
            reject('写入报错');
        })
        writeStream.on('finish', () => {
            //console.error('写入已完成');
            resolve();
        });
        let i=1000;
        function write(){
            let writeResult=true;
            while(i-->0&&writeResult){
                writeResult=writeStream.write((1000-i)+'\n')
            }
            if(i>0){
                  // 被提前中止。
                // 当触发 'drain' 事件时继续写入。
                writer.once('drain', write);
           }else{
                writeStream.end()
           }
        }
        write();
     
    });
}

function writeFileStreamPipe(){
    return new Promise(function(resolve,reject){
        let readPath=nodePath.resolve(__dirname,'../package.json');
        if(!fs.existsSync(readPath)){
            reject('文件不存在');
            return;
        }
        // 默认暂停模式
        let readStream=fs.createReadStream(readPath,{
            encoding:"utf8" // 把数据以字符串返回
        });
        let writePath=nodePath.resolve(__dirname,'../temp/package.json');
        if(!fs.existsSync(writePath)){
            fs.mkdirSync(nodePath.dirname(writePath),{recursive:true})
        }
        let writeStream=fs.createWriteStream(writePath,{

        });
        writeStream.on('pipe',function(){
            console.log('写入')
        })
        writeStream.on('error',function(){
            reject('写入报错');
        })
        writeStream.on('finish', () => {
            console.error('写入已完成');
            resolve();
          });
        readStream.pipe(writeStream);
        // readStream.on('end',function(){
        //     //resolve();
        // });
        readStream.on('error',function(){
            reject('读取报错');
        });
    });
}

function writeFileStreamPipe2(){
    return new Promise(function(resolve,reject){
        let readPath=nodePath.resolve(__dirname,'../package.json');
        if(!fs.existsSync(readPath)){
            reject('文件不存在');
            return;
        }
        // 默认暂停模式
        let readStream=fs.createReadStream(readPath,{
            encoding:"utf8" // 把数据以字符串返回
        });
        let writePath=nodePath.resolve(__dirname,'../temp/package.json');
        if(!fs.existsSync(writePath)){
            fs.mkdirSync(nodePath.dirname(writePath),{recursive:true})
        }
        let writeStream=fs.createWriteStream(writePath,{

        });
        let custTransform=new stream.Transform({
            encoding:"utf-8",
            transform(chunk,encoding,callback){
             console.log(chunk)
             //console.log('transform',encoding)
                callback(null,chunk.slice(0,-2)+',"test":{}}')
            }
        });
        custTransform.setEncoding('utf8');
        custTransform.setDefaultEncoding('utf8')
        stream.pipeline(readStream,custTransform,writeStream,function(error){
            if(error){
                 reject('写入错误'+error)
                return;
            }
            resolve();
        })
    });
}
function writeFileStreamPipe3(){
    return new Promise(function(resolve,reject){
        var charCode=65;
        // 默认暂停模式
        let readStream=new stream.Readable({
            encoding:'utf8',
            read(size){
                this.push(String.fromCharCode(charCode++),'utf8');
                if(charCode>90){
                    this.push(null);
                }
            }
        });
        let writePath=nodePath.resolve(__dirname,'../temp/test_readable.txt');
        if(!fs.existsSync(writePath)){
            fs.mkdirSync(nodePath.dirname(writePath),{recursive:true})
        }
        let writeStream=fs.createWriteStream(writePath,{

        });
        let custTransform=new stream.Transform({
            encoding:"utf8",
            transform(chunk,encoding,callback){
             console.log(chunk)
             //console.log('transform',encoding)
                callback(null,chunk)
            }
        });
        //custTransform.setEncoding('utf8');
       //custTransform.setDefaultEncoding('utf8')
       //process.stdin.pipe(,zlib.createGzip())
        stream.pipeline(readStream,custTransform,writeStream,function(error){
            if(error){
                 reject('写入错误'+error)
                return;
            }
            resolve();
        })
    });
}
function readFileStream2(){
    let {Writable,Readable,Duplex,PassThrough,Transform,pipeline,Stream}=stream;
    return new Promise(function(resolve,reject){
     // 默认暂停模式
     let readStream=fs.createReadStream(nodePath.resolve(__dirname,'../package.json'),{
         encoding:"utf8" // 把数据以字符串返回
     });
     let result='';
    });
 }

 writeFileStreamPipe3().then(()=>{
     console.log('成功')
 }).catch((m)=>{
     console.log(m)
 });
