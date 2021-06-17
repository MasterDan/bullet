import { Subscribtion } from '../reactive/subscribtion';
import { makeObjectReactive } from './objectProxy';

class Person {
  constructor(public name: string, public surname: string) {}
}

class Family {
  constructor(public husband: Person, public wife: Person) {}
}

interface IChangeDetector<T> {
  old: T;
  new: T;
}

describe('reactive object proxy', () => {
  test('Simple property sub-unsub', () => {
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
  test('Array in object sub-unsub', () => {
    const testObject = makeObjectReactive({
      foo: 'bar',
      arr: ['one', 'two', 'three']
    });
    const detector: IChangeDetector<string[]> = {
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
  test('Object in object sub-unsub', () => {
    const testobj = makeObjectReactive(
      new Family(new Person('John', 'Doe'), new Person('Jane', 'Doe'))
    );
    const detector: IChangeDetector<Person> = {
      old: null,
      new: null
    };
    const sub: Subscribtion<Person> = jest.fn((val: Person, old: Person) => {
      detector.old = old;
      detector.new = val;
    });
    const token = testobj.subscribe('husband', sub);
    testobj.husband = new Person('Bradd', 'Pitt');
    expect(sub).toBeCalled();
    expect(detector).toEqual({
      old: new Person('John', 'Doe'),
      new: new Person('Bradd', 'Pitt')
    });
    token.unsubscribe();
    testobj.husband = new Person('Tom', 'Cruise');
    expect(sub).toBeCalled();
    expect(detector).toEqual({
      old: new Person('John', 'Doe'),
      new: new Person('Bradd', 'Pitt')
    });
  });
});
