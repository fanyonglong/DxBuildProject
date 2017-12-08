const chalk=require('chalk');

function normalLog(text){ return text;}
export function log(name,text)
{
    let logParse=chalk[name]||normalLog;
    console.log(logParse(text));
}

export function red(text)
{
    log('red',text)
}
export function black()
{
    log('black',text)
}
export function green()
{
    log('green',text)
}
export function yellow()
{
    log('yellow',text)
}
export function blue()
{
    log('blue',text)
}
export function gray()
{
    log('gray',text)
}
export function grey()
{
    log('grey',text)
}
