
var Generator=require('yeoman-generator');
var path=require('path');

// 定的方法会自动运行
// 只有三种不会，1._下线线私有方法。2.构造函数定义方法。3.继承父类的方法
/**
 * 优先级顺序
            initializing - 你的初始化方法（检查当前的项目状态，获取配置等）
            prompting- 在哪里提示用户选择（你打电话的地方this.prompt()）
            configuring- 保存配置并配置项目（创建.editorconfig文件和其他元数据文件）
            default - 如果方法名称与优先级不匹配，则会被推送到该组。 自定义方法执行优先级顺序
            writing - 你在哪里编写生成器特定的文件（路由，控制器等）
            conflicts - 处理冲突（在内部使用）
            install - 在哪里安装（npm，凉亭）
            end- 最后叫，清理，再见，等等
方法:
    argument 
            向该类添加一个参数并为其创建一个属性getter。
            参数在几个方面与选项不同。第一个是如何从命令行解析它们，根据它们的位置来检索参数。
            另外，参数在你的代码中作为一个property（this.argument）使用，而选项全部保存在一个hash（this.options）中。
    argumentsHelp 获取参数的帮助文本
    bowerInstall 通过凉亭接收一个清单components和一个options安装对象。安装将在运行循环install阶段自动运行。
    composeWith 与另一个组成这个发电机。
    desc 简单的设置自定义description来追加帮助输出。
    destinationPath 加入到目标根的路径。
    destinationRoot 更改生成器目标根目录。这个路径是用来查找存储的，使用文件系统助手的方法（比如 this.write和this.copy）
    determineAppname
    git.email
    help
    installDependencies
    git.name
    npmInstall 通过npm 接收一个安装列表packages和一个options对象。安装将在运行循环install阶段自动运行。
    option 将一个选项添加到发电机预期选项集中，仅用于生成发电机使用情况。默认情况下，生成器将获取由nopt解析的所有cli选项作为this.options哈希对象。
    optionsHelp
    registerTransformStream 将一个变换流添加到提交流。通常，这些转换流将是Gulp插件。
    rootGeneratorName 确定根发生器名称（扩展发生器的人）。
    rootGeneratorVersion 
    run
    runInstall 组合包管理器cmd行参数并运行install命令。
    sourceRoot 更改生成器源根目录。这个路径被多个文件系统方法使用，如（this.read和this.copy）
    spawnCommand
    spawnCommandSync
    templatePath 加入到源根目录的路径。
    usage
    github.username
    yarnInstall

  argument(name,options{object}) 按顺序定义参数
        options:
            desc 参数描述
            required 布尔是否需要
            type 字符串，数字，数组（也可以是接收原始字符串值并解析它的自定义函数）
            default 这个参数的默认值
 option(name,options{object})
        options:
        desc 选项说明
        alias 选项的简称
        type 布尔，字符串或数字（也可以是接收原始字符串值并解析它的自定义函数）
        default 默认值
        hide 布尔是否隐藏帮助
 this.destinationRoot()        
 * **/
