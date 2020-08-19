import {Service} from '@dxyl/core';



function RollupPlugin(api,options){

}

export function createService(){

    let service=new Service({
        
        plugins:[RollupPlugin]
    })
    return service;
}