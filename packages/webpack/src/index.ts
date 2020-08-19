import {Service} from '@dxyl/core';

import WebpackConfigPlugin from './plugins/config';
import BuildPlugin from './commands/build';


 const defaultPlugins:any=[new BuildPlugin(),new WebpackConfigPlugin({})];

class  WebpackService extends Service{
    constructor({plugins=[]}){
        super({
            plugins:defaultPlugins.concat(plugins)
        })
    }
}