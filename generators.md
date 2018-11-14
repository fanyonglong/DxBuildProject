MEM-FS-编辑器 构建状态 NPM版本 覆盖状态 大卫依赖 大卫Dev依赖
在mem-fs之上工作的文件版本助手

用法
var memFs =  require（' mem-fs '）;
var editor =  require（' mem-fs-editor '）;

var store =  memFs。create（）;
var fs =  编辑器。创建（存储）;

fs。写（' somefile.js '，' var a = 1; '）;
## read(filepath, [options])
读取一个文件并将其内容作为字符串返回。

如果您通过，您可以选择获取原始内容缓冲区options.raw = true。

默认情况下，调用read()不存在的文件路径会引发错误。但是，options.defaults = 'your default content'如果您不想处理try / catch ，您可以通过获取您传入的默认内容。

## readJSON(filepath, [defaults])
读取一个文件并将其内容解析为JSON。

readJSON()内部调用read()，如果传入的文件路径不存在，会抛出错误。但是如果你传递一个可选defaults的defaults内容，那么在目标文件丢失的情况下将返回内容，而不是抛出错误（如果JSON.parse不能解析你的目标文件，错误仍然会被抛出）。

## write(filepath, contents)
用一个字符串或一个缓冲区替换文件的内容（现有的或新的）。

## writeJSON(filepath, contents[, replacer [, space]])
将文件（现有的或新的）的内容替换为要通过调用转换的对象JSON.stringify()。

contents通常应该是一个JSON对象，但从技术上来说，它可以是JSON.stringify可以接受的任何东西。

根据JSON.stringify的定义，可以传递replacer并space作为最后两个参数。用于格式化输出字符串（美化）。spacer

当没有指定时，默认值space是2。

## append(filepath, contents, [options])
追加新的内容到当前的文件内容。

options.trimEnd（默认true）。修剪当前文件内容的尾部空白。
options.separator（默认os.EOL）。在当前和新内容之间插入分隔符。
## extendJSON(filepath, contents[, replacer [, space]])
用作为参数提供的部分对象扩展现有JSON文件的内容。

可以采用与之相同的JSON格式参数#writeJSON()。

## delete(filepath, [options])
删除文件或目录。

filePath也可以是glob。如果filePath是glob，则可以选择传递一个options.globOptions对象来更改其模式匹配行为。被描述的选项的完整列表在这里。该sync标志被强制true在globOptions。

## copy(from, to, [options])
将文件从from路径复制到to路径。

或者，传递一个options.process函数（process(contents)）返回一个字符串或一个缓冲区，将成为新的文件内容。处理函数将把一个单独的内容参数作为一个复制的文件内容Buffer。

from可以是与文件系统匹配的glob模式。如果是这种情况，那么to必须是输出目录。对于一个globified from，你可以选择传递一个options.globOptions对象来改变它的模式匹配行为。被描述的选项的完整列表在这里。该nodir标志被强制为true在globOptions确保表示每个匹配目录乙烯基对象被标记为deleted在mem-fs商店。

## copyTpl(from, to, context[, templateOptions [, copyOptions]])
复制from文件并将其内容解析为ejs模板，其中context是模板上下文（模板中可用的变量名称）。

您可以选择传递一个templateOptions对象。mem-fs-editor自动设置文件名选项，以便您可以轻松使用部分。

您也可以选择传递一个copyOptions对象（请参阅copy（）文档以获取更多详细信息）。

模板语法如下所示：

<%= value %>
<%- include('partial.ejs', { name: 'Simon' }) %>
有关更多详细信息，请参阅ejs文档。

## move(from, to, [options])
移动/重命名文件从from路径到to路径。

## move内部使用#copy和#delete，所以from可以是glob模式，并且可以提供options.globOptions它。

## exists(filepath)
true如果文件存在，则返回。false如果未找到或删除文件，则返回。

## commit([filters,] callback)
将对mem-fs存储中的文件所做的每一项更改都保存到磁盘中。

如果提供，filters是一个TransformStream的数组将被应用在乙烯基文件流（如吞咽插件）。

callback 在磁盘上更新文件后调用。