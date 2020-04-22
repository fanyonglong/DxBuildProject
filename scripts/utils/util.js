const fs = require('fs');
const nodePath = require('path');
const fsp=fs.promises;//nodejs v10.0.0


async function Dir(path){
    //fs.Dir 类 v12.12.0
    //由 fs.opendir()、fs.opendirSync() 或 fsPromises.opendir() 创建。
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      console.log(dirent.name);
    }
}
/**
 *path.format() 方法从对象返回路径字符串。 与 path.parse() 相反。
 *重命名
 * @param {*} path 路径
 * @param {*} fileName 新文件名
 * @param {*} [ext=nodePath.extname(path)] 扩展名
 * @returns 
 * @example 
 * 当为 pathObject 提供属性时，注意以下组合，其中一些属性优先于另一些属性：
    如果提供了 pathObject.dir，则忽略 pathObject.root。
    如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name。
 * pathObject {object}
 *  dir <string>
    root <string>
    base <string>
    name <string>
    ext <string>
 */
function rename(path,fileName=nodePath.basename(path,nodePath.extname(path)),ext=nodePath.extname(path)){
    if(fileName.startsWith('.')){
        ext=fileName;
        fileName=nodePath.basename(path,nodePath.extname(path));
    }
    else if(fileName.indexOf('.')!==-1){
        return nodePath.format({
            root:'/',
            dir:nodePath.dirname(path),
            base:fileName
        });
    }
    return nodePath.format({
        root:'/',
        dir:nodePath.dirname(path),
        name:fileName,
        ext:ext
    });
}
function rename2(path,options){
    options=Object.assign({
        root:process.cwd(),
        basename:nodePath.basename(path,nodePath.extname(path)),
        extname:nodePath.extname(path),
        dirname:nodePath.dirname(path)
    },options||{});
    var filePath=nodePath.resolve(options.dirname,options.basename+options.extname);
    return filePath;
}
function template(source,obj){  
    return source.replace(/{{(.+?)}}/g,function(a,name){
        if(obj[name]){
            return obj[name];
        }
        return a;
    })
}
/**
 *获取文件内容
 * @param {*} path
 * @returns
 */
async function getFile(path){
    let content=await fsp.readFile(path,{
        encoding:"utf8", // utf8 buffer
        withFileTypes:false
    })
    return content;
}
function getFileSync(path){
    let content= fs.readFileSync(path,{
        encoding:"utf8", // utf8 buffer
        withFileTypes:false
    })
    return content;
}
/**
 * 获取目录下面所有文件
 * @param {string} path
 * @returns promise 返回: <string[]> | <Buffer[]> | <fs.Dirent[]>
 */
function getDirAllFiles(path) {
    return new Promise(async (resolve, reject) => {
        try {
            let dirents =await fsp.readdir(path, {
                withFileTypes: true,
                encoding: "utf8"
            });
             dirents.reduce(function (p, d) {
                let absPath = nodePath.resolve(path, d.name);
                return p.then(async (files) => {
                    if (d.isDirectory()) {
                        return getDirAllFiles(absPath);
                    } else if (d.isFile()) {
                        return files.concat(absPath);
                    }
                    return files;
                })
            }, Promise.resolve([])).then(resolve,reject);
    
        } catch (e) {
            reject(e);
        }
    })
}
  
/**
 *获取当前路径下所有目录
 *
 * @param {*} path
 */
function getCurrentPathDirs(path,join=true){
    return fs.readdirSync(path,{
        encoding:"utf8",
        withFileTypes:true
    }).filter(d=>d.isDirectory()).map(d=>join?nodePath.join(path,d.name):d.name);
}
function mkdirExists(path){
    let dirname=nodePath.dirname(path);
    if(!fs.existsSync(dirname)){
        fs.mkdirSync(dirname,{recursive:true});
    }
}
function writeFile(path,data,options={encoding:'utf8'}){
    mkdirExists(path)
    return new Promise((resolve,reject)=>{
        fsp.writeFile(path,data,options,function(error){
            if(error){
                reject(error)
                return;
            }
            resolve();
        })
    })
}

 function stat(path,options={}){
    return new Promise((resolve,reject)=>{
        if(!fs.existsSync(path)){
            reject('路径不存在');
            return;
        }
        fs.stat(path,{...options},(error,stats)=>{
            if(error){
                reject(error)
                return;
            }
            resolve(stats);
        })
    })
}
/**
 * 删除目录
 * @param {*} path
 * @param {*} [options={}]
 * @param {*} callback
 * @returns
 */
function rmdir(path,options={}){
    return new Promise(async (resolve,reject)=>{
        let stats=await stat(path);
        if(!stats.isDirectory()){
            reject('不是目录')
            return;
        }
        fs.rmdir(path,{
            recursive:true,
            maxRetries:0,//重试的次数
            retryDelay:100, //重试之间等待的时间
            ...options
        },function(error){
            if(error){
                reject(error)
                return;
            }
            resolve();
        })
    })
}



/**
 fs.constants.COPYFILE_EXCL - 如果 dest 已存在，则拷贝操作将失败。
fs.constants.COPYFILE_FICLONE - 拷贝操作将尝试创建写时拷贝（copy-on-write）链接。如果平台不支持写时拷贝，则使用后备的拷贝机制。
fs.constants.COPYFILE_FICLONE_FORCE - 拷贝操作将尝试创建写时拷贝链接。如果平台不支持写时拷贝，则拷贝操作将失败。
 * @param {*} src
 * @param {*} dest
 * @param {number} [flags=0]
 */
function copyFileSync(src,dest,flags=0){
    return fs.copyFileSync(src,dest,flags)
}
exports.copyFileSync=copyFileSync;
exports.getFileSync=getFileSync;
exports.getFile=getFile;
exports.getDirAllFiles = getDirAllFiles;
exports.rename=rename;
exports.template=template;
exports.writeFile=writeFile;
exports.getCurrentPathDirs=getCurrentPathDirs;
exports.rmdir=rmdir;