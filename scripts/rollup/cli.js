// node scripts/rollup/cli rm 
const {execSync,spawnSync}=require('../utils/process');
const {getPackages}=require('../utils/packages');
const {getFile,template,getFileSync,writeFileSync,copyFileSync,rename}=require('../utils/util');
const fs=require('fs');
const path=require('path');
const inquirer=require('inquirer');
const root=path.resolve(__dirname,'../../node_modules');
const runBuild=require('./build');
const runDev=require('./dev');

//https://github.com/rollup/plugins/
const defaultPlugins=[
    '@rollup/plugin-node-resolve',
    '@rollup/plugin-commonjs',
    '@rollup/plugin-typescript',
    'rollup-plugin-terser'
];
const {program}=require('commander');
program.command('init').action(init);
program.command('build <package>').action(build);
program.command('i').action(install);// 
program.command('rm').action(uninstall);
program.parse(process.argv);

// 生成 rollup.config.js配置文件
function buildConfigFile(package){
    let pkgPath=path.resolve(__dirname,'../../packages',package);
    let tplPath=path.resolve(__dirname,'rollup.config.tpl');
    let tplContent=getFileSync(tplPath);
    tplContent=tplContent.replace("{{CONFIG}}",JSON.stringify({
        name:package,
        inputOptions:{},
        outputOptions:{

        }
    },null,2));
    let writePath=path.join(pkgPath,'rollup.config.js');
    console.log(tplContent)
    writeFileSync(writePath,tplContent);
}
function init(){

    inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type:"list",
        name:"package",
        choices:getPackages(),
        message:"请选择要初始rollup配置的包"
      }
    ])
    .then(answers => {
      // Use user feedback for... whatever!!
      buildConfigFile(answers.package)
    })
    .catch(error => {
      if(error.isTtyError) {
          //无法在当前环境中呈现提示
        // Prompt couldn't be rendered in the current environment
      } else {
          //出了问题还有别的事
        // Something else when wrong
      }
    });
}
function build(package){
    let pkgPath=path.resolve(__dirname,'../../packages',package);
  //  spawnSync('npx',['rollup','--environment',['NODE_ENV:production'].join(','),'-c',path.join(pkgPath,'rollup.config.js')]);

   spawnSync('node',['../../node_modules/rollup/dist/bin/rollup','-c',path.join(pkgPath,'rollup.config.js')])
}
function install(){
    let plugins=defaultPlugins.filter(name=>{
        if(!fs.existsSync(path.join(root,name))){
            return true;
        }
        return false;
    });
    execSync('yarn add -D '+plugins.join(' '))
}
function uninstall(){
    let plugins=defaultPlugins.filter(name=>{
        if(fs.existsSync(path.join(root,name))){
            return true;
        }
        return false;
    });
    execSync('yarn remove  '+plugins.join(' '))
}