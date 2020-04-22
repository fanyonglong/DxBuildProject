// node scripts/rollup/cli rm 
const {execSync,spawnSync}=require('../utils/process');
const {getPackages}=require('../utils/packages');
const {getFile,getFileSync,copyFileSync,rename}=require('../utils/util');
const fs=require('fs');
const path=require('path');
const inquirer=require('inquirer');
const root=path.resolve(__dirname,'../../node_modules');


//https://github.com/rollup/plugins/
const defaultPlugins=[
    '@rollup/plugin-node-resolve',
    '@rollup/plugin-commonjs'
];
const {program}=require('commander');
program.command('init').action(init)
program.command('build <package>').action(build)
program.command('i').action(install);
program.command('rm').action(uninstall);
program.parse(process.argv);

function buildConfigFile(package){
    let pkgPath=path.resolve(__dirname,'../../packages',package);
    let tplPath=path.resolve(__dirname,'rollup.config.tpl');
    copyFileSync(tplPath,path.join(pkgPath,'rollup.config.js'));
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
    let pkgPath=path.resolve(__dirname,'../../packages',package)
    spawnSync('npx',['rollup','-c',path.join(pkgPath,'rollup.config.js')]);
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