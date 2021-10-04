import { Pipe, Pipeline } from './pipeline';

export class PipelineParallel extends Pipeline<unknown[], unknown[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...pipelines: Pipeline<any, unknown>[]) {
    super(
      new Pipe((args: unknown[]) => {
        return args.map((arg, index) => pipelines[index].run(arg));
      })
    );
  }
}
