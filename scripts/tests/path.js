////node scripts/tests/path
const path=require('path');

console.log(path.relative(__dirname,path.resolve(__dirname,'../../packages/core/package.json')))