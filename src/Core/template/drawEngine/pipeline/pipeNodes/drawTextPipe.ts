import { IDrawArg } from '../drawArg';
import { Pipe } from '../pipeline';

export class DrawTextPipe extends Pipe<IDrawArg, IDrawArg> {
  constructor() {
    super(
      (arg?: IDrawArg): IDrawArg => {
        return arg as IDrawArg;
      }
    );
  }
}
