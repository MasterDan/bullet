import { Subscribtion } from '../reactive/subscribtion';
import { makeArrayReactive } from './arrayProxy';

describe('array tests', () => {
  test('Change Value Behavior', () => {
    const array = makeArrayReactive(['Apple', 'Orange', 'Pineapple']);
    let detector = '';
    let changeDetector = [];
    const sub: Subscribtion<string> = jest.fn((val, old) => {
      detector = `${old}-${val}`;
    });
    const changeSub: Subscribtion<string[]> = jest.fn((val) => {
      expect(val).not.toBeNull();
      expect(val).not.toBeUndefined();
      changeDetector = val;
    });
    array.subscribeElement(0, sub);
    array.subscribe(changeSub);
    array[0] = 'Pear';
    expect(changeSub).toBeCalled();
    expect(sub).toBeCalled();
    expect(detector).toBe('Apple-Pear');
    expect(changeDetector).toEqual(['Pear', 'Orange', 'Pineapple']);
    return undefined;
  });
});
