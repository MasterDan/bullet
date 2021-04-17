import 'jest';
import { Reactive } from './reactive';
import { Subscribtion } from './subscribtion';
describe('Reactive class tests', () => {
  test('Check Subscribe', () => {
    const ref = new Reactive(5);
    let detector: string;
    const subscription: Subscribtion<number> = jest.fn((val, old) => {
      expect(val).toBe(8);
      expect(old).toBe(5);
      detector = `${old}-${val}`;
    });
    ref.subscribe(subscription);
    ref.value = 8;
    expect(subscription).toBeCalled();
    expect(detector).toBe('5-8');
  });
  test('Check Unsubscribe', () => {
    const ref = new Reactive(5);
    const detector: string = null;
    const subscription: Subscribtion<number> = jest.fn(() => {
      throw new Error('error');
    });
    const token = ref.subscribe(subscription);
    token.unsubscribe();
    ref.value = 8;
    expect(subscription).not.toBeCalled();
    expect(detector).toBeNull();
  });
});
