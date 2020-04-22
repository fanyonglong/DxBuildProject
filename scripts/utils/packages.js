const fs=require('fs');
const nodePath=require('path');
const {getCurrentPathDirs}=require('./util');
const pkgPath=nodePath.resolve(__dirname,'../../packages');
function getPackages(join=false){
    return getCurrentPathDirs(pkgPath,join);
}
exports.getPackages=getPackages;