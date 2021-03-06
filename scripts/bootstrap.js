/*
初始化包
*/
const fs = require('fs');
const nodePath = require('path');
const stream = require('stream');
const { getDirAllFiles, rename, writeFile } = require('./utils/util');
const { getPackages } = require('./utils/packages');
const { program, command } = require('commander');

program.option('-f,--force', '是否强制更新package.json', false);
program.version(require('../package.json').version)
program.command('init [package]').description('初始化').action(init);


program.parse(process.argv);

/**
 * 生成包初始文件
 */
function buildPackageInitFile() {
    console.log('init', program.force)
}
function initPackage(shortName) {
    
    const version ="1.0.0";
    let name = '@dxyl/' + shortName;
    let packageJsonPath = nodePath.join(__dirname, '../packages', shortName, 'package.json');
    let packageJson = {
        name,
        version,
        description: name,
        main: 'lib/index.js',
        types: 'lib/index.d.ts',
        module: "esm/index.js",
        //  typings:"",
        files: ['lib', 'src','esm','dist'],
        scripts: {
            "build": "npm run clean && npm run build:esm && npm run build:cjs",
            "build:esm": "node ../../node_modules/typescript/bin/tsc -p tsconfig.json --target ES5 --module ESNext --outDir esm",
            "build:cjs": "node ../../node_modules/typescript/bin/tsc -p tsconfig.json --target ES5 --module CommonJS --outDir lib",
            //"build:umd": "tsc -p tsconfig.json --target ES5 --module UMD --outDir dist --outFile index.js",
            "build:dist": `node ../../node_modules/rollup/bin/rollup -c rollup.config.js`,
            "watch:cjs": `tsc -p tsconfig.json --watch --target ES5 --module CommonJS --outDir lib`,
            "clean": `node ../../scripts/del.js del ${shortName} lib esm`,
        },
        repository: {
            "type": "git",
            "url": "git+https://github.com/fanyonglong/DxBuildProject.git"
        },
        keywords: ['DxBuildProject', shortName],
        authors: ['fanyonglong'],
        license: 'MIT',
        bugs: 'http://github.com/fanyonglong/DxBuildProject/issues',
        homepage: `https://github.com/fanyonglong/DxBuildProject/tree/master/packages/${shortName}#readme`,
        publishConfig: {
          access: 'public',
        },
        buildConfig:{
            formats:['esm','cjs']
        }
    }
    // 创建 package.json
    if (program.force || !fs.existsSync(packageJsonPath)) {
         writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
    // 创建readme.md
    let readmePath = nodePath.join(__dirname, '../packages', shortName, 'README.md');
    if (!fs.existsSync(readmePath)) {
         writeFile(readmePath, `# ${name}`)
    }
    // 生成tsconfig.json
    let tsconfigJson = {
        "extends": "../../tsconfig.json",
        "compilerOptions": {
            "rootDir": "./src",
            "outDir": "./lib",
        },
        "include": ["src"]
    }

    let tsconfigPath = nodePath.join(__dirname, '../packages', shortName, 'tsconfig.json');
    if (!fs.existsSync(tsconfigPath)) {
         writeFile(tsconfigPath, JSON.stringify(tsconfigJson, null, 2))
    }
    // rollup
    
}
// 初始包默认配置
function init(package) {

    let pkgs = package&&typeof package=='string'?[package]:getPackages();
    pkgs.forEach(initPackage);
    console.log('生成完成')
}