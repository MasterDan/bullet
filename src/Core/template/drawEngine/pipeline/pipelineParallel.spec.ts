import { Pipe, Pipeline } from './pipeline';
import { PipelineParallel } from './pipelineParallel';

describe('PiplineParallel', () => {
  test('simple', () => {
    const func = jest.fn((num: number) => num + 1);
    const pipelineOne = new Pipeline<number, number>(new Pipe(func));
    const pipelineTwo = new Pipeline<number, number>(
      new Pipe(func),
      new Pipe(func)
    );
    const parallel = new PipelineParallel(pipelineOne, pipelineTwo);
    const result = parallel.run([1, 1]);
    expect(func).toBeCalledTimes(3);
    expect(result).toEqual([2, 3]);
  });
});
