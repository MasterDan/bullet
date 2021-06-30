import { removeItem } from './array';

describe('Array tools',()=>{
    test('RemoveItem',()=>{
        const array = [1,2,3];
        const newArray = removeItem(array,2);
        expect(newArray).toEqual([1,3]);       
    })
})