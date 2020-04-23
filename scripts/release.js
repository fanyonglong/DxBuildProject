
const { execSync, spawnSync, spawn } = require('./utils/process');
const lernaCli = require.resolve('lerna/cli');
const chalk = require('chalk');

function npmNavtivePublish() {
    execSync('npm publish --access=public');
}
async function publish() {
    console.log(chalk.green('开始发布'))
    try {
        await spawn('git',['add','.']);
        await spawn('git',['commit','-a','-m','publish:'+(new Date()).toLocaleString()]);
        await spawn('node', [lernaCli, 'publish']);
        console.log(chalk.green('发布完成'))
    } catch (e) {
        console.log(chalk.red('发布失败'))
    }

}
publish();