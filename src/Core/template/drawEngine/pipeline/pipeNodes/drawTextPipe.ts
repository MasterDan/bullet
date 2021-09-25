import { IDrawNodeArg } from '../drawArg';
import { Pipe } from '../pipeline';

export class DrawTextPipe extends Pipe<IDrawNodeArg, IDrawNodeArg> {
  constructor() {
    super(
      (arg?: IDrawNodeArg): IDrawNodeArg => {
        return arg as IDrawNodeArg;
      }
    );
  }
}
