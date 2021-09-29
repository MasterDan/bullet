import { drawNode } from '../../drawEngine';
import { IDrawNodeArg } from '../drawArg';
import { Pipe } from '../pipeline';

export class GenerateRenderPipe extends Pipe<IDrawNodeArg, IDrawNodeArg> {
  constructor() {
    super(
      (arg: IDrawNodeArg): IDrawNodeArg => {
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
