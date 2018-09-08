const path=require('path');
let root=path.resolve(__dirname,'../../');

var  resolve = require('rollup-plugin-node-resolve');
var  commonjs=require('rollup-plugin-commonjs');
/**
 * npm i -g lodash-cli
 * lodash include=template -o  ../dist/index.js
 * 
 * -c，--stdout................将输出写入标准输出
-d，--development.....只写非缩小开发输出
-h，--help....................显示帮助信息
-m，--source-map.......使用可选的源映射URL生成源映射
-o，--output................将输出写入给定的路径/文件名
-p，--production.......只写缩小的产量
-s，--silent...............跳过状态更新通常记录到控制台
-V，--version.............输出当前版本的Lodash
 * 
 * 使用该category命令传递逗号分隔的函数类别以包含在构建中。
有效类别是“array”，“collection”，“date”，“function”，“lang”，“object”，“number”，“seq”，“string”和“util”。
lodash category=collection,function
使用该exports命令可以传递以逗号分隔的方式来导出lodash函数。
有效的导出是“amd”，“commonjs”，“es”，“global”，“node”，“npm”，“none”和“umd”。
lod
使用该include命令传递要包含在构建中的逗号分隔的函数名称。
lodash include=each,filter,map
使用该minus命令传递逗号分隔的函数/类别名称以从构建中删除。
lodash minus=result,shuffle

  core创建一个4 kB版本
   modularize使用lodash拆分成模块创建一个构建
   strict创建启用ES严格模式的构建
*/
//var child_process=require('child_process');
// module.exports=function(){

// }
const argv=require('yargs').options({
  "module":{
      alias:'m',
      type:"string",
      describe:"打包模块名称",
      default:'',
      requiresArg:true,//  要求必填 
      demandOption:false,// 是否显示required
      group:'rollup'
  },
  "output":{
    alias:'o',
    type:"string",
    describe:"输出目录",
    default:'',
    requiresArg:true,
    group:'rollup'
  }

}).argv;

module.exports=function(arg,cb){
  var result={};
  result.input={
    input: path.resolve(root,'sources/lodashv3/lodash-compat/'+argv.module),
    plugins: [
      resolve(),
      commonjs(),
    ]
  }
  result.output={
    file: path.resolve(root, 'sources/lodashv3/dist/'+argv.output),
    format: 'iife',
    name:'_',
    sourcemap:false,
  }
  cb(result);
}

/**
 * 
 * 如果你想使用Rollup的配置文件，记得在命令行里加上--config或者-c @@2
 * // rollup.config.js
export default {
  // 核心选项
  input,     // 必须
  external,
  plugins,

  // 额外选项
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy

  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file,    // 必须
    format,  // 必须
    name,
    globals,

    // 额外选项
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // 高危选项
    exports,
    amd,
    indent
    strict
  },
};

命令行的参数(Command line flags)
配置文件中的许多选项和命令行的参数是等价的。如果你使用这里的参数，那么将重写配置文件。想了解更多的话，仔细查阅这个包办大量选项的清单

-i, --input                 要打包的文件（必须）
-o, --output.file           输出的文件 (如果没有这个参数，则直接输出到控制台)
-f, --output.format [es]    输出的文件类型 (amd, cjs, es, iife, umd)
-e, --external              将模块ID的逗号分隔列表排除
-g, --globals               以`module ID:Global` 键值对的形式，用逗号分隔开 
                              任何定义在这里模块ID定义添加到外部依赖
-n, --name                  生成UMD模块的名字
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
 * 
*/