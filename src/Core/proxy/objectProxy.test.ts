import { Subscribtion } from '../reactive/subscribtion';
import { makeObjectReactive } from './objectProxy';

class Person {
  name: string;
  surname: string;
  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }
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
});
