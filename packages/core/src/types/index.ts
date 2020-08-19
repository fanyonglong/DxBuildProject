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
export type TapableHook=SyncHook|
SyncBailHook|
SyncWaterfallHook|
SyncLoopHook|
AsyncParallelHook|
AsyncParallelBailHook|
AsyncSeriesHook|
AsyncSeriesBailHook|
AsyncSeriesWaterfallHook;

export interface ServiceHooks{
    [propName:string]:TapableHook
}
export type ServicePlugin={
    id:string,
    apply:(api:any,options:any)=>void;
}

export type ServicePluginOptions=ServicePlugin|string|(()=>void);

export interface ServiceOptions{
    env?:any,
    argv?:any,
    plugins?:ServicePluginOptions[],
    [propName:string]:any
}
export interface IService{
    hooks:ServiceHooks;
    plugins:Map<string,ServicePlugin>;
    options:ServiceOptions;
}
export interface ICommand{
    name:string;
    args?:any;
    fn:(args:any,callback?:(err:Error)=>void)=>void;
}