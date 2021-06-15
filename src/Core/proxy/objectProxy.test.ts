import { Subscribtion } from '../reactive/subscribtion';
import { makeObjectReactive } from './objectProxy';

class Person {
  constructor(public name: string, public surname: string) {}
}

interface IChaneDetector<T> {
  old: T;
  new: T;
}

describe('reactive object proxy', () => {
  test('subscribe unsubscribe', () => {
    const testObject = makeObjectReactive(new Person('John', 'Doe'));
    let nameDetector = '';
    const subscription: Subscribtion<string> = jest.fn((val, oldVal) => {
      nameDetector = `${oldVal}-${val}`;
    });
    const token = testObject.subscribe('name', subscription);
    testObject.name = 'Jane';
    expect(subscription).toBeCalled();
    expect(nameDetector).toBe('John-Jane');
    token.unsubscribe();
    testObject.name = 'Steve';
    expect(subscription).toBeCalledTimes(1);
    expect(nameDetector).toBe('John-Jane');
  });
  test('Array in object', () => {
    const testObject = makeObjectReactive({
      foo: 'bar',
      arr: ['one', 'two', 'three']
    });
    const detector: IChaneDetector<string[]> = {
      old: [],
      new: []
    };
    const sub: Subscribtion<string[]> = jest.fn((val, oldval?) => {
      (detector.old = oldval), (detector.new = val);
    });
    const token = testObject.subscribe('arr', sub);
    testObject.arr = ['Foo', 'Bar', 'Baz'];
    expect(sub).toBeCalled(); 
    expect(detector).toEqual({
      old: ['one', 'two', 'three'],
      new: ['Foo', 'Bar', 'Baz']
    });
    token.unsubscribe();
    testObject.arr = ['aa', 'bbb'];
    expect(sub).toBeCalled();
    expect(detector).toEqual({
      old: ['one', 'two', 'three'],
      new: ['Foo', 'Bar', 'Baz']
    });
  });
});
