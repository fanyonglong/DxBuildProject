const chalk=require('chalk');

function normalLog(text){ return text;}
 function log(name,text)
{
    let logParse=chalk[name]||normalLog;
    console.log(logParse(text));
}

 function red(text)
{
    log('red',text)
}
 function black(text)
{
    log('black',text)
}
 function green(text)
{
    log('green',text)
}
 function yellow(text)
{
    log('yellow',text)
}
 function blue(text)
{
    log('blue',text)
}
 function gray(text)
{
    log('gray',text)
}
 function grey(text)
{
    log('grey',text)
}
module.exports={
    red,
    black,
    green,
    yellow,
    blue,
    gray,
    grey
}
