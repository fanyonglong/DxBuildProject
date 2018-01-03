
/**nodeJS
 * CLIEngine 是一个构造器，你可以通过传递想用的选项创建一个实例。下面是可以的选项：

  allowInlineConfig - 设置为 false 来禁止使用配置中的注释 (比如 eslint-disable)。对应 --no-inline-config。
  baseConfig - 设置为 false 禁用基本配置。 也可以设置为一个对象来重写基本配置。
  cache - 仅操作改变的文件(默认为 false)。对应于 --cache.
  cacheFile - 存放缓存的文件名。（默认为 .eslintcache）。对应于 --cache-file。已经弃用，用 cacheLocation 代替。
  cacheLocation - 存放缓存的文件或者目录名。（默认为 .eslintcache）。 对应于–cache-location`。
  configFile - 要使用的配置文件（默认：null）。对应于 -c。
  cwd - 当前工作目录路径
  envs - 需要加载的环境的数组（默认为空数组）。对应于 --env。
  extensions- 要检查的文件扩展名的数组。默认为仅包含 ".js" 的数组。对应于 --ext。它只和目录配合使用，而不是与 文件名或 glob 模式配合使用。
  fix - True 表示修复应该包含在输出报告中，错误和警告如果可以修复，就不应该再列出。然而，磁盘上的文件不会被改变。调用outputFixes()，来改变。
  globals - 要声明为全局变量的数组（默认为空数组）。对应于 --global。
  ignore- 值为 false 时禁用 .eslintignore、ignorePath 和 ignorePattern (默认为true)。对应于 --no-ignore。
  ignorePath - 要使用的忽略文件不是 .eslintignore (默认为 null)。对应于 --ignore-path。
  ignorePattern - 忽略路径的 Glob 模式。字符串或者字符串的数组。
  parser - 指定使用的解析器(默认为 espree)。对应于 --parser。
  parserOptions - 一个包含解析器选项的对象 (默认: 空对象)。对应 --parser-options。
  plugins - 要加载的插件数组 (默认: 空数组)。对应 --plugin。
  rulePaths - 加载自定义规则的目录的数组。(默认：空数组)。对应于 --rulesdir。
  rules - 要使用的规则的对象 (默认为null)。 对应于 --rule。
  useEslintrc - 设置为 false 时禁用 .eslintrc 文件(默认为true)。对应于--no-eslintrc。
 * 
 *  parserOptions:{
                "ecmaVersion": 6,
                "sourceType": "module",
                "ecmaFeatures": {
                    "jsx": true
                }
            },
            envs: ["browser", "es6"],
            fix: true, // difference from last example   自动修复
            useEslintrc:false,
            rules:{
                "no-this-before-super":"warn"
            }
 * 
*/

/**
 * 如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：

.eslintrc.js
.eslintrc.yaml
.eslintrc.yml
.eslintrc.json
.eslintrc
package.json
Configuratio

 * 
 * 同样的，支持 ES6 语法并不意味着支持新的 ESLint 全局变量或类型（如，新类型比如 Set）。对于 ES6 语法，使用 { "parserOptions": { "ecmaVersion": 6 } }；对于新的 ES6 全局变量，使用 { "env":{ "es6": true } }(这个设置会自动启用 ES6 语法)。

在 .eslintrc.* 文件使用 parserOptions 属性设置解析器选项。可用的选项有：

ecmaVersion - 设置为 3， 5 (默认)， 6、7 或 8 指定你想要使用的 ECMAScript 版本。你也可以指定为 2015（同 6），2016（同 7），或 2017（同 8）使用年份命名
sourceType - 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
ecmaFeatures - 这是个对象，表示你想使用的额外的语言特性:
globalReturn - 允许在全局作用域下使用 return 语句
impliedStrict - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
jsx - 启用 JSX
experimentalObjectRestSpread - 启用对实验性的 object rest/spread properties 的支持。(重要：这是一个实验性的功能,在未来可能会改变明显。 建议你写的规则 不要依赖该功能，除非当它发生改变时你愿意承担维护成本。)
.eslintrc.json 文件示例：


evns 环境

browser - browser 全局变量。
node - Node.js 全局变量和 Node.js 作用域。
commonjs - CommonJS 全局变量和 CommonJS 作用域 (仅为使用 Browserify/WebPack 写的只支持浏览器的代码)。
shared-node-browser - Node 和 Browser 通用全局变量。
es6 - 支持除模块外所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
worker - web workers 全局变量。
amd - 定义 require() 和 define() 作为像 amd 一样的全局变量。
mocha - 添加所有的 Mocha 测试全局变量。
jasmine - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
jest - Jest 全局变量。
phantomjs - PhantomJS 全局变量。
protractor - Protractor 全局变量。
qunit - QUnit 全局变量。
jquery - jQuery 全局变量。
prototypejs - Prototype.js 全局变量。
shelljs - ShellJS 全局变量。
meteor - Meteor 全局变量。
mongo - MongoDB 全局变量。
applescript - AppleScript 全局变量。
nashorn - Java 8 Nashorn 全局变量。
serviceworker - Service Worker 全局变量。
atomtest - Atom 测试全局变量。
embertest - Ember 测试全局变量。
webextensions - WebExtensions 全局变量。
greasemonkey - GreaseMonkey 全局变量。
 * 
*/
module.exports={
    "parser":"babel-eslint",
    "parserOptions": {
      "ecmaVersion": 8,
      "sourceType": "module",
      "allowImportExportEverywhere": false,
      "codeFrame": false
    },
    "env":{
      "browser":true,
      "es6":true
    },
   //"extends": "eslint:recommended", 
   //extends 属性值可以是 "eslint:all"，启用当前安装的 ESLint 中所有的核心规则。这些规则可以在 ESLint 的任何版本进行更改。
   /**
    *"off" 或 0 - 关闭规则
"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
"error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
为了在文件注释里配置规则，使用以下格式的注释：
/* eslint eqeqeq: "off", curly: "error" */
//在这个例子里，eqeqeq 规则被关闭，curly 规则被打开，定义为错误级别。你也可以使用对应的数字定义规则严重程度：
/* eslint eqeqeq: 0, curly: 2 */
//这个例子和上个例子是一样的，只不过它是用的数字而不是字符串。eqeqeq 规则是关闭的，curly 规则被设置为错误级别。
//如果一个规则有额外的选项，你可以使用数组字面量指定它们，比如：
/* eslint quotes: ["error", "double"], curly: 2 */

/*
rules 属性可以做下面的任何事情以扩展（或覆盖）规则：

启用额外的规则
改变继承的规则级别而不改变它的选项：
基础配置："eqeqeq": ["error", "allow-null"]
派生的配置："eqeqeq": "warn"
最后生成的配置："eqeqeq": ["warn", "allow-null"]
覆盖基础配置中的规则的选项
基础配置："quotes": ["error", "single", "avoid-escape"]
派生的配置："quotes": ["error", "single"]
最后生成的配置："quotes": ["error", "single"]
*/
    "rules":{
    
    }
    // "overrides": [
    //   {
    //     "files": [ "bin/*.js", "lib/*.js" ],
    //     "excludedFiles": "*.test.js",
    //     "rules": {
    //       "quotes": [ 2, "single" ]
    //     }
    //   }
    // ]
}