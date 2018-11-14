"# DxBuildProject" 
# 项目构建
- [生成器](#生成器)
  - [扩展生成器](#扩展生成器)
  - [运行上下文](#运行上下文)
  - [用户交互](#用户交互)
## GULP 打包编译
### 打包工具
- [Browserify](#Browserify)
- Duo
- Grunt
- [Gulp](#gulp插件)
- Jspm
- Webpack
- MSBuild
- NuGet
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
```js 
gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'

gulp.src('client/js/**/*.js', { base: 'client' })
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'
```

#### [gulp.src](#https://www.gulpjs.com.cn/docs/api/)    
gulp.src(globs[, options])         
```
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
```

#### gulp.dest 
gulp.dest(path[, options])

能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。
```js
gulp.src('./client/templates/*.jade')
.pipe(jade())
.pipe(gulp.dest('./build/templates'))
.pipe(minify())
.pipe(gulp.dest('./build/minified_templates'));
```
文件被写入的路径是以所给的相对路径根据所给的目标目录计算而来。类似的，相对路径也可以根据所给的 base 来计算。 请查看上述的 gulp.src 来了解更多信息。
path
类型： `String or Function`
文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径，这个函数也可以由 vinyl 文件实例 来提供。
options
类型： Object
options.cwd
类型： String 默认值： process.cwd()
输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效。
options.mode
类型： String 默认值： 0777
八进制权限字符，用以定义所有在输出目录中所创建的目录的权限。
 [, opts], tasks) 或 gulp.watch(glob [, opts, cb])
监视文件，并且可以在文件发生改动时候做一些事情。它总会返回一个 EventEmitter 来发射（emit） change 事件。

#### gulp.watch(glob[, opts], tasks)
glob
类型： String or Array

一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。

opts
类型： Object

传给 gaze 的参数。
options 传入的选项对象。
interval {integer}传递给的间隔 fs.watchFile
debounceDelay {integer}对于同一文件/事件连续调用的事件的延迟（以毫秒为单位）
mode{string}强制观看模式。无论是'auto'（默认值）， 'watch'（力原生的事件），或'poll'（力统计轮询）。
cwd{string}当前基于文件模式的工作目录。默认是process.cwd()。

tasks
类型： Array

需要在文件变动后执行的一个或者多个通过 gulp.task() 创建的 task 的名字，
```js
var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```
gulp.watch(glob[, opts, cb])
glob
类型： String or Array

一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。

opts
类型： Object

传给 gaze 的参数。

cb(event)
类型： Function

每次变动需要执行的 callback。

gulp.watch('js/**/*.js', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
callback 会被传入一个名为 event 的对象。这个对象描述了所监控到的变动：

event.type
类型： String

发生的变动的类型：added, changed 或者 deleted。

event.path
类型： String

触发了该事件的文件的路径。

#### typescript 
npm install --save-dev typescript  gulp-typescript
```json
{
"files": [
        "src/main.ts"
],
"compilerOptions": {
        "noImplicitAny": true,
        "target": "es5"
}
}
```

#### node 插件
npm install del --save-dev  删除文件   
npm install chalk --save-dev 颜色字体日志   
npm install run-sequence --save-dev 同步执行gulp任务   
npm install yargs  --save-dev 命令行参数解析   
npm install commander --save-dev 命令行参数解析
npm install replace-ext [替换后缀](#https://www.npmjs.com/package/replace-ext)   
npm install pump --save-dev [串联流处理,错误处理](#https://www.npmjs.com/package/pump)   
npm install html-minifier [html压缩](#https://www.npmjs.com/package/html-minifier)   
npm install uglify-js -g [js压缩](#https://www.npmjs.com/package/uglify-js)   
npm install uglify-es -g [es6压缩](#https://www.npmjs.com/package/uglify-es)   
npm install filesize [文件大小](#https://www.npmjs.com/package/filesize)   
npm install source-map [js源文件映射](#https://www.npmjs.com/package/source-map)   
npm install browser-sync [浏览器同步](#https://www.npmjs.com/package/browser-sync)  
npm install -g yo   是一个通用的脚手架系统，允许创建任何类型的应用程序。它可以快速开始新项目，并简化现有项目的维护。   
npm install yeoman-generator -g  创建自定义脚手架插件，基类   
npm install --save-dev Inquirer [用户交互命令](#https://www.npmjs.com/package/inquirer) 通用交互式命令行用户界面的集合。   
npm install opn   --save-dev [打开浏览器](#https://www.npmjs.com/package/opn)  

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
npm install vinyl-source-stream 
npm install through2 --save-dev  [操作流](#https://www.npmjs.com/package/through2)    
npm install through2-filter --save-dev [过滤流](#https://www.npmjs.com/package/through2-filter)    
npm install through2-map --save-dev [修改流](#https://www.npmjs.com/package/through2-map)   
npm install merge2 --save-dev  [合并流](#https://www.npmjs.com/package/merge2)    
npm install through2 through2-filter through2-map --save-dev   
```javascript
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
```   

##### glob文件
npm install globby  [基于glob模式匹配文件](#https://www.npmjs.com/package/globby)   
npm install glob --save-dev  [模式匹配文件](#https://www.npmjs.com/package/glob)
npm install glob-stream) [readable流](#https://www.npmjs.com/package/glob-stream)       

```javascript 
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

var gs = require('glob-stream');
 
//将glob字符串或glob字符串数组作为第一个参数，将options对象作为第二个参数。返回包含对象流cwd，base和path性能。
var readable = gs('./files/**/*.coffee', { /* options */ });
 
var writable = /* your WriteableStream */
 
readable.pipe(writable);
```


#### web服务器
npm install express [express](#https://www.npmjs.com/package/express)    
npm install connect [connect](#https://www.npmjs.com/package/connect)    
#### 测试插件
npm install mocha [node和web测试](#https://www.npmjs.com/package/mocha)  单元测试的框架,自动化测试           
npm install karma [浏览器运行环境测试](#https://www.npmjs.com/package/karma) 跑测试的驱动,自动化测试           
npm install jasmine  [测试](#https://www.npmjs.com/package/jasmine) 对第本版浏览器由比较号的支持,自动化测试           
npm install eslint [js检测](#https://www.npmjs.com/package/eslint)           
npm install stylelint [样式检测](#https://www.npmjs.com/package/stylelint)           
npm install tslint [typescript检测](#https://www.npmjs.com/package/tslint)           
npm install sass-lint [sass检测](#https://www.npmjs.com/package/sass-lint)           
npm install gulp-lesshint --save-dev [less检测](#https://www.npmjs.com/package/gulp-lesshint)      
npm install debug  [调试](#https://www.npmjs.com/package/debug)

#### babel 
npm install gulp-babel babel-core babel-preset-env  --save-dev  [es6语法转换](#https://www.npmjs.com/package/gulp-babel)   
npm install babel-eslint --save-dev [babel检测](#https://www.npmjs.com/package/babel-eslint)   
npm install babel-plugin-transform-es2015-modules-amd  --save-dev [模块化](#https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-amd) 
npm install babel-plugin-transform-es2015-modules-commonjs  --save-dev [模块化](#https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-commonjs) 
npm install babel-plugin-transform-es2015-modules-systemjs  --save-dev [模块化](#https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-systemjs) 
npm install babel-plugin-transform-es2015-modules-umd  --save-dev [模块化](#https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-umd) 
#### babel es2017   
npm install --save-dev babel-plugin-syntax-object-rest-spread  对象扩展运算符
npm install --save-dev babel-plugin-transform-class-properties 类属性定义
npm install --save-dev babel-plugin-transform-async-generator-functions 异步函数
#### gulp插件
npm install gulp-streamify[包准流](#https://www.npmjs.com/package/gulp-streamify)
npm install gulp-tap[轻松进入管道](#https://www.npmjs.com/package/gulp-tap)
npm install gulp-load-plugins[自动加载插件](#https://www.npmjs.com/package/gulp-load-plugins)
npm install gulp-eslint [js检测](#https://www.npmjs.com/package/gulp-eslint)
npm install gulp-livescript [js编译器](#https://www.npmjs.com/package/gulp-livescript)           
npm install gulp-watch [文件观察](#https://www.npmjs.com/package/gulp-watch) 使用超快速chokidar并且发射乙烯基对象的文件观察者。           
npm install gulp-plumber  --save-dev [抑制错误处理](#https://www.npmjs.com/package/gulp-plumber)           
npm install gulp-rename --save-dev  [文件重命名](#https://www.npmjs.com/package/gulp-rename)                      
npm install gulp-uglify  --save-dev [js压缩](#https://www.npmjs.com/package/gulp-uglify)           
npm install gulp-util --save-dev [工具](#https://www.npmjs.com/package/gulp-util)           
npm install gulp-sourcemaps --save-dev [源码地图映射](#https://www.npmjs.com/package/gulp-sourcemaps)           
npm install gulp-if  --save-dev [条件判断](#https://www.npmjs.com/package/gulp-if)           
npm install gulp-concat  --save-dev [文件合并](#https://www.npmjs.com/package/gulp-concat)           
npm install gulp-autoprefixer   --save-dev[css 前缀](#https://www.npmjs.com/package/gulp-autoprefixer)           
npm install gulp-react [React jsx语法转换](#https://www.npmjs.com/package/gulp-react)              
npm install gulp-imagemin  --save-dev  [图片压缩](#https://www.npmjs.com/package/gulp-imagemin)           
npm install gulp.spritesmith-multi [图片合并包装器](#https://www.npmjs.com/package/gulp.spritesmith-multi)           
npm install gulp.spritesmith [图片合并](#https://www.npmjs.com/package/gulp.spritesmith)           
npm install gulp-clean-css --save-dev [css压缩](#https://www.npmjs.com/package/gulp-clean-css)           
npm install gulp-filter  --save-dev  [文件过滤](#https://www.npmjs.com/package/gulp-filter)           
npm install gulp-less  --save-dev [less编译](#https://www.npmjs.com/package/gulp-less)           
npm install gulp-sass --save-dev [sass编译](#https://www.npmjs.com/package/gulp-sass)            
PostCSS gulp插件通过几个插件来管道CSS，但只解析CSS一次。
npm install gulp-postcss  --save-dev  [解析css](#https://www.npmjs.com/package/gulp-postcss)           
npm install gulp-htmlmin --save-dev [html压缩](#https://www.npmjs.com/package/gulp-htmlmin)           
npm install gulp-changed  --save-dev [否决不变的文件](#https://www.npmjs.com/package/gulp-changed)           
npm install gulp-zip [压缩包](#https://www.npmjs.com/package/gulp-zip)           
npm install gulp-template  --save-dev [underscore template](#https://www.npmjs.com/package/gulp-template)           
npm install gulp-iconfont  --save-dev [svn 转换font](#https://www.npmjs.com/package/gulp-iconfont)           
npm install gulp-file-include  --save-dev  [html头部引入](#https://www.npmjs.com/package/gulp-file-include)           
npm install gulp-markdown --save-dev  [markdown转换](#https://www.npmjs.com/package/gulp-markdown)           
npm install gulp-sort --save-dev [排序](#https://www.npmjs.com/package/gulp-sort)           
npm install gulp-notify  --save-dev [通知](#https://www.npmjs.com/package/gulp-notify)           
npm install gulp-each  --save-dev [循环文件](#https://www.npmjs.com/package/gulp-each)           
npm install merge2 --save-dev [合并数据流](#https://www.npmjs.com/package/merge2)           
npm install gulp-open --save-dev [打开浏览器](#https://www.npmjs.com/package/gulp-open)                    
npm install shuji  --save-dev [根据source map还原js](#https://www.npmjs.com/package/shuji)           
npm install gulp-debug --save-dev [调试](#https://www.npmjs.com/package/gulp-debug)           
npm install gulp-git --save-dev [git代码管理](#https://www.npmjs.com/package/gulp-git)           
npm install gulp-posthtml [处理html](#https://www.npmjs.com/package/gulp-posthtml)           
npm install gulp-sitemap --save-dev  [SEO优化](#https://www.npmjs.com/package/gulp-sitemap)           
npm install gulp-mocha [测试](#https://www.npmjs.com/package/gulp-mocha)           
npm install gulp-beautify [js美化](#https://www.npmjs.com/package/gulp-beautify)           
npm install gulp-ngtemplate --save-dev [html模板转换成js模板](#https://www.npmjs.com/package/gulp-ngtemplate)   
npm install --save-dev gulp-strip-comments [删除注释](#https://www.npmjs.com/package/gulp-strip-comments)        

```javascript
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
```
## 生成器
安装
```bash
> npm install -g yo yeoman-generator
> npm install --save yeoman-environment 
```
yo提供以下命令。
yo --help 访问完整的帮助屏幕
yo --generators 列出每个安装的发电机
yo --version 获取版本
故障排除
大多数问题可以通过运行找到：
yo doctor
### 开始创建
一个生成器的核心是一个Node.js模块。
首先，创建一个你要编写你的生成器的文件夹。这个文件夹必须被命名generator-name（其中name是您的生成器的名称）。这很重要，因为Yeoman依靠文件系统来查找可用的生成器。
一旦进入您的生成器文件夹，创建一个package.json文件。这个文件是一个Node.js模块清单。您可以通过npm init从命令行运行或手动输入以下内容来生成此文件：
```javascript
{
  "name": "generator-name",
  "version": "0.1.0",
  "description": "",
  "files": [
    "generators"
  ],
  "keywords": ["yeoman-generator"],
  "dependencies": {
    "yeoman-generator": "^1.0.0"
  }
}
```
该name属性必须以前缀generator-。该keywords属性必须包含"yeoman-generator"，回购必须有我们的发电机页面索引的描述。
您应该确保将最新版本设置yeoman-generator为依赖项。你可以通过运行：npm install --save yeoman-generator。
该files属性必须是由您的生成器使用的文件和目录的数组。
根据需要添加其他package.json属性。

### 文件树
Yeoman与文件系统以及您如何构建目录树有着深厚的联系。每个子生成器都包含在自己的文件夹中。
您调用时使用的默认生成器yo name是app生成器。这必须包含在app/目录中。
在您调用时使用的子生成器yo name:subcommand存储在与子命令完全相同的文件夹中。
在示例项目中，目录树可能如下所示：
```javascript
├───package.json
└───generators/
    ├───app/
    │   └───index.js
    └───router/
        └───index.js
```
这个生成器将会暴露yo name和yo name:router命令。
Yeoman允许两个不同的目录结构。它会查看./和generators/注册可用的发电机。
前面的例子也可以写成如下：
```javascript
├───package.json
├───app/
│   └───index.js
└───router/
    └───index.js
```
如果你使用这个第二个目录结构，确保你指向files你package.json所有的生成文件夹中的属性。
```javascript
{
  "files": [
    "app",
    "router"
  ]
}
```
## 扩展生成器
一旦你有这个结构，是时候写实际的发电机。
Yeoman提供了一个基础生成器，你可以扩展来实现你自己的行为。这个基础生成器将添加大部分您期望的功能以减轻您的任务。
在生成器的index.js文件中，以下是扩展基本生成器的方法：
```javascript
var Generator = require('yeoman-generator');
module.exports = class extends Generator {};
```
我们将扩展生成器分配给module.exports生态系统。这就是我们如何在Node.js中导出模块。
如果您需要支持ES5环境，Generator.extend()则可以使用静态方法来扩展基类，并允许您提供新的原型。这个功能来自Class-extend模块，如果你曾经使用过Backbone，那么你应该很熟悉。
#### 覆盖构造函数
一些生成器方法只能在constructor函数内调用。这些特殊的方法可能会做一些事情，比如设置重要的状态控件，并且可能无法在构造函数之外运行。
要覆盖生成器构造函数，请添加如下所示的构造函数方法：
```javascript
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
};
```
#### 添加您自己的功能
添加到原型的每个方法都会在调用发生器后运行 - 通常是按顺序进行的。但是，我们将在下一节中看到，一些特殊的方法名称将触发特定的运行顺序。
我们来添加一些方法：
```javascript
module.exports = class extends Generator {
  method1() {
    this.log('method 1 just ran');
  }
  method2() {
    this.log('method 2 just ran');
  }
};
```
#### 运行生成器
在这一点上，你有一个工作的发电机。下一个合乎逻辑的步骤是运行它，看看它是否工作。
由于您正在本地开发生成器，因此尚不能作为全局npm模块使用。全局模块可以使用npm创建并符号链接到本地​​模块。这就是你想要做的事情：
在命令行中，从您的生成器项目的根目录（在该generator-name/文件夹中），键入：
`npm link`
这将安装您的项目依赖和符号连接一个全局模块到您的本地文件。npm完成后，你可以打电话yo name，你应该看到this.log，早先定义，在终端呈现。恭喜你，你刚刚建立你的第一个发电机！
#### 找到项目的根
在运行一个生成器的时候，Yeoman会尝试根据它运行的文件夹的上下文来判断一些事情。
最重要的是，Yeoman在目录树中搜索一个.yo-rc.json文件。如果找到，它会将文件的位置视为项目的根目录。在幕后，Yeoman会将当前目录改为.yo-rc.json文件位置，并在那里运行请求的生成器。
存储模块创建.yo-rc.json文件。this.config.save()第一次从发生器调用将创建该文件。
所以，如果您的生成器没有运行在您当前的工作目录中，请确保您没有.yo-rc.json在目录树的某处。

## 运行上下文
1. 前缀方法名称由下划线（例如_private_method）。
```javascript
  class extends Generator {
    method1() {
      console.log('hey 1');
    }
    _private_method() {
      console.log('private hey');
    }
  }
```
2. 使用实例方法：
```javascript
 class extends Generator {
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts)

      this.helperMethod = function () {
        console.log('won\'t be called automatically');
      };
    }
  }
```
3. 扩展父代生成器：
```javascript
  class MyBase extends Generator {
    helper() {
      console.log('methods on the parent generator won\'t be called automatically');
    }
  }

  module.exports = class extends MyBase {
    exec() {
      this.helper();
    }
  };
```
可用的优先级是（按运行顺序）：

1. initializing - 你的初始化方法（检查当前的项目状态，获取配置等）
1. prompting- 在哪里提示用户选择（你打电话的地方this.prompt()）
1. configuring- 保存配置并配置项目（创建.editorconfig文件和其他元数据文件）
1. default - 如果方法名称与优先级不匹配，则会被推送到该组。
1. writing - 你在哪里编写生成器特定的文件（路由，控制器等）
1. conflicts - 处理冲突（在内部使用）
1. install - 在哪里安装（npm，凉亭）
1. end- 最后叫，清理，再见，等等

#### 异步任务
```javascript
asyncTask() {
  var done = this.async();

  getUserEmail(function (err, name) {
    done(err);
  });
}
```
## 用户交互
例如，从不使用console.log()或process.stdout.write()输出内容很重要。使用它们会隐藏不使用终端的用户的输出。相反，总是依靠UI泛型this.log()方法，其中this是当前生成器的上下文。 

提示是生成器与用户交互的主要方式。提示模块由Inquirer.js提供，您应该参考其API获取可用提示选项的列表。
该prompt方法是异步的，并返回一个承诺。您需要从您的任务中返回承诺，以便在运行下一个之前等待完成。（详细了解异步任务）
```javascript
module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, {
      type    : 'confirm',
      name    : 'cool',
      message : 'Would you like to enable the Cool feature?'
    }]).then((answers) => {
      this.log('app name', answers.name);
      this.log('cool feature', answers.cool);
    });
  }
};
```
### 记住用户的喜好
用户每次运行发电机时可能会对某些问题提供相同的输入。对于这些问题，您可能想要记住用户以前回答什么，并将该答案用作新的答案default。
Yeoman通过向store问题对象添加属性扩展了Inquirer.js API 。此属性允许您指定将来用户提供的答案应该用作默认答案。这可以如下完成：
```javascript
this.prompt({
  type    : 'input',
  name    : 'username',
  message : 'What\'s your GitHub username',
  store   : true
});
```
### 参数
参数直接从命令行传递：
`yo webapp my-project`
在这个例子中，my-project将是第一个参数。
为了通知系统我们期望有一个参数，我们使用这个this.argument()方法。这个方法接受一个name（String）和一个可选的选项哈希。
这个name论点将可以作为：this.options[name]。

options接受多个键值对：
:  desc 参数描述
required 布尔是否需要
type 字符串，数字，数组（也可以是接收原始字符串值并解析它的自定义函数）
default 这个参数的默认值
该方法必须在constructor方法内调用。否则Yeoman将无法在用户使用帮助选项调用您的发电机时输出相关的帮助信息yo webapp --help。

这里是一个例子：
```javascript
module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: true });
    // And you can then access it later; e.g.
    this.log(this.options.appname);
  }
};
```
类型的参数Array将包含传递给生成器的所有其余参数。
### 选项
选项看起来很像参数，但它们写成命令行标志。
`yo webapp --coffee`
为了通知系统我们期望一个选项，我们使用这个generator.option()方法。
这个方法接受一个name（String）和[options]。
该name值将用于在匹配键中检索参数generator.options[name]。

options（第二个参数）接受多个键值对：
:  desc 选项说明
alias 选项的简称
type 布尔，字符串或数字（也可以是接收原始字符串值并解析它的自定义函数）
default 默认值
hide 布尔是否隐藏帮助
这里是一个例子：
```javascript
module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This method adds support for a `--coffee` flag
    this.option('coffee');

    // And you can then access it later; e.g.
    this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");
  }
};
```
### 输出信息
输出信息由generator.log模块处理。
你将使用的主要方法是generator.log（例如generator.log('Hey! Welcome to my awesome generator')）。它需要一个字符串并输出给用户; 基本上它console.log()是在终端会话中使用时模仿。你可以这样使用它：
```javascript
module.exports = class extends Generator {
  myAction() {
    this.log('Something has gone wrong!');
  }
};
```

#### 组合生成器
composeWith 需要两个参数。
generatorPath- 一个完整的路径，指向你想要组成的生成器（通常使用require.resolve()）。
options - 一个对象，包含运行后传递给组合生成器的选项
```javascript
// In my-generator/generators/turbo/index.js
module.exports = class extends Generator {
  prompting() {
    console.log('prompting - turbo');
  }
  writing() {
    console.log('writing - turbo');
  }
};
// In my-generator/generators/electric/index.js
module.exports = class extends Generator {
  prompting() {
    console.log('prompting - zap');
  }
  writing() {
    console.log('writing - zap');
  }
};
// In my-generator/generators/app/index.js
module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../turbo'));
    this.composeWith(require.resolve('../electric'));
  }
};
```
## 管理依赖
NPM
你只需要调用generator.npmInstall()来运行npm安装。npm install即使被多个发生器多次调用，Yeoman也将确保该命令仅运行一次。
例如，你想安装lodash作为开发依赖：
```javascript
class extends Generator {
  installingLodash() {
    this.npmInstall(['lodash'], { 'save-dev': true });
  }
}
```
这相当于打电话：
`npm install lodash --save-dev`

## 文件系统
第一个上下文是目标上下文。目的地是Yeoman将脚手架新应用程序的文件夹。这是你的用户项目文件夹，它是你写脚手架的地方。
目标上下文被定义为当前工作目录或包含.yo-rc.json文件的最近的父文件夹。该.yo-rc.json文件定义了一个Yeoman项目的根。这个文件允许你的用户在子目录中运行命令并让它们在项目上工作。这确保了最终用户的一致行为。
你可以得到的目标路径使用generator.destinationRoot()或通过加入一个路径generator.destinationPath('sub/path')。
```javascript
// Given destination root is ~/projects
class extends Generator {
  paths() {
    this.destinationRoot();
    // returns '~/projects'

    this.destinationPath('index.js');
    // returns '~/projects/index.js'
  }
}
```
## Browserify