const gulp=require('gulp');
const path=require('path');
const globby=require('globby')
const glob=require('glob');
const through2=require('through2');

const sourcePath='D:\\java\\workspace\\ucenter\\WebRoot';
const targetPath='D:\\Program Files\\apache-tomcat-8.5.32\\webapps';
// gulp.task('jsp',()=>{
//     gulp.watch('')
// })

function copyFile(strPath){
        gulp.src(strPath,{
            base:sourcePath
        }).pipe(gulp.dest('./ucenter2',{
            cwd:targetPath
        }))
}
gulp.task('test',()=>{
    gulp.src('D:\\java\\workspace\\ucenter\\WebRoot\\index.jsp').pipe(through2.obj(function(chunk, enc, cb){
       console.log(chunk.path)
        cb(null, chunk) 
    }))
})
gulp.task('start',()=>{

    gulp.watch('**/*.@(js|jsp|css)',{
        cwd:sourcePath
    },(e)=>{
            console.log(e.type,e.path);
            if(e.type=="added"||e.type=="changed"){
                copyFile(path.join(sourcePath,e.path))
            }
    })
})

gulp.task('globby',async ()=>{
    let paths=await globby(sourcePath,{
        expandDirectories: {
            files: ['*'],
            extensions: ['jsp','css']
        }
    })
    console.log(paths)
})
gulp.task('glob',async ()=>{
      glob("**/*.js", {
        cwd:sourcePath,
      }, function (er, files) {
        console.log(files)
      })
})