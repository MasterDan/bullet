import 'jest';
import { sum } from '../src/customMath';
test('Проверяем работу тевтов на сложени',()=>{
    expect(sum(2,3)).toBe(5);
})
