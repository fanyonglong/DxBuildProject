- [项目工程化](#%e9%a1%b9%e7%9b%ae%e5%b7%a5%e7%a8%8b%e5%8c%96)
  - [lerna](#lerna)
  - [publish](#publish)
# 项目工程化


## lerna
为`packages`下面每个包安装本地或远程包
```bash
npx lerna add <package>[@version] --dev or --prod
```
命令:  
`lerna publish`   
`lerna version`   
`lerna bootstrap`  
`lerna list`  
`lerna changed`  
`lerna diff`  
`lerna exec`  
`lerna run`  
`lerna init`  
`lerna add`  
`lerna clean`  
`lerna import`  
`lerna link`  
`lerna create`  
`lerna info`  

## publish
```bash
lerna publish               ＃发布自上一个发行版以来发生更改的软件包 
lerna publish from-git      ＃明确发布当前提交中标记的软件包 
lerna publish from-package ＃明确发布注册表中没有最新版本的软件包
```