const child_process=require('child_process');
const event=require('events');

/**
 *  
 *  @typedef {object} CommonOptions
 *  @property {boolean} [windowsHide=false] 隐藏子进程的控制台窗口（在 Windows 系统上通常会创建）。
 *  @property {number} [timeout=0]
*/
/**
 * spawnSync返回对象类型
 * @typedef {object} SyncReturnObj
 * @property {number} pid  - 子进程的 pid。
 * @property {array} output - stdio 输出的结果数组。
 * @property {buffer} stdout  - output[1] 的内容。
*/

function wrapProcess(child,pipe){
    if(pipe){
        return Promise.resolve(child).then(pipe).then(watchProcess.bind(null,child));
    }
    return watchProcess(child);
}
function watchProcess(child){
    return new Promise((resolve,reject)=>{
        child.on('close',function close(code,signal){
            if (code === 1) {
                process.exit(1);
            } else {
                resolve();
            }
        });
        child.on('error',function error(error){
            reject(error);
        });
    })
}

/**
衍生一个 shell 然后在该 shell 中执行 command，并缓冲任何产生的输出。 传给 exec 函数的 command 字符串由 shell 直接处理，特殊字符（因 shell 而异）需要相应地处理：
 * @param {string} command 要运行的命令，并带上以空格分隔的参数。
 * @param {object} [options] 
 * @param {function} [callback] 
 */
function exec(command, options={}, callback,pipe) {
    let child= child_process.exec(command,{
        ...options
    },callback);   
    return wrapProcess(child,pipe)
}
/**
 * child_process.execFile() 函数类似于 child_process.exec()，但默认情况下不会衍生 shell。 相反，指定的可执行文件 file 会作为新进程直接地衍生，使其比 child_process.exec() 稍微更高效。
支持与 child_process.exec() 相同的选项。 由于没有衍生 shell，因此不支持 I/O 重定向和文件通配等行为。
 * @param {string} file  要运行的可执行文件的名称或路径。
 * @param {string[]} [args] 字符串参数的列表。
 * @param {object} [options] 
 * @param {function} [callback] 
 */
function execFile(file,args=[], options={}, callback,pipe) {
    let child= child_process.execFile(file,args,{
        ...options
    },callback);   
    return wrapProcess(child,pipe)
}
/**
 *child_process.spawn() 方法使用给定的 command 衍生一个新进程，并带上 args 中的命令行参数。 如果省略 args，则其默认为一个空数组。
 *如果启用了 shell 选项，则不要将未经过处理的用户输入传给此函数。 包含 shell 元字符的任何输入都可用于触发任意命令的执行
 * @param {string} commdand
 * @param {string[]} [args=[]]
 * @param {object} [options={}]
*/
function spawn(commdand,args=[],options={},pipe){
    let child= child_process.spawn(commdand,args,{
        stdio:"inherit",
        ...options
    });   
    return wrapProcess(child,pipe)
}
/**
 * child_process.fork() 方法是 child_process.spawn() 的一个特例，专门用于衍生新的 Node.js 进程。 与 child_process.spawn() 一样返回 ChildProcess 对象。 返回的 ChildProcess 将会内置一个额外的通信通道，允许消息在父进程和子进程之间来回传递。 详见 subprocess.send()。
记住，衍生的 Node.js 子进程独立于父进程，但两者之间建立的 IPC 通信通道除外。 每个进程都有自己的内存，带有自己的 V8 实例。 由于需要额外的资源分配，因此不建议衍生大量的 Node.js 子进程。
默认情况下， child_process.fork() 将会使用父进程的 process.execPath 来衍生新的 Node.js 实例。 options 对象中的 execPath 属性允许使用其他的执行路径。
 * @param {string} modulePath   要在子进程中运行的模块。
 * @param {string[]} [args=[]] 字符串参数的列表。
 * @param {object} [options=[]] 
 */
