import { drawNode } from '../../drawEngine';
import { IDrawNodeArg } from '../drawArg';
import { Pipe } from '../pipeline';

export class DrawTextPipe extends Pipe<IDrawNodeArg, IDrawNodeArg> {
  constructor() {
    super(
      (arg?: IDrawNodeArg): IDrawNodeArg => {
        if (arg == undefined) {
          throw new Error('Empty IDrarNodeArg');
        }
        const render = drawNode(arg.node);
        if (arg.resultAccumulator == undefined) {
          arg.resultAccumulator = [render];
        } else {
          arg.resultAccumulator.push(render);
        }
        return arg as IDrawNodeArg;
      }
    );
  }
}
