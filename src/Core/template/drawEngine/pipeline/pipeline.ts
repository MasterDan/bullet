export type LineOfPipe<Tinput, Toutput> =
  | [
      Pipe<Tinput, unknown | Toutput>,
      ...Pipe<unknown, unknown>[],
      Pipe<unknown | Tinput, Toutput>
    ]
  | [Pipe<Tinput, Toutput>];
export class Pipeline<Tinput, Toutput> {
  line: LineOfPipe<Tinput, Toutput>;
  constructor(...line: LineOfPipe<Tinput, Toutput>) {
    this.line = [...line];
  }
  mergeWith<T>(
    attachment: Pipe<Toutput, T> | Pipeline<Toutput, T>
  ): Pipeline<Tinput, T> {
    if (attachment instanceof Pipe) {
      return new Pipeline<Tinput, T>(...this.line, attachment);
    } else {
      return new Pipeline<Tinput, T>(...this.line, ...attachment.line);
    }
  }
}

export class Pipe<Tinput, Toutput> {
  constructor(public body: (input: Tinput) => Toutput) {}
}
