
/*
*这是一个示例构建文件,演示了如何使用构建系统
* require.js。
*
*此构建文件不起作用。它可能引用了路径
*不存在于您的机器上。只是用它作为指导。
*
*
*/

({
   //包含您的应用的顶级目录。如果使用此选项
   //然后它假定您的脚本位于此路径下的子目录中。
   //此选项不是必需的。如果没有指定,那么baseUrl
   //下面是查找事物的锚点。如果指定了这个选项,
   //然后将所有来自app目录的文件复制到dir中:
   //输出区域,baseUrl将假设为下的相对路径
   //这个目录。
   appDir : "some/path / ",

   //默认情况下,所有模块都相对于此路径定位。如果baseUrl
   //未明确设置,则所有模块都将相对于该模块加载
   //保存构建文件的目录。如果appDir被设置,那么
   // baseUrl应该被指定为相对于appDir。
   baseUrl : " ./ ",

   //默认情况下,所有用于优化的配置都来自命令
   //行或配置文件中的属性,以及配置
   //作为应用运行时的一部分传递给requirejs"main"JS文件是* not *
   //考虑。但是,如果您更喜欢"主"JS文件配置
   //要为构建读取,以便不必重复值
   //在单独的配置中,将此属性设置为该位置
   //主要的JS文件。第一个requirejs({}）,require({}）,requirejs.config({}）,
   //将使用在该文件中找到的require.config({}）调用。
   //从2.1.10开始,mainConfigFile可以是最后一个值的数组
   //值的配置优先于数组中的先前值。
   mainConfigFile :'../ some / path/ to / main.js',

   //为模块设置路径。如果相对路径,相对于上面的baseUrl设置。
   //如果路径值使用了"empty:"的特殊值,那么
   //就像将路径映射到空文件一样。它允许优化器
   //将依赖关系解析为路径,但不包含在输出中。
   //用于映射CDN或其他资源上的模块名称
   // http:在浏览器中运行时以及在优化期间的URL
   //文件应该被跳过,因为它没有依赖关系。
   //例如,如果您希望包含来自公共CDN的"jquery"和"angularjs"
   //路径:{"jquery":"empty:","angular":"empty:"}}
   paths: {
       " foo.bar ": " ../scripts/foo/bar ",
       " baz ": " ../another/path/ baz "
   },

   //将模块ID映射到其他模块ID。有关更多详情,请参阅
   // http://requirejs.org/docs/api.html#config-map文档。
   map: {},

   //配置CommonJS包。请参阅http://requirejs.org/docs/api.html#packages
   //获取更多信息。
   packages: [],

   //保存输出的目录路径。如果没有指定,那么
   //路径将默认为一个名为"build"的目录作为兄弟
   //到构建文件。所有相对路径都是相对于构建文件。
   dir : " ../some/path ",

   //从RequireJS 2.0.2开始,上面的dir将被删除
   //再次开始构建。如果你有一个伟大的构建,并没有这样做
   //源代码用onBuildRead / onBuildWrite转换,然后你可以
   //设置keepBuildDir为true以保留前一个目录。这允许
   //更快的重建,但它可能会导致意想不到的错误,如果
   //构建的代码以某种方式转换。
   keepBuildDir : false,

   //如果运行时在应用程序中使用shim config,请复制配置
   //这里。必要时使用shim配置,以便垫片的相关性
   //包含在构建中。使用"mainConfigFile"是更好的方法
   //通过这个信息,所以它只在一个地方列出。
   //但是,如果mainConfigFile不是一个选项,那么shim配置可以是
   //在构建配置中内联。
   shim: {},

   //从2.1.11开始,shimmed依赖可以被包装在一个define(）包装器中
   //当中间依赖关系是AMD对它们的依赖时帮助
   //拥有。规范的例子是一个使用Backbone的项目,它依赖于
   // jQuery和Underscore。希望骨干可用的Shimmed依赖关系
   //立即不会在构建中看到它,因为AMD兼容版本
   // Backbone不会执行define(）函数,直到依赖关系为止
   //准备好了。通过包装这些减少的依赖关系,可以避免这种情况,但是
   //如果这些shimmed依赖使用了,它可能会引入其他错误
   //以怪异的方式遍历全局范围,所以它不是默认的行为。
   //使用填充包装skipModuleInsertion需要为false。
   // http://requirejs.org/docs/api.html#config-shim中的更多注释
   wrapShim : false,

   //用于将i18n资源内联到构建的文件中。如果没有语言环境
   //指定,i18n资源不会被内联。只有一个区域设置
   //可以内联构建。构建层引用的根包
   //将被包含在构建层中,而不管区域设置如何。
   locale : " en-us ",

   //如何优化(缩小）构建输出目录中的所有JS文件。
   //现在只有以下值
   //支持:
   // - "uglify":(默认）使用UglifyJS来缩小代码。版本之前
   // 2.2,uglify版本是1.3.x版本。随着r.js 2.2,它现在
   // 2.x uglify版本。仅支持ES5语法。对于ES 2015或更高版本,请使用
   //改为"无"选项。
   // - "uglify2":版本2.1.2+。使用UglifyJS2。截至r.js 2.2,这个
   //只是"uglify"的别名,现在2.2只是使用uglify 2.x.
   // - "closure":使用Google的Closure Compiler进行简单的优化
   //模式来缩小代码。只有在运行优化器时才可用
   // Java。
   // - "closure.keepLines":与闭合选项相同,但保持线返回
   //在缩小的文件中。
   // - "无":不会缩小。如果您正在使用,请使用此设置
   // ES 2015或更高版本的语法,因为仅限于捆绑的UglifyJS
   //了解ES5和更早的语法。对于ES2015代码,运行兼容
   // minifier作为运行r.js之后的单独步骤。
   uglify: " uglify ",

   //在2.1.2中介绍:如果使用"dir"作为输出目录,通常是
   //优化设置用于优化构建包("模块"
   //配置部分）以及目录中的任何其他JS文件。但是,如果
   //构建之后,非构建捆绑JS文件将不会被加载,您可以
   //跳过这些文件的优化,以加快构建。设置此值
   //如果您想跳过优化那些其他非构建包JS,则为true
   //文件。
   skipDirOptimize : false,

   //在2.1.2中引入并被认为是实验性的。
   //如果"optimize"选项中指定的缩小器支持生成
   //缩小代码的源地图,然后生成它们。源地图
   //生成的只是将缩小的JS转换为非缩小的JS,它不会
   //将缩小的JS转换为转换后的源代码的任何不可思议的东西。
   //当前仅优化:在节点或者运行时支持"uglify2"
   //犀牛,如果在犀牛中运行,使用闭包编译器jar进行"闭包"
   //在r1592(20111114发布）之后构建。
   //源文件将显示在支持的浏览器开发工具中
   //源映射为".js.src"文件。
   generateSourceMaps : false,

   //在2.1.1中介绍:如果完整的目录优化("dir"被使用）和
   //优化不是"none",skipDirOptimize是false,那么通常是所有的JS
   //目录中的文件将被缩小,并且这个值是自动的
   //设置为"全部"。为了让JS文件在缩小后正常工作,
   //优化器将解析define(）调用并插入任何依赖数组
   //缺少。但是,如果有很多/更大的话,这可能会有点慢
   // JS文件。所以这个传输规范化没有完成(自动设置
   //如果优化设置为"无",则为"跳过"）。你可能想要的情况
   //手动设置此值:
   // 1）稍后优化:如果您计划缩小非构建捆绑JS文件
   //在优化器运行之后(所以不是运行优化器的一部分）,那么
   //你应该明确这个值为"全部"。
   // 2）优化,但稍后不能动态加载:你想做一个完整的
   //项目优化,但不打算动态加载非构建
   //稍后捆绑JS文件。在这种情况下,标准化正在减慢
   // builds,所以你可以明确地设置这个值为"跳过"。
   //最后,所有构建包(在"模块"或"出"设置中指定）
   //自动获得标准化,所以这个设置不适用于这些
   //文件。
   normalizeDirDefines : " skip ",

   //如果使用UglifyJS进行脚本优化,这些配置选项可以是
   //用于将配置值传递给UglifyJS。
   //在r.js 2.2中,现在只是uglify2,所以请参阅下面的'uglify2'部分
   //例如选项。对于2.2之前的r.js,这是为了设置uglify 1.3.x
   //选项。
   uglify : {
   },

   //如果使用UglifyJS2进行脚本优化,这些配置选项可以是
   //用于将配置值传递给UglifyJS2。截至r.js 2.2,UglifyJS2
   //是唯一的uglify选项,所以配置键只能是'uglify'
   // r.js 2.2+。
   //对于可能的"输出"值,请参阅:
   // https://github.com/mishoo/UglifyJS2#beautifier-options
   //有关可能的"压缩"值,请参阅:
   // https://github.com/mishoo/UglifyJS2#compressor-options
   uglify2 : {
       //一个专门配置的例子。如果你没事的话
       //使用默认选项,无需指定
       //这些属性中的任何一个。
       输出: {
           美化: 真实
       },
       压缩: {
           序列: 错误,
           global_defs : {
               DEBUG : 错误
           }
       },
       警告: 是的,
       mangle : 错误
   },

   //如果使用Closure Compiler进行脚本优化,请使用这些配置选项
   //可以用来配置Closure Compiler。请参阅文档
   //关闭编译器以获取更多信息。
   关闭: {
       CompilerOptions : {},
       CompilationLevel :'SIMPLE_OPTIMIZATIONS',
       loggingLevel :'WARNING',
       externExportsPath :'./extern.js'
   },

   //允许CSS优化。允许值:
   // - "standard":@import内联和删除注释,不必要的
   //空白和行返回。
   //取消线路退回可能在IE中有问题,具体取决于类型
   // CSS的。
   // - "standard.keepLines":与"标准"类似,但保持线返回。
   // - "none":跳过CSS优化。
   // - "standard.keepComments":保留文件注释,但删除行
   //返回。(r.js 1.0.8+）
   // - "standard.keepComments.keepLines":保留文件注释和行
   //返回。(r.js 1.0.8+）
   // - "standard.keepWhitespace":与"标准"类似,但保留不必要的空格。
   optimizeCss : " standard.keepLines.keepWhitespace ",

   //如果optimizeCss正在使用中,则为@import忽略要忽略的文件列表
   //内联。这个选项的值应该是一串逗号分隔的
   //忽略CSS文件名(如'a.css,b.css',文件名应匹配
   //在@import调用中使用任何字符串。
   cssImportIgnore : null,

   // cssIn通常用作命令行选项。它可以使用
   //和out一起来优化单个CSS文件。
   cssIn : " path / to / main.css ",
   out : " path / to / css-optimized.css ",

   //如果"out"与"cssIn"不在同一个目录中,并且存在亲戚
   // cssIn文件中的url(）,使用它设置要使用的前缀URL。只设置它
   //如果您在优化后发现相对URL不正确的问题。
   cssPrefix : " ",

   //为任何文本内联文本！依赖关系,避免分离
   // async XMLHttpRequest调用来加载这些依赖关系。
   inlineText : true,

   //允许"严格使用"; 包含在RequireJS文件中。
   //默认为false,因为没有多少浏览器可以正常运行
   //处理ES5严格模式的代码并给出错误,
   //并且有很多遗留代码不能在严格模式下工作。
   useStrict : false,

   //指定构建编译指示。如果源文件包含如下所示的注释:
   // >> excludeStart("fooExclude",pragmas.fooExclude）;
   // >> excludeEnd("fooExclude"）;
   //然后以//开头的注释是构建杂注。
   // excludeStart / excludeEnd和includeStart / includeEnd工作,以及
   // includeStart或excludeStart行的pragmas值
   //被评估以查看开始与结束杂注之间的代码
   //行应包含或排除。如果你有选择使用
   // "有"代码或编译指示,而是使用"有"代码。Pragma更难
   //读取,但在代码移除时可以更灵活一点
   //基于代码,必须遵循JavaScript语言规则。
   // Pragma还会删除非缩减源代码,其中有分支
   //只有通过UglifyJS或者缩小代码才能完成修剪
   // Closure编译器。
   编译指示: {
       fooExclude : true
   },

   //与"pragmas"相同,但仅在文件保存阶段应用一次
   //优化。在依赖期间应用"编译指示"
   //优化时的映射和文件保存阶段。一些编译指示
   //在依赖关系映射阶段不应该被处理
   //操作,例如CoffeeScript加载器插件中的杂注,
   //在依赖关系映射期间需要CoffeeScript编译器
   //阶段,但是一旦文件被保存为纯JavaScript,CoffeeScript
   //编译器不再需要。在这种情况下,将使用pragmasOnSave
   //在保存阶段中排除编译器代码。
   pragmasOnSave : {
       //只是一个例子
       excludeCoffeeScript : true
   },

   //允许修剪使用基于.js的特征检测的代码分支:
   // https://github.com/phiggins42/has.js
   //代码分支修剪仅在使用UglifyJS或者缩小时才会发生
   // Closure Compiler完成。有关更多信息,请参阅:
   // http://requirejs.org/docs/optimization.html#hasjs
   has: {
      'function-bind': true,
      'string-trim': false
   },

   //类似于pragmasOnSave,但是因为有测试 - 仅在应用程序期间应用
   //文件保存优化阶段,其中"has"应用于两者
   //依赖映射和文件保存阶段。
   hasOnSave : {
      'function-bind': true,
      'string-trim': false
   },

   //允许命名空间requirejs,要求并定义对新名称的调用。
   //这样可以更好地保证获得模块空间
   //不要使用定义/需要基于AMD的模块来干扰他人
   //系统。下面的例子会将define(）调用重命名为foo.define(）。
   //更多信息,请参阅http://requirejs.org/docs/faq-advanced.html#rename
   //完整的例子。
   namespace :'foo',

   //跳过处理编译指示。
   skipPragmas : false,

   //如果skipModuleInsertion为false,那么不使用define(）的文件
   //定义模块将得到一个为他们插入的define(）占位符。
   //此外,还会插入require.pause / resume呼叫。
   //将其设置为true以避免这种情况。如果您正在构建代码,这非常有用
   //不在构建的项目或JS文件中使用require(）,而是使用你
   //仍然希望使用RequireJS中的优化工具来连接模块
   //一起。
   skipModuleInsertion : false,

   //指定要在优化文件中存根的模块。优化器将会
   //使用这些模块的源版本进行依赖关系跟踪和for
   //插件使用,但是当将文本写入优化包时,这些
   //模块将获得以下文字:
   //如果模块用作插件:
   //     define({load:function(id）{throw new Error("Dynamic load not allowed:"+ id）;}}）;
   //如果只是一个普通模块:
   //     define({}）;
   //这对插入所有资源的插件尤其有用
   //并使用默认的模块解析行为(do * not * implementation the
   // normalize(）方法）。在这些情况下,AMD加载器只需要知道
   //该模块有一个定义。这些小桩可以用来代替
   //包括插件的完整源代码。
   stubModules : ['text','bar'],

   //如果它不是一个文件优化,请扫描所有.js文件
   //输出任何插件资源依赖关系的目录,以及插件
   //支持优化它们作为单独的文件,优化它们。可以是
   //较慢的优化。仅在使用某些插件时才使用
   //像XMLHttpRequest那样不能跨域使用,而是构建的代码
   //将被放置在另一个域中。
   optimizeAllPluginResources : false,

   //在require(）或define调用中查找require(）依赖关系。默认
   //此值为false,因为这些资源应被视为动态/运行时
   //电话。但是,对于一些优化方案,这是可取的
   //将它们包含在构建中。
   //在1.0.3中引入。以前的版本错误地发现嵌套的调用
   //默认情况下。
   findNestedDependencies : false,

   //如果设置为true,则合并到构建包中的任何文件都将为
   //从输出文件夹中移除。
   removeCombined : false,

   //列出将要优化的模块。他们所有的直接和深刻
   //构建时,依赖关系将包含在模块的文件中
   //完成。如果该模块或其任何依赖包含i18n软件包,
   //只有根捆绑包将被包含,除非locale:部分设置在上面。
   module: [
       //只需指定一个模块名称意味着该模块将被转换为
       //一个包含所有依赖关系的构建文件。如果该模块或任何
       //它的依赖关系包括i18n包,它们可能不包含在
       //建立文件,除非locale:部分设置在上面。
       {
           name: " foo / bar / bop ",

           // create:true可以用来创建给定的模块层
           //名称,如果它不在源位置中。如果
           //然后,在这个名称的源位置有一个模块
           //创建:真是多余的。
           create: true,

           //对于包含多个模块条目的构建配置文件,
           //允许覆盖为整个构建设置的属性,
           //例如这个模块的一组不同的编译指示。
           //重写的值是可以的对象
           //包含此文件中的任何其他构建选项。
           override: {
            pragmas: {
                fooExclude: true
            }
        }
       },

       //此模块条目结合了foo / bar / bop和foo / bar / bee的所有依赖关系
       //将它们的任何依赖关系合并到一个文件中。
       {
           名称: " foo / bar / bop ",
           包括: [ " foo / bar / bee " ]
       },

       //此模块条目将foo / bar / bip的所有依赖关系合并到一个文件中,
       //但是不包含foo / bar / bop及其与构建文件的依赖关系。如果你想
       //排除也是另一个正在优化的模块的模块,它更多
       //如果在使用它之前定义了模块优化条目,则效率很高
       //在排除数组中。
       {
           名称: " foo / bar / bip ",
           排除: [
               " foo / bar / bop "
           ]
       },

       //此模块条目显示如何指定排除特定模块
       //从构建的模块文件中获取。excludeShallow意味着排除这一点
       //特定模块,但是如果该模块具有嵌套的依赖关系
       //构建文件的一部分,将它们保存在那里。这在过程中很有用
       //开发你想要一个快速捆绑的模块集合,但是
       //一次开发/调试一个或两个模块。
       {
           名称: " foo / bar / bin ",
           excludeShallow : [
               " foo / bar / bot "
           ]
       },

       //此模块条目显示了使用insertRequire(2.0中首次提供）:
       {
           名称: " foo / baz ",
           insertRequire : [ " foo / baz " ]
       }
   ]

   //如果目标模块只调用define并且不在调用require(）
   //最高级别,并且此构建输出与AMD等垫片加载程序一起使用
   // almond,HTML页面中的data-main脚本被替换为just
   //构建文件的脚本,如果没有顶级需求,则不需要模块
   //将执行。指定insertRequire以在其中放置require([]）调用
   //文件的结尾来触发模块的执行。更多详情
   // https://github.com/requirejs/almond
   //请注意,insertRequire不影响或添加到模块中
   //构建到构建包中。它只是添加一个require([]）调用到最后
   //构建的代码在运行时执行期间使用的构建文件。
   insertRequire : ['foo / bar / bop'],

   //如果你只打算优化一个模块(及其依赖）,用
   //单个文件作为输出,可以指定模块选项内联,
   //而不是使用上面的'模块'部分。'排除',
   //'excludeShallow','include'和'insertRequire'都可以作为兄弟
   //名称。优化文件的名称由'out'指定。
   名称: " foo / bar / bop ",
   包括: [ " foo / bar / bee " ],
   insertRequire : ['foo / bar / bop'],
   out : " path / to / optimized-file.js ",

   //替代"包含"。通常只用于requirejs.config(）
   //调用一个用于mainConfigFile的模块,因为requirejs会读取
   //在运行期间"deps"执行相当于require(deps）的任务
   //关闭一些模块加载。
   deps : [ " foo / bar / bee " ],

   //在RequireJS 2.0中,"out"可以是一个函数。对于单个JS文件
   //通过调用requirejs.optimize(）生成的优化,
   //使用out函数意味着优化内容不会被写入
   //磁盘上的文件,但是传递给out函数:
   out : function(text,sourceMapText）{
       //在这里使用优化文本做你想做的。
       //从2.1.10开始,如果generateSourceMaps被设置为true
       //并优化:使用'uglify2'(r.js 2.2+中的'uglify'）,然后
       //此函数的第二个参数sourceMapText将成为文本
       //源地图。
   },

   //在2.0.12+中:通过将"out"设置为"stdout",优化的输出被写入
   //到标准输出。这对于将r.js与其他命令行进行集成很有用
   //工具。为了避免额外的输出"logLevel:4"也应该被使用。
   out : " stdout ",

   //将wrap中指定的开始和结束文本中的任何构建包裹起来。
   //使用它来封装模块代码,以便define / require
   //不是全局变量。结束文本可以从文件中暴露一些全局变量,
   //可以轻松创建不需要的独立库
   //最终用户使用requirejs。
   换行: {
       开始: "(function(）{ ",
       结束: " }(））; "
   },

   //使用换行的另一种方式,但使用默认换行:
   //(function(）{+ content +}(））;
   换行: true,

   //使用换行的另一种方式,但使用文件路径。这使它更容易
   //使开始文本包含许可证信息和结束文本
   //包含全局变量导出,如
   // window.myGlobal = requirejs('myModule'）;
   //文件路径与构建文件相关,或者如果运行一个命令
   //行构建,当前目录。
   换行: {
       startFile : " parts / start.frag ",
       endFile : " parts / end.frag "
   },

   //从r.js 2.1.0开始,startFile和endFile可以是文件和数组的数组
   //它们将分别在开始或结束时加载和插入,
   //构建包的//
   换行: {
       startFile : [ " parts / startOne.frag "," parts / startTwo.frag " ],
       endFile : [ " parts / endOne.frag "," parts / endTwo.frag " ]
   },

   //当优化器将文件从源位置复制到
   //目标目录,它将跳过启动的目录和文件
   //带有"。"。如果您想复制.directories或某些.files,请使用
   //实例是否将某些软件包保存在.packages目录中或复制
   //通过.htaccess文件,您可以将其设置为空。如果你想改变
   //排除规则,将其更改为不同的正则表达式。如果正则表达式
   //匹配,这意味着该目录将被排除。这曾经是
   //在1.0.2发布之前调用dirExclusionRegExp。
   //从1.0.3开始,这个值也可以是一个被转换为的字符串
   // RegExp via new RegExp(）。
   fileExclusionRegExp :/ ^ \。/, 

   //默认情况下,其中有许可证的注释将保留在
   //在"优化"选项中使用缩小器时输出。
   //然而,对于更大的构建文件可能会有很多
   //评论文件可能更好地通过发表较小的评论来提供
   //在文件顶部指向所有许可证列表。
   //此选项将关闭自动保存,但您需要
   //弄清楚如何最好地显示许可证信息。
   //注意:从2.1.7开始,如果使用xpcshell运行优化器,它不能
   //解析出来的评论,因为它的本地反射分析器被使用,并且
   //没有与esprima相同的评论选项支持。
   preserveLicenseComments : true,

   //设置日志级别。这是一个数字。如果你想"静音"运行,
   //将logLevel设置为4.从logger.js文件中:
   // TRACE:0,
   // INFO:1,
   //警告:2,
   //错误:3,
   //无声:4
   //默认为0。
   logLevel : 0,

   //在2.1.3中引入:某些情况下不会抛出并停止优化器
   //发生错误时。但是,您可能希望优化器停止
   //关于某些类型的错误,您可以通过配置这些情况
   //这个选项
   throwWhen : {
       //如果在某个JavaScript中调用minifier时出错,
       //而不是仅仅跳过该文件引发错误。
       优化: 正确
   },

   //一个函数,如果被定义的话,将为每个读入的文件调用
   //构建完成跟踪JS依赖关系。这允许转换
   //内容。
   onBuildRead : function(moduleName,path,contents）{
       //总是返回一个值。
       //这只是一个人为的例子。
       返回 内容。替换(/ foo / g,'bar'）;
   },

   //每次写入优化包时都会调用该函数
   //模块。这允许在序列化之前转换内容。
   onBuildWrite : function(moduleName,path,contents）{
       //总是返回一个值。
       //这只是一个人为的例子。
       返回 内容。替换(/ bar / g,'foo'）;
   },

   //为每个JS模块捆绑包调用的函数
   //完成。这个函数在所有的模块包都有调用
   //已完成,但每个包都会调用它。一个模块包是一个
   // "模块"条目或者如果只是单个文件JS优化的话
   //优化的JS文件。
   //在r.js 2.1.6版中引入
   onModuleBundleComplete : function(data）{
       / *
       data.name:包名称。
       data.path:相对于输出目录的包路径。
       data.included:包含在构建包中的项目数组。
       如果是文件路径,则相对于输出目录。装载机
       插件ID也包含在此数组中,但具体取决于
       在插件上,可能有或没有内嵌的东西
       模块捆绑。
       * /
   },

   //在2.1.3中引入:列出的模块ID的种子原始文本内容。
   //这些文本内容将被用来代替进行文件IO调用
   //这些模块。如果某些模块ID内容是动态的,则很有用
   //基于用户输入,这在网络构建工具中很常见。
   rawText : {
      'some / id':'define(["another / id"],function(）{}）; "
   },

   //在2.0.2中引入:如果设置为true,那么优化器将添加一个
   // define(require,exports,module）{}）; 包装任何似乎似乎的文件
   //使用commonjs / node模块语法(require,exports）
   //调用define(）。这对重用来自的模块很有用
   //或者可以在可以加载commonjs风格模块的AMD加载器中加载
   //在开发过程中以及AMD模块,但需要有一个内置的表单
   //这只是AMD。请注意,这不*启用不同的模块
   // ID到文件路径逻辑,所有的模块仍然需要使用
   // requirejs风格的配置,它不使用节点的嵌套node_modules
   //路径查找。
   cjsTranslate : true,

   //在2.0.2中引入:有点实验。
   //构建包中的每个脚本都会变成
   //带有//＃sourceURL注释的JavaScript字符串,然后包装在一个
   // eval调用。这允许一些浏览器将每个逃避脚本视为一个
   //在脚本调试器中分离脚本,即使它们全部组合在一起
   //在同一个文件中。一些重要的限制:
   // 1）如果条件注释打开,不要在IE中使用,否则会导致
   //错误:
   // http://en.wikipedia.org/wiki/Conditional_comment#Conditional_comments_in_JScript
   // 2）它只在优化时才有用:'无'场景。目标是允许
   //更容易构建的捆绑调试,这违背了缩小的期望。
   useSourceUrl : true,

   //定义模块的加载时间。根据的复杂性
   //依赖和相关库的大小,增加等待
   //可能需要间隔。默认值是7秒。将该值设置为0
   //禁用等待间隔。
   waitSeconds : 7,

   //在2.1.9中引入:通常r.js在a的末尾插入一个分号
   //文件是否已经存在,以避免出现问题
   //连接文件和自动分号插入(ASI）规则
   // JavaScript。这是一个非常直率的解决方案,可以安全地做,但如果你想
   //根据linter规则,创建构建输出,它可能不喜欢它。
   //将此选项设置为true会跳过此插入。但是,通过这样做,
   //你承担责任,确保你的连接代码工作
   // JavaScript的ASI规则,并且您使用可以理解何时使用的缩小器
   //插入分号以避免ASI陷阱。
   skipSemiColonInsertion : false,

   //在2.1.10中引入:如果设置为true,不会剥离amdefine使用:
   // https://github.com/requirejs/amdefine
   //通常你不需要设置它。如果使用这只是一个问题
   //一些其他来源的内置.js文件,可能包含了amdefine
   //在构建的输入中。如果你得到一个类似的构建错误
   // "未定义不是函数"以及生成错误的文件
   //引用amdefine,然后将其设置为true。
   keepAmdefine : false,

   //在2.1.11中介绍。作为修复一个错误以防止可能的一部分
   //覆盖源代码,https://github.com/jrburke/r.js/issues/444,
   //它阻止了一些生成源被用于构建的情况,并且
   //可以在生成该源文件区域时覆盖其中的内容
   //来自其他来源区域,并且不允许源覆盖意味着采取
   //另一个文件复制命中。通过将其设置为true,它允许这种类型
   //源代码覆盖。但是,请自担风险,并确保您
   //正确设置你的配置。例如,你可能想要
   //将"keepBuildDir"设置为true。
   allowSourceOverwrites : false,

   //在2.2.0中引入。文件路径来写出捆绑配置
   //(http://requirejs.org/docs/api.html#config-bundles）在模块中找到
   //优化器构建的图层。该路径相对于"dir"配置
   //路径。仅适用于完整的项目优化:
   // http://requirejs.org/docs/optimization.html#wholeproject
   //仅当优化图层分组更复杂时才使用
   //主要应用入口点的简单优化。指定的文件路径
   //应该是具有最高级别的requirejs.config(）调用的设置
   //加载器。如果使用"mainConfigFile",那么这个路径可能应该是
   //该文件放置在"dir"输出目录中的路径。
   bundlesConfigOutFile :'some / path / to / main.js',

   //在2.2.0中引入。与旧版本兼容的默认值为true
   //发布。如果设置为false,则r.js将不会在.txt文件中写入build.txt文件
   //完成项目优化时的"dir"目录。
   writeBuildTxt : true
}）

/*
 * This is an example build file that demonstrates how to use the build system for
 * require.js.
 *
 * THIS BUILD FILE WILL NOT WORK. It is referencing paths that probably
 * do not exist on your machine. Just use it as a guide.
 *
 *
 */

({
    //The top level directory that contains your app. If this option is used
    //then it assumed your scripts are in a subdirectory under this path.
    //This option is not required. If it is not specified, then baseUrl
    //below is the anchor point for finding things. If this option is specified,
    //then all the files from the app directory will be copied to the dir:
    //output area, and baseUrl will assume to be a relative path under
    //this directory.
    appDir: "some/path/",

    //By default, all modules are located relative to this path. If baseUrl
    //is not explicitly set, then all modules are loaded relative to
    //the directory that holds the build file. If appDir is set, then
    //baseUrl should be specified as relative to the appDir.
    baseUrl: "./",

    //By default all the configuration for optimization happens from the command
    //line or by properties in the config file, and configuration that was
    //passed to requirejs as part of the app's runtime "main" JS file is *not*
    //considered. However, if you prefer the "main" JS file configuration
    //to be read for the build so that you do not have to duplicate the values
    //in a separate configuration, set this property to the location of that
    //main JS file. The first requirejs({}), require({}), requirejs.config({}),
    //or require.config({}) call found in that file will be used.
    //As of 2.1.10, mainConfigFile can be an array of values, with the last
    //value's config take precedence over previous values in the array.
    mainConfigFile:'../some/path/to/main.js',

    //Set paths for modules. If relative paths, set relative to baseUrl above.
    //If a special value of "empty:" is used for the path value, then that
    //acts like mapping the path to an empty file. It allows the optimizer to
    //resolve the dependency to path, but then does not include it in the output.
    //Useful to map module names that are to resources on a CDN or other
    //http: URL when running in the browser and during an optimization that
    //file should be skipped because it has no dependencies.
    //e.g. if you wish to include `jquery` and `angularjs` from public CDNs,
    //paths: { "jquery": "empty:", "angular": "empty:" }
    paths: {
        "foo.bar": "../scripts/foo/bar",
        "baz": "../another/path/baz"
    },

    //Sets up a map of module IDs to other module IDs. For more details, see
    //the http://requirejs.org/docs/api.html#config-map docs.
    map: {},

    //Configure CommonJS packages. See http://requirejs.org/docs/api.html#packages
    //for more information.
    packages: [],

    //The directory path to save the output. If not specified, then
    //the path will default to be a directory called "build" as a sibling
    //to the build file. All relative paths are relative to the build file.
    dir: "../some/path",

    //As of RequireJS 2.0.2, the dir above will be deleted before the
    //build starts again. If you have a big build and are not doing
    //source transforms with onBuildRead/onBuildWrite, then you can
    //set keepBuildDir to true to keep the previous dir. This allows for
    //faster rebuilds, but it could lead to unexpected errors if the
    //built code is transformed in some way.
    keepBuildDir: false,

    //If shim config is used in the app during runtime, duplicate the config
    //here. Necessary if shim config is used, so that the shim's dependencies
    //are included in the build. Using "mainConfigFile" is a better way to
    //pass this information though, so that it is only listed in one place.
    //However, if mainConfigFile is not an option, the shim config can be
    //inlined in the build config.
    shim: {},

    //As of 2.1.11, shimmed dependencies can be wrapped in a define() wrapper
    //to help when intermediate dependencies are AMD have dependencies of their
    //own. The canonical example is a project using Backbone, which depends on
    //jQuery and Underscore. Shimmed dependencies that want Backbone available
    //immediately will not see it in a build, since AMD compatible versions of
    //Backbone will not execute the define() function until dependencies are
    //ready. By wrapping those shimmed dependencies, this can be avoided, but
    //it could introduce other errors if those shimmed dependencies use the
    //global scope in weird ways, so it is not the default behavior to wrap.
    //To use shim wrapping skipModuleInsertion needs to be false.
    //More notes in http://requirejs.org/docs/api.html#config-shim
    wrapShim: false,

    //Used to inline i18n resources into the built file. If no locale
    //is specified, i18n resources will not be inlined. Only one locale
    //can be inlined for a build. Root bundles referenced by a build layer
    //will be included in a build layer regardless of locale being set.
    locale: "en-us",

    //How to optimize (minify) all the JS files in the build output directory.
    //Right now only the following values
    //are supported:
    //- "uglify": (default) uses UglifyJS to minify the code. Before version
    //2.2, the uglify version was a 1.3.x release. With r.js 2.2, it is now
    //a 2.x uglify release. Only supports ES5 syntax. For ES 2015 or later, use
    //the "none" option instead.
    //- "uglify2": in version 2.1.2+. Uses UglifyJS2. As of r.js 2.2, this
    //is just an alias for "uglify" now that 2.2 just uses uglify 2.x.
    //- "closure": uses Google's Closure Compiler in simple optimization
    //mode to minify the code. Only available if running the optimizer using
    //Java.
    //- "closure.keepLines": Same as closure option, but keeps line returns
    //in the minified files.
    //- "none": no minification will be done. Use this setting if you are using
    //ES 2015 or later syntax in your files, since the bundled UglifyJS only
    //understands ES5 and earlier syntax. For ES2015 code, run a compliant
    // minifier as a separate step after running r.js.
    optimize: "uglify",

    //Introduced in 2.1.2: If using "dir" for an output directory, normally the
    //optimize setting is used to optimize the build bundles (the "modules"
    //section of the config) and any other JS file in the directory. However, if
    //the non-build bundle JS files will not be loaded after a build, you can
    //skip the optimization of those files, to speed up builds. Set this value
    //to true if you want to skip optimizing those other non-build bundle JS
    //files.
    skipDirOptimize: false,

    //Introduced in 2.1.2 and considered experimental.
    //If the minifier specified in the "optimize" option supports generating
    //source maps for the minified code, then generate them. The source maps
    //generated only translate minified JS to non-minified JS, it does not do
    //anything magical for translating minified JS to transpiled source code.
    //Currently only optimize: "uglify2" is supported when running in node or
    //rhino, and if running in rhino, "closure" with a closure compiler jar
    //build after r1592 (20111114 release).
    //The source files will show up in a browser developer tool that supports
    //source maps as ".js.src" files.
    generateSourceMaps: false,

    //Introduced in 2.1.1: If a full directory optimization ("dir" is used), and
    //optimize is not "none", and skipDirOptimize is false, then normally all JS
    //files in the directory will be minified, and this value is automatically
    //set to "all". For JS files to properly work after a minification, the
    //optimizer will parse for define() calls and insert any dependency arrays
    //that are missing. However, this can be a bit slow if there are many/larger
    //JS files. So this transport normalization is not done (automatically set
    //to "skip") if optimize is set to "none". Cases where you may want to
    //manually set this value:
    //1) Optimizing later: if you plan on minifying the non-build bundle JS files
    //after the optimizer runs (so not as part of running the optimizer), then
    //you should explicitly this value to "all".
    //2) Optimizing, but not dynamically loading later: you want to do a full
    //project optimization, but do not plan on dynamically loading non-build
    //bundle JS files later. In this case, the normalization just slows down
    //builds, so you can explicitly set this value to "skip".
    //Finally, all build bundles (specified in the "modules" or "out" setting)
    //automatically get normalization, so this setting does not apply to those
    //files.
    normalizeDirDefines: "skip",

    //If using UglifyJS for script optimization, these config options can be
    //used to pass configuration values to UglifyJS.
    //In r.js 2.2, this is now just uglify2, so see the'uglify2'section below
    //for example options. For r.js pre-2.2, this was for setting uglify 1.3.x
    //options.
    uglify: {
    },

    //If using UglifyJS2 for script optimization, these config options can be
    //used to pass configuration values to UglifyJS2. As of r.js 2.2, UglifyJS2
    //is the only uglify option, so the config key can just be'uglify'for
    //r.js 2.2+.
    //For possible `output` values see:
    //https://github.com/mishoo/UglifyJS2#beautifier-options
    //For possible `compress` values see:
    //https://github.com/mishoo/UglifyJS2#compressor-options
    uglify2: {
        //Example of a specialized config. If you are fine
        //with the default options, no need to specify
        //any of these properties.
        output: {
            beautify: true
        },
        compress: {
            sequences: false,
            global_defs: {
                DEBUG: false
            }
        },
        warnings: true,
        mangle: false
    },

    //If using Closure Compiler for script optimization, these config options
    //can be used to configure Closure Compiler. See the documentation for
    //Closure compiler for more information.
    closure: {
        CompilerOptions: {},
        CompilationLevel:'SIMPLE_OPTIMIZATIONS',
        loggingLevel:'WARNING',
        externExportsPath:'./extern.js'
    },

    //Allow CSS optimizations. Allowed values:
    //- "standard": @import inlining and removal of comments, unnecessary
    //whitespace and line returns.
    //Removing line returns may have problems in IE, depending on the type
    //of CSS.
    //- "standard.keepLines": like "standard" but keeps line returns.
    //- "none": skip CSS optimizations.
    //- "standard.keepComments": keeps the file comments, but removes line
    //returns.  (r.js 1.0.8+)
    //- "standard.keepComments.keepLines": keeps the file comments and line
    //returns. (r.js 1.0.8+)
    //- "standard.keepWhitespace": like "standard" but keeps unnecessary whitespace.
    optimizeCss: "standard.keepLines.keepWhitespace",

    //If optimizeCss is in use, a list of files to ignore for the @import
    //inlining. The value of this option should be a string of comma separated
    //CSS file names to ignore (like'a.css,b.css'. The file names should match
    //whatever strings are used in the @import calls.
    cssImportIgnore: null,

    //cssIn is typically used as a command line option. It can be used
    //along with out to optimize a single CSS file.
    cssIn: "path/to/main.css",
    out: "path/to/css-optimized.css",

    //If "out" is not in the same directory as "cssIn", and there is a relative
    //url() in the cssIn file, use this to set a prefix URL to use. Only set it
    //if you find a problem with incorrect relative URLs after optimization.
    cssPrefix: "",

    //Inlines the text for any text! dependencies, to avoid the separate
    //async XMLHttpRequest calls to load those dependencies.
    inlineText: true,

    //Allow "use strict"; be included in the RequireJS files.
    //Default is false because there are not many browsers that can properly
    //process and give errors on code for ES5 strict mode,
    //and there is a lot of legacy code that will not work in strict mode.
    useStrict: false,

    //Specify build pragmas. If the source files contain comments like so:
    //>>excludeStart("fooExclude", pragmas.fooExclude);
    //>>excludeEnd("fooExclude");
    //Then the comments that start with //>> are the build pragmas.
    //excludeStart/excludeEnd and includeStart/includeEnd work, and the
    //the pragmas value to the includeStart or excludeStart lines
    //is evaluated to see if the code between the Start and End pragma
    //lines should be included or excluded. If you have a choice to use
    //"has" code or pragmas, use "has" code instead. Pragmas are harder
    //to read, but they can be a bit more flexible on code removal vs.
    //has-based code, which must follow JavaScript language rules.
    //Pragmas also remove code in non-minified source, where has branch
    //trimming is only done if the code is minified via UglifyJS or
    //Closure Compiler.
    pragmas: {
        fooExclude: true
    },

    //Same as "pragmas", but only applied once during the file save phase
    //of an optimization. "pragmas" are applied both during the dependency
    //mapping and file saving phases on an optimization. Some pragmas
    //should not be processed during the dependency mapping phase of an
    //operation, such as the pragma in the CoffeeScript loader plugin,
    //which wants the CoffeeScript compiler during the dependency mapping
    //phase, but once files are saved as plain JavaScript, the CoffeeScript
    //compiler is no longer needed. In that case, pragmasOnSave would be used
    //to exclude the compiler code during the save phase.
    pragmasOnSave: {
        //Just an example
        excludeCoffeeScript: true
    },

    //Allows trimming of code branches that use has.js-based feature detection:
    //https://github.com/phiggins42/has.js
    //The code branch trimming only happens if minification with UglifyJS or
    //Closure Compiler is done. For more information, see:
    //http://requirejs.org/docs/optimization.html#hasjs
    has: {
       'function-bind': true,
       'string-trim': false
    },

    //Similar to pragmasOnSave, but for has tests -- only applied during the
    //file save phase of optimization, where "has" is applied to both
    //dependency mapping and file save phases.
    hasOnSave: {
       'function-bind': true,
       'string-trim': false
    },

    //Allows namespacing requirejs, require and define calls to a new name.
    //This allows stronger assurances of getting a module space that will
    //not interfere with others using a define/require AMD-based module
    //system. The example below will rename define() calls to foo.define().
    //See http://requirejs.org/docs/faq-advanced.html#rename for a more
    //complete example.
    namespace:'foo',

    //Skip processing for pragmas.
    skipPragmas: false,

    //If skipModuleInsertion is false, then files that do not use define()
    //to define modules will get a define() placeholder inserted for them.
    //Also, require.pause/resume calls will be inserted.
    //Set it to true to avoid this. This is useful if you are building code that
    //does not use require() in the built project or in the JS files, but you
    //still want to use the optimization tool from RequireJS to concatenate modules
    //together.
    skipModuleInsertion: false,

    //Specify modules to stub out in the optimized file. The optimizer will
    //use the source version of these modules for dependency tracing and for
    //plugin use, but when writing the text into an optimized bundle, these
    //modules will get the following text instead:
    //If the module is used as a plugin:
    //    define({load: function(id){throw new Error("Dynamic load not allowed: " + id);}});
    //If just a plain module:
    //    define({});
    //This is useful particularly for plugins that inline all their resources
    //and use the default module resolution behavior (do *not* implement the
    //normalize() method). In those cases, an AMD loader just needs to know
    //that the module has a definition. These small stubs can be used instead of
    //including the full source for a plugin.
    stubModules: ['text','bar'],

    //If it is not a one file optimization, scan through all .js files in the
    //output directory for any plugin resource dependencies, and if the plugin
    //supports optimizing them as separate files, optimize them. Can be a
    //slower optimization. Only use if there are some plugins that use things
    //like XMLHttpRequest that do not work across domains, but the built code
    //will be placed on another domain.
    optimizeAllPluginResources: false,

    //Finds require() dependencies inside a require() or define call. By default
    //this value is false, because those resources should be considered dynamic/runtime
    //calls. However, for some optimization scenarios, it is desirable to
    //include them in the build.
    //Introduced in 1.0.3. Previous versions incorrectly found the nested calls
    //by default.
    findNestedDependencies: false,

    //If set to true, any files that were combined into a build bundle will be
    //removed from the output folder.
    removeCombined: false,

    //List the modules that will be optimized. All their immediate and deep
    //dependencies will be included in the module's file when the build is
    //done. If that module or any of its dependencies includes i18n bundles,
    //only the root bundles will be included unless the locale: section is set above.
    modules: [
        //Just specifying a module name means that module will be converted into
        //a built file that contains all of its dependencies. If that module or any
        //of its dependencies includes i18n bundles, they may not be included in the
        //built file unless the locale: section is set above.
        {
            name: "foo/bar/bop",

            //create: true can be used to create the module layer at the given
            //name, if it does not already exist in the source location. If
            //there is a module at the source location with this name, then
            //create: true is superfluous.
            create: true,

            //For build profiles that contain more than one modules entry,
            //allow overrides for the properties that set for the whole build,
            //for example a different set of pragmas for this module.
            //The override's value is an object that can
            //contain any of the other build options in this file.
            override: {
                pragmas: {
                    fooExclude: true
                }
            }
        },

        //This module entry combines all the dependencies of foo/bar/bop and foo/bar/bee
        //and any of their dependencies into one file.
        {
            name: "foo/bar/bop",
            include: ["foo/bar/bee"]
        },

        //This module entry combines all the dependencies of foo/bar/bip into one file,
        //but excludes foo/bar/bop and its dependencies from the built file. If you want
        //to exclude a module that is also another module being optimized, it is more
        //efficient if you define that module optimization entry before using it
        //in an exclude array.
        {
            name: "foo/bar/bip",
            exclude: [
                "foo/bar/bop"
            ]
        },

        //This module entry shows how to specify a specific module be excluded
        //from the built module file. excludeShallow means just exclude that
        //specific module, but if that module has nested dependencies that are
        //part of the built file, keep them in there. This is useful during
        //development when you want to have a fast bundled set of modules, but
        //just develop/debug one or two modules at a time.
        {
            name: "foo/bar/bin",
            excludeShallow: [
                "foo/bar/bot"
            ]
        },

        //This module entry shows the use insertRequire (first available in 2.0):
        {
            name: "foo/baz",
            insertRequire: ["foo/baz"]
        }
    ],

    //If the target module only calls define and does not call require() at the
    //top level, and this build output is used with an AMD shim loader like
    //almond, where the data-main script in the HTML page is replaced with just
    //a script to the built file, if there is no top-level require, no modules
    //will execute. specify insertRequire to have a require([]) call placed at
    //the end of the file to trigger the execution of modules. More detail at
    //https://github.com/requirejs/almond
    //Note that insertRequire does not affect or add to the modules that are
    //built into the build bundle. It just adds a require([]) call to the end
    //of the built file for use during the runtime execution of the built code.
    insertRequire: ['foo/bar/bop'],

    //If you only intend to optimize a module (and its dependencies), with
    //a single file as the output, you can specify the module options inline,
    //instead of using the'modules'section above.'exclude',
    //'excludeShallow','include'and'insertRequire'are all allowed as siblings
    //to name. The name of the optimized file is specified by'out'.
    name: "foo/bar/bop",
    include: ["foo/bar/bee"],
    insertRequire: ['foo/bar/bop'],
    out: "path/to/optimized-file.js",

    //An alternative to "include". Normally only used in a requirejs.config()
    //call for a module used for mainConfigFile, since requirejs will read
    //"deps" during runtime to do the equivalent of require(deps) to kick
    //off some module loading.
    deps: ["foo/bar/bee"],

    //In RequireJS 2.0, "out" can be a function. For single JS file
    //optimizations that are generated by calling requirejs.optimize(),
    //using an out function means the optimized contents are not written to
    //a file on disk, but instead pass to the out function:
    out: function (text, sourceMapText) {
        //Do what you want with the optimized text here.
        //Starting in 2.1.10, if generateSourceMaps was set to true
        //and optimize:'uglify2'was used ('uglify'in r.js 2.2+), then the
        //second argument to this function, sourceMapText, will be the text of
        //the source map.
    },

    //In 2.0.12+: by setting "out" to "stdout", the optimized output is written
    //to STDOUT. This can be useful for integrating r.js with other commandline
    //tools. In order to avoid additional output "logLevel: 4" should also be used.
    out: "stdout",

    //Wrap any build bundle in a start and end text specified by wrap.
    //Use this to encapsulate the module code so that define/require are
    //not globals. The end text can expose some globals from your file,
    //making it easy to create stand-alone libraries that do not mandate
    //the end user use requirejs.
    wrap: {
        start: "(function() {",
        end: "}());"
    },

    //Another way to use wrap, but uses default wrapping of:
    //(function() { + content + }());
    wrap: true,

    //Another way to use wrap, but uses file paths. This makes it easier
    //to have the start text contain license information and the end text
    //to contain the global variable exports, like
    //window.myGlobal = requirejs('myModule');
    //File paths are relative to the build file, or if running a commmand
    //line build, the current directory.
    wrap: {
        startFile: "parts/start.frag",
        endFile: "parts/end.frag"
    },

    //As of r.js 2.1.0, startFile and endFile can be arrays of files, and
    //they will all be loaded and inserted at the start or end, respectively,
    //of the build bundle.
    wrap: {
        startFile: ["parts/startOne.frag", "parts/startTwo.frag"],
        endFile: ["parts/endOne.frag", "parts/endTwo.frag"]
    },

    //When the optimizer copies files from the source location to the
    //destination directory, it will skip directories and files that start
    //with a ".". If you want to copy .directories or certain .files, for
    //instance if you keep some packages in a .packages directory, or copy
    //over .htaccess files, you can set this to null. If you want to change
    //the exclusion rules, change it to a different regexp. If the regexp
    //matches, it means the directory will be excluded. This used to be
    //called dirExclusionRegExp before the 1.0.2 release.
    //As of 1.0.3, this value can also be a string that is converted to a
    //RegExp via new RegExp().
    fileExclusionRegExp: /^\./,

    //By default, comments that have a license in them are preserved in the
    //output when a minifier is used in the "optimize" option.
    //However, for a larger built files there could be a lot of
    //comment files that may be better served by having a smaller comment
    //at the top of the file that points to the list of all the licenses.
    //This option will turn off the auto-preservation, but you will need
    //work out how best to surface the license information.
    //NOTE: As of 2.1.7, if using xpcshell to run the optimizer, it cannot
    //parse out comments since its native Reflect parser is used, and does
    //not have the same comments option support as esprima.
    preserveLicenseComments: true,

    //Sets the logging level. It is a number. If you want "silent" running,
    //set logLevel to 4. From the logger.js file:
    //TRACE: 0,
    //INFO: 1,
    //WARN: 2,
    //ERROR: 3,
    //SILENT: 4
    //Default is 0.
    logLevel: 0,

    //Introduced in 2.1.3: Some situations do not throw and stop the optimizer
    //when an error occurs. However, you may want to have the optimizer stop
    //on certain kinds of errors and you can configure those situations via
    //this option
    throwWhen: {
        //If there is an error calling the minifier for some JavaScript,
        //instead of just skipping that file throw an error.
        optimize: true
    },

    //A function that if defined will be called for every file read in the
    //build that is done to trace JS dependencies. This allows transforms of
    //the content.
    onBuildRead: function (moduleName, path, contents) {
        //Always return a value.
        //This is just a contrived example.
        return contents.replace(/foo/g,'bar');
    },

    //A function that will be called for every write to an optimized bundle
    //of modules. This allows transforms of the content before serialization.
    onBuildWrite: function (moduleName, path, contents) {
        //Always return a value.
        //This is just a contrived example.
        return contents.replace(/bar/g,'foo');
    },

    //A function that is called for each JS module bundle that has been
    //completed. This function is called after all module bundles have
    //completed, but it is called for each bundle. A module bundle is a
    //"modules" entry or if just a single file JS optimization, the
    //optimized JS file.
    //Introduced in r.js version 2.1.6
    onModuleBundleComplete: function (data) {
        /*
        data.name: the bundle name.
        data.path: the bundle path relative to the output directory.
        data.included: an array of items included in the build bundle.
        If a file path, it is relative to the output directory. Loader
        plugin IDs are also included in this array, but depending
        on the plugin, may or may not have something inlined in the
        module bundle.
        */
    },

    //Introduced in 2.1.3: Seed raw text contents for the listed module IDs.
    //These text contents will be used instead of doing a file IO call for
    //those modules. Useful if some module ID contents are dynamically
    //based on user input, which is common in web build tools.
    rawText: {
       'some/id':'define(["another/id"], function () {});'
    },

    //Introduced in 2.0.2: if set to true, then the optimizer will add a
    //define(require, exports, module) {}); wrapper around any file that seems
    //to use commonjs/node module syntax (require, exports) without already
    //calling define(). This is useful to reuse modules that came from
    //or are loadable in an AMD loader that can load commonjs style modules
    //in development as well as AMD modules, but need to have a built form
    //that is only AMD. Note that this does *not* enable different module
    //ID-to-file path logic, all the modules still have to be found using the
    //requirejs-style configuration, it does not use node's node_modules nested
    //path lookups.
    cjsTranslate: true,

    //Introduced in 2.0.2: a bit experimental.
    //Each script in the build bundle will be turned into
    //a JavaScript string with a //# sourceURL comment, and then wrapped in an
    //eval call. This allows some browsers to see each evaled script as a
    //separate script in the script debugger even though they are all combined
    //in the same file. Some important limitations:
    //1) Do not use in IE if conditional comments are turned on, it will cause
    //errors:
    //http://en.wikipedia.org/wiki/Conditional_comment#Conditional_comments_in_JScript
    //2) It is only useful in optimize:'none'scenarios. The goal is to allow
    //easier built bundle debugging, which goes against minification desires.
    useSourceUrl: true,

    //Defines the loading time for modules. Depending on the complexity of the
    //dependencies and the size of the involved libraries, increasing the wait
    //interval may be required. Default is 7 seconds. Setting the value to 0
    //disables the waiting interval.
    waitSeconds: 7,

    //Introduced in 2.1.9: normally r.js inserts a semicolon at the end of a
    //file if there is not already one present, to avoid issues with
    //concatenated files and automatic semicolon insertion  (ASI) rules for
    //JavaScript. It is a very blunt fix that is safe to do, but if you want to
    //lint the build output, depending on the linter rules, it may not like it.
    //Setting this option to true skips this insertion. However, by doing this,
    //you take responsibility for making sure your concatenated code works with
    //JavaScript's ASI rules, and that you use a minifier that understands when
    //to insert semicolons to avoid ASI pitfalls.
    skipSemiColonInsertion: false,

    //Introduced in 2.1.10: if set to true, will not strip amdefine use:
    //https://github.com/requirejs/amdefine
    //Normally you should not need to set this. It is only a concern if using
    //a built .js file from some other source, that may have included amdefine
    //in the built input. If you get a build error like
    //"undefined is not a function" and the file that generated the error
    //references amdefine, then set this to true.
    keepAmdefine: false,

    //Introduced in 2.1.11. As part of fixing a bug to prevent possible
    //overwrites of source code, https://github.com/jrburke/r.js/issues/444,
    //it prevented some cases where generated source is used for a build, and
    //it was OK to overwrite content in this source area as it was generated
    //from another source area, and not allowing source overwrites meant taking
    //another file copy hit. By setting this to true, it allows this sort of
    //source code overwriting. However, use at your own risk, and be sure you
    //have your configuration set correctly. For example, you may want to
    //set "keepBuildDir" to true.
    allowSourceOverwrites: false,

    //Introduced in 2.2.0. Path to file to write out bundles config
    //(http://requirejs.org/docs/api.html#config-bundles) found in the module
    //layers built by the optimizer. The path is relative to the "dir" config's
    //path. Only applies to full project optimization:
    //http://requirejs.org/docs/optimization.html#wholeproject
    //Only use if the optimized layers are grouped more intricately then just
    //a simple optimization of main app entry points. The file path specified
    //should be to one that has the top level requirejs.config() call that sets
    //up the loader. If using "mainConfigFile", then this path likely should be
    //the path to that file where it is placed in the "dir" output directory.
    bundlesConfigOutFile:'some/path/to/main.js',

    //Introduced in 2.2.0. Default is true for compatibility with older
    //releases. If set to false, r.js will not write a build.txt file in the
    //"dir" directory when doing a full project optimization.
    writeBuildTxt: true
})