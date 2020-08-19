import chalk from 'chalk';

export default class Logger{
    moduleName:string;
    constructor(moduleName:string){
        this.moduleName=moduleName;
    }
    log(...args){
        console.log(chalk.blue(`${this.moduleName}:`,...args))
    }
    error(...args){
        console.error(chalk.red(`${this.moduleName}:`,...args))
    }
    warn(...args){
        console.warn(chalk.yellow(`${this.moduleName}:`,...args))
    }
    success(...args){
        console.log(chalk.green(`${this.moduleName}:`,...args))
    }
}