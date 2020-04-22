const child_process = require('child_process');
const path = require('path');


//node scripts/tests/child_process
//execSync();
//spawnSync();
//execFileSync();
//exec()
//execFile();
//fork();
//spawn()
function observableEvent(child,type) {
    process.on('beforeExit', function (code) {
        console.log('process-beforeExit', code)
    })
    process.on('exit', function (code) {
        console.log('process-exit', code);
        child.kill();
    })

    process.on('SIGTERM', () => {
        //child.kill('SIGINT')
        console.log('process', '接收到 SIGTERM kill。');
    });
    process.on('SIGINT', () => {
        //child.kill('SIGINT')
        console.log('process', '接收到 SIGINT。 按 Control-C 退出。');
    });
    child.on('close',
        /**
         * 当子进程的 stdio 流已被关闭时会触发 'close' 事件。 
         * 这与 'exit' 事件不同，因为多个进程可能共享相同的 stdio 流。
         * @param {number} code 子进程自行退出时的退出码。
         * @param {string} signal 子进程被终止的信号。
         */
        function (code, signal) {
            if(signal=='SIGINT'){
                console.log('close', '接收到 SIGINT。 按 Control-C 退出。');
                return;
            }
            console.log('close', 'code', code, 'signal', signal)
        });
    child.on('disconnect',
        /**
       调用父进程中的 subprocess.disconnect() 
       或子进程中的 process.disconnect() 后会触发 'disconnect' 事件。 
       断开连接后就不能再发送或接收信息，且 subprocess.connected 属性为 false。
         */
        function () {
            console.log('disconnect')
        });
    child.on('error',
        /**
         * 每当出现以下情况时触发 'error' 事件：
            无法衍生进程；
            无法杀死进程；
            向子进程发送消息失败。
            发生错误后，可能会也可能不会触发 'exit' 事件。 当同时监听 'exit' 和 'error' 事件时，则需要防止意外地多次调用处理函数。
        * @param {Error} error 
         */
        function (error) {
            console.log('error', error)
        });
    child.on('exit',
        /**
         * 当子进程结束后时会触发 'exit' 事件。 如果进程退出，则 code 是进程的最终退出码，
         * 否则为 null。 如果进程是因为收到的信号而终止，
         * 则 signal 是信号的字符串名称，否则为 null。 这两个值至少有一个是非 null 的。
            当 'exit' 事件被触发时，子进程的 stdio 流可能依然是打开的。
            Node.js 为 SIGINT 和 SIGTERM 建立了信号处理程序，
            且 Node.js 进程收到这些信号不会立即终止。
             相反，Node.js 将会执行一系列的清理操作，然后再重新提升处理后的信号。
         * @param {number} code 子进程自行退出时的退出码。
         * @param {string} signal 子进程被终止的信号。
         */
        function (code, signal) {
            if(signal=='SIGINT'){
                console.log('exit', '接收到 SIGINT。 按 Control-C 退出。');
                return;
            }
            console.log('exit', 'code', code, 'signal', signal)
        });
    child.on('message',
        /**
         * 当子进程使用 process.send() 发送消息时会触发 'message' 事件。
        消息通过序列化和解析进行传递。 收到的消息可能跟最初发送的不完全一样。
        如果在衍生子进程时使用了 serialization 选项设置为 'advanced'，则 message 参数可以包含 JSON 无法表示的数据。 有关更多详细信息，请参阅高级序列化。
         * @param {object} message 一个已解析的 JSON 对象或原始值。
         * @param {hnadle} sendHandle 一个 net.Socket 或 net.Server 对象，或 undefined。
         */
        function (message, sendHandle) {
            console.log('message', message)
        });
    if (child.stdout&&(type=='exec'||type=='execFile')) {
        var index=0;
        child.stdout.on('data', function (chunk) {
            console.log('stdio-data', chunk.toString(),'signalCode',child.signalCode);
            if(index++==4){
                child.kill();
              //  process.exitCode = 1;
                type=='exec'&&process.exit(1);
               // type=="exec"&&child_process.spawn('TASKKILL',['/F','/PID',child.pid])
            } 
            // if(child.signalCode==='SIGTERM'){
            //     console.log('fff')
            //    // child.kill("SIGKILL")
            // }
            
        })
    }else{
        console.log('--------------------------------------------------')
        // process.stdout.on('data',function(chunk){
        //     console.log('stdio-data', chunk.toString(),'signalCode',child.signalCode);
        // });
        // fork
        setTimeout(() => {
            type=='fork'&&child.send({msg:"stop"});
            child.kill()
            //  process.exit();
          },2000)
    }
    setTimeout(() => {
      //  process.exit();
    },2000)
}
/**
 * 
 * @param {string} command 要运行的命令，并带上以空格分隔的参数。
 * @param {object} [options] 
 * @param {function} [callback] 
 */
