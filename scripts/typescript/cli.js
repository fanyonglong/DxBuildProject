const {program,command}=require('commander');
const del=require('del');
const path=require('path');
const {spawn}=require('../utils/process')

function run(){
    let args=process.argv.slice(2);

    //execSync('node',[path.join(__dirname,,'node_modules/typescript/bin/tsc')])
}