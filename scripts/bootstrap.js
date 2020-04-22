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

const version = require('../lerna.json').version;
/**
 * 生成包初始文件
 */
function buildPackageInitFile() {
    console.log('init', program.force)
}
function initPackage(shortName) {
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
        files: ['lib', 'src'],
        scripts: {
            "build": "npm run clean && npm build:esm && npm build:cjs",
            "build:esm": "tsc -p tsconfig.json --target ES5 --module ESNext --outDir esm",
            "build:cjs": "tsc -p tsconfig.json --target ES5 --module CommonJS --outDir lib",
            "build:umd": "tsc -p tsconfig.json --target ES5 --module UMD --outDir dist --outFile index.js",
            "build:dist": `node ../../node_modules/rollup/dist/bin/rollup -c rollup.config.js`,
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
        // publishConfig: {
        //   access: 'public',
        // },
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
            "baseUrl": "./",
            "outDir": "lib",
        },
        "include": ["src"]
    }

    let tsconfigPath = nodePath.join(__dirname, '../packages', shortName, 'tsconfig.json');
    if (!fs.existsSync(tsconfigPath)) {
         writeFile(tsconfigPath, JSON.stringify(tsconfigJson, null, 2))
    }
    // 生成rollup
}
function init(package) {

    let pkgs = package&&typeof package=='string'?[package]:getPackages();
    pkgs.forEach(initPackage);
    console.log('生成完成')
}