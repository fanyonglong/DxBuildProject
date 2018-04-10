var child_process=require('child_process')

// var workerProcess = child_process.exec('node testnode2.js', function(error,stdout,stderr) {
//     if (error) {
//         console.error('exec error: '+error)
//         return
//       }
//       console.log('stdout: '+stdout)
//       console.log('stderr: '+stderr)
// })

var workerProcess = child_process.exec('node testnode2.js', {})
workerProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

workerProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});
workerProcess.on('exit', function() {
    console.log('exit child');
})