function fork(modulePath,args=[],options={},pipe){
    let child= child_process.fork(modulePath,args,{
        stdio:"inherit",
        ...options
    });   

    return wrapProcess(child,pipe)
}

/**
 * child_process.execFileSync() 方法通常与 child_process.execFile() 相同，
 * 但该方法在子进程完全关闭之前不会返回。 当遇到超时并发送 killSignal 时，该方法也需等到进程完全退出后才返回。
如果子进程拦截并处理了 SIGTERM 信号但未退出，则父进程仍将等待子进程退出。
如果进程超时或具有非零的退出码，则此方法将抛出一个 Error，其中包含底层 child_process.spawnSync() 的完整结果。
如果启用了 shell 选项，则不要将未经过处理的用户输入传给此函数。 包含 shell 元字符的任何输入都可用于触发任意命令的执行。
 * @param {string} file 要运行的可执行文件的名称或路径。
 * @param {string[]} [args=[]] 字符串参数的列表。
 * @param {obejct} [options={}]
 * @returns {promise}
 */
function execFileSync(file, args=[], options={}){
   return new Promise((resolve,reject)=>{
        try{
            //{Buffer|string} stdout
            let stdout = child_process.execFileSync(file, args, {
                stdio:"inherit",// <string> | <Array> 子进程的 stdio 配置。默认情况下，除非指定了 stdio，否则 stderr 将会被输出到父进程的 stderr。默认值: 'pipe'。
                ...options
            });
            resolve(stdout);
        }catch(e){
            reject(e);
        }
   })
}

/**
 * child_process.spawnSync() 方法通常与 child_process.spawn() 相同，但在子进程完全关闭之前该函数不会返回。 当遇到超时并发送 killSignal 时，该方法也需等到进程完全退出后才返回。 如果进程拦截并处理了 SIGTERM 信号但未退出，则父进程将会等待直到子进程退出。
 * @param {string} command 要运行的命令。
 * @param {string[]} [args=[]] 字符串参数的列表。
 * @param {{cwd:string}} [options={}]
 * @returns {Promise} resolve(stdout)
*/
function spawnSync(command, args, options={}){
    return new Promise((resolve,reject)=>{
         try{
             let result = child_process.spawnSync(command, args, {
                 stdio:"inherit",// <string> | <Array> 子进程的 stdio 配置。默认情况下，除非指定了 stdio，否则 stderr 将会被输出到父进程的 stderr。默认值: 'pipe'。
                 ...options
             });
             if(result.error){
                reject(result.error);
            }else{
                resolve(result);
            }
         }catch(e){
             reject(e);
         }
    })
 }

 /**
 *  方法通常与 child_process.exec() 相同，但该方法在子进程完全关闭之前不会返回。
 *  当遇到超时并发送 killSignal 时，该方法也需等到进程完全退出后才返回。
 *  如果子进程拦截并处理了 SIGTERM 信号但未退出，则父进程将会等待直到子进程退出。
如果进程超时或具有非零的退出码，则此方法将会抛出错误。 Error 对象将会包含 child_process.spawnSync() 的完整结果。
切勿将未经过处理的用户输入传给此函数。 包含 shell 元字符的任何输入都可用于触发任意命令的执行。
 * @param {string} command  要运行的命令。
 * @param {object} [options={}] 
 * @returns {Promise}
 */
function execSync(command, options={}){
    return new Promise((resolve,reject)=>{
        try{
            //{Buffer|string} stdout
            let stdout = child_process.execSync(command, {
                stdio:"inherit",// <string> | <Array> 子进程的 stdio 配置。默认情况下，除非指定了 stdio，否则 stderr 将会被输出到父进程的 stderr。默认值: 'pipe'。
                ...options
            });
            resolve(stdout);
        }catch(e){
            reject(e);
        }
   })
}
exports.fork=fork;
exports.spawn=spawn;
exports.exec=exec;
exports.execFile=execFile;
exports.execFileSync=execFileSync;
exports.spawnSync=spawnSync;
exports.execSync=execSync;