import { drawNode } from '../../drawEngine';
import { IDrawNodePipeArg } from '../drawArg';
import { Pipe } from '../pipeline';

export class GenerateRenderPipe extends Pipe<
  IDrawNodePipeArg,
  IDrawNodePipeArg
> {
  constructor() {
    super(
      (arg: IDrawNodePipeArg): IDrawNodePipeArg => {
        const render = drawNode(arg.node);

        return arg as IDrawNodePipeArg;
      }
    );
  }
}
