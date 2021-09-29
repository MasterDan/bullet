export type LineOfPipe<Tinput, Toutput> =
  | [
      Pipe<Tinput, unknown | Toutput>,
      ...Pipe<unknown, unknown>[],
      Pipe<unknown | Tinput, Toutput>
    ]
  | [Pipe<Tinput, Toutput>];
export class Pipeline<Tinput, Toutput> {
  line: LineOfPipe<Tinput, Toutput>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...line: Pipe<any, any>[]) {
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
  run(arg?: Tinput): Toutput {
    let result: unknown;
    result = this.line[0].body(arg);
    for (let i = 1; i < this.line.length; i++) {
      const pipe = this.line[i] as Pipe<unknown, unknown>;
      result = pipe.body(result);
    }
    return result as Toutput;
  }
}

export class Pipe<Tinput, Toutput> {
  constructor(public body: (input?: Tinput) => Toutput) {}
}
