const Generator=require('../util/baseGenerators');
const fs =require('fs');
module.exports=class extends Generator
{
    prompting()
    {
        return this.prompt([{
                type:"input",
                name:"taskName",
                message:"任务名称",
                default:"",
                filter(val)
                {
                    return String(val).trim();
                },
                validate(val)
                {
                    return val==''?'请输入任务名称':true;
                }

        },{
            type:"list",
            name:"taskType",
            choices:['babel','typescript','less','sass'],
            message:"任务类型",
            default:0,
            validate(val)
            {
                return val==''?'请选择任务类型':true;
            }
        }]).then(argv=>{
                this.taskName=argv.taskName;
                this.taskType=argv.taskType;
        });
    }
    writing()
    {
        var {taskType,taskName}=this;
        this.fs.copyTpl(this.templatePath(taskType,"**/*.js"),this.destinationPath('gulp',taskName),{
            taskName
        });
        fs.mkdirSync(this.destinationPath('src',taskName));
    }
    end()
    {
        this.log('创建成功');
    }

}