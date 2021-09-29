import { IDrawNodeArg } from '../drawArg';
import { Pipe } from '../pipeline';

export interface IDrawPipeArg {
  drawnode: IDrawNodeArg;
  content: string;
}

export class DrawGeneratedTextPipe extends Pipe<IDrawPipeArg, string> {
  constructor() {
    super((arg: IDrawPipeArg) => {
      let result = '';
      for (const render of arg.drawnode.resultAccumulator ?? []) {
        result += render(arg.content);
      }
      return result;
    });
  }
}
