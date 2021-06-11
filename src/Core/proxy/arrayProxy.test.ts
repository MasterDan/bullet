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
  test('Push', () => {
    const array = makeArrayReactive([12, 3, 15, 21, 25]);
    array.push(12);
    let detector = '';
    const sub: Subscribtion<number> = jest.fn((val, old) => {
      detector = `${old}-${val}`;
    });
    array.subscribeElement(5, sub);
    array[5] = 13;
    expect(sub).toBeCalled();
    expect(detector).toBe('12-13');
    array.pop();
    array.push(67);
    array[5] = 76;
    expect(sub).toBeCalled();
    expect(detector).toBe('12-13');
  });
  test('Unshift', () => {
    const array = makeArrayReactive([121, 3, 15, 21, 25]);
    array.unshift(12);
    let detector = '';
    const sub: Subscribtion<number> = jest.fn((val, old) => {
      detector = `${old}-${val}`;
    });
    array.subscribeElement(0, sub);
    array[0] = 13;
    expect(sub).toBeCalled();
    expect(detector).toBe('121-13');
    array.shift();
    array.unshift(13);
    array[0] = 13;
    expect(sub).toBeCalled();
    expect(detector).toBe('121-13');
  });
  test('slice-copy', () => {
    const array = makeArrayReactive([1, 2, 3]);
    const copy = array.slice();
    expect(copy).toEqual([1, 2, 3]);
  });
});
