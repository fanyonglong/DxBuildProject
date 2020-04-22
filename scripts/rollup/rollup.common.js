
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import {camelCase} from 'lodash';

export default function getConfig(name,config){
    const defaultConfig={
        input: 'src/main.js',
        output: {
          file: 'bundle.js',
          format: 'umd',
          name:"Dx."+name,
          banner:['/**',
            '@desc',
          ,'**/'].join('\n')
        },
        plugins: [resolve({
          // 将自定义选项传递给解析插件
          customResolveOptions: {
            moduleDirectory: 'node_modules'
          }
        }),commonjs()],
        // 指出应将哪些模块视为外部模块
        external: ['lodash']
    };
}