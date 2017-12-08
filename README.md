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