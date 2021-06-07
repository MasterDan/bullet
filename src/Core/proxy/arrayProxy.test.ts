import { Subscribtion } from '../reactive/subscribtion';
import { makeArrayReactive } from './arrayProxy';

describe('array tests', () => {
  test('Change Value Behavior', () => {
    const array = makeArrayReactive(['Apple', 'Orange', 'Pineapple']);
    let detector = '';
    const sub: Subscribtion<string> = jest.fn((val, old) => {
      detector = `${old}-${val}`;
    });
    array.subscribeElement(0, sub);
    array[0] = 'Pear';
    expect(sub).toBeCalled();
    expect(detector).toBe('Apple-Pear');
    return undefined;
  });
});
