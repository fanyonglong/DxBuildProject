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
let template=(function template() {
  
    var invert = function (obj) {
        var result = {};
        for (var name in escapeMap) {
            if (escapeMap.hasOwnProperty(name)) {
                result[escapeMap[name]] = name;
            }
        }
        return result;
    }
    // List of HTML entities for escaping.
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = invert(escapeMap);

    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function (map) {
        var escaper = function (match) {
            return map[match];
        };
        // Regexes for identifying a key that needs to be escaped
        var source = '(?:' + Object.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function (string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    var _util = {
        escape: createEscaper(escapeMap),
        unescape: createEscaper(unescapeMap)
    }
    var parseTemplate = function (str) {
        var err = "";
        try {
            var func;
                var strFunc =
                "var p=[];with(obj){p.push('" +
                str.replace(/[\r\t\n]/g, " ")
                   .replace(/'(?=[^#]*#>)/g, "\t")
                   .split("'").join("\\'")
                   .split("\t").join("'")
                   .replace(/<%=(.+?)%>/g, "',$1,'")
                   .replace(/<%-(.+?)%>/g, "',_.escape($1),'")
                   .split("<%").join("');")
                   .split("%>").join("p.push('")
                   + "');}return p.join('');";
                func = new Function("obj",'_', strFunc);
                return function (data) {
                    return func.call(this, data, _util)
                }
        } catch (e) { err = e.message; }
        return "< # ERROR: " + err.htmlEncode() + " # >";
    }
    return parseTemplate;
 }());
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
function writeFileSync(path,data,options={}){
    mkdirExists(path)
    return fs.writeFileSync(path,data,{encoding:'utf8',...options})
}
function writeFile(path,data,options={}){
    mkdirExists(path)
    return new Promise((resolve,reject)=>{
        fsp.writeFile(path,data,{encoding:'utf8',...options},function(error){
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

// 当 flag 选项采用字符串时，可用以下标志：
var flags={
'a'  :'a'  ,   //- 打开文件用于追加。如果文件不存在，则创建该文件。
'ax' :'ax' ,   //- 与 'a' 相似，但如果路径已存在则失败。
'a+' :'a+' ,   //- 打开文件用于读取和追加。如果文件不存在，则创建该文件。
'ax+':'ax+',   //- 与 'a+' 相似，但如果路径已存在则失败。
'as' :'as' ,   //- 以同步模式打开文件用于追加。如果文件不存在，则创建该文件。
'as+':'as+',   //- 以同步模式打开文件用于读取和追加。如果文件不存在，则创建该文件。
'r'  :'r'  ,   //- 打开文件用于读取。如果文件不存在，则出现异常。
'r+' :'r+' ,   //- 打开文件用于读取和写入。如果文件不存在，则出现异常。
'rs+':'rs+',   //- 以同步模式打开文件用于读取和写入。指示操作系统绕过本地的文件系统缓存。
        //    这对于在 NFS 挂载上打开文件时非常有用，因为它允许跳过可能过时的本地缓存。 它对 I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。
        //    这不会将 fs.open() 或 fsPromises.open() 转换为同步的阻塞调用。 如果需要同步的操作，则应使用 fs.openSync() 之类的。
'w'  :'w'  ,   //- 打开文件用于写入。如果文件不存在则创建文件，如果文件已存在则截断文件。
'wx' :'wx' ,   //- 与 'w' 相似，但如果路径已存在则失败。
'w+' :'w+' ,   //- 打开文件用于读取和写入。如果文件不存在则创建文件，如果文件已存在则截断文件。
'wx+':'wx+',   //- 与 'w+' 相似，但如果路径已存在则失败。
}
/**
 * 
 * @param {string} path 
 * @param {object} options 
 * 如果 autoClose 设置为 true（默认的行为），
 * 则在 'error' 或 'finish' 事件时文件描述符将会被自动地关闭。
 *  如果 autoClose 为 false，则即使出现错误，文件描述符也不会被关闭。 应用程序负责关闭它并确保没有文件描述符泄漏。
 *  flags <string> 参阅支持的文件系统标志。默认值: 'w'。
    encoding <string> 默认值: 'utf8'。
    fd <integer> 默认值: null。
    mode <integer> 默认值: 0o666。
    autoClose <boolean> 默认值: true。
    emitClose <boolean> 默认值: false。
    start <integer>
    fs <Object> | <null> 默认值: null。
 */
function createWriteStream(path,options={}){
    return fs.createWriteStream(path,options);
}


exports.writeFileSync=writeFileSync;
exports.copyFileSync=copyFileSync;
exports.getFileSync=getFileSync;
exports.getFile=getFile;
exports.getDirAllFiles = getDirAllFiles;
exports.rename=rename;
exports.template=template;
exports.writeFile=writeFile;
exports.getCurrentPathDirs=getCurrentPathDirs;
exports.rmdir=rmdir;