
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from 'rollup-plugin-terser';
import {camelCase} from 'lodash';

const isProduction = process.env.NODE_ENV === 'production';

const defaultFormats={
  'umd':{
    // dir:"dist",
    file: 'dist/umd/index.js',
    format: 'umd',
    name:"Dx."+name,
    banner:'/*@desc '+name+' */',
   // intro:"window.Dx=window.Dx||(window.Dx={})",
    exports:"named",
    globals:{
      lodash:"_"
    },
    ...outputOptions
  },
  'esm':{
    //dir:"dist",
    // dir: 'dist/cjs',
    file: 'dist/esm/index.js',
    format: 'esm',
    banner:'/*@desc '+name+' */',
    // intro:"window.Dx=window.Dx||(window.Dx={})",
    exports:"auto",
    ...outputOptions

  },
  'cjs':{
    //dir:"dist",
   // dir: 'dist/cjs',
    file: 'dist/cjs/index.js',
    format: 'cjs',
    banner:'/*@desc '+name+' */',
   // intro:"window.Dx=window.Dx||(window.Dx={})",
    exports:"named",
    ...outputOptions
  }
  
}
function getOutOptions(){
   return {

   }
}

export default function getConfig(options={}){
    let {name,inputOptions={},outputOptions={}}=options;
    const defaultConfig={
        input: 'src/index.ts',
        output:[{
          //dir:"dist",
         // dir: 'dist/cjs',
          file: 'dist/cjs/index.js',
          format: 'cjs',
          banner:'/*@desc '+name+' */',
         // intro:"window.Dx=window.Dx||(window.Dx={})",
          exports:"named",
          ...outputOptions
        }
        ],
        // 指出应将哪些模块视为外部模块
        external: ['lodash'],
        plugins: [
        typescript({
            tsconfig:false,
            lib:['dom','es2015','es2016','es2017'],
            target:'es5',
            allowSyntheticDefaultImports:true

        }),
        resolve({
          // 将自定义选项传递给解析插件
          customResolveOptions: {
            moduleDirectory: 'node_modules'
          }
        }),commonjs({extensions: ['.js', '.ts']}),
        terser()
      ].concat(inputOptions.plugins||[]),
        ...inputOptions,
      
    };
    return defaultConfig;
}