
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {camelCase} from 'lodash';

export default function getConfig(options={}){
    let {name,inputOptions={},outputOptions={}}=options;
    const defaultConfig={
        input: 'src/index.ts',
        output: {
         // dir:"dist",
          file: 'dist/index.js',
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
        }),commonjs({extensions: ['.js', '.ts']})].concat(inputOptions.plugins||[]),
        ...inputOptions,
      
    };
    return defaultConfig;
}