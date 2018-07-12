const glob=require('glob');
const micromatch=require('micromatch')
/*
用法
用npm安装

npm i glob
var glob = require("glob")

// options is optional
glob("**\/*.js", options, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**\/*.js"]
  // er is an error object or null.
})
Glob Primer
“水珠”是当你做这样的东西，你输入的格式ls *.js在命令行中，或将build \/*在一个.gitignore文件中。

在解析路径部分模式之前，支撑部分被扩展为一个集合。带括号的部分以任何数量的以逗号分隔的部分开始{和结束}。括号内的部分可能包含斜杠字符，因此a{/b/c,bcd}会扩展为a/b/c和abcd。

以下字符在路径部分中使用时具有特殊的魔法含义：

* 匹配单个路径部分中的0个或更多个字符
? 匹配1个字符
[...]匹配一系列字符，类似于RegExp范围。如果范围的第一个字符是!或^然后它匹配不在范围内的任何字符。
!(pattern|pattern|pattern) 匹配任何与提供的任何模式不匹配的内容。
?(pattern|pattern|pattern) 匹配提供的模式零次或一次。
+(pattern|pattern|pattern) 匹配一个或多个出现的模式。
*(a|b|c) 匹配零次或多次出现的模式
@(pattern|pat*|pat?erN) 完全匹配提供的一种模式
**如果“globstar”在路径部分单独存在，则匹配零个或多个目录和搜索匹配的子目录。它不抓取符号链接的目录。
点
如果文件或目录路径部分具有.第一个字符，那么它将不匹配任何glob模式，除非该模式的相应路径部分也具有.第一个字符。

例如，该模式a/.*\/c将与文件at相匹配a/.b/c。但是模式a/*\/c不会，因为*不以点号开头。

通过dot:true在选项中进行设置，您可以将圆点视为普通字符 。

基本名称匹配
如果你matchBase:true在选项中设置，并且模式中没有斜杠，那么它将在树中的任何地方寻找具有匹配基本名称的任何文件。例如，*.js会匹配 test/simple/basic.js。

空集
如果找不到匹配的文件，则返回一个空数组。这与返回模式本身的shell不同。例如：

$ echo a*s*d*f
a*s*d*f
要获得bash式的行为，请nonull:true在选项中进行设置。

也可以看看：
man sh
man bash （搜索“模式匹配”）
man 3 fnmatch
man 5 gitignore
minimatch文档
glob.hasMagic（pattern，[options]）
返回模式中true是否有特殊字符， false否则返回。

请注意，这些选项会影响结果。如果noext:true在选项对象中设置，则+(a|b)不会被视为魔法模式。如果模式有一个大括号扩展，a/{b/c,x/y} 那么这被认为是不可思议的，除非nobrace:true在选项中设置。

glob（模式，[选项]，cb）
pattern {String} 要匹配的模式
options {Object}
cb {Function}
err {Error | null}
matches {Array<String>} 找到与该模式匹配的文件名
执行异步全局搜索。

glob.sync（pattern，[options]）
pattern {String} 要匹配的模式
options {Object}
返回：{Array<String>}找到匹配模式的文件名
执行同步全局搜索。

Class：glob.Glob
通过实例化glob.Glob类来创建一个Glob对象。

var Glob = require("glob").Glob
var mg = new Glob(pattern, options, cb)
这是一个EventEmitter，并开始走文件系统来立即找到匹配。

new glob.Glob（pattern，[options]，[cb]）
pattern {String} 模式来搜索
options {Object}
cb {Function} 当发生错误或发现匹配时调用
err {Error | null}
matches {Array<String>} 找到与该模式匹配的文件名
请注意，如果sync在选项中设置了标志，则匹配将立即在g.found成员上可用。

属性
minimatch glob使用的minimatch对象。
options 传入的选项对象。
aborted调用时设置为true的布尔值abort()。目前没有办法在中止后继续进行全局搜索，但是您可以重新使用statCache以避免重复系统调用。
cache便利对象。每个字段都有以下可能的值：
false - 路径不存在
true - 路径存在
'FILE' - 路径存在，并不是一个目录
'DIR' - 路径存在，并且是一个目录
[file, entries, ...] - 路径存在，是一个目录，数组值是结果 fs.readdir
statCache缓存fs.stat结果，以防止多次统一相同的路径。
symlinks记录哪些路径是符号链接，这与解决**模式有关。
realpathCache传递给可选对象fs.realpath 以尽量减少不必要的系统调用。它存储在实例化的Glob对象上，并可能被重用。
活动
end匹配完成后，会发现所有找到的匹配项。如果nonull选项已设置，并且未找到匹配项，则matches列表将包含原始模式。除非nosort设置了标志，否则匹配会被排序。
match每次找到匹配时，都会发出匹配的特定事件。它不会被重复数据删除或解析为实际路径。
error遇到意外错误时发生，或者每当发生任何fs错误时发出options.strict。
abort什么时候abort()被调用，这个事件会引发。
方法
pause 暂时停止搜索
resume 恢复搜索
abort 永远停止搜索
选项
所有可以传递给Minimatch的选项也可以传递给Glob以更改模式匹配行为。此外，一些已被添加，或具有全局特定的后果。

除非另有说明，所有选项默认为false。

所有选项也都添加到Glob对象中。

如果您正在运行许多glob操作，则可以将Glob对象作为options参数传递给后续操作，以便快速进行一些操作 stat和readdir调用。最起码，你可以通过共享 symlinks，statCache，realpathCache，和cache选择，使平行水珠操作将通过共享有关文件系统的信息有待加快。

cwd当前工作目录中进行搜索。默认为process.cwd()。
root以模式开头的地方/将被安装到上面。默认为path.resolve(options.cwd, "/")（/在Unix系统上，C:\或者在Windows上）。
dot.dot在正常匹配和globstar匹配中包含文件。请注意，图案部分中的明确点总是与点文件相匹配。
nomount默认情况下，以正斜杠开头的模式将“挂载”到根设置，以便返回有效的文件系统路径。设置此标志可禁用该行为。
mark添加一个/字符到目录匹配。请注意，这需要额外的统计调用。
nosort 不要对结果进行排序。
stat设为true以统计所有结果。这在某种程度上降低了性能，而且完全没有必要，除非readdir被认为是文件存在的不可信指标。
silent当尝试读取目录时遇到不寻常的错误时，警告将打印到stderr。将该silent选项设置 为true以禁止这些警告。
strict当尝试读取目录时遇到不寻常的错误时，该过程将继续搜索其他匹配。strict在这些情况下设置选项以引发错误。
cache请参阅cache上述属性。传入先前生成的缓存对象以保存一些fs调用。
statCache缓存文件系统信息的结果，以防止不必要的统计调用。虽然通常不需要设置它，但是如果您知道文件系统在调用之间不会更改，则可以将statCache从一个glob（）调用传递到另一个的选项对象。（请参阅下面的“比赛条件”。）
symlinks已知符号链接的缓存。解决匹配时，您可以传入先前生成的symlinks对象以保存lstat呼叫**。
syncDEPRECATED：glob.sync(pattern, opts)改为使用。
nounique在某些情况下，花括号扩展模式可能导致相同的文件在结果集中多次显示。默认情况下，这个实现可以防止结果集中的重复。设置此标志可禁用该行为。
nonull设置为永不返回空集，而是返回包含模式本身的集。这是glob（3）中的默认值。
debug 设置为启用minimatch和glob中的调试日志记录。
nobrace不要展开{a,b}和{1..3}支撑套件。
noglobstar不匹配**多个文件名。（也就是说，把它当作一个正常的东西*）。
noext不匹配+(a|b)“extglob”模式。
nocase执行不区分大小写的匹配。注：不区分大小写的文件系统，非魔术模式将默认匹配，因为stat并readdir不会引发错误。
matchBase如果模式不包含任何斜线字符，请仅执行基本名称匹配。也就是说，*.js将被视为等同于**\/*.js匹配所有目录中的所有js文件。
nodir不匹配目录，只有文件。（注意：只匹配 目录，只需/在模式的末尾放一个。）
ignore添加一个模式或一组glob模式以排除匹配。注意：不管其他设置如何，ignore模式始终处于dot:true模式。
follow扩展**模式时遵循符号链接的目录。请注意，这可能会导致循环链接中出现大量重复引用。
realpath设置为true以调用fs.realpath所有结果。在无法解析符号链接的情况下，将返回匹配条目的完整绝对路径（尽管它通常会是一个破碎的符号链接）
absolute设置为true以始终接收匹配文件的绝对路径。不同的是realpath，这也会影响match事件中返回的值。
与其他fnmatch / glob实现进行比较
虽然严格遵守现有标准是一个有价值的目标，但节点glob和其他实现之间存在一些差异，并且是有意的。

**除非noglobstar设置了标志，否则默认支持 双星字符。这以bsdglob和bash 4.3的方式得到支持，其中**只有在路径部分中唯一有意义的情况下才具有特殊意义。也就是说，a\/**\/b会匹配a/x/y/b，但 a\/**b不会。

请注意，符号链接的目录不会作为a的一部分进行爬网**，但它们的内容可能会与该模式的后续部分相匹配。这可以防止无限循环和重复等。

如果一个转义模式没有匹配，并且该nonull标志被设置，则glob返回所提供的模式，而不是解释字符转义。例如， glob.match([], "\\*a\\?")将返回"\\*a\\?"而不是 "*a?"。这与nullglob在bash中设置选项类似，不同之处在于它不能解析转义的模式字符。

如果括号扩展未禁用，则在对glob模式进行任何其他解释之前执行该扩展。因此，像的图案 +(a|{b),c)}，这将不会在bash或zsh中有效，被扩展 首先进入设置的+(a|b)和+(a|c)，以及这些模式进行有效性检查。由于这两个是有效的，匹配的收益。

评论与否定
以前，如果模式以#字符开头，则该模块可让您将模式标记为“注释”;如果模式以字符开头，则将模式标记为“否定”模式!。

这些选项在版本5中已弃用，并在版本6中删除。

要指定不匹配的内容，请使用该ignore选项。

视窗
请仅在glob表达式中使用正斜杠。

虽然windows使用/或者\作为它的路径分隔符，但/ 这个glob实现只使用字符。您只能在glob表达式中使用正斜杠。反斜线将始终被解释为转义字符，而不是路径分隔符。

来自绝对模式的结果，例如/foo/*使用安装到根设置path.join。在Windows上，默认情况下会导致/foo/*匹配C:\foo\bar.txt。

种族条件
就其性质而言，全球搜索很容易受到竞争状况的影响，因为它依赖于目录步行等。

因此，glob查找时存在的文件可能在返回结果时被删除或修改。

作为其内部实现的一部分，该程序会缓存它所做的所有stat和readdir调用，以减少系统开销。但是，这也使得它更容易受到种族的影响，特别是如果缓存或statCache对象在glob调用之间重用。

因此，建议用户在面对快速变化时不要使用glob结果作为文件系统状态的保证。对绝大多数操作而言，这绝不是问题。

特约
任何行为改变（包括错误修正）都必须附带测试。

无法通过测试或降低性能的修补程序将被拒绝。

# to run tests
npm test

# to re-generate test fixtures
npm run test-regen

# to benchmark against bash/zsh
npm run bench

# to profile javascript
npm run prof
元数据
*/
glob('./temp/canvas动画/*.@(png|jpg)',{
    nodir:true
},function(err,files){
    if(err)
    {
        return;
    }
    console.log(files);

})