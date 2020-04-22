const {program,command}=require('commander');
const del=require('del');
const path=require('path')

program.command('del <package> <dirs...>').description('删除目录').action(function(package,dirs){
    let pkgPath=path.join(__dirname,'..','packages',package);
  //  console.log('del command')
    if(dirs.length<=0){
        return;
    }
   // console.log(dirs.map(dir=>path.join(pkgPath,dir)).join())
    del.sync(dirs.map(dir=>path.join(pkgPath,dir)))
});
program.parse(process.argv)