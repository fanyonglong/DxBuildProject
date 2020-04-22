* [插件开发](#插件开发)
* [配置文件](#配置文件)
* [命令行](#命令行)


## 插件开发
```js
// rollup-plugin-my-example.js
export default function myExample () {
  return {
    name: 'my-example', // this name will show up in warnings and errors
    resolveId ( source ) {
      if (source === 'virtual-module') {
        return source; // this signals that rollup should not ask other plugins or check the file system to find this id
      }
      return null; // other ids should be handled as usually
    },
    load ( id ) {
      if (id === 'virtual-module') {
        return 'export default "This is virtual!"'; // the source code for "virtual-module"
      }
      return null; // other ids should be handled as usually
    }
  };
}

// rollup.config.js
import myExample from './rollup-plugin-my-example.js';
export default ({
  input: 'virtual-module', // resolved by our plugin
  plugins: [myExample()],
  output: [{
    file: 'bundle.js',
    format: 'es'
  }]
});
```
约定
插件应使用带rollup-plugin-前缀的明确名称。
在中包含rollup-plugin关键字package.json。
插件应经过测试。我们建议开箱即用的摩卡或ava支持承诺。
尽可能使用异步方法。
用英语记录您的插件。
如果合适，请确保插件输出正确的源映射。
如果您的插件使用“虚拟模块”（例如用于辅助功能），请在模块ID前面加上\0。这样可以防止其他插件尝试对其进行处理。
物产

## 配置文件 
```js
// rollup.config.js

export default { // can be an array (for multiple inputs)
  // core input options
  external,
  input, // required 这个包的入口点 (例如：你的 main.js 或者 app.js 或者 index.js)
  plugins,

  // advanced input options
  cache,
  inlineDynamicImports,
  manualChunks,
  onwarn,
  preserveEntrySignatures,
  preserveModules,
  strictDeprecations,

  // danger zone
  acorn,
  acornInjectPlugins,
  context,
  moduleContext,
  preserveSymlinks,
  shimMissingExports,
  treeshake,

  // experimental
  experimentalCacheExpiry,
  perf,

  output: { // required (can be an array, for multiple outputs)
    // core output options
    dir,
    file,//String 要写入的文件。也可用于生成 sourcemaps，如果适用
    /*
    String 生成包的格式。 下列之一:
    amd – 异步模块定义，用于像RequireJS这样的模块加载器
    cjs – CommonJS，适用于 Node 和 Browserify/Webpack
    esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
    iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
    umd – 通用模块定义，以amd，cjs 和 iife 为一体
    system - SystemJS 加载器格式
    */
    format, // required 
    globals,//Object 形式的 id: name 键值对，用于umd/iife包。例如：在这样的情况下...
    name,//生成包名称 String 变量名，代表你的 iife/umd 包，同一页上的其他脚本可以访问它。
    plugins,

    // advanced output options
    assetFileNames,
    banner,
    chunkFileNames,
    compact,
    entryFileNames,
    extend,
    footer,
    hoistTransitiveImports,
    interop,
    intro,
    minifyInternalExports,
    outro,
    paths,
    sourcemap,
    sourcemapExcludeSources,
    sourcemapFile,
    sourcemapPathTransform,

    // danger zone
    amd,
    esModule,
    exports,
    externalLiveBindings,
    freeze,
    indent,
    namespaceToStringTag,
    noConflict,
    preferConst,
    strict
  },

  watch: {
    chokidar,
    clearScreen,
    skipWrite,
    exclude,
    include
  }
};
```

## 命令行
```
-i, --input <filename>      要打包的文件（必须）
-o, --file <output>         输出的文件 (如果没有这个参数，则直接输出到控制台)
-f, --format <format>       输出的文件类型 (amd, cjs, esm, iife, umd)
-e, --external <ids>        将模块ID的逗号分隔列表排除
-g, --globals <pairs>       以`module ID:Global` 键值对的形式，用逗号分隔开 
                              任何定义在这里模块ID定义添加到外部依赖
-n, --name <name>           生成UMD模块的名字
-h, --help                  输出 help 信息
-m, --sourcemap             生成 sourcemap (`-m inline` for inline map)
--amd.id                    AMD模块的ID，默认是个匿名函数
--amd.define                使用Function来代替`define`
--no-strict                 在生成的包中省略`"use strict";`
--no-conflict               对于UMD模块来说，给全局变量生成一个无冲突的方法
--intro                     在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容
--outro                     在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容
--banner                    在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容
--footer                    在打包好的文件的块的外部(wrapper外部)的最底部插入一段内容
--interop                   包含公共的模块（这个选项是默认添加的）
```
此外，还可以使用以下参数：

-h/--help
打印帮助文档。

-v/--version
打印已安装的Rollup版本号。

-w/--watch
监听源文件是否有改动，如果有改动，重新打包

--silent
不要将警告打印到控制台。