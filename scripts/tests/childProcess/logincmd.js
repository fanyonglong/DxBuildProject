const inquirer=require("inquirer");
//node scripts/tests/childProcess/logincmd.js

inquirer.prompt([{
    type:"string",
    name:"userName",
    message:"请输入用户名",
    validate(value,answers){
        if(value!=='lisha'){
            return '用户名不正确'
        }
        return true;
    }

}]).then(answers=>{

    console.log('success',answers.userName)
})