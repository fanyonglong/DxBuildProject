({
    appDir: './',
    baseUrl: './src/jquery/',
    dir: './dist/jquery',
    modules: [
        {
            name: 'main'
        }
    ],
   // fileExclusionRegExp: /^(r|build)\.js$/,
  //  optimizeCss: 'standard',
    name: './gulp/jquery/main.js',// 模块入口
    optimize: 'none',//是否压缩 默认是压缩的，去掉不要就是压缩
   // removeCombined: true,
    paths: {
        deferred: 'deferred'
    },
    shim: {
    }
})