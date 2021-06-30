import { isArray, isFunction, isObject } from './checkers';

class fooClass {
  a: 3;
  b: 4;
}
describe('Checkers', () => {
  const fooObj = {
    a: 1,
    b: true
  };
  const fooArr = [2, 1, 6, 5];
  const fooFun = () => 42;
  const fooClassObj = new fooClass();
  const fooStr = 'hello world';
  const fooDate = new Date();
  test('isFunction', () => {
    expect(isFunction(fooFun)).toBe(true);

    expect(isFunction(fooObj)).toBe(false);
    expect(isFunction(fooObj)).toBe(false);
    expect(isFunction(fooClassObj)).toBe(false);
    expect(isFunction(fooStr)).toBe(false);
    expect(isFunction(fooDate)).toBe(false);
  });
  test('isObject', () => {
    expect(isObject(fooObj)).toBe(true);
    expect(isObject(fooClassObj)).toBe(true);

    expect(isObject(fooArr)).toBe(false);
    expect(isObject(fooFun)).toBe(false);
    expect(isObject(fooStr)).toBe(false);
    expect(isObject(fooDate)).toBe(false);
  });
  test('isArray', () => {
    expect(isArray(fooArr)).toBe(true);

    expect(isArray(fooObj)).toBe(false);
    expect(isArray(fooFun)).toBe(false);
    expect(isArray(fooClassObj)).toBe(false);
    expect(isArray(fooStr)).toBe(false);
    expect(isArray(fooDate)).toBe(false);
  });
});
