
import {EventEmitter} from 'events';
import enhancedResolve from 'enhanced-resolve'; 
import {extend,merge,isArray,isFunction,isString,uniq} from 'lodash';
import {
    SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
    HookMap
    
} from 'tapable';
import UserConfig from './UserConfig';
import {ServiceHooks,ServicePlugin,ServiceOptions,IService,ICommand} from './types';
import Logger from './logger';
export default class Service extends EventEmitter implements IService{
    hooks:ServiceHooks;
    plugins=new Map<string,ServicePlugin>();// 插件集
    options:ServiceOptions;
    commands=new Map<string,ICommand>();
    logger:Logger;
    isInit=false;
    constructor(options:ServiceOptions){
        super();
        this.logger=new Logger('Service');
        this.options=extend({
            argv:process.argv.slice(2),
            cwd:process.cwd(),
            env:process.env.NODE_ENV,
            plugins:[]
        },options);
        this.hooks=Object.freeze({
            initialize:new SyncHook(['serviceInstance'])  
        });
        
    }
    init(){
       if(this.isInit){
           return;
       }
       this.isInit=true;
       this.hooks.initialize.call(this);
        // 解析插件
       this.installPlugins(this.resolvePlugins(this.options.plugins),this);
    }
    // 安装插件
    installPlugins(plugins,pluginService){
        for (const plugin of plugins) {
			if (typeof plugin === "function") {
				plugin.call(pluginService, pluginService);
			} else {
				plugin.apply(pluginService);
			}
		}
    }
    // 解析插件
    resolvePlugins(plugins){
        if(!isArray(plugins)){
            return [];
        }
        return uniq(plugins.map(pluginName=>{
            let plugin;
            if(isString(pluginName)){
                plugin=require(pluginName)
            }else {
                plugin=pluginName;
            }
            return plugin
        }));
    }
    registerCommand(name,command:ICommand){
        if(!this.commands.has(name)){
            if(isFunction(command)){
                command={
                    name,
                    fn:command
                }
            }
            this.commands.set(name,command);
        }
    }   
    runCommand(name,args,callback?:(error:Error)=>void){
        this.init();
        let command=this.commands.get(name);
        if(!this.commands.has(name)){
             this.logger.error('命令不存在:'+name)
            return;
        }
        this.logger.log('执行命令:'+name);
        command.fn(args,(err)=>{
            if(err){
                this.logger.error('执行命令出错:'+name,err);
                callback&&callback(err);
                return;
            }
            callback&&callback(null);
            this.logger.success('执行命令完成:'+name);
        });
    }

}