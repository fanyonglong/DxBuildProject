const gulp=require('gulp')
const runSequence=require('run-sequence');
const path=require('path');
const del=require('del');
const babel=require('gulp-babel');
const concat=require('gulp-concat');
var merge = require('merge2');
const eslint=require('gulp-eslint');
const requirejs=require('requirejs/bin/r')
const child_process=require('child_process');
var browserify = require('browserify');
const through2=require('through2')
var source = require('vinyl-source-stream')
const rename=require('gulp-rename');
const gulpStreamify=require('gulp-streamify');
const argv=require('yargs').options({
    "module":{
        type:"string",
        describe:"打包模块名称",
        default:'',
        requiresArg:true
    }

}).argv;

gulp.task('clean',()=>{
   return del(['./dist/jquery/**','!./dist/jquery']);
});
gulp.task('eslint',()=>{  
    return gulp.src('src/jquery/**/*.js')
        //  ESLint忽略带有“node_modules”路径的文件。 
        //  所以，最好还是不要忽略目录。 
        //  另外，确保从任务中返回流; 
        //  否则，任务可能会在流完成之前结束。 
        .pipe(eslint())
        // .pipe(eslint.result(result=>{

        //     console.log(`ESLint result: ${result.filePath}`);
        //     console.log(`# Messages: ${result.messages.length}`);
        //     console.log(`# Warnings: ${result.warningCount}`);
        //     console.log(`# Errors: ${result.errorCount}`);
        // }))
        //  eslint.format（）将lint结果输出到控制台。 
        //  或者使用eslint.formatEach（）（请参阅文档）
         .pipe(eslint.format())
        //  让进程退出并显示错误代码（1） 
        // lint错误，最后返回流和管道failAfterError。 
       .pipe(eslint.failAfterError());
});
var rdefineEnd = /\}\s*?\);[^}\w]*$/;

function convert( name, path, contents ) {
    var amdName;

    // Convert var modules
    if ( /.\/var\//.test( path.replace( process.cwd(), "" ) ) ) {
        contents = contents
            .replace(
                /define\([\w\W]*?return/,
                "var " +
                ( /var\/([\w-]+)/.exec( name )[ 1 ] ) +
                " ="
            )
            .replace( rdefineEnd, "" );

    // Sizzle treatment
    } else if ( /\/sizzle$/.test( name ) ) {
        contents = "var Sizzle =\n" + contents

            // Remove EXPOSE lines from Sizzle
            .replace( /\/\/\s*EXPOSE[\w\W]*\/\/\s*EXPOSE/, "return Sizzle;" );

    } else {

        contents = contents
            .replace( /\s*return\s+[^\}]+(\}\s*?\);[^\w\}]*)$/, "$1" )

            // Multiple exports
            .replace( /\s*exports\.\w+\s*=\s*\w+;/g, "" );

        // Remove define wrappers, closure ends, and empty declarations
        contents = contents
            .replace( /define\([^{]*?{\s*(?:("|')use strict\1(?:;|))?/, "" )
            .replace( rdefineEnd, "" );

        // Remove anything wrapped with
        // /* ExcludeStart */ /* ExcludeEnd */
        // or a single line directly after a // BuildExclude comment
        contents = contents
            .replace( /\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "" )
            .replace( /\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "" );

        // Remove empty definitions
        contents = contents
            .replace( /define\(\[[^\]]*\]\)[\W\n]+$/, "" );
    }

    // AMD Name
    if ( ( amdName ='amd') != null && /^exports\/amd$/.test( name ) ) {
        if ( amdName ) {
            console.log( "Naming jQuery with AMD name: " + amdName );
        } else {
            console.log( "AMD name now anonymous" );
        }

        // Remove the comma for anonymous defines
        contents = contents
            .replace( /(\s*)"jquery"(\,\s*)/, amdName ? "$1\"" + amdName + "\"$2" : "" );

    }
    return contents;
}
gulp.task('js',(cb)=>{  

    requirejs.optimize({
       // appDir: "./",
       // baseUrl:'./src/jquery/',
        baseUrl: './src/jquery/',
        out:'./dist/jquery/'+argv.module+'.js',
        //dir:"",
     	// Allow strict mode
		useStrict: true,
        optimize:'none',
        
			// Include dependencies loaded with require
	    findNestedDependencies: true,

			// Avoid inserting define() placeholder
		skipModuleInsertion: true,

			// Avoid breaking semicolons inserted by r.js
	    // skipSemiColonInsertion: true,
		// 	wrap: {
		// 		start: wrapper[ 0 ].replace( /\/\*\s*eslint(?: |-).*\s*\*\/\n/, "" ),
		// 		end: wrapper[ 1 ]
		// },
		rawText: {},
        name: argv.module,
        onBuildWrite:convert

    },()=>{

        console.log('完成');
        cb();
    },(e)=>{
        console.log(e);
        cb();
    });
    
});
gulp.task('js2',()=>{  

    // .require(["./core",
	// "./core/toType",
	// "./var/isFunction",
	// "./var/rnothtmlwhite"],{
    //     expose:false
    // })
    // pipe(through2.obj(function(chunk, enc, callback){
    //     var str=chunk.toString();
    //   console.log(chunk.toString());
    //   // str = chunk.contents.toString();
    //   //chunk.contents = new Buffer(str.replace('define','require'));
    //   callback(null,new Buffer(str))
    // }))
   //var aa=require('browserify-shim')
    browserify([argv.module+'.js'],{
       // transform:[aa('./core')],
       // transform:aa('callbacks'),
       browserField:false,
        bundleExternal:true,
        ignoreMissing:false,
        node:false,
   
        basedir:path.resolve(__dirname,'../../src/jquery')
    }).require('./core',{
        expose:'core'
    }).bundle().on('error', function(error) {
        console.log(error.stack, error.message);
        this.emit('end');
      }).pipe(source(argv.module+'.js')).pipe(gulp.dest('./dist/jquery'));
    
});
     
 module.exports=function(cb)
 {
     runSequence('js',cb);
 }