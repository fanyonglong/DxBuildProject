import getId from '../src/index';

describe('测试webpack',()=>{
    test('测试：getId是否返回1',()=>{
        expect(getId()).toEqual(1);
    })
})