export type LineOfPipe<Tinput, Toutput> =
  | [
      Pipe<Tinput, unknown | Toutput>,
      ...Pipe<unknown, unknown>[],
      Pipe<unknown | Tinput, Toutput>
    ]
  | [Pipe<Tinput, Toutput>];
export class Pipeline<Tinput, Toutput> {
  line: LineOfPipe<Tinput, Toutput>;
  constructor(...line: Pipe<unknown, unknown>[]) {
    this.line = [...line] as LineOfPipe<Tinput, Toutput>;
  }
  mergeWith<T>(
    attachment: Pipe<Toutput, T> | Pipeline<Toutput, T>
  ): Pipeline<Tinput, T> {
    if (attachment instanceof Pipe) {
      return new Pipeline<Tinput, T>(
        ...(this.line as Pipe<unknown, unknown>[]),
        attachment as Pipe<unknown, unknown>
      );
    } else {
      return new Pipeline<Tinput, T>(
        ...(this.line as Pipe<unknown, unknown>[]),
        ...(attachment.line as Pipe<unknown, unknown>[])
      );
    }
  }
}

export class Pipe<Tinput, Toutput> {
  constructor(public body: (input: Tinput) => Toutput) {}
}
