"# DxBuildProject" 

## GULP 打包编译
### gulp API

#### glob 语法
        “Globs”是你ls *.js在命令行中输入内容时所键入的模式，或者放在build/*一个.gitignore文件中。
        在解析路径部分模式之前，支撑部分被扩展为一个集合。带括号的部分以任何数量的以逗号分隔的部分开始{和结束}。支撑部分可能包含斜线字符，所以a{/b/c,bcd}会扩展成a/b/c和abcd。
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

#### web 开发插件

#### node 插件
npm install del --save-dev  删除文件
npm install chalk --save-dev 颜色字体日志
npm install run-sequence --save-dev 同步执行gulp任务
npm install yargs  --save-dev 参数转换
npm install replace-ext [替换后缀](https://www.npmjs.com/package/replace-ext)
npm install pump --save-dev [串联流处理,错误处理](https://www.npmjs.com/package/pump)
npm install html-minifier [html压缩](https://www.npmjs.com/package/html-minifier)
npm install uglify-js -g [js压缩](https://www.npmjs.com/package/uglify-js)
npm install uglify-es -g [es6压缩](https://www.npmjs.com/package/uglify-es)
npm install filesize [文件大小](https://www.npmjs.com/package/filesize)

##### uglify 压缩参数
        代码生成器尝试输出默认可能的最短代码。如果你想美化输出，传递--beautify（-b）。或者，您可以传递控制代码输出的其他参数：
        ascii_only（默认false） - 在字符串和正则表达式中转义Unicode字符（影响非ASCII字符变为无效的指令）
        beautify（默认true） - 是否实际上美化输出。传递-b将设置为true，但是-b即使想要生成缩小的代码，也可能需要传递，以便指定其他参数，因此您可以使用-b beautify=false它来覆盖它。
        bracketize（默认false） -总是插在括号中if，for， do，while或with语句，即使他们的身体是一个单独的语句。
        comments（默认false） - 传递true或"all"保留所有注释，"some"保留一些注释，正则表达式字符串（例如/^!/）或函数。
        indent_level（默认4）
        indent_start（默认0） - 在所有行的前面加上许多空格
        inline_script（默认false） - </script在字符串中出现斜线
        keep_quoted_props（默认false） - 打开时，可防止从对象字面值中的属性名称中剥离引号
        max_line_len（默认false） - 最大行长度（用于简化代码）
        preamble（默认null） - 传递时，它必须是一个字符串，它将被直接前缀到输出。源地图将调整为这个文本。例如，可以用来插入包含许可信息的评论。
        preserve_line（默认false） - 通过true保留行，但只有beautify设置为false。
        quote_keys（默认false） - 通过true引用字面对象中的所有键
        quote_style（默认0） - 字符串的首选引用样式（也影响引用的属性名称和指令）：
        0 - 更喜欢双引号，当字符串本身有更多的双引号时，切换到单引号。0最适合gzip大小。
        1 - 总是使用单引号
        2 - 总是使用双引号
        3 - 始终使用原来的报价
        semicolons（默认true） - 用分号分隔语句。如果你false尽可能通过，我们将使用换行符而不是分号，从而导致更易读的输出（gzip之前的大小可能更小; gzip之后的大小不显着更大）。
        shebang（默认true） - #!在序言中保留shebang （bash脚本）
        webkit（默认false） - 启用WebKit错误的解决方法。PhantomJS用户应该设置这个选项true。
        width（默认80） - 仅在美化时生效，这指定了美化者将尝试遵从的（定向）线宽。它是指行文本的宽度（不包括缩进）。目前它不能很好地工作，但它确实使UglifyJS生成的代码更具可读性。
        wrap_iife（默认false） - 传递true包装立即调用函数表达式。请参阅 ＃640了解更多详情。

##### 文件流
npm install glob-stream) [readable流](https://www.npmjs.com/package/glob-stream)
npm install --save-dev through2  操作流
npm install --save-dev through2-filter 过滤流
npm install --save-dev through2-map 修改流     
npm install through2 through2-filter through2-map --save-dev

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
npm install globby  [基于glob模式匹配文件](https://www.npmjs.com/package/globby)
npm install glob --save-dev  [模式匹配文件](https://www.npmjs.com/package/glob)

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

#### web服务器
npm install express [express](https://www.npmjs.com/package/express)
npm install connect [connect](https://www.npmjs.com/package/connect)
#### 测试插件
npm install mocha [node和web测试](https://www.npmjs.com/package/mocha)  单元测试的框架,自动化测试
npm install karma [浏览器运行环境测试](https://www.npmjs.com/package/karma) 跑测试的驱动,自动化测试
npm install jasmine  [测试](https://www.npmjs.com/package/jasmine) 对第本版浏览器由比较号的支持,自动化测试
npm install eslint [js检测](https://www.npmjs.com/package/eslint)
npm install stylelint [样式检测](https://www.npmjs.com/package/stylelint)
npm install tslint [typescript检测](https://www.npmjs.com/package/tslint)
npm install sass-lint [sass检测](https://www.npmjs.com/package/sass-lint)
npm install gulp-lesshint --save-dev [less检测](https://www.npmjs.com/package/gulp-lesshint)
##### gulp插件
npm install gulp-livescript [js编译器](https://www.npmjs.com/package/gulp-livescript)
npm install gulp-watch [文件观察](https://www.npmjs.com/package/gulp-watch) 使用超快速chokidar并且发射乙烯基对象的文件观察者。
npm install gulp-plumber  --save-dev [抑制错误处理](https://www.npmjs.com/package/gulp-plumber)
npm install gulp-rename --save-dev  [文件重命名](https://www.npmjs.com/package/gulp-rename)           
npm install gulp-uglify  --save-dev [js压缩](https://www.npmjs.com/package/gulp-uglify)
npm install gulp-util --save-dev [工具](https://www.npmjs.com/package/gulp-util)
npm install gulp-sourcemaps --save-dev [源码地图映射](https://www.npmjs.com/package/gulp-sourcemaps)
npm install gulp-if  --save-dev [条件判断](https://www.npmjs.com/package/gulp-if)
npm install gulp-concat  --save-dev [文件合并](https://www.npmjs.com/package/gulp-concat)
npm install gulp-autoprefixer   --save-dev[css 前缀](https://www.npmjs.com/package/gulp-autoprefixer)
npm install gulp-react [React jsx语法转换](https://www.npmjs.com/package/gulp-react)
npm install gulp-babel babel-preset-env  --save-dev  [es6语法转换](https://www.npmjs.com/package/gulp-babel)
npm install gulp-imagemin  --save-dev  [图片压缩](https://www.npmjs.com/package/gulp-imagemin)
npm install gulp.spritesmith-multi [图片合并包装器](https://www.npmjs.com/package/gulp.spritesmith-multi)
npm install gulp.spritesmith [图片合并](https://www.npmjs.com/package/gulp.spritesmith)
npm install gulp-clean-css --save-dev [css压缩](https://www.npmjs.com/package/gulp-clean-css)
npm install gulp-filter  --save-dev  [文件过滤](https://www.npmjs.com/package/gulp-filter)
npm install gulp-less  --save-dev [less编译](https://www.npmjs.com/package/gulp-less)
npm install gulp-sass --save-dev [sass编译](https://www.npmjs.com/package/gulp-sass) 
PostCSS gulp插件通过几个插件来管道CSS，但只解析CSS一次。
npm install gulp-postcss  --save-dev  [解析css](https://www.npmjs.com/package/gulp-postcss)
npm install gulp-htmlmin --save-dev [html压缩](https://www.npmjs.com/package/gulp-htmlmin)
npm install gulp-changed  --save-dev [否决不变的文件](https://www.npmjs.com/package/gulp-changed)
npm install gulp-zip [压缩包](https://www.npmjs.com/package/gulp-zip)
npm install gulp-template  --save-dev [underscore template](https://www.npmjs.com/package/gulp-template)
npm install gulp-iconfont  --save-dev [svn 转换font](https://www.npmjs.com/package/gulp-iconfont)
npm install gulp-file-include  --save-dev  [html头部引入](https://www.npmjs.com/package/gulp-file-include)
npm install gulp-markdown --save-dev  [markdown转换](https://www.npmjs.com/package/gulp-markdown)
npm install gulp-sort --save-dev [排序](https://www.npmjs.com/package/gulp-sort)
npm install gulp-notify  --save-dev [通知](https://www.npmjs.com/package/gulp-notify)
npm install gulp-each  --save-dev [循环文件](https://www.npmjs.com/package/gulp-each)
npm install merge2 --save-dev [合并数据流](https://www.npmjs.com/package/merge2)
npm install gulp-open --save-dev [打开浏览器](https://www.npmjs.com/package/gulp-open)
npm install opn   --save-dev [打开浏览器](https://www.npmjs.com/package/opn)
npm install shuji  --save-dev [根据source map还原js](https://www.npmjs.com/package/shuji)
npm install gulp-debug --save-dev [调试](https://www.npmjs.com/package/gulp-debug)
npm install gulp-git --save-dev [git代码管理](https://www.npmjs.com/package/gulp-git)
npm install gulp-posthtml [处理html](https://www.npmjs.com/package/gulp-posthtml)
npm install gulp-sitemap --save-dev  [SEO优化](https://www.npmjs.com/package/gulp-sitemap)
npm install gulp-mocha [测试](https://www.npmjs.com/package/gulp-mocha)
npm install gulp-beautify [js美化](https://www.npmjs.com/package/gulp-beautify)


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


        --source-map                 指定生成源的输出文件。
                                     地图。
        --source-map-root            要包含的原始源的路径。
                                     在源地图中。
        --source-map-url             对源图的路径为/ / #添加
                                     sourcemappingurl。默认值传递
                                     带源映射。
        --source-map-include-sources 如果您要包含此标志，请传递此标志
                                     源映射中源文件的内容如下
                                     sourcescontent财产。
        --source-map-inline          写的base64编码的源图到最后JS输出。
        --in-source-map              输入源映射，如果压缩的话很有用
                                     js是从其他原始版本生成的
                                     代码。如果包含源映射，请指定“内联”。
                                     内联源代码。
        --screw-ie8                  如果您不希望支持，请使用此标志
                                     IE浏览器6/7／8。
                                     默认情况下，UglifyJS不会是IE的证明。
        --support-ie8                使用此标志支持Internet Explorer 6/7／8。
                                     相当于设置` screw_ie8：假`在` minify() `
                                     对于`压缩`，`损坏`和`输出`选项。
        --expr                       解析单个表达式，而不是
                                     程序（用于解析JSON）
        -p, --prefix                 跳过原始文件名前缀，出现
                                     源映射中。例如，P 3将下降3。
                                     文件名的目录，并确保它们是
                                     相对路径。还可以指定p
                                     相对的，这将使uglifyjs找出
                                     原之间的相对路径
                                     源文件、源映射和输出文件。
        -o, --output                 输出文件（默认输出）。
        -b, --beautify               美化输出/指定输出选项。
        -m, --mangle                 芒果的名字/通过绞肉机的选择。
        -r, --reserved               保留的名称排除重整。
        -c, --compress               启用压缩机/传递压缩机选项，例如
                                     ` C的if_return = false，pure_funcs = [“数学。战俘”、“console.log"]'`
                                     不需要参数来启用默认压缩
                                     选项。
        -d, --define                 全局定义
        -e, --enclose                将所有东西嵌入一个大函数中，用
                                     可配置参数/参数列表。
        --comments                   保留输出中的版权注释。通过
                                     默认情况下，这就像谷歌关闭，保持
                                     JsDoc风格的注释包含“@证”或
                                     “保存”。您可以随意传递其中的一个
                                     对这个旗帜进行争论：
                                     -“全部”保留所有评论
                                     一个有效的JS regexp像` /富/ `或` / ^！/ `来
                                     只保留匹配注释。
                                     注意，当前不* * *注释可以是
                                     压缩时保持，因为死了
                                     代码删除或级联语句
                                     序列。
        --preamble                   序言开头的输出。你可以使用
                                     这是插入注释，例如
                                     许可信息。这不会是
                                     解析，但源映射将对其进行调整。
                                     的存在。
        --stats                      显示操作的运行时错误。
        --acorn                      使用橡子进行解析。
        --spidermonkey               假设输入文件格式SpiderMonkey AST
                                     （如JSON）。
        --self                       建立自己的（uglifyjs2）作为一个库（意味着
                                     ——包= uglifyjs --出口）
        --wrap                       将所有东西嵌入一个大函数中，使
                                     “出口”和“全球”变量可用。你
                                     需要将参数传递给这个选项
                                     指定模块将采用的名称。
                                     当包含在浏览器中。
        --export-all                 只有当——包装，这告诉UglifyJS
                                     添加代码以自动导出所有的全局变量。
        --lint                       显示某些范围警告
        -v, --verbose                冗长的
        -V, --version                打印版本号和出口。
        --noerr                      不要为C中的未知选项抛出错误，
                                     - B或M。
        --bare-returns               允许函数外返回。有用的时候
                                     削减CommonJS模块和Userscripts
                                     可能是匿名函数包（生活）的
                                     user.js `来电`发动机。
        --keep-fnames                不损坏/删除函数名称。有用的
                                     依托function.prototype.name代码。
        --reserved-file              包含保留名的文件
        --reserve-domprops           （大多数？）保留的DOM属性
                                     ——扭曲的道具
        --mangle-props               扭曲的属性名称（默认` 0 `）。设置
                                     `真`或` 1 `损坏所有属性名称。集
                                     对`非上市`或` 2 `只影响非上市
                                     属性名称。模式“2”也使
                                     ` keep_quoted_props `美化器选项
                                     保留关于属性名和引号的引号
                                     禁用“属性”压缩器选项
                                     防止用圆点重写引用属性
                                     符号。可以通过设置覆盖这些内容。
                                     它们显式地在命令行上。
        --mangle-regex               只有把物业名称匹配的正则表达式
        --name-cache                 文件保存名称映射的错位
        --pure-funcs                 可以安全地删除的函数，如果
                                     不使用返回值，例如。
                                     ` --纯funcs math.floor信息`控制台。
                                     （要求“压缩”）