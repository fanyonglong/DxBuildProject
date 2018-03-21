import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

var path=require('path');
const root=path.resolve(__dirname,'../');
export default {
  input: path.resolve(root,'temp/async-validator/src/index.js'),
  output: {
    file:path.resolve(root,'./dist/async-validator.js'),
    format: 'umd',
    name:'asyncValidator'
  },
  plugins: [
    resolve(),
    babel({
       babelrc:false,
       presets:[['env',{
         "targets": {
            "browsers": ["last 3 versions"]
          },
          modules:false
       }]],
      // externalHelpers:true,
       plugins:['transform-object-rest-spread','external-helpers'],
       exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
};

//>rollup -c rollup/rollup.config.js