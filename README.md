"# DxBuildProject" 

## GULP 打包编译
### gulp API

#### [gulp.src](https://www.gulpjs.com.cn/docs/api/)    
gulp.src(globs[, options])         

            输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。 将返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。

            gulp.src('client/templates/*.jade')
            .pipe(jade())
            .pipe(minify())
            .pipe(gulp.dest('build/minified_templates'));
            glob 请参考 node-glob 语法 或者，你也可以直接写文件的路径。

            globs

            类型： String 或 Array

            所要读取的 glob 或者包含 globs 的数组。

            options

            类型： Object

            通过 glob-stream 所传递给 node-glob 的参数。

            除了 node-glob 和 glob-stream 所支持的参数外，gulp 增加了一些额外的选项参数：

            options.buffer

            类型： Boolean 默认值： true

            如果该项被设置为 false，那么将会以 stream 方式返回 file.contents 而不是文件 buffer 的形式。这在处理一些大文件的时候将会很有用。**注意：**插件可能并不会实现对 stream 的支持。

            options.read

            类型： Boolean 默认值： true

            如果该项被设置为 false， 那么 file.contents 会返回空值（null），也就是并不会去读取文件。

            options.base

            类型： String 默认值： 将会加在 glob 之前 (请看 glob2base)

            如, 请想像一下在一个路径为 client/js/somedir 的目录中，有一个文件叫 somefile.js ：


#### gulp.dest 
gulp.dest(path[, options])

        能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。

        gulp.src('./client/templates/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./build/templates'))
        .pipe(minify())
        .pipe(gulp.dest('./build/minified_templates'));
        文件被写入的路径是以所给的相对路径根据所给的目标目录计算而来。类似的，相对路径也可以根据所给的 base 来计算。 请查看上述的 gulp.src 来了解更多信息。
        path
        类型： String or Function
        文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径，这个函数也可以由 vinyl 文件实例 来提供。
        options
        类型： Object
        options.cwd
        类型： String 默认值： process.cwd()
        输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效。
        options.mode
        类型： String 默认值： 0777
        八进制权限字符，用以定义所有在输出目录中所创建的目录的权限。

#### typescript 
npm install --save-dev typescript  gulp-typescript

        {
        "files": [
                "src/main.ts"
        ],
        "compilerOptions": {
                "noImplicitAny": true,
                "target": "es5"
        }
        }

#### node 插件
npm install --save-dev del 删除文件
npm install --save-dev chalk 颜色字体日志
npm install --save-dev run-sequence 同步执行gulp任务
npm install --save-dev yargs node 参数转换
##### 文件流
through2  操作流
through2-filter 过滤流
through2-map 修改流     
npm install through2 through2-filter through2-map

        fs.createReadStream('ex.txt')
        .pipe(through2(function (chunk, enc, callback) {
        for (var i = 0; i < chunk.length; i++)
        if (chunk[i] == 97)
        chunk[i] = 122 // swap 'a' for 'z' 

        this.push(chunk)

        callback()
        }))
        .pipe(fs.createWriteStream('out.txt'))
        .on('finish', function () {
        doSomethingSpecial()
        })

        var skip = through2(function (chunk, encoding, callback) {
        // skip buffers longer than 100 
        if (chunk.length < 100) this.push(chunk)
        return callback()
        })
        

##### glob文件
npm i glob --save-dev  

        var glob = require("glob")
        
        // options is optional 
        glob("**/*.js", options, function (er, files) {
        // files is an array of filenames. 
        // If the `nonull` option is set, and nothing 
        // was found, then files is ["**/*.js"] 
        // er is an error object or null. 
        })
        以下字符在路径部分使用时具有特殊的魔法含义：

        * 匹配单个路径部分中的0个或更多个字符
        ? 匹配1个字符
        [...]匹配一系列字符，与RegExp范围类似。如果范围的第一个字符是!或^然后它匹配任何不在范围内的字符。
        !(pattern|pattern|pattern) 匹配任何不符合提供的任何模式的东西。
        ?(pattern|pattern|pattern) 匹配提供的模式零次或一次。
        +(pattern|pattern|pattern) 匹配一个或多个出现的模式。
        *(a|b|c) 匹配零次或多次出现的模式
        @(pattern|pat*|pat?erN) 完全匹配提供的模式之一
        **如果“globstar”在路径部分单独存在，则匹配零个或多个目录和搜索匹配的子目录。它不抓取符号链接的目录。


