import { Subscribtion } from '../reactive/subscribtion';
import { makeObjectReactive, ReactiveObjectProxy } from './objectProxy';

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
    const detectorHusband: IChangeDetector<Person> = {
      old: null,
      new: null
    };
    const objectSub: Subscribtion<Person> = jest.fn(
      (val: Person, old: Person) => {
        detectorHusband.old = old;
        detectorHusband.new = val;
      }
    );
    const objectSubToken = testobj.subscribe('husband', objectSub);
    testobj.husband = new Person('Bradd', 'Pitt');
    expect(objectSub).toBeCalled();
    expect(detectorHusband).toEqual({
      old: new Person('John', 'Doe'),
      new: new Person('Bradd', 'Pitt')
    });
    objectSubToken.unsubscribe();
    testobj.husband = new Person('Tom', 'Cruise');
    expect(objectSub).toBeCalled();
    expect(detectorHusband).toEqual({
      old: new Person('John', 'Doe'),
      new: new Person('Bradd', 'Pitt')
    });
  });
  test('prop of inner oject subscribe', () => {
    const testobj = makeObjectReactive(
      new Family(new Person('John', 'Doe'), new Person('Jane', 'Doe'))
    );
    let surnameChangeDetector = '';
    const sub: Subscribtion<string> = jest.fn((val: string, old: string) => {
      surnameChangeDetector = `${old}-${val}`;
    });
    const token = (testobj.husband as ReactiveObjectProxy<Person>).subscribe(
      'surname',
      sub
    );
    testobj.husband.surname = 'Smith';
    expect(sub).toBeCalled();
    expect(surnameChangeDetector).toBe('Doe-Smith');
    token.unsubscribe();
    testobj.husband.surname = 'Joly';
    expect(sub).toBeCalled();
    expect(surnameChangeDetector).toBe('Doe-Smith');
  });
});
