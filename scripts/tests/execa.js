const execa = require('execa');
//node scripts/tests/execa

function run_execa(file, arguments, options){
    return execa(file,arguments,options)
}
//execa('echo', ['unicorns']).stdout.pipe(process.stdout);

//Cancelling a spawned process
//取消产生的过程
async function cancel() {
    const subprocess = execa('node');

    setTimeout(() => {
        subprocess.cancel();
    }, 1000);

    try {
        await subprocess;
    } catch (error) {
        console.log(subprocess.killed); // true
        console.log(error.isCanceled); // true
    }
}
//使用sync方法捕获错误
async function sync() {
    try {
        execa.sync('unknown', ['command']);
    } catch (error) {
        console.log(error);
        /*
        {
            message: 'Command failed with ENOENT: unknown command spawnSync unknown ENOENT',
            errno: -2,
            code: 'ENOENT',
            syscall: 'spawnSync unknown',
            path: 'unknown',
            spawnargs: ['command'],
            originalMessage: 'spawnSync unknown ENOENT',
            shortMessage: 'Command failed with ENOENT: unknown command spawnSync unknown ENOENT',
            command: 'unknown command',
            stdout: '',
            stderr: '',
            all: '',
            failed: true,
            timedOut: false,
            isCanceled: false,
            killed: false
        }
        */
    }
}
/*
杀死进程
使用SIGTERM，并在2秒钟后用SIGKILL杀死它。
*/
function kill() {
    const subprocess = execa('node');

    setTimeout(() => {
        subprocess.kill('SIGTERM', {
            forceKillAfterTimeout: 2000
        });
    }, 1000);
}