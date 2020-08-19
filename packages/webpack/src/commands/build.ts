class BuildPlugin{
    
    apply(api){

        api.registerCommand('build',()=>{
            this.runCommand(api);
        })
        
    }
    runCommand(){

    }
}

export default BuildPlugin;