var Generator=require('yeoman-generator');
var path=require('path');

module.exports=class BaseGenerators extends Generator{
    constructor(args, opts)
    {
        super(args, opts);
        this.contextRoot=path.resolve(__dirname,'../../');
        this.destinationRoot(this.contextRoot);
    }
    copy(from,to)
    {
        this.fs.copy(from,to);
    }
}