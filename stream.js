const glob=require('glob');
const path=require('path');
const fs=require('fs');

const {Writable,Readable,Transform,Duplex,pipeline  }=require('stream');
const through2 = require('through2');

let readable=fs.createReadStream(path.resolve(__dirname,'temp/kendo/js/kendo.all.min.js.map'),{
    flags:'r',// <string> 参阅支持的文件系统标志。默认值: 'r'。
    encoding:null,// <string> 默认值: null。
    fd:null,// <integer> 默认值: null。
    mode:0o666,// <integer> 默认值: 0o666。
    autoClose:true,// <boolean> 默认值: true。
    start:0,// <integer>
    end:Infinity,// <integer> 默认值: Infinity。
    highWaterMark:16*1024,// <integer> 默认值: 64 * 1024。
});


class CustTransform extends Transform {
    constructor(options){
        super(options);
        this._transform=options.transform;
        if(options.flush){
        this._flush=options.flush;
        }
    }

}
// readable.pipe(through2(function(chunk,encoding,callback){
//     console.log('f');
//     callback(null,chunk)
// },function(callback){
//     console.log('f-complete');
//     callback()
// }))
readable.pipe(new Transform({
    transform:function(chunk,encoding,callback){
        console.log('a');
        callback(null,chunk)
    },
    flush:function(callback){
        console.log('a-complete');
        callback();
    }
}).on('data',function(d){
    console.log('a-data',d)
})).pipe(new Transform({
    transform:function(chunk,encoding,callback){
        console.log('b')
        callback(null,chunk)
    },
    flush:function(callback){
        console.log('b-complete');
        callback();
    }
})).pipe(new CustTransform({
    transform:function(chunk,encoding,callback){
        console.log('c')
        callback(null,chunk)
    },
    flush:function(callback){
        console.log('c-complete');
        callback();
    }
}) )

// readable.pipe(new Transform({
//     transform:function(chunk,encoding,callback){
//         console.log('d');
//         callback(null,chunk)
//     },
//     flush:function(callback){
//         console.log('d-complete');
//         callback();
//     }
// }))