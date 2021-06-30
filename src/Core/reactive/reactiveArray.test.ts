import 'jest';
import { Reactive } from './reactive';
import { ReactiveArray } from './reactiveArray';
import { Subscribtion } from './subscribtion';
describe('ReactiveArray Tests', () => {
  test('valueOf tests',()=>{
    const reactiveArray = new ReactiveArray([0,1,2]);
    expect(reactiveArray.valueOf(0)).toBe(0);
    reactiveArray.valueOf(0,50);
    expect(reactiveArray.value[0].value).toBe(50);
    expect(reactiveArray.valueOf(0)).toBe(50);
  })
  test('Subscribe Unsubscribe', () => {
    let array = [...new Array(5).keys()];
    const reactiveArray = new ReactiveArray(array);
    const subFunc: Subscribtion<Reactive<number>[]> = jest.fn((val) => {
      array = val.map((v) => v.value);
    });
    const token = reactiveArray.subscribe(subFunc);

    reactiveArray.push(6);
    expect(subFunc).toBeCalled();
    expect(array.length).toBe(6);

    reactiveArray.valueOf(0, 100);
    expect(subFunc).toBeCalledTimes(2);
    expect(reactiveArray.value[0].value).toBe(100);
    expect(reactiveArray.valueOf(0)).toBe(100);
    expect(array[0]).toBe(100);

    token.unsubscribe();
    reactiveArray.push(7);
    expect(subFunc).toBeCalledTimes(2);
    expect(array.length).toBe(6);    
  });
});