function exec(command, options, callback) {
    console.log('start')
    let child = child_process.exec('node childProcess/child.js --file index.js', {
        cwd: __dirname,// <string> 子进程的当前工作目录。默认值: null。
       //env: process.env, //<Object> 环境变量的键值对。默认值: process.env。
        //encoding: "utf8",// <string> 默认值: 'utf8'。
        //shell:process.env,// <string> 用于执行命令的 shell。参阅 shell 的要求与 Windows 默认的 shell。 默认值: Unix 上是 '/bin/sh'，Windows 上是 process.env.ComSpec。
       // timeout: 0,// <number> 默认值: 0。
       // maxBuffer:1024 * 1024,// <number> stdout 或 stderr 上允许的最大字节数。如果超过限制，则子进程会被终止并且截断任何输出。参阅 maxBuffer 与 Unicode 中的警告。默认值: 1024 * 1024。
       // killSignal: "SIGTERM",// <string> | <integer> 默认值: 'SIGTERM'。当衍生的进程将被终止时使用的信号值,如果超时了，或者输出的缓存溢出了，传递给子进程的信号。被当成字符串。
        //uid:2,// <number> 设置进程的用户标识，参阅 setuid(2)。
        //gid:2,// <number> 设置进程的群组标识，参阅 setgid(2)。
        //windowsHide: false, //<boolean> 隐藏子进程的控制台窗口（在 Windows 系统上通常会创建）。）。默认值: false。
    },
        /**
     * 当进程终止时调用并带上输出。
     * @param {*} error 
     * @param {string|Buffer} stdout 
     * @param {string|Buffer} stderr 
     */
        function (error, stdout, stderr) {
            if (error) {
                if(error.signal =='SIGINT'){
                    console.log('callback', '接收到 SIGINT。 按 Control-C 退出。');
                    return;
                }
                console.log('错误','code',error.code,'signal',error.signal);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    observableEvent(child,'exec')

}
/**
 * 
 * @param {*} file 
 * @param {*} options 
 * @return {Buffer|string} stdout
 */
function execSync(file, options){
    console.log('start')
    try{
        let stdout = child_process.execSync('node ./childProcess/child.js --end 5', {
             cwd:__dirname,// <string> 子进程的当前工作目录。
            // input <string> | <Buffer> | <TypedArray> | <DataView> 该值将会作为 stdin 传给衍生的进程。提供此值将会覆盖 stdio[0]。
             stdio:"inherit",// <string> | <Array> 子进程的 stdio 配置。默认情况下，除非指定了 stdio，否则 stderr 将会被输出到父进程的 stderr。默认值: 'pipe'。
            // env <Object> 环境变量的键值对。默认值: process.env。
            // shell <string> 用于执行命令的 shell。参阅 shell 的要求与 Windows 默认的 shell。 默认值: Unix 上是 '/bin/sh'，Windows 上是 process.env.ComSpec。
            // uid <number> 设置进程的用户标识，参阅 setuid(2)。
            // gid <number> 设置进程的群组标识，参阅 setgid(2)。
             timeout:60000,// <number> 允许进程运行的最长时间，以毫秒为单位。默认值: undefined。
            // killSignal <string> | <integer> 当衍生的进程将被终止时使用的信号值。默认值: 'SIGTERM'。
            // maxBuffer <number> stdout 或 stderr 上允许的最大字节数。如果超过限制，则子进程会被终止并且截断任何输出。参阅 maxBuffer 与 Unicode 中的警告。默认值: 1024 * 1024。
            // encoding <string> 用于所有 stdio 输入和输出的字符编码。默认值: 'buffer'。
            // windowsHide <boolean> 隐藏子进程的控制台窗口（在 Windows 系统上通常会创建）。默认值: false。    
        });
        console.log('完成',stdout)
    }catch(e){
        console.log('异常错误',e)
    }
}
/**
 * 
 * @param {string} file  要运行的可执行文件的名称或路径。
 * @param {string[]} [args] 字符串参数的列表。
 * @param {object} [options] 
 * @param {function} [callback] 
 */
function execFile(file,args, options, callback) {
    console.log('start')
    let child = child_process.execFile('node', ['childProcess/child.js'], {
        cwd: __dirname// <string> 子进程的当前工作目录。
        // env <Object> 环境变量的键值对。默认值: process.env。
        // encoding <string> 字符编码。默认值: 'utf8'。
        // timeout <number> 默认值: 0。
        // maxBuffer <number> stdout 或 stderr 上允许的最大字节数。如果超过限制，则子进程会被终止并且截断任何输出。参阅 maxBuffer 与 Unicode 中的警告。默认值: 1024 * 1024。
        // killSignal <string> | <integer> 默认值: 'SIGTERM'。当衍生的进程将被终止时使用的信号值
        // uid <number> 设置进程的用户标识，参阅 setuid(2)。
        // gid <number> 设置进程的群组标识，参阅 setgid(2)。
        // windowsHide <boolean> 隐藏子进程的控制台窗口（在 Windows 系统上通常会创建）。默认值: false。
        // windowsVerbatimArguments <boolean> 在 Windows 上不为参数加上引号或转义。在 Unix 上忽略。默认值: false。
        // shell:true,// <boolean> | <string> 如果为 true，则在 shell 中运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 可以将不同的 shell 指定为字符串。 参阅 shell 的要求与 Windows 默认的 shell。 默认值: false（没有 shell）。

    },
        /**
         * 当进程终止时调用并带上输出。
         * @param {*} error 
         * @param {string|Buffer} stdout 
         * @param {string|Buffer} stderr 
         */
        function (error, stdout, stderr) {
            if (error) {
                console.log('错误', error);
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    observableEvent(child,'execFile')

}
/**
 * 
 * @param {*} file 
 * @param {*} args 
 * @param {*} options 
 * @return {Buffer|string} stdout
 */
function execFileSync(file, args, options){
    console.log('start')
    try{
        let stdout = child_process.execFileSync('node', ['./childProcess/child.js', '--end',5], {
             cwd:__dirname, //<string> 子进程的当前工作目录。
            // input <string> | <Buffer> | <TypedArray> | <DataView> 该值将会作为 stdin 传给衍生的进程。提供此值将会覆盖 stdio[0]。
             stdio:"inherit",// <string> | <Array> 子进程的 stdio 配置。默认情况下，除非指定了 stdio，否则 stderr 将会被输出到父进程的 stderr。默认值: 'pipe'。
            // env <Object> 环境变量的键值对。默认值: process.env。
            // uid <number> 设置进程的用户标识，参阅 setuid(2)。
            // gid <number> 设置进程的群组标识，参阅 setgid(2)。
             timeout:60000,// <number> 允许进程运行的最长时间，以毫秒为单位。默认值: undefined。
            // killSignal <string> | <integer> 当衍生的进程将被终止时使用的信号值。默认值: 'SIGTERM'。
            // maxBuffer <number> stdout 或 stderr 上允许的最大字节数。如果超过限制，则子进程会被终止。参阅 maxBuffer 与 Unicode 中的警告。默认值: 1024 * 1024。
            // encoding <string> 用于所有 stdio 输入和输出的字符编码。默认值: 'buffer'。
            // windowsHide <boolean> 隐藏子进程的控制台窗口（在 Windows 系统上通常会创建）。默认值: false。
            // shell <boolean> | <string> 如果为 true，则在 shell 中运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 可以将不同的 shell 指定为字符串。 参阅 shell 的要求与 Windows 默认的 shell。 默认值: false（没有 shell）。
        });
        console.log('完成',stdout)
    }catch(e){
        console.log('异常错误',e)
    }
}
/**
 * @param {string} command 要运行的命令。
 * @param {string[]} args 字符串参数的列表。
 * @param {object} options 

 */
function spawn(command, args, options) {
    console.log('start')
    let child = child_process.spawn('node', ['./childProcess/child.js', '--end', 5], {
        cwd: __dirname,// <string> 子进程的当前工作目录。默认值: null。
        env: process.env, //<Object> 环境变量的键值对。默认值: process.env。
        encoding: "utf8",// <string> 默认值: 'utf8'。
        // argv0:"",// <string> 显式地设置发送给子进程的 argv[0] 的值。如果没有指定，则将会被设置为 command 的值。
        stdio: "inherit",// <Array> | <string> 子进程的 stdio 配置。参阅 options.stdio。
        detached: false,// <boolean> 准备子进程独立于其父进程运行。具体行为取决于平台，参阅 options.detached。
        serialization: "json",// <string> 指定用于在进程之间发送消息的序列化类型。可能的值为 'json' 和 'advanced'。有关更多详细信息，请参阅高级序列化。默认值: 'json'。
        shell: false,// <boolean> | <string> 如果为 true，则在 shell 中运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 可以将不同的 shell 指定为字符串。 参阅 shell 的要求与 Windows 默认的 shell。 默认值: false（没有 shell）。
        windowsVerbatimArguments: false,// <boolean> 在 Windows 上不为参数加上引号或转义。在 Unix 上忽略。如果指定了 shell 并且是 CMD，则自动设为 true。默认值: false。
        windowsHide: false,// <boolean> 隐藏子进程的控制台窗口（在 Windows 系统上通常会创建）。默认值: false。
    });
    observableEvent(child,'spawn')
}
/**
 * 
 * 返回: <Object>
pid <number> 子进程的 pid。
output <Array> stdio 输出的结果数组。
stdout <Buffer> | <string> output[1] 的内容。
stderr <Buffer> | <string> output[2] 的内容。
status <number> 子进程的退出码，如果子进程因信号而终止，则为 null。
signal <string> 用于杀死子进程的信号，如果子进程不是因信号而终止，则为 null。
error <Error> 如果子进程失败或超时的错误对象。
child_process.spawnSync() 方法通常与 child_process.spawn() 相同，
但在子进程完全关闭之前该函数不会返回。 当遇到超时并发送 killSignal 时，该方法也需等到进程完全退出后才返回。 
如果进程拦截并处理了 SIGTERM 信号但未退出，则父进程将会等待直到子进程退出。
 */
function spawnSync(command, args, options){
    console.log('start')
    try{
        let result = child_process.spawnSync('node', ['./childProcess/child.js', '--end',5], {
              cwd:__dirname, //<string> 子进程的当前工作目录。
            // input <string> | <Buffer> | <TypedArray> | <DataView> 该值将会作为 stdin 传给衍生的进程。提供此值将会覆盖 stdio[0]。
            // argv0 <string> 显式地设置发送给子进程的 argv[0] 的值。如果没有指定，则将会被设置为 command 的值。
              stdio:"inherit", //<string> | <Array> 子进程的 stdio 配置。
            // env <Object> 环境变量的键值对。默认值: process.env。
            // uid <number> 设置进程的用户标识，参阅 setuid(2)。
            // gid <number> 设置进程的群组标识，参阅 setgid(2)。
              timeout:60000, //<number> 允许进程运行的最长时间，以毫秒为单位。默认值: undefined。
            // killSignal <string> | <integer> 当衍生的进程将被终止时使用的信号值。默认值: 'SIGTERM'。
            // maxBuffer <number> stdout 或 stderr 上允许的最大字节数。如果超过限制，则子进程会被终止并且截断任何输出。参阅 maxBuffer 与 Unicode 中的警告。默认值: 1024 * 1024。
            // encoding <string> 用于所有 stdio 输入和输出的字符编码。默认值: 'buffer'。
            // shell <boolean> | <string> 如果为 true，则在 shell 中运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 可以将不同的 shell 指定为字符串。 参阅 shell 的要求与 Windows 默认的 shell。 默认值: false（没有 shell）。
            // windowsVerbatimArguments <boolean> 在 Windows 上不为参数加上引号或转义。在 Unix 上忽略。如果指定了 shell 并且是 CMD，则自动设为 true。默认值: false。
            // windowsHide <boolean> 隐藏子进程的控制台窗口（在 Windows 系统上通常会创建）。默认值: false。
    
        });
        
        if(result.error){
            console.log('错误',result.error)
        }else{
            console.log('成功')
        }
        console.log('完成',result.code,result.signal)
    }catch(e){
        console.log('异常错误',e)
    }
 
}
/**
 * fork 支持send(message)通信
 * @param {string} modulePath //要在子进程中运行的模块。
 * @param {string[]} args 符串参数的列表。
 * @param {object} options 
 */
function fork(modulePath, args, options) {
    console.log('start')
    let child = child_process.fork('./childProcess/child.js', ['--input', 'index.js'], {
        cwd: __dirname,// <string> 子进程的当前工作目录。
        // detached <boolean> 准备子进程独立于其父进程运行。具体行为取决于平台，参阅 options.detached。
        // env <Object> 环境变量的键值对。默认值: process.env。
        // execPath <string> 用于创建子进程的可执行文件。
        // execArgv <string[]> 传给可执行文件的字符串参数的列表。默认值: process.execArgv。
        // serialization <string> 指定用于在进程之间发送消息的序列化类型。可能的值为 'json' 和 'advanced'。有关更多详细信息，请参阅高级序列化。默认值: 'json'。
        // silent <boolean> 如果为 true，则子进程的 stdin、stdout 和 stderr 将会被输送到父进程，否则它们将会继承自父进程，详见 child_process.spawn() 的 stdio 中的 'pipe' 和 'inherit' 选项。默认值: false。
        // stdio <Array> | <string> 参阅 child_process.spawn() 的 stdio。当提供此选项时，则它覆盖 silent 选项。如果使用了数组变量，则它必须包含一个值为 'ipc' 的元素，否则将会抛出错误。例如 [0, 1, 2, 'ipc']。
        // windowsVerbatimArguments <boolean> 在 Windows 上不为参数加上引号或转义。在 Unix 上则忽略。默认值: false。
        // uid <number> 设置进程的用户标识，参阅 setuid(2)。
        // gid <number> 设置进程的群组标识，参阅 setgid(2)。。默认值: false。
    });
    observableEvent(child,'fork')
}

/**
   * Execute commands and returns a promise object of the process.
   * Note that args parameter works only when the command is a single command,
   * and the command runs in the shell-mode. By default the command runs in
   * shell-mode and you need to set {'shell': false} to disable shell mode.
   *
   * @param  {string | string[]} command   The command
   * @param  {Array}  [args=[]] command line argument to be passed to spawn
   * @param  {Object} [opt={}]  options to be passed to spawn
   * @return {Promise}          The promise object of the process
   */
let spawnPromise= (command, args=[], opt={}) => {
    
    const defaultOptions = {'shell': true};
    const finalOpt ={...defaultOptions,...opt}
    return new Promise((res, rej) => {
      const proc = child_process.spawn(
          [].concat(command).join('&&'), args, finalOpt
      );
      const outputs = {'stdout': [], 'stderr': []};
      for (const stdtype in outputs) {
        if (proc.hasOwnProperty(stdtype)) {
          proc[stdtype].on('data', (msg) => {
            outputs[stdtype] = outputs[stdtype].concat(msg);
          });
        }
      }
      proc.on('error', rej);
      proc.on('close', (code, signal) => {
        if (code > 0) {
          rej({
            'stderr': outputs.stderr.join(''),
            'stdout': outputs.stdout.join(''),
            'code': code,
            'signal': signal,
          });
        } else {
          res({
            'stderr': outputs.stderr.join(''),
            'stdout': outputs.stdout.join(''),
          });
        }
      });
    });
  };
/**
 * child_process（子进程）
提供了4个方法用于创建子进程。
spawn()：启动一个子进程来执行命令。
exec()：启动一个子进程来执行命令，与spawn()不同的是其接口不同，它有一个回调函数获知子进程的状况。
execFile()：启动一个子进程来执行可执行文件。
fork()：与spawn()类似，不同点在于它创建Node的子进程只需指定要执行的JavaScript文件模块即可。

spawn()与exec()、execFile()不同的是，后两者创建时可以指定timeout属性设置超时时间，
一旦创建的进程运行超过设定的时间将会被杀死。exec()与execFile()不同的是，
exec()适合执行已有的命令，execFile()适合执行文件。
这里我们以一个寻常命令为例，nodeworker.js分别用上述4种方法实现，

创建异步的进程

在 Windows 上衍生 .bat 和 .cmd 文件
child_process.exec(command[, options][, callback])
child_process.execFile(file[, args][, options][, callback])
child_process.fork(modulePath[, args][, options])
child_process.spawn(command[, args][, options])

options.detached
options.stdio
创建同步的进程

child_process.execFileSync(file[, args][, options])
child_process.execSync(command[, options])
child_process.spawnSync(command[, args][, options])

ChildProcess 类

'close' 事件
'disconnect' 事件
'error' 事件
'exit' 事件
'message' 事件
subprocess.channel
subprocess.connected
subprocess.disconnect()
subprocess.exitCode
subprocess.kill([signal])
subprocess.killed
subprocess.pid
subprocess.ref()
subprocess.send(message[, sendHandle[, options]][, callback])

示例：发送 server 对象
示例：发送 socket 对象
subprocess.signalCode
subprocess.spawnargs
subprocess.spawnfile
subprocess.stderr
subprocess.stdin
subprocess.stdio
subprocess.stdout
subprocess.unref()

process.kill(pid,[signal]);
child_process.kill([signal]);
  type Signals =
        "SIGABRT" | "SIGALRM" | "SIGBUS" | "SIGCHLD" | "SIGCONT" | "SIGFPE" | "SIGHUP" | "SIGILL" | "SIGINT" | "SIGIO" |
        "SIGIOT" | "SIGKILL" | "SIGPIPE" | "SIGPOLL" | "SIGPROF" | "SIGPWR" | "SIGQUIT" | "SIGSEGV" | "SIGSTKFLT" |
        "SIGSTOP" | "SIGSYS" | "SIGTERM" | "SIGTRAP" | "SIGTSTP" | "SIGTTIN" | "SIGTTOU" | "SIGUNUSED" | "SIGURG" |
        "SIGUSR1" | "SIGUSR2" | "SIGVTALRM" | "SIGWINCH" | "SIGXCPU" | "SIGXFSZ" | "SIGBREAK" | "SIGLOST" | "SIGINFO";


options.detached#
中英对照提交修改

新增于: v0.7.10
在 Windows 上，设置 options.detached 为 true 可以使子进程在父进程退出后继续运行。 子进程有自己的控制台窗口。 一旦为子进程启用它，则无法被禁用。

在非 Windows 平台上，如果 options.detached 设为 true，则子进程将会成为新的进程组和会话的主导者。 子进程在父进程退出后可以继续运行，不管它们是否被分离。 详见 setsid(2)。

默认情况下，父进程将会等待被分离的子进程退出。 为了防止父进程等待 subprocess，可以使用 subprocess.unref() 方法。 这样做将会导致父进程的事件循环不会将子进程包含在其引用计数中，使得父进程可以独立于子进程退出，除非子进程和父进程之间建立了 IPC 通道。

当使用 detached 选项来启动一个长期运行的进程时，该进程在父进程退出后将不会保持在后台运行，除非提供一个不连接到父进程的 stdio 配置。 如果父进程的 stdio 是继承的，则子进程将会保持绑定到控制终端。

示例，一个长期运行的进程，为了忽视父进程的终止，通过分离且忽视其父进程的 stdio 文件描述符来实现：


 options.stdio#
中英对照提交修改

版本历史
options.stdio 选项用于配置在父进程和子进程之间建立的管道。 默认情况下，子进程的 stdin、 stdout 和 stderr 会被重定向到 ChildProcess 对象上相应的 subprocess.stdin、subprocess.stdout 和 subprocess.stderr 流。 这相当于将 options.stdio 设置为 ['pipe', 'pipe', 'pipe']。

为方便起见， options.stdio 可以是以下字符串之一：

'pipe' - 相当于 ['pipe', 'pipe', 'pipe']（默认值）。
'ignore' - 相当于 ['ignore', 'ignore', 'ignore']。
'inherit' - 相当于 ['inherit', 'inherit', 'inherit'] 或 [0, 1, 2]。
否则， options.stdio 的值是一个数组，其中每个索引对应于子进程中的 fd。 fd 0、1 和 2 分别对应于 stdin、stdout 和 stderr。 可以指定其他 fd 以便在父进程和子进程之间创建额外的管道。 值可以是以下之一：

'pipe' - 在子进程和父进程之间创建一个管道。 管道的父端作为 child_process 对象上的 subprocess.stdio[fd] 属性暴露给父进程。 为 fd 0 - 2 创建的管道也可分别作为 subprocess.stdin、subprocess.stdout 和 subprocess.stderr 使用。

'ipc' - 创建一个 IPC 通道，用于在父进程和子进程之间传递消息或文件描述符。 一个 ChildProcess 最多可以有一个 IPC stdio 文件描述符。 设置此选项会启用 subprocess.send() 方法。 如果子进程是一个 Node.js 进程，则 IPC 通道的存在将会启用 process.send() 和 process.disconnect() 方法、以及子进程内的 'disconnect' 和 'message' 事件。

以 process.send() 以外的任何方式访问 IPC 通道的 fd、或者在一个不是 Node.js 实例的子进程中使用 IPC 通道，都是不支持的。

'ignore' - 指示 Node.js 忽略子进程中的 fd。 虽然 Node.js 将会始终为它衍生的进程打开 fd 0 - 2，但将 fd 设置为 'ignore' 将会导致 Node.js 打开 /dev/null 并将其附加到子进程的 fd。

'inherit' - 将相应的 stdio 流传给父进程或从父进程传入。 在前三个位置中，这分别相当于 process.stdin、 process.stdout 和 process.stderr。 在任何其他位置中，则相当于 'ignore'。

<Stream> 对象 - 与子进程共享指向 tty、文件、 socket 或管道的可读或可写流。 流的底层文件描述符在子进程中会被复制到与 stdio 数组中的索引对应的 fd。 该流必须具有一个底层的描述符（文件流直到触发 'open' 事件才需要）。

正整数 - 整数值会被解释为当前在父进程中打开的文件描述符。 它与子进程共享，类似于共享 <Stream> 对象的方式。 在 Windows 上不支持传入 socket。

null 或 undefined - 使用默认值。 对于 stdio 的 fd 0、1 和 2（换句话说，stdin、stdout 和 stderr），将会创建一个管道。 对于 fd 3 及更大的值，则默认为 'ignore'。

const { spawn } = require('child_process');

// 子进程使用父进程的 stdio。
spawn('prg', [], { stdio: 'inherit' });

// 衍生的子进程只共享 stderr。
spawn('prg', [], { stdio: ['pipe', 'pipe', process.stderr] });

// 打开一个额外的 fd=4，与呈现启动式界面的程序进行交互。
spawn('prg', [], { stdio: ['pipe', null, null, null, 'pipe'] });
当在父进程和子进程之间建立 IPC 通道，并且子进程是一个 Node.js 进程时，则子进程启动时不会指向 IPC 通道（使用 unref()），直到子进程为 'disconnect' 事件或 'message' 事件注册了事件处理函数。 这允许子进程正常退出而不需要通过开放的 IPC 通道保持打开该进程。

在类 Unix 操作系统上，child_process.spawn() 方法在将事件循环与子进程解耦之前会同步地执行内存操作。 具有大内存占用的应用程序可能会发现频繁的 child_process.spawn() 调用成为瓶颈。 详见 V8 问题 7381。

还可参阅：child_process.exec() 和 child_process.fork()。
 *

 退出码#
中英对照提交修改

正常情况下，如果没有异步操作正在等待，那么 Node.js 会以状态码 0 退出，其他情况下，会用如下的状态码:

1 未捕获异常 - 有一个未被捕获的异常, 并且没被 domain 或 'uncaughtException' 事件处理器处理。
2 - 未被使用 (Bash 为防内部滥用而保留)
3 内部的 JavaScript 解析错误 - Node.js 内部的 JavaScript 源代码在引导进程中导致了一个语法解析错误。 这是非常少见的, 一般只会在开发 Node.js 本身的时候出现。
4 内部的 JavaScript 执行失败 - 引导进程执行 Node.js 内部的 JavaScript 源代码时，返回函数值失败。 这是非常少见的, 一般只会在开发 Node.js 本身的时候出现。
5 致命错误 - 在 V8 中有一个致命的错误。 比较典型的是以 FATALERROR 为前缀从 stderr 打印出来的消息。
6 非函数的内部异常处理 - 发生了一个内部异常，但是内部异常处理函数被设置成了一个非函数，或者不能被调用。
7 内部异常处理运行时失败 - 有一个不能被捕获的异常，在试图处理这个异常时，处理函数本身抛出了一个错误。 这是可能发生的, 比如, 如果一个 'uncaughtException' 或者 domain.on('error') 处理函数抛出了一个错误。
8 - 未被使用，在之前版本的 Node.js, 退出码 8 有时候表示一个未被捕获的异常。
9 - 不可用参数 - 也许是某个未知选项没有确定，或者没给必需要的选项填值。
10 内部的 JavaScript 运行时失败 - 调用引导函数时，引导进程执行 Node.js 内部的 JavaScript 源代码抛出错误。 这是非常少见的, 一般只会在开发 Node.js 本身的时候出现。
12 不可用的调试参数 - --inspect 和/或 --inspect-brk 选项已设置，但选择的端口号无效或不可用。
>128 退出信号 - 如果 Node.js 接收到致命信号, 诸如 SIGKILL 或 SIGHUP，那么它的退出代码将是 128 加上信号的码值。 这是 POSIX 的标准做法，因为退出码被定义为 7 位整数，并且信号退出设置高位，然后包含信号码值。 例如，信号 SIGABRT 的值为 6，因此预期的退出代码将为 128 + 6 或 134。

'SIGUSR1' 被 Node.js 保留用于启动调试器。可以为此事件绑定一个监听器，但是即使这样做也不会阻止调试器的启动。
'SIGTERM' 和 'SIGINT' 在非 Windows 平台绑定了默认的监听器，这样进程以代码 128 + signal number 结束之前，可以重置终端模式。  如果这两个事件任意一个绑定了新的监听器，原有默认的行为会被移除（Node.js 不会结束）。
'SIGPIPE' 默认会被忽略。可以给其绑定监听器。
'SIGHUP' 在 Windows 平台中当控制台窗口被关闭时会触发它，在其他平台中多种相似的条件下也会触发，查看 signal(7)。 可以给其绑定监听器，但是 Windows 下 Node.js 会在它触发后 10 秒钟无条件关闭。 在非 Windows 平台， SIGHUP 默认的绑定行为是结束 Node.js，但是一旦给它绑定了新的监听器，默认行为会被移除。
'SIGTERM' 在 Windows 中不支持，可以给其绑定监听器。
'SIGINT' 在终端运行时，可以被所有平台支持，通常可以通过 <Ctrl>+C 触发（虽然这是可以配置的）。 当终端运行在原始模式，它不会被触发。
'SIGBREAK' 在 Windows 中按下 <Ctrl>+<Break> 会被触发，非 Windows 平台中可以为其绑定监听器，但是没有方式触发或发送此事件。
'SIGWINCH' 当控制台被调整大小时会触发。Windows 中只有当光标移动并写入到控制台、或者以原始模式使用一个可读 tty 时，才会触发。
'SIGKILL' 不能绑定监听器，所有平台中出现此事件，都会使得 Node.js 无条件终止。
'SIGSTOP' 不能绑定监听器。
'SIGBUS'、 'SIGFPE'、 'SIGSEGV' 和 'SIGILL', 如果不是通过 kill(2) 产生，默认会使进程停留在某个状态，在此状态下尝试调用 JS 监听器是不安全的。 如果尝试调用 JS 监听器可能会导致进程在无限循环中挂死，因为使用 process.on() 附加的监听器是以异步的方式被调用，因此不能纠正隐含的问题。
Windows 不支持发送信号，但是 Node.js 通过 process.kill() 和 subprocess.kill() 提供了某些模拟机制。 发送信号 0 可以测试进程是否存在。 发送 SIGINT、 SIGTERM 和 SIGKILL 使得目标进程无条件终止。



Node.js child_process 启动子进程、关闭进程和所有子进程

启动子进程
spawn
execFile
exec
bufferSize 陷阱
停止子进程
启动子进程
Node.js 提供了 3 个 API 用来启动子进程：spawn、execFile、exec。

spawn
spawn 是启动子进程的底层函数，它可以启动一个二进制程序，但不能启动如 .sh/.bat 之类的批处理文件，自然也不支持 Shell(Bash/Cmd) 命令。

const child_process = require("child_process")
const result = child_process.spawnSync("node", ["-p", "1+1"])
console.log(result.stdout.toString())
execFile
execFile 是对 spawn 的封装，它允许同时书写命令行参数。

execFile('node -p 1+1') 等价于 spawn('node', ["-p", "1+1"])

exec
exec 是对 spawn 的封装，它允许执行 Shell(Bash/Cmd) 命令。

exec('node -p 1+1') 等价于 execFile('cmd /k /c /d "node -p 1+1"')

bufferSize 陷阱
使用 exec 时，由于 Node.js 内置限制了 maxBuffer 为默认 200k，输出超出后，程序会被自动终止。
因此使用 exec 时应注意输出，或者改用 spawn
如果希望用户和 exec 一样简单，可以考虑 NPM 包：cross-spawn

停止子进程
直接调用子进程的 kill() 可以关闭子进程。
但是无法关闭子进程打开的其它子进程。

需要让子进程独立运行，然后通过进程 ID 结束进程和子进程。

var process = child_process.exec("...")
killByPid(process.pid)

function killByPid(pid){
    if (/^win/.test(process.platform)) {
        child_process.spawn("taskkill", ["/PID", pid, "/T", "/F"])
    } else {
        process.kill(-pid, 'SIGTERM')
    }
}
*/