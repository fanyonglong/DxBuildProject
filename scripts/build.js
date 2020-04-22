const fs=require('fs');
const nodePath=require('path');
const {getPackages}=require('./utils/packages');
const {spawnSync,spawn,execSync}=require('./utils/process');
const rollup=require('rollup');
const {program,command}=require('commander');
const chalk=require('chalk');
const ProgressBar=require("progress");
const del=require('del');

program.option('-c,--cjs <boolean>','是否生成cjs',false);
program.option('-e,--esm <boolean>','是否生成esm',false);
program.option('-u,--umd <boolean>','是否生成umd',false);

program.command('build').description('生成代码').action(buildAll);
program.command('lerna').description('lerna tsc 生成').action(lernaBuild);
//program.command('umd').description('rollup生成').action(rollupBuild);
program.command('cjs').description('typescript tsc 生成').action(typescriptBuild);
program.parse(process.argv);
// node node_modules/typescript/bin/tsc -p tsconfig.json

async function buildAll(){
    
}
async function lernaBuild(){
  //  console.log(process.execPath);
//   var pkgs=getPackages();
//   var bar = new ProgressBar(':bar :current/:total', { total: pkgs.length,clear :false });
//   pkgs.forEach(async function(shortName){
//       let pkgPath=nodePath.join(__dirname,'..','packages',shortName);
//       del.sync([nodePath.join(pkgPath,'lib'),nodePath.join(pkgPath,'esm')]);
//       console.log(chalk.blue(shortName+'下面的lib和esm'),chalk.red('删除成功'))
//   });
  console.log(chalk.green('开始生成'))
  execSync('npm run lerna:build');
  console.log(chalk.green('生成完成'))
}

async function startRollupBuild(configPath){
    let config=require(configPath);
    const inputOptions ={
        ...config.inputOptions
    }
    const outputOptions={
        ...config.outputOptions
    };

    const bundle = await rollup.rollup(inputOptions);
    // or write the bundle to disk
    await bundle.write(outputOptions);
}
async function rollupBuild(configPath){

    console.log(chalk.blue('开始生成'))
    var pkgs=['utils'];
    var bar = new ProgressBar(':bar :current/:total', { total: pkgs.length,clear :false });
    pkgs.forEach(async function(shortName){
        let pkgPath=nodePath.join(__dirname,'..','packages',shortName);
        del.sync([nodePath.join(pkgPath,'dist')]);

    });
}

async function typescriptBuild(){
       
    console.log(chalk.blue('开始生成'))
    var pkgs=['utils'];
    var bar = new ProgressBar(':bar :current/:total', { total: pkgs.length,clear :false });
    pkgs.forEach(async function(shortName){
        let pkgPath=nodePath.join(__dirname,'..','packages',shortName);

        del.sync([nodePath.join(pkgPath,'lib'),nodePath.join(pkgPath,'esm')]);
        let cjs=spawn('node',[
            'node_modules/typescript/bin/tsc',
            '-p',`packages/${shortName}/tsconfig.json`,
            '--target','ES2015',
             '--module','CommonJS',
             '--outDir',nodePath.join(pkgPath,'lib')]);
        let esm=spawn('node',[
            'node_modules/typescript/bin/tsc',
            '-p',`packages/${shortName}/tsconfig.json`,
            '--target','ES5',
             '--module','ESNext',
             '--outDir',nodePath.join(pkgPath,'esm')])
        await Promise.all([cjs,esm]);
        bar.tick();
    })
  
}
