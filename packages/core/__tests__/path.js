const enhancedResolve =require('enhanced-resolve');
const nodePath=require('path');
const {
    HookMap,
    SyncBailHook,
    SyncHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncSeriesBailHook
}=require('tapable');
let resolvePath=enhancedResolve.create({
    alias:{},
    extensions:['.js','.ts','.json'],
    modules:[nodePath.resolve(__dirname, '../')]
});

var hook=new HookMap(()=>{
    return new AsyncSeriesBailHook(['path']);
});

hook.tapPromise('resolve',{
    name:'getPath'
},(path)=>{
    return new Promise((resolve,reject)=>{
        resolvePath(nodePath.resolve(__dirname,'../'),"lodash",(err, result)=>{
            if(err){
                reject(err)
                return;
            }
            resolve(result)
        })
    })
});
hook.for('resolve').promise().then(d=>{
    console.log('d',d)
}).catch(e=>{
    console.log('e','找不到')
})