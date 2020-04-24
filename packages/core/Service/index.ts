import {EventEmitter} from 'events';
import {
    HookMap
} from "tapable";


type pluginOps={

}

type ServiceOptions={
    env:any;// 当前环境
    config:string;// 配置文件路径
    plugins:pluginOps
}
/*
调度服务
*/
class Service extends EventEmitter{
    plugins:object[];
    constructor(options:ServiceOptions){
        super();
    }

    runCommand(){

    }
    run(){

    }
}