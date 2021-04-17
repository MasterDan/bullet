import 'jest';
import { ReactiveArray } from './reactiveArray';
describe('ReactiveArray Tests', () => {
  test('Subscribe Unsubscribe', () => {
    let array = [...new Array(5).keys()];
    const reactiveArray = new ReactiveArray(array);
    const token = reactiveArray.subscribe((val) => {
      array = val.map((v) => v.value);
    });
    reactiveArray.push(6);
    expect(array.length).toBe(6);
    token.unsubscribe();
    reactiveArray.push(7);
    expect(array.length).toBe(6);
  });
});
