const rollup = require('rollup');
const plugins = require('./plugins');

async function build(inputOptions={},outputOptions={}) {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    console.log(bundle.watchFiles); // an array of file names this bundle depends on

    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    const { output } = await bundle.generate(outputOptions);

    for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === 'asset') {
            // For assets, this contains
            // {
            //   fileName: string,              // the asset file name
            //   source: string | Uint8Array    // the asset source
            //   type: 'asset'                  // signifies that this is an asset
            // }
            // console.log('Asset', chunkOrAsset);
        } else {
            // For chunks, this contains
            // {
            //   code: string,                  // the generated JS code
            //   dynamicImports: string[],      // external modules imported dynamically by the chunk
            //   exports: string[],             // exported variable names
            //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
            //   fileName: string,              // the chunk file name
            //   imports: string[],             // external modules imported statically by the chunk
            //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
            //   isEntry: boolean,              // is this chunk a static entry point
            //   map: string | null,            // sourcemaps if present
            //   modules: {                     // information about the modules in this chunk
            //     [id: string]: {
            //       renderedExports: string[]; // exported variable names that were included
            //       removedExports: string[];  // exported variable names that were removed
            //       renderedLength: number;    // the length of the remaining code in this module
            //       originalLength: number;    // the original length of the code in this module
            //     };
            //   },
            //   name: string                   // the name of this chunk as used in naming patterns
            //   type: 'chunk',                 // signifies that this is a chunk
            // }
            // console.log('Chunk', chunkOrAsset.modules);
        }
    }

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

async function watch(inputOptions={},outputOptions={}) {
    const watchOptions = { 
        ...inputOptions,
        output:outputOptions,
        watch:{
            
        }
    };
    const watcher = rollup.watch(watchOptions);

    watcher.on('event', event => {
        // event.code 会是下面其中一个：
        //   START        — 监听器正在启动（重启）
        //   BUNDLE_START — 构建单个文件束
        //   BUNDLE_END   — 完成文件束构建
        //   END          — 完成所有文件束构建
        //   ERROR        — 构建时遇到错误
        //   FATAL        — 遇到无可修复的错误
    });

    // 停止监听
    watcher.close();
}