##### gulp插件
npm install --save-dev gulp-plumber [抑制错误处理](https://www.npmjs.com/package/gulp-plumber)
npm install gulp-rename --save-dev  [文件重命名](https://www.npmjs.com/package/gulp-rename)           
npm install --save-dev gulp-uglify  [js压缩](https://www.npmjs.com/package/gulp-uglify)
npm install gulp-util --save-dev [工具](https://www.npmjs.com/package/gulp-util)
npm install gulp-sourcemaps [源码地图映射](https://www.npmjs.com/package/gulp-sourcemaps)
npm install gulp-if [条件判断](https://www.npmjs.com/package/gulp-if)
npm install --save-dev gulp-concat [文件合并](https://www.npmjs.com/package/gulp-concat)
npm install --save-dev gulp-autoprefixer [css 前缀](https://www.npmjs.com/package/gulp-autoprefixer)
$ npm install --save-dev gulp-babel babel-preset-env [es6语法转换](https://www.npmjs.com/package/gulp-babel)
npm install --save-dev gulp-imagemin [图片压缩](https://www.npmjs.com/package/gulp-imagemin)
npm install gulp-clean-css --save-dev [css压缩](https://www.npmjs.com/package/gulp-clean-css)
npm install --save-dev gulp-filter [文件过滤](https://www.npmjs.com/package/gulp-filter)
npm install gulp-less [less编译](https://www.npmjs.com/package/gulp-less)
npm install gulp-sass --save-dev [sass编译](https://www.npmjs.com/package/gulp-sass) 
PostCSS gulp插件通过几个插件来管道CSS，但只解析CSS一次。
npm install --save-dev gulp-postcss [解析css](https://www.npmjs.com/package/gulp-postcss)
npm i gulp-htmlmin --save-dev [html压缩](https://www.npmjs.com/package/gulp-htmlmin)
npm install --save-dev gulp-changed [否决不变的文件](https://www.npmjs.com/package/gulp-changed)
npm install --save-dev gulp-zip [压缩包](https://www.npmjs.com/package/gulp-zip)
npm install --save-dev gulp-template [underscore template](https://www.npmjs.com/package/gulp-template)
npm install --save-dev gulp-iconfont [svn 转换font](https://www.npmjs.com/package/gulp-iconfont)
npm install my-engine-smith@latest --save-dev [图片合并](https://www.npmjs.com/package/gulp.spritesmith)
npm install gulp-file-include  [html头部引入](https://www.npmjs.com/package/gulp-file-include)
npm install --save-dev gulp-markdown [markdown转换](https://www.npmjs.com/package/gulp-markdown)
npm install gulp-sort --save-dev [排序](https://www.npmjs.com/package/gulp-sort)
npm install --save-dev gulp-notify [通知](https://www.npmjs.com/package/gulp-notify)
npm install --save-dev gulp-each [循环文件]()

        gulp.src("./src/**/hello.txt")
        .pipe(rename(function (path) {
        path.dirname += "/ciao";
        path.basename += "-goodbye";
        path.extname = ".md"
        }))
        .pipe(gulp.dest("./dist"));

                gulp.src("./src/main/text/hello.txt", { base: process.cwd() })
        .pipe(rename({
        dirname: "main/text/ciao",
        basename: "aloha",
        prefix: "bonjour-",
        suffix: "-hola",
        extname: ".md"
        }))
        .pipe(gulp.dest("./dist"));
         
         **文件过滤**
        const gulp = require('gulp');
        const uglify = require('gulp-uglify');
        const filter = require('gulp-filter');
        
        gulp.task('default', () => {
        // Create filter instance inside task function 
        const f = filter(['**', '!*src/vendor'], {restore: true});
        
        return gulp.src('src/**/*.js')
                // Filter a subset of the files 
                .pipe(f)
                // Run them through a plugin 
                .pipe(uglify())
                // Bring back the previously filtered out files (optional) 
                .pipe(f.restore)
                .pipe(gulp.dest('dist'));
        });
        // html 压缩
        gulp.task('minify', function() {
        return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
        });