/**还原map文件***/
const fs = require('fs');
const path = require('path');
const through2 = require('through2');
const del = require('del');
const buffer = require('buffer');
const glob = require('glob');
const sourceMap = require('source-map');
function clearDic(cb) {
    del(['./dist/kendo/**', '!./dist/kendo']).then((paths) => {
        cb();
    });
}

function build() {
    clearDic(() => {
        return glob('./temp/kendo/js/kendo.all.min.js.map', (error, files) => {
            console.log('f',files);
   
            let root = process.cwd();
            //console.log(files.map(d=>path.resolve(process.cwd(),d)));
            // return;
            files.forEach((filePath) => {
                fs.createReadStream(path.resolve(root, filePath), {
                    //   encoding:"buffer"
                }).pipe(through2(function (chunk, enc, callback) {        
                    console.log('read')        
                    callback(null, chunk);
                },function(callback,a){
                    console.log('COMPLETE',this)
                    callback();
                    return;
                    // console.log(chunk.toString(),enc)
                    // callback(null)
                    // return;
                    callback(null,chunk);
                    var content = chunk.toString('utf8');//.replace(/\/\*![\s\S]+\*\//,''); //base64 utf-8 buffer
                    try{    
                        let jsonObj=JSON.parse(content)
                    }catch(e){
                        console.log('json-error')
                    }
                    try {
                        const consumer = new sourceMap.SourceMapConsumer(content);

                        if (consumer.hasContentsOfAllSources()) {

                            if (consumer.sources.length > 0) {

                                var fileName = consumer.sources[0];
                               // console.log('consumer',fileName, filePath)
                                const fileSource = consumer.sourceContentFor(fileName);
                               // fileSource = fileSource.replace(/^\/\*![\s\S]+\*\//, '')
                                //  chunk.path=path.join(path.dirname(chunk.path),fileName);
                                chunk = Buffer.from(fileSource, enc);


                            }
                        } else {
                            console.log('没有源', filePath)
                        }
                    } catch (e) {
                        console.log('catch', filePath)
                    }
                })).pipe(through2(function(chunk,encoding,callback){
                    console.log('c')
                    callback(null,chunk)
                })).pipe(fs.createWriteStream(path.resolve(root, './dist/kendo', path.basename(filePath.replace('.min.js.map', '.js')))))
            })

        })
    });

}

function build2() {
    clearDic(() => {
        return glob('./temp/kendo/js/kendo.*.map', (error, files) => {
           // console.log('f',files);
   
            let root = process.cwd();
            //console.log(files.map(d=>path.resolve(process.cwd(),d)));
            // return;
            files.forEach((filePath) => {
                fs.readFile(path.resolve(root,filePath),function(err,data){
                    if(err){
                        return;
                    }
                    let content=data.toString();
                    const consumer = new sourceMap.SourceMapConsumer(content);

                    if (consumer.hasContentsOfAllSources()) {

                        if (consumer.sources.length > 0) {

                            var fileName = consumer.sources[0];
                           // console.log('consumer',fileName, filePath)
                            let fileSource = consumer.sourceContentFor(fileName);
                            fileSource = fileSource.replace(/^\/\*![\s\S]+?\*\//, '')
                            //  chunk.path=path.join(path.dirname(chunk.path),fileName);
                            
                            fs.writeFileSync(path.resolve(root, './dist/kendo', path.basename(filePath.replace('.min.js.map', '.js'))),fileSource)
                        }
                    }
                });
            
            });

        })
    });

}
build2();