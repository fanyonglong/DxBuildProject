const { rmdir } = require('../utils/util');
const path = require('path')
//node scripts/tests/util
testRmdir();
function testRmdir() {

    rmdir(path.join(process.cwd(), 'temp')).then(() => {
        console.log('删除成功')
    }).catch((e)=>{
        console.log('异常',e)
    })
}
