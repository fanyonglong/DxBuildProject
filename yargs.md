. [高级命令](#高级命令)
API
=======

你可以在没有任何配置的情况下运行Yargs，它会尽力解析process.argv：

````javascript
require('yargs').argv
````
你也可以通过process.argv自己：
````javascript
require('yargs')([ '-x', '1', '-y', '2' ]).argv
````

或者.parse()用来做同样的事情：
````javascript
require('yargs').parse([ '-x', '1', '-y', '2' ])
````

调用.parse()不带参数等效于调用yargs.argv：
```javascript
require('yargs').parse()
```

下面其余的方法在终止之前进来.argv。

<a name="alias"></a>.alias(key, alias)
------------------

将密钥名称设置为等效，以便对密钥的更新将传播到别名，反之亦然。

任选地.alias()可以采用将键映射到别名的对象。这个对象的每个键都应该是该选项的规范版本，每个值应该是一个字符串或一个字符串数组。

.argv
-----

获取作为一个普通的旧对象的参数。

没有相应标志的参数出现在argv._数组中。

脚本名称或节点命令argv.$0与$0 在bash或perl中的工作方式类似。

如果yargs在嵌入节点的环境中执行，并且没有脚本名称（例如 Electron或nw.js），它将忽略第一个参数，因为它预期它是脚本名称。为了覆盖这个行为，使用.parse(process.argv.slice(1)) 而不是.argv和第一个参数不会被忽略。
<a name="array"></a>.array(key)
----------

告诉解析器解释key为一个数组。如果.array('foo')被设置， --foo foo bar将被解析为['foo', 'bar']而不是'foo'。另外，如果多次使用该选项，则所有值都将在一个数组中平展，因此--foo foo --foo bar将被解析为['foo', 'bar']

<a name="boolean"></a>.boolean(key)
-------------
解释key为一个布尔值。如果非标记选项遵循key的 process.argv，该字符串不会得到设定的值key。

key将默认为false，除非default(key, undefined)明确设置。

如果key是数组，则将所有元素解释为布尔值。

.check(fn, [global=true])
----------

检查提供的参数是否符合某些条件。

fn被称为两个参数，分析的argv哈希和一个选项数组及其别名。

如果fn抛出或返回一个非真值，则显示抛出的错误，使用信息并退出。

global指示是否check()应该在顶层和每个子命令中都启用。

<a name="choices"></a>.choices(key, choices)
----------------------

将有效值限制为key预定义的一组值，以choices数组或单个值的形式给出。

```js
var argv = require('yargs')
  .alias('i', 'ingredient')
  .describe('i', 'choose your sandwich ingredients')
  .choices('i', ['peanut-butter', 'jelly', 'banana', 'pickles'])
  .help('help')
  .argv
```
如果多次调用此方法，则所有枚举值将合并在一起。选项通常是字符串或数字，值匹配区分大小写。

可选.choices()可以采取多个键映射到他们的选择对象。

选择也可以choices在给定的对象中指定option()。

```js
var argv = require('yargs')
  .option('size', {
    alias: 's',
    describe: 'choose a size',
    choices: ['xs', 's', 'm', 'l', 'xl']
  })
  .argv
```

<a name="coerce"></a>.coerce(key, fn)
----------------

提供一个同步函数来强制或转换命令行给定的值key。

强制函数应该接受一个参数，表示从命令行解析的值，并且应该返回一个新的值或抛出一个错误。返回的值将用作key（或其中一个别名）的值 argv。

如果该函数抛出，错误将被视为验证失败，委托给自定义.fail()处理程序或在控制台中打印错误消息。

在所有其他修改之后，强制将被应用于一个值，例如.normalize()。

例子：

```js
var argv = require('yargs')
  .coerce('file', function (arg) {
    return require('fs').readFileSync(arg, 'utf8')
  })
  .argv
```

任选地.coerce()可以采取几个键映射到它们各自的功能胁迫的对象。
```js
var argv = require('yargs')
  .coerce({
    date: Date.parse,
    json: JSON.parse
  })
  .argv
```

您也可以同时将相同的功能映射到多个键。只要传递一个键数组作为第一个参数.coerce()：

```js
var path = require('path')
var argv = require('yargs')
  .coerce(['src', 'dest'], path.resolve)
  .argv
```

如果使用的是点的概念或阵列，.eg，user.email并且user.password，强制将被应用到已解析的最终目标：
```js
// --user.name Batman --user.password 123
// gives us: {name: 'batman', password: '[SECRET]'}
var argv = require('yargs')
  .option('user')
  .coerce('user', opt => {
    opt.name = opt.name.toLowerCase()
    opt.password = '[SECRET]'
    return opt
  })
  .argv
```

.command(cmd, desc, [builder], [handler])
-----------------------------------------
.command(cmd, desc, [module])
-----------------------------
.command(module)
----------------

定义您的应用程序公开的命令。

cmd应该是表示命令的字符串或表示命令及其别名的字符串数组。阅读以下小节中有关命令别名的更多信息。

使用desc，以提供描述用于每个命令你的应用程序接受（存储在值argv._）。设置desc为false创建一个隐藏的命令。隐藏的命令不会显示在帮助输出中，不能完成。

或者，您可以提供一个builder对象来提供有关您的命令接受的选项的提示：

```js
yargs
  .command('get', 'make a get HTTP request', {
    url: {
      alias: 'u',
      default: 'http://yargs.js.org/'
    }
  })
  .help()
  .argv
```

builder也可以是一个功能。这个函数是用一个yargs实例执行的，可以用来提供高级命令的具体帮助：

```js
yargs
  .command('get', 'make a get HTTP request', function (yargs) {
    return yargs.option('url', {
      alias: 'u',
      default: 'http://yargs.js.org/'
    })
  })
  .help()
  .argv
```

你也可以提供一个处理函数，它将被解析的argv对象执行：
```js
yargs
  .command(
    'get',
    'make a get HTTP request',
    function (yargs) {
      return yargs.option('u', {
        alias: 'url',
        describe: 'the URL to make an HTTP request to'
      })
    },
    function (argv) {
      console.log(argv.url)
    }
  )
  .help()
  .argv
```
[查看](#commands)
Please see [Advanced Topics: Commands](https://github.com/yargs/yargs/blob/master/docs/advanced.md#commands) for a thorough
discussion of the advanced features exposed in the Command API.

.completion([cmd], [description], [fn])
---------------------------------------

为命令和选项启用bash完成快捷方式。

cmd：当出现时argv._，将导致.bashrc完成脚本输出。要启用bash完成，请将生成的脚本连接到您的 .bashrcor .bash_profile。

description：在使用说明中提供有关生成bash完成脚本的命令的说明。

fn：而不是依靠yargs的默认完成功能，这震撼了我木材是非常棒的，你可以提供自己的完成方法。

如果调用没有参数，.completion()将使completion命令输出完成脚本。

```js
var argv = require('yargs')
  .completion('completion', function(current, argv) {
    // 'current' is the current command being completed.
    // 'argv' is the parsed arguments so far.
    // simply return an array of completions.
    return [
      'foo',
      'bar'
    ];
  })
  .argv;
```

您也可以提供异步完成。

```js
var argv = require('yargs')
  .completion('completion', function(current, argv, done) {
    setTimeout(function() {
      done([
        'apple',
        'banana'
      ]);
    }, 500);
  })
  .argv;
```

但是等等，还有更多！您可以返回异步承诺。

```js
var argv = require('yargs')
  .completion('completion', function(current, argv, done) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(['apple', 'banana'])
      }, 10)
    })
  })
  .argv;
```

<a name="config"></a>.config([key], [description], [parseFn])
-------------------------------------------------------------
.config(object)
---------------
告诉解析器，如果key传入的是指定的选项，则应将其解释为JSON配置文件的路径。该文件被加载和解析，其属性被设置为参数。因为文件是使用Node的require（）加载的，所以文件名必须.json以正确解释结束。

如果不带参数调用，.config()将会使--config选项通过JSON配置文件。

description可以提供一个可key选项来定制用法字符串中的config（）选项。

一个可选的parseFn可以用来提供一个自定义的分析器。解析函数必须是同步的，并且应该返回包含键值对或错误的对象。

```js
var argv = require('yargs')
  .config('settings', function (configPath) {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  })
  .argv
```

你也可以传递一个显式的配置object，它将被解析，其属性将被设置为参数。

```js
var argv = require('yargs')
  .config({foo: 1, bar: 2})
  .argv
console.log(argv)
```

```
$ node test.js
{ _: [],
  foo: 1,
  bar: 2,
  '$0': 'test.js' }
```

### `extends` Keyword

config并pkgConf可以提供extends关键字来指示配置应该从另一个位置继承。

extends的值可以是JSON配置文件的相对路径或绝对路径，例如，

```js
yargs.config({
  extends: './configs/a.json',
  logLevel: 'verbose'
})
```

或者，可以提供一个模块（这对创建[babel-presets](https://babeljs.io/docs/plugins/))等功能非常有用 


**my-library.js**

```js
yargs.pkgConf('nyc')
```

**consuming package.json**

```json
{
  "nyc": {
    "extends": "nyc-babel-config"
  }
}
```

nyc-babel-config在其索引中导出配置的软件包在哪里？

<a name="conflicts"></a>.conflicts(x, y)
----------------------------------------------

鉴于密钥x已设置，密钥y不得设置。y可以是单个字符串，也可以是与之x冲突的参数名称数组。

任选地.conflicts()可以接受一个对象指定多个冲突的密钥。

<a name="count"></a>.count(key)
------------

解释key为布尔标志，但将解析值设置为标志出现次数而不是true或false。默认值是这样的0。
<a name="default"></a>.default(key, value, [description])
---------------------------------------------------------
.defaults(key, value, [description])
------------------------------------

注：该.defaults()别名已被弃用。它将在下一个主要版本中被删除。

如果没有指定任何选项，则设置argv[key]为。valueprocess.argv

任选地.default()可以采用将键映射到默认值的对象。

但是等等，还有更多！默认值可以是一个function返回值。该函数的名称将在使用字符串中使用：
```js
var argv = require('yargs')
  .default('random', function randomValue() {
    return Math.random() * 256;
  }).argv;
```

（可选）description也可以提供，并将优先于显示使用说明中的值：

```js
.default('timeout', 60000, '(one-minute)')
```

<a name="demand"></a>.demand(count, [max], [msg]) [DEPRECATED]
--------------------
demand()已被弃用，请反而看[`demandOption()`](#demandOption)和 [`demandCommand()`](#demandCommand)。


<a name="demandOption"></a>.demandOption(key, [msg | boolean])
------------------------------
.demandOption(key, msg)
------------------------------

如果key是字符串，则显示使用情况信息，如果key未指定则退出process.argv。

如果key是一个数组，则要求每个元素。

如果msg给出了一个字符串，那么当缺少参数时将会打印，而不是标准的错误信息。

```javascript
// demand an array of keys to be provided
require('yargs')
  .option('run', {
    alias: 'r',
    describe: 'run your program'
  })
  .option('path', {
    alias: 'p',
    describe: 'provide a path to file'
  })
  .option('spec', {
    alias: 's',
    describe: 'program specifications'
  })
  .demandOption(['run', 'path'], 'Please provide both run and path arguments to work with this tool')
  .help()
  .argv
```
这将提供以下输出:
```bash
Options:
  --run, -r   运行程序[必须]               [required]
  --path, -p  提供文件路径[必须]       [required]
  --spec, -s  程序规范
  --help      Show help                        [boolean]

  缺少必要的参数：run，路径
  请提供运行和路径参数以使用此工具
```

如果boolean给出一个值，则控制是否要求选项; 这在使用.options()指定命令行参数时很有用。
```javascript
// demand individual options within the option constructor
require('yargs')
  .options({
    'run': {
      alias: 'r',
      describe: 'run your program',
      demandOption: true
    },
    'path': {
      alias: 'p',
      describe: 'provide a path to file',
      demandOption: true
    },
    'spec': {
      alias: 's',
      describe: 'program specifications'
    }
  })
  .help()
  .argv
```
which will provide the following output:
```bash
Options:
  --run, -r   run your program                                       [required]
  --path, -p  provide a path to file                                 [required]
  --spec, -s  program specifications
  --help      Show help                                               [boolean]

Missing required arguments: run, path
```

<a name="demandCommand"></a>.demandCommand([min=1], [minMsg])
------------------------------
.demandCommand([min=1], [max], [minMsg], [maxMsg])
------------------------------
需求在命令的上下文中。您可以要求用户在您的程序中可以拥有的最小和最大号码，并且如果任何一项要求未得到满足，都会提供相应的错误消息。
```javascript
require('yargs')
  .command({
    command: 'configure <key> [value]',
    aliases: ['config', 'cfg'],
    desc: 'Set a config variable',
    builder: (yargs) => yargs.default('value', 'true'),
    handler: (argv) => {
      console.log(`setting ${argv.key} to ${argv.value}`)
    }
  })
  // provide a minimum demand and a minimum demand message
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv
```

which will provide the following output:

```bash
Commands:
  configure <key> [value]  Set a config variable         [aliases: config, cfg]

Options:
  --help  Show help                                                   [boolean]

You need at least one command before moving on
```

_Note: in `minMsg` and `maxMsg`, every occurrence of `$0` will be replaced
with the observed value, and every instance of `$1` will be replaced with the
expected value._

<a name="describe"></a>.describe(key, desc)
--------------------

Describe a `key` for the generated usage information.

Optionally `.describe()` can take an object that maps keys to descriptions.

.detectLocale(boolean)
-----------

Should yargs attempt to detect the os' locale? Defaults to `true`.

.env([prefix])
--------------

告诉yargs解析符合给定前缀的环境变量，并将它们应用到argv，就像它们是命令行参数一样。

使用环境变量中的“__”分隔符指示嵌套的选项。（例如prefix_nested__foo => nested.foo）

如果这个方法被调用时没有参数，或者是一个空字符串或者是true，那么所有的env变量都会被应用到argv。

程序参数按照以下顺序进行定义：

1. 命令行参数
1. 环境变量
1. 配置文件/对象
1. 配置的默认值

```js
var argv = require('yargs')
  .env('MY_PROGRAM')
  .option('f', {
    alias: 'fruit-thing',
    default: 'apple'
  })
  .argv
console.log(argv)
```

```
$ node fruity.js
{ _: [],
  f: 'apple',
  'fruit-thing': 'apple',
  fruitThing: 'apple',
  '$0': 'fruity.js' }
```

```
$ MY_PROGRAM_FRUIT_THING=banana node fruity.js
{ _: [],
  fruitThing: 'banana',
  f: 'banana',
  'fruit-thing': 'banana',
  '$0': 'fruity.js' }
```

```
$ MY_PROGRAM_FRUIT_THING=banana node fruity.js -f cat
{ _: [],
  f: 'cat',
  'fruit-thing': 'cat',
  fruitThing: 'cat',
  '$0': 'fruity.js' }
```

Env var parsing在默认情况下是禁用的，但是您也可以通过调用来明确禁用它.env(false)，例如，如果您需要撤销以前的配置。

.epilog(str)
------------
.epilogue(str)
--------------

A message to print at the end of the usage instructions, e.g.

```js
var argv = require('yargs')
  .epilogue('for more information, find our manual at http://example.com');
```

.example(cmd, desc)
-------------------

给你的程序的一些示例调用。在里面cmd，字符串 $0将被内插到当前脚本的当前脚本名称或节点命令，类似于$0在bash或perl中的工作方式。示例将作为帮助消息的一部分打印出来。

<a name="exitprocess"></a>.exitProcess(enable)
----------------------------------

默认情况下，yargs在用户传递帮助标志，使用.version功能或验证失败时退出进程 。调用 .exitProcess(false)将禁用此行为，在验证yargs之后启用进一步的操作。

<a name="fail"></a>.fail(fn)
---------
发生故障时执行的方法，而不是打印故障消息。

fn被打印的失败消息被调用，Error最初抛出的 实例和yargs状态，当失败发生时。

```js
var argv = require('yargs')
  .fail(function (msg, err, yargs) {
    if (err) throw err // preserve stack
    console.error('You broke it!')
    console.error(msg)
    console.error('You should be doing', yargs.help())
    process.exit(1)
  })
  .argv
```

.getCompletion(args, done);
---------------------------

允许以编程方式获得任何行的完成选项。

args：在命令行中完成的单词数组。

done：使用结果完成调用的回调。

例如：

```js
require('yargs')
  .option('foobar')
  .option('foobaz')
  .completion()
  .getCompletion(['./test.js', '--foo'], function (completions) {
    console.log(completions)
  })
```

Outputs the same completion choices as `./test.js --foo`<kbd>TAB</kbd>: `--foobar` and `--foobaz`

<a name="global"></a>.global(globals, [global=true])
------------
说明一个选项（或一组选项）在命令执行时不应该被重置，例如：

```js
var argv = require('yargs')
  .option('a', {
    alias: 'all',
    default: true,
    global: false
  })
  .option('n', {
    alias: 'none',
    default: true,
    global: false
  })
  .command('foo', 'foo command', function (yargs) {
    return yargs.option('b', {
      alias: 'bar'
    })
  })
  .help('help')
  .global('a')
  .argv
```

如果foo执行该命令，all选项将保留，但该none 选项将被清除。

选项默认为全局。

<a name="group"></a>.group(key(s), groupName)
--------------------

给定一个键或一组键，在显示使用说明时将选项放在另一个标题下，例如，

```js
var yargs = require('yargs')(['--help'])
  .help()
  .group('batman', 'Heroes:')
  .describe('batman', "world's greatest detective")
  .wrap(null)
  .argv
```
***
    Heroes:
      --batman  world's greatest detective

    Options:
      --help  Show help  [boolean]

<a name="help"></a>.help()
-----------------------------------------
.help([option | boolean])
-----------------------------------------
.help([option, [description]])
-----------------------------------------

配置--help显示使用字符串并退出进程的（eg ）和隐式命令。yargs默认启用该--help选项的帮助。

如果存在，则description参数会自定义用法字符串中帮助选项的说明。

如果提供了布尔参数false，它将被禁用--help。

请注意，help用于帮助选项的任何多字符别名（例如）也将用于隐式命令。如果不存在多字符别名（例如 h），则所有单字符别名将用于该命令。

如果调用没有参数，.help()将--help用作选项和 help隐式命令来触发帮助输出。

例：
```js
var yargs = require("yargs")(['--info'])
  .usage("$0 -operand1 number -operand2 number -operation [add|subtract]")
  .help('info')
  .argv
```

<a name="implies"></a>.implies(x, y)
--------------

鉴于密钥x已设置，则需要y设置密钥。y可以是要暗示的参数的名称，也可以是表示参数位置的数字，也可以是与多个暗示关联的数组x。

任选地.implies()可以接受一个对象指定多个含义。

.locale()
---------

返回yargs当前正在使用的语言环境。

默认情况下，yargs将自动检测操作系统的语言环境，以便yargs生成的帮助内容将以用户的语言显示。

要用静态语言环境覆盖此行为，请将所需的语言环境作为字符串传递给此方法（请参见下文）

.locale(locale)
---------------

用静态语言环境覆盖用户操作系统中自动检测的语言环境。请注意，可以通过设置/导出LC_ALL 环境变量来修改OS语言环境。

```js
var argv = require('yargs')
  .usage('./$0 - follow ye instructions true')
  .option('option', {
    alias: 'o',
    describe: "'tis a mighty fine option",
    demandOption: true
  })
  .command('run', "Arrr, ya best be knowin' what yer doin'")
  .example('$0 run foo', "shiver me timbers, here's an example for ye")
  .help('help')
  .wrap(70)
  .locale('pirate')
  .argv
```

***

```shell
./test.js - follow ye instructions true

Choose yer command:
  run  Arrr, ya best be knowin' what yer doin'

Options for me hearties!
  --option, -o  'tis a mighty fine option               [requi-yar-ed]
  --help        Parlay this here code of conduct             [boolean]

Ex. marks the spot:
  test.js run foo  shiver me timbers, here's an example for ye

Ye be havin' to set the followin' argument land lubber: option
```

Locales currently supported:

* **de:** German.
* **en:** American English.
* **es:** Spanish.
* **fr:** French.
* **hi:** Hindi.
* **hu:** Hungarian.
* **id:** Indonesian.
* **it:** Italian.
* **ja:** Japanese.
* **ko:** Korean.
* **nb:** Norwegian Bokmål.
* **pirate:** American Pirate.
* **pl:** Polish.
* **pt:** Portuguese.
* **pt_BR:** Brazilian Portuguese.
* **ru:** Russian.
* **th:** Thai.
* **tr:** Turkish.
* **zh_CN:** Chinese.

To submit a new translation for yargs:

1. use `./locales/en.json` as a starting point.
2. submit a pull request with the new locale file.

*The [Microsoft Terminology Search](http://www.microsoft.com/Language/en-US/Search.aspx) can be useful for finding the correct terminology in your locale.*

<a name="nargs"></a>.nargs(key, count)
-----------

在一个密钥之后应该消耗的参数的数量。这可以是一个有用的提示，以防止解析歧义。例如：

```js
var argv = require('yargs')
  .nargs('token', 1)
  .parse(['--token', '-my-token']);
```

parses as:

`{ _: [], token: '-my-token', '$0': 'node test' }`

Optionally `.nargs()` can take an object of `key`/`narg` pairs.

<a name="normalize"></a>.normalize(key)
---------------

提供的密钥代表一条路径，应该已经path.normalize()应用。

<a name="number"></a>.number(key)
------------

告诉解析器总是将其解释key为一个数字。

如果key是数组，则所有元素都将被解析为数字。

如果在没有值的情况下在命令行上给出选项，argv则将填充undefined。

如果命令行中给出的值不能被解析为数字，argv则会填充NaN。

请注意，小数，十六进制和科学记数法都是可接受的。
```js
var argv = require('yargs')
  .number('n')
  .number(['width', 'height'])
  .argv
```

.option(key, [opt])
-----------------
.options(key, [opt])
------------------

这种方法可以用来使纱线知道可能 存在的选项。您也可以传递一个opt对象，它可以容纳更多的自定义，比如.alias()，.demandOption()等该选项。

例如：

````javascript
var argv = require('yargs')
    .option('f', {
        alias: 'file',
        demandOption: true,
        default: '/etc/passwd',
        describe: 'x marks the spot',
        type: 'string'
    })
    .argv
;
````

is the same as

````javascript
var argv = require('yargs')
    .alias('f', 'file')
    .demandOption('f')
    .default('f', '/etc/passwd')
    .describe('f', 'x marks the spot')
    .string('f')
    .argv
;
````

Optionally `.options()` can take an object that maps keys to `opt` parameters.

````javascript
var argv = require('yargs')
    .options({
      'f': {
        alias: 'file',
        demandOption: true,
        default: '/etc/passwd',
        describe: 'x marks the spot',
        type: 'string'
      }
    })
    .argv
;
````

有效的opt密钥包括：

- alias：字符串或字符串数​​组，规范选项键的别名，请参阅 alias()
- array：布尔型，解释选项作为数组，请参阅 array()
- boolean：布尔型，将选项解释为布尔型标志，请参阅 boolean()
- choices：值或值数组，请将有效的选项参数限制到预定义的集合，请参阅 choices()
- coerce：函数，强制或将解析的命令行值转换为另一个值，请参阅 coerce()
- config：布尔型，将选项解释为JSON配置文件的路径，请参阅 config()
- configParser：函数，提供一个自定义配置解析函数，详见 config()
- conflicts：字符串或对象，需要某些键不被设置，请参阅 conflicts()
- count：布尔型，将选项解释为布尔型标志的计数，请参阅 count()
- default：值，为该选项设置一个默认值，参见 default()
- defaultDescription：字符串，在帮助内容中使用此描述作为默认值，请参阅 default()
- demandOption：布尔或字符串，要求给出的选项，可选的错误消息，请参阅 demandOption()
- desc/ describe/ description：字符串，该选项描述的帮助内容，请参阅describe()
- global：布尔型，表示在调用命令时不应该重置该键global()
- group：字符串，当显示使用说明时，将该选项置于另一个组标题下，请参阅 group()
- hidden：不要在帮助输出中显示选项。
- implies：字符串或对象，需要设置某些键，请参阅 implies()
- nargs：number，指定该选项应该消耗多少个参数，请参阅 nargs()
- normalize：布尔型，应用于path.normalize()该选项，请参阅normalize()
- number：布尔值，解释选项作为一个数字， number()
- requiresArg：布尔值，要求用值指定选项，参见 requiresArg()
- skipValidation：布尔型，如果选项存在，则跳过验证，请参阅 skipValidation()
- string：布尔型，将选项解释为字符串，请参阅 string()
- type：以下字符串之一
    - 'array'：代名词array: true，见array()
    - 'boolean'：代名词boolean: true，见boolean()
    - 'count'：代名词count: true，见count()
    - 'number'：代名词number: true，见number()
    - 'string'：代名词string: true，见string()

.parse([args], [context], [parseCallback])
------------

解析args而不是process.argv。返回argv对象。 args可以是预处理的argv数组，也可以是原始参数字符串。

一个context对象可以选择作为第二个参数给予parse()，为状态信息传递给命令提供了一个有用的机制：

```js
const parser = yargs
  .command('lunch-train <restaurant>', 'start lunch train', function () {}, function (argv) {
    console.log(argv.restaurant, argv.time)
  })
  .parse("lunch-train rudy's", {time: '12:15'})
```

A parseCallback也可以提供给.parse()。如果回调被给出，它将被调用三个参数：

1. err：如果在解析时引发任何验证错误，则填充。
1. argv：解析的argv对象。
1. output：任何将被输出到终端的文本，都没有提供回调。

```js
// providing the `fn` argument to `parse()` runs yargs in headless mode, this
// makes it easy to use yargs in contexts other than the CLI, e.g., writing
// a chat-bot.
const parser = yargs
  .command('lunch-train <restaurant> <time>', 'start lunch train', function () {}, function (argv) {
    api.scheduleLunch(argv.restaurant, moment(argv.time))
  })
  .help()

parser.parse(bot.userText, function (err, argv, output) {
  if (output) bot.respond(output)
})
```

***Note:*** Providing a callback to `parse()` disables the [`exitProcess` setting](#exitprocess) until after the callback is invoked.


<a name="pkg-conf"></a>
.pkgConf(key, [cwd])
------------

类似于config()，指示yargs应该将package.json中的指定键作为配置对象解释。

cwd 可以选择提供，package.json将从这个位置读取

.positional(key, opt)
------------

.positional()允许您使用类似的API来配置命令的位置参数.option()。.positional() 应该在命令的构建器函数中调用，并且不在顶层的yargs实例上可用。
> _you can describe top-level positional arguments using
  [default commands](/docs/advanced.md#default-commands)._

```js
const argv = require('yargs')('run --help')
  .command('run <port> <guid>', 'run the server', (yargs) => {
    yargs.positional('guid', {
      describe: 'a unique identifier for the server',
      type: 'string'
    })
  }).argv
console.log(argv)
```

有效的opt密钥包括：

- alias：字符串或字符串数​​组，请参阅 alias()
- choices：值或值数组，请将有效的选项参数限制到预定义的集合，请参阅 choices()
- coerce：函数，强制或将解析的命令行值转换为另一个值，请参阅 coerce()
- conflicts：字符串或对象，需要某些键不被设置，请参阅 conflicts()
- default：值，为该选项设置一个默认值，参见 default()
- desc/ describe/ description：字符串，该选项描述的帮助内容，请参阅describe()
- implies：字符串或对象，需要设置某些键，请参阅 implies()
- normalize：布尔型，应用于path.normalize()该选项，请参阅normalize()
- type：以下字符串之一
    - 'boolean'：代名词boolean: true，见boolean()
    - 'number'：代名词number: true，见number()
    - 'string'：代名词string: true，见string()

.recommendCommands()
---------------------------

如果没有找到匹配的命令，yargs是否应该提供有关类似命令的建议？

.require(key, [msg | boolean])
------------------------------
.required(key, [msg | boolean])
------------------------------

An alias for [`demand()`](#demand). See docs there.

<a name="requiresArg"></a>.requiresArg(key)
-----------------

指定单个选项键（字符串）或选项值必须跟随的选项数组。如果缺少任何选项值，请显示使用情况信息并退出。

默认的行为是将任何键后面没有选项值的值设置为true。

<a name="reset"></a>.reset() [DEPRECATED]
--------

重置迄今建立的参数对象。这对于创建嵌套的命令行界面非常有用。使用全局 指定不应重置的键。

```js
var yargs = require('yargs')
  .usage('$0 command')
  .command('hello', 'hello command')
  .command('world', 'world command')
  .demandCommand(1, 'must provide a valid command'),
  argv = yargs.argv,
  command = argv._[0];

if (command === 'hello') {
  yargs.reset()
    .usage('$0 hello')
    .help('h')
    .example('$0 hello', 'print the hello message!')
    .argv

  console.log('hello!');
} else if (command === 'world'){
  yargs.reset()
    .usage('$0 world')
    .help('h')
    .example('$0 world', 'print the world message!')
    .argv

  console.log('world!');
} else {
  yargs.showHelp();
}
```

.showCompletionScript()
----------------------

生成一个bash完成脚本。您的应用程序的用户可以在其中安装此脚本.bashrc，yargs将提供命令和选项的完成快捷方式。

.showHelp(consoleLevel='error')
---------------------------

Print the usage data using the [`console`](https://nodejs.org/api/console.html) function `consoleLevel` for printing.

Example:

```js
var yargs = require("yargs")
  .usage("$0 -operand1 number -operand2 number -operation [add|subtract]");
yargs.showHelp(); //prints to stderr using console.error()
```

Or, to print the usage data to `stdout` instead, you can specify the use of `console.log`:

```js
yargs.showHelp("log"); //prints to stdout using console.log()
```

Later on, `argv` can be retrieved with `yargs.argv`.

.showHelpOnFail(enable, [message])
----------------------------------

默认情况下，如果检测到任何错误，yargs会输出一个用法字符串。使用该 .showHelpOnFail()方法来自定义此行为。如果enable是false，则不输出使用字符串。如果message参数存在，则在错误消息之后输出此消息。

line_count.js:

````javascript
#!/usr/bin/env node
var argv = require('yargs')
    .usage('Count the lines in a file.\nUsage: $0 -f <file>')
    .demandOption('f')
    .alias('f', 'file')
    .describe('f', 'Load a file')
    .string('f')
    .showHelpOnFail(false, 'Specify --help for available options')
    .help('help')
    .argv;

// etc.
````

***

```
$ node line_count.js
Missing argument value: f

Specify --help for available options
```

<a name="skipValidation"></a>.skipValidation(key)
-----------------

Specifies either a single option key (string), or an array of options.
If any of the options is present, yargs validation is skipped.

.strict([enabled=true])
---------

Any command-line argument given that is not demanded, or does not have a
corresponding description, will be reported as an error.

Unrecognized commands will also be reported as errors.

<a name="string"></a>.string(key)
------------

告诉解析器逻辑不要将其解释key为数字或布尔值。如果您需要保留输入中的前导零，这可能很有用。

如果key是数组，则将所有元素解释为字符串。

.string('_') 将导致非连字符参数被解释为字符串，而不管它们是否与数字相似。

.updateLocale(obj)
------------------
.updateStrings(obj)
------------------

用以下提供的键/值对覆盖yargs使用的默认字符串obj：

```js
var argv = require('yargs')
  .command('run', 'the run command')
  .help('help')
  .updateStrings({
    'Commands:': 'My Commands -->\n'
  })
  .wrap(null)
  .argv
```

***

```shell
My Commands -->

  run  the run command

Options:
  --help  Show help  [boolean]
```

If you explicitly specify a `locale()`, you should do so *before* calling
`updateStrings()`.

.usage(<message|command>, [desc], [builder], [handler])
---------------------

设置使用情况消息以显示要使用的命令。在里面message，字符串 $0将被内插到当前脚本的当前脚本名称或节点命令，类似于$0在bash或perl中的工作方式。

如果可选的desc/ builder/ handler设置，.usage() 起作用的一个别名.command()。这使您可以使用它 .usage()来配置默认命令，该命令将作为应用程序的入口运行，并允许您为程序接受的位置参数提供配置：

```js
const argv = require('yargs')
  .usage('$0 <port>', 'start the application server', (yargs) => {
    yargs.positional('port', {
      describe: 'the port that your application should bind to',
      type: 'number'
    })
  }).argv
```

<a name="version"></a>
.version()
----------------------------------------
.version([version|boolean])
----------------------------------------
.version([option], [description], [version])
----------------------------------------

添加一个选项（例如--version），显示版本号（由version参数给出 ）并退出进程。默认情况下，yargs启用该--version选项的版本。

如果没有参数传递给version（.version()），yargs会解析package.json 你的模块并使用它的version值。

如果提供了布尔参数false，它将被禁用--version。

<a name="wrap"></a>.wrap(columns)
--------------

格式化用法输出以包装在columns许多列中。

默认情况下，换行将被设置为Math.min(80, windowWidth)。使用.wrap(null)指定没有列的限制（没有右对齐）。使用.wrap(yargs.terminalWidth())最大化yargs的使用说明的宽度。



## 高级命令
# Advanced Topics

<a name="commands"></a>
## Commands

Yargs为构建模块化命令驱动应用程序提供了一套强大的工具。
在本节中，我们将介绍该API中的一些高级功能：

### Default Commands

要指定默认命令，请使用字符串`*`或`$ 0`。 默认命令
将在所提供的位置参数匹配未知时运行
命令。tldr; 默认命令允许你定义你的入口点
应用程序使用类似于API的子命令。

```js
const argv = require('yargs')
  .command('$0', 'the default command', () => {}, (argv) => {
    console.log('this command will be run by default')
  })
```

上面定义的命令将在程序执行时执行
使用`./my-cli.js --x = 22`运行。

默认命令也可以用作命令别名，如下所示：
```js
const argv = require('yargs')
  .command(['serve', '$0'], 'the serve command', () => {}, (argv) => {
    console.log('this command will be run by default')
  })
```

上面定义的命令将在程序执行时执行
使用`./my-cli.js --x = 22`运行，或者使用`./my-cli.js服务--x = 22`运行。
### Positional Arguments

命令可以接受_optional_和_required_位置参数。 需要
位置参数的形式为<foo>`和可选参数
采取`[bar]`的形式。 解析后的位置参数将被填入
`argv`:

```js
yargs.command('get <source> [proxy]', 'make a get HTTP request')
  .help()
  .argv
```

#### Positional Argument Aliases

可以使用`|`字符为位置参数提供别名。
作为一个例子，假设我们的应用程序允许用户名_or_
作为第一个参数的电子邮件：

```js
yargs.command('get <username|email> [password]', 'fetch a user by username or email.')
  .help()
  .argv
```

通过这种方式，`argv.username`和`argv.email`都将被填充
命令执行时的值相同。

#### Variadic Positional Arguments

最后一个位置参数可以选择性地接受一个数组
值，通过使用`..`运算符：
```js
yargs.command('download <url> [files..]', 'download several files')
  .help()
  .argv
```

#### Describing Positional Arguments

您可以在命令的构建器函数中使用方法[`.positional（）`]（/ docs / api.md＃positional基钥-opt）来描述和配置一个位置参数：

```js
yargs.command('get <source> [proxy]', 'make a get HTTP request', (yargs) => {
  yargs.positional('source', {
    describe: 'URL to fetch content from',
    type: 'string',
    default: 'http://www.google.com'
  }).positional('proxy', {
    describe: 'optional proxy URL'
  })
})
.help()
.argv
```

### Command Execution
当在命令行上给出命令时，yargs将执行以下操作：

1.将命令推入当前上下文
2.重置非全局配置
3.通过`builder`应用命令配置，如果有的话
4.从命令行解析和验证参数，包括位置参数
5.如果验证成功，运行`handler`函数（如果给出的话）
6.从当前上下文弹出命令

###命令别名

您可以通过放置命令及其全部命令来定义命令的别名
别名到数组中。

或者，命令模块可以指定“别名”属性，可以是
一个字符串或一个字符串数组。通过`command`属性定义的所有别名
和`aliases`属性将被连接在一起。

数组中的第一个元素被认为是canonical命令，可能
定义位置参数，并且数组中的其余元素是
考虑过别名。别名从规范命令继承位置参数，
因此在别名中定义的任何位置参数都会被忽略。

如果命令中给出了规范命令或其任何别名
行，该命令将被执行。
```js
#!/usr/bin/env node
require('yargs')
  .command(['start [app]', 'run', 'up'], 'Start up an app', {}, (argv) => {
    console.log('starting up the', argv.app || 'default', 'app')
  })
  .command({
    command: 'configure <key> [value]',
    aliases: ['config', 'cfg'],
    desc: 'Set a config variable',
    builder: (yargs) => yargs.default('value', 'true'),
    handler: (argv) => {
      console.log(`setting ${argv.key} to ${argv.value}`)
    }
  })
  .demandCommand()
  .help()
  .wrap(72)
  .argv
```

```
$ ./svc.js help
Commands:
  start [app]              Start up an app            [aliases: run, up]
  configure <key> [value]  Set a config variable  [aliases: config, cfg]

Options:
  --help  Show help                                            [boolean]

$ ./svc.js cfg concurrency 4
setting concurrency to 4

$ ./svc.js run web
starting up the web app
```

### Providing a Command Module
对于复杂的命令，您可以将逻辑放入模块中。 一个模块
只需要导出：

*`exports.command`：当在命令行上给出时执行此命令的字符串（或字符串数组），第一个字符串可能包含位置参数
*`exports.aliases`：代表`exports.command`的别名的字符串（或单个字符串）的数组，在别名中定义的位置参数被忽略
*`exports.describe`：字符串用作帮助文本中命令的描述，对于隐藏命令使用'false'
*`exports.builder`：声明命令接受的选项的对象，或接受并返回yargs实例的函数
*`exports.handler`：将被传递解析的argv的函数。
```js
// my-module.js
exports.command = 'get <source> [proxy]'

exports.describe = 'make a get HTTP request'

exports.builder = {
  banana: {
    default: 'cool'
  },
  batman: {
    default: 'sad'
  }
}

exports.handler = function (argv) {
  // do something with argv.
}
```

You then register the module like so:

```js
yargs.command(require('my-module'))
  .help()
  .argv
```
或者，如果模块不输出`command`和`describe`（或者你只是想重写它们）：

```js
yargs.command('get <source> [proxy]', 'make a get HTTP request', require('my-module'))
  .help()
  .argv
```

.commandDir(directory, [opts])
------------------------------
从相对于调用此方法的模块的目录应用命令模块。

这使您可以将多个命令组织到它们自己的模块下
单个目录并且一次全部应用而不是调用
.command（require（'./ dir / module'））`多次。

默认情况下，它忽略子目录。这样你就可以使用一个目录
结构来表示您的命令层次结构，其中每个命令都应用它
在其构建器函数中使用此方法的子命令。看下面的例子。

请注意，yargs假定给定目录中的所有模块都是命令模块
如果遇到非命令模块将会出错。在这种情况下，你
可以将您的模块移动到不同的目录或使用`exclude`或
`visit`选项手动将其过滤掉。更多关于下面的内容。

`directory`是一个相对目录路径，为一个字符串（必需）。

`opts`是一个选项对象（可选）。以下选项是有效的：

- `recurse`：布尔值，默认`false`

    在所有子目录中查找命令模块并将其作为拼合应用
    （非分层）列表。

- `extensions`：字符串数组，默认`['js']`

    需要命令模块时查找的文件类型。

- 'visit'：功能

    为每个遇到的命令模块调用同步函数。接受
    `commandObject`，`pathToFile`和`filename`作为参数。返回
    `commandObject`包含命令;任何虚假值排除/跳过它。

- `include`：RegExp或函数

    将某些模块列入白名单。有关详细信息，请参阅[需要目录白名单]（https://www.npmjs.com/package/require-directory#whitelisting）。

- `exclude`：RegExp或函数

    黑名单某些模块。有关详细信息，请参见[`require-directory` blacklisting]（https://www.npmjs.com/package/require-directory#blacklisting）。

### Example command hierarchy using `.commandDir()`

Desired CLI:

```sh
$ myapp --help
$ myapp init
$ myapp remote --help
$ myapp remote add base http://yargs.js.org
$ myapp remote prune base
$ myapp remote prune base fork whatever
```

Directory structure:

```
myapp/
├─ cli.js
└─ cmds/
   ├─ init.js
   ├─ remote.js
   └─ remote_cmds/
      ├─ add.js
      └─ prune.js
```

cli.js:

```js
#!/usr/bin/env node
require('yargs')
  .commandDir('cmds')
  .demandCommand()
  .help()
  .argv
```

cmds/init.js:

```js
exports.command = 'init [dir]'
exports.desc = 'Create an empty repo'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  console.log('init called for dir', argv.dir)
}
```

cmds/remote.js:

```js
exports.command = 'remote <command>'
exports.desc = 'Manage set of tracked repos'
exports.builder = function (yargs) {
  return yargs.commandDir('remote_cmds')
}
exports.handler = function (argv) {}
```

cmds/remote_cmds/add.js:

```js
exports.command = 'add <name> <url>'
exports.desc = 'Add remote named <name> for repo at url <url>'
exports.builder = {}
exports.handler = function (argv) {
  console.log('adding remote %s at url %s', argv.name, argv.url)
}
```

cmds/remote_cmds/prune.js:

```js
exports.command = 'prune <name> [names..]'
exports.desc = 'Delete tracked branches gone stale for remotes'
exports.builder = {}
exports.handler = function (argv) {
  console.log('pruning remotes %s', [].concat(argv.name).concat(argv.names).join(', '))
}
```

<a name="configuration"></a>
## Building Configurable CLI Apps
纱线的其中一个目标是研究在食品中常见的做法
JavaScript CLI社区，并使其易于应用
约定到您自己的应用程序。

已经出现的一组有用的约定是关于应用程序的
允许用户扩展和定制他们的功能。
### .rc files
对于图书馆来说很常见，例如[Babel]（https://babeljs.io/docs/usage/babelrc/），[ESLint]（https://github.com/eslint/eslint#configuration），以便您
通过填充一个`.rc`文件来提供配置。

Yargs'[`config（）`](/docs/api.md＃config)与模块[find-up]（https://www.npmjs.com/package/find-up）结合使用， 至
实现`.rc`功能：
```js
const findUp = require('find-up')
const fs = require('fs')
const configPath = findUp.sync(['.myapprc', '.myapprc.json'])
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {}
const argv = require('yargs')
  .config(config)
  .argv
```

### Providing Configuration in Your package.json

Another common practice is to allow users to provide configuration via
a reserved field in the package.json. You can configure [nyc](https://github.com/istanbuljs/nyc#configuring-nyc) or [babel](https://babeljs.io/docs/usage/babelrc/#lookup-behavior), for instance,
using the `nyc` and `babel` key respectively:

```json
{
  "nyc": {
    "watermarks": {
      "lines": [80, 95],
      "functions": [80, 95],
      "branches": [80, 95],
      "statements": [80, 95]
    }
  }
}
```

Yargs gives you this functionality using the [`pkgConf()`](/docs/api.md#config)
method:

```js
const argv = require('yargs')
  .pkgConf('nyc')
  .argv
```

### Creating a Plugin Architecture

Both [`pkgConf()`](/docs/api.md#config) and [`config()`](/docs/api.md#config) support
the `extends` keyword. `extends` allows you to inherit configuration from [other npm modules](https://www.npmjs.com/package/@istanbuljs/nyc-config-babel), making it
possible to build plugin architectures similar to [Babel's presets](https://babeljs.io/docs/plugins/#presets):

```json
{
  "nyc": {
    "extends": "@istanbuljs/nyc-config-babel"
  }
}
```

<a name="customizing"></a>
## Customizing Yargs' Parser

Not everyone always agrees on how `process.argv` should be interpreted;
using the `yargs` stanza in your `package.json` you can turn on and off
some of yargs' parsing features:

```json
{
  "yargs": {
    "short-option-groups": true,
    "camel-case-expansion": true,
    "dot-notation": true,
    "parse-numbers": true,
    "boolean-negation": true
  }
}
```

See the [yargs-parser](https://github.com/yargs/yargs-parser#configuration) module
for detailed documentation of this feature.

## Middleware

Sometimes you might want to transform arguments before they reach the command handler.
For example, you perhaps you want to validate that credentials have been provided and otherwise load credentials from a file.

Middleware is simply a stack of functions, each of which is passed the the current parsed arguments, which it can in turn update by adding values, removing values, or overwriting values.

Diagram:

```
                        --------------         --------------        ---------
stdin ----> argv ----> | Middleware 1 | ----> | Middleware 2 | ---> | Command |
                        --------------         --------------        ---------
```

### Example Credentials Middleware

In this example, our middleware will check if the `username` and `password` is provided. If not, it will load them from `~/.credentials`, and fill in the `argv.username` and `argv.password` values.

#### Middleware function

```
const normalizeCredentials = (argv) => {
  if (!argv.username || !argv.password) {
    const credentials = JSON.parse(fs.readSync('~/.credentials'))
    return credentials
  }
  return {}
}
```

#### yargs parsing configuration

```
var argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('login', 'Authenticate user', (yargs) =>{
        return yargs.option('username')
                    .option('password')
      } ,(argv) => {
        authenticateUser(argv.username, argv.password)
      }, 
      [normalizeCredentials]
     )
  .argv;
```
