const fs=require('fs');
const nodePath=require('path');
const {getCurrentPathDirs}=require('./util');
const pkgPath=nodePath.resolve(__dirname,'../../packages');
function getPackages(join=false){
    return getCurrentPathDirs(pkgPath,join);
}
function getPackagesInfo(){
    let packages=getPackages();
    let pkgs=packages.map((name)=>{
        let pkgPath=nodePath.relative(__dirname,nodePath.resolve(__dirname,'../../packages/'+name+'/package.json'))
        if(!fs.existsSync(pkgPath)){
            return false;
        }
        let obj=require(pkgPath);
        return obj.buildConfig;
    }).filter(Boolean);
    return pkgs;
}
exports.getPackages=getPackages;
exports.getPackagesInfo=getPackagesInfo;