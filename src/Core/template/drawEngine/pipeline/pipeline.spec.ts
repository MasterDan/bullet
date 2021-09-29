import { Pipe, Pipeline } from './pipeline';

describe('piplenes', () => {
  test('test-pipe', () => {
    let cheker = -1;
    const fn = jest.fn((arg?: string) => {
      cheker = arg?.length ?? -1;
      return cheker;
    });
    const pipeline = new Pipeline<string, number>(new Pipe(fn));
    pipeline.run('hello');
    expect(fn).toBeCalled();
    expect(cheker).toBe(5);
    const fn2 = jest.fn((arg?: number) => {
      return arg != undefined ? arg + 1 : -1;
    });
    const pipe2 = pipeline.mergeWith(new Pipe(fn2));
    const result = pipe2.run('me');
    expect(fn).toBeCalledTimes(2);
    expect(cheker).toBe(2);
    expect(fn2).toBeCalled();
    expect(result).toBe(3);
  });
});
