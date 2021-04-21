import { isFunction, isObject } from './checkers';

class fooClass {
  a: 3;
  b: 4;
}
describe('Checkers', () => {
  const fooObj = {
    a: 1,
    b: true
  };
  const fooFun = () => 42;
  const fooClassObj = new fooClass();
  const fooStr = 'hello world';
  const fooDate = new Date();
  test('isFunction', () => {
    expect(isFunction(fooObj)).toBe(false);
    expect(isFunction(fooFun)).toBe(true);
    expect(isFunction(fooClassObj)).toBe(false);
    expect(isFunction(fooStr)).toBe(false);
    expect(isFunction(fooDate)).toBe(false);
  });
  test('isObject', () => {
    expect(isObject(fooObj)).toBe(true);
    expect(isObject(fooFun)).toBe(false);
    expect(isObject(fooClassObj)).toBe(true);
    expect(isObject(fooStr)).toBe(false);
    expect(isObject(fooDate)).toBe(false);
  });
});