module.exports = class extends Generator {
    constructor(args, opts)
    {
         super(args, opts);
         this.argument("app",{
            description:"生成环境",
            required:false,
            type:String,
            default:"1"
         });
         this.contextRoot=path.resolve(__dirname,'../../');
         this.destinationRoot(this.contextRoot);
    }
    initializing(args,opts)
    {
        /*
        路径:root:\fanyonglong2016\project\DxBuildProject\new\path
        路径2 root:\fanyonglong2016\project\DxBuildProject
        路径3:root:\fanyonglong2016\project\DxBuildProject\new\path
        路径4:root:\fanyonglong2016\project\DxBuildProject\new\path\template
        路径5:root:\fanyonglong2016\project\DxBuildProject\new\path\new\template\path
        */
        // this.log('路径:'+this.destinationRoot('new/path'));
        // this.log('路径2:'+this.contextRoot);
        // this.log('路径3:'+this.destinationPath()); // 受destinationRoot 影响
        // this.log('路径4:'+this.destinationPath('template'));
        // this.log('路径5:'+this.sourceRoot('new/template/path')); // 受destinationRoot 影响
        // this.log('路径7:'+this.destinationPath('template'));
        // this.log('路径6:'+this.templatePath()); // // 受sourceRoot 影响,
        // this.log('路径8:'+__dirname);

        //this.log('路径6:'+this.templatePath());
    }
    /*
    prompt({array<object> }):https://github.com/SBoudrias/Inquirer.js 提供
        type: (String) Type of the prompt. Defaults: input - Possible values: input, confirm, list, rawlist, expand, checkbox, password, editor
        name: (String) The name to use when storing the answer in the answers hash. If the name contains periods, it will define a path in the answers hash.
        message: (String|Function) The question to print. If defined as a function, the first parameter will be the current inquirer session answers.
        default: (String|Number|Array|Function) Default value(s) to use if nothing is entered, or a function that returns the default value(s). If defined as a function, the first parameter will be the current inquirer session answers.
        choices: (Array|Function) Choices array or a function returning a choices array. If defined as a function, the first parameter will be the current inquirer session answers. Array values can be simple strings, or objects containing a name (to display in list), a value (to save in the answers hash) and a short (to display after selection) properties. The choices array can also contain a Separator.
        validate: （函数）接收用户输入和答案散列。如果值有效，则返回true，否则为错误消息（字符串）。如果返回false，则提供默认错误消息。
        filter: (Function) Receive the user input and return the filtered value to be used inside the program. The value returned will be added to the Answers hash.
        when: (Function, Boolean) Receive the current user answers hash and should return true or false depending on whether or not this question should be asked. The value can also be a simple boolean.
        pageSize: (Number) Change the number of lines that will be rendered when using list, rawList, expand or checkbox.
        prefix: (String) Change the default prefix message.
        suffix: (String) Change the default suffix message.
    */
    prompting()
    {
        return true?false:this.prompt([{
            type    : 'input',
            name    : 'name',
            message : '请输出你的模块名',
            default : "", // Default to current folder name
            filter(val)
            {
                return val.charAt(0).toUpperCase()+"-"+val.substr(1);
            },
            validate(val)
            {
                return val==''?'模块名不能为空':true;
            }

          },{
            type    : 'list',
            name    : 'moduleType',
            message : '请选择模块类型',
            choices:['vue','react','angular'],
            default : 0, // Default to current folder name
            validate(val)
            {
                return val==''?'请选择模块类型':true;
            }

          },{
            type    : 'checkbox',
            name    : 'extendTools',
            message : '请选择扩展工具',
            choices:['router','redux','rxjs'],
            default : 1, // Default to current folder name
            validate(val)
            {
                return val==''?'请选择扩展工具':true;
            }

          }, {
            type    : 'confirm',
            name    : 'cool',
            message : '你是否填写正确?'
          }]).then((answers) => {
            this.log('app name', answers.name);
            this.log('moduleType', answers.moduleType);
            this.log('extendTools', answers.extendTools);
            this.log('cool feature', answers.cool);
          });
    }
    coptyTemplate()
    {
        /*
        路径3:E:\fanyonglong2016\project\DxBuildProject
        路径1:E:\fanyonglong2016\project\DxBuildProject
        路径4:E:\fanyonglong2016\project\DxBuildProject\template
        路径6:E:\fanyonglong2016\project\DxBuildProject\generators\module\templates\index.js
        路径7:E:\fanyonglong2016\project\DxBuildProject\index.js
        */
      // this.contextRoot=path.resolve(__dirname,'../../');
       // this.destinationRoot(path.resolve(__dirname,'../../'));
        // this.log('路径3:'+this.contextRoot); // 运行根目
        // this.log('路径1:'+this.destinationRoot())  // 运行根目
        // this.log('路径4:'+this.destinationPath('template'));
        // this.log('路径6:'+this.templatePath('index.js'));
        // this.log('路径7:'+this.sourceRoot('index.js'));
        this.log('glob:'+this.templatePath('./*.js'));
    }
    writing()
    {
         // 复制
         this.fs.copy(this.templatePath('./*.js'),this.destinationPath('src/generators'));
    }
};