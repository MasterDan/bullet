import { Reactive } from './reactive';
import { ReactiveObject, SameKeysReactiveValues } from './reactiveObject';
import { Subscribtion } from './subscribtion';

interface IObjectToPass {
  fooStr: string;
  fooObj: {
    bar: string;
    baz: number;
  };
  fooBool: boolean;
  fooNum: number;
}

describe('Reactive Object', () => {
  let testObj: ReactiveObject<IObjectToPass>;
  beforeEach(() => {
    testObj = new ReactiveObject({
      fooBool: true,
      fooNum: 5,
      fooStr: 'hello world',
      fooObj: {
        bar: 'hello inner world',
        baz: 5
      }
    });
  });
  afterEach(() => {
    testObj = null;
  });
  test('Subscribe Unsubscribe', () => {
    let detector: SameKeysReactiveValues<IObjectToPass> = null;
    const subFunction: Subscribtion<
      SameKeysReactiveValues<IObjectToPass>
    > = jest.fn((val, oldVal) => {
      detector = oldVal;
    });
    const token = testObj.subscribe(subFunction);
    testObj.value = new ReactiveObject<IObjectToPass>({
      fooBool: false,
      fooNum: 6,
      fooStr: 'hello world 2',
      fooObj: {
        bar: 'hello inner world2',
        baz: -1
      }
    }).value;
    expect(subFunction).toBeCalled();
    expect(detector).not.toBeNull();
    expect(detector).not.toBeUndefined();
    expect(detector.fooStr.value).toBe('hello world');
    token.unsubscribe();
    testObj.value = null;
    expect(subFunction).toBeCalled();
    expect(detector).not.toBeNull();
    expect(detector.fooStr.value).toBe('hello world');
  });
  test('Inner Subscribe Unsubscribe', () => {
    let detector: string = null;
    const sub: Subscribtion<string> = jest.fn((val, oldVal) => {
      detector = oldVal;
    });
    const token = testObj.value.fooStr.subscribe(sub);
    testObj.value.fooStr.value = 'WhoHoo';
    expect(sub).toBeCalled();
    expect(detector).toBe('hello world');
    token.unsubscribe();
    testObj.value.fooStr.value = 'xxx';
    expect(sub).toBeCalled();
    expect(detector).toBe('hello world');
  });
  test('Very inner Subscribe Unsubscribe', () => {
    let detector: string = null;
    const sub: Subscribtion<string> = jest.fn((val, oldVal) => {
      detector = oldVal;
    });
    const token = ((testObj.value.fooObj.value
      .bar as unknown) as Reactive<string>).subscribe(sub);
    ((testObj.value.fooObj.value.bar as unknown) as Reactive<string>).value =
      'whooHoo';
    expect(sub).toBeCalled();
    expect(detector).toBe('hello inner world');
    token.unsubscribe();
    ((testObj.value.fooObj.value.bar as unknown) as Reactive<string>).value =
      'xxx';
    expect(sub).toBeCalled();
    expect(detector).toBe('hello inner world');
  });
});
