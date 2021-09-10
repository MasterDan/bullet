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
}

export class Pipe<Tinput, Toutput> {
  constructor(public body: (input: Tinput) => Toutput) {}
}
