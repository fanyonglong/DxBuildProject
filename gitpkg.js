const {spawn,spawnSync,exec,execSync,execFile,execFileSync}=require('child_process');
//const execa =require('execa');
const chalk=require('chalk');
var pkgs=["d3-array",
"d3-axis",
"d3-brush",
"d3-chord",
"d3-collection",
"d3-color",
"d3-contour",
"d3-dispatch",
"d3-drag",
"d3-dsv",
"d3-ease",
"d3-fetch",
"d3-force",
"d3-format",
"d3-geo",
"d3-hierarchy",
"d3-interpolate",
"d3-path",
"d3-polygon",
"d3-quadtree",
"d3-random",
"d3-scale",
"d3-scale-chromatic",
"d3-selection",
"d3-shape",
"d3-time",
"d3-time-format",
"d3-timer",
"d3-transition",
"d3-voronoi",
"d3-zoom"];

var len=pkgs.length,c=0;
function clonePackage(name){
    console.log(chalk.green('正在获取',name));
    try{
    let obj =spawnSync('git',['clone','https://github.com/d3/'+name+'.git','./temp/d3/'+name,'--depth',1],{
        timeout:30000
    });
    console.log(chalk.green('获取完成',name,obj.status,',error:',obj.error?obj.error.message:"无"));
    }catch(e){
        console.log('error',e)
    }
    c++;
}
pkgs.forEach(function(name){
    console.log(chalk.blue('complete',Number(c/len*100),'%'));
    clonePackage(name);

})
console.log(chalk.blue('complete',Number(c/len*100),'%'));
console.log(chalk.blue('all complete'));