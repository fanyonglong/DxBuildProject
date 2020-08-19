import nodePath from 'path';
import fs from 'fs';
import {
    SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
} from 'tapable';

import {EventEmitter} from 'events';
import {extend,merge} from 'lodash';
import {IService,ServiceHooks} from './types';
// 配置文件
const CONFIG_FILES_LOC=[
    'dxyl.config'
];
interface UserConfigOptions{
    cwd:any;
    configFile:boolean|string|null|undefined,
    [propName:string]:any
}
export default class UserConfig {
    hooks={
        change:new SyncHook(['config'])
    };
    options:UserConfigOptions;
    configFiles:string[];
    constructor(options:UserConfigOptions){
        this.options=extend({
            cwd:process.cwd(),
            configFile:false
        },this.options);
        this.configFiles=[...CONFIG_FILES_LOC];
        if(typeof this.options.configFile=='string'){
            this.configFiles.unshift(this.options.configFile);
        }
        this.configFiles=this.configFiles.filter(file=>{
            let absPath=nodePath.resolve(this.options.cwd,file);
            return fs.existsSync(absPath);
        })
    }
    getUserConfig(){
        let file=this.configFiles[0];
        let config={}
        if(file){
        //let relativePath=nodePath.relative(__dirname,absPath);
            config= require(file);
        }
        return merge({},config);
    }